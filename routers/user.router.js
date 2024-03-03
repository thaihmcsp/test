const router = require("express").Router();
const { authToken } = require("../middleWare/auth");

router.get("/me", authToken, async (req, res) => {
  res.json(req.user);
});

module.exports = router;
