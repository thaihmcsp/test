const router = require("express").Router();
const User = require("../models/User.model");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

router.post("/register", async (req, res) => {
  try {
    const existUser = await User.findOne({ username: req.body.username });
    if (existUser) {
      return res.json({ status: 400, message: "user existed" });
    }

    const user = await User.create({
      username: req.body.username,
      password: bcrypt.hashSync(req.body.password, 10),
    });

    res.json({ status: 200, user });
  } catch (error) {
    res.json({ status: 500, message: "internal server error" });
  }
});

router.post("/login", async (req, res) => {
  try {
    const existUser = await User.findOne({ username: req.body.username });
    if (!existUser) {
      return res.json({ status: 400, message: "user not existed" });
    }

    if (bcrypt.compareSync(req.body.password, existUser.password)) {
      const token = jwt.sign(existUser._doc, "test", { expiresIn: "2 days" });
      await User.updateOne({ _id: existUser._id }, { token });

      res.json({
        status: 200,
        message: "login success",
        data: { token },
      });
    }
  } catch (error) {
    console.log(error);
    res.json({ status: 500, message: "internal server error" });
  }
});

module.exports = router;
