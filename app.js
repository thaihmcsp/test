const express = require("express");
const mongoose = require("mongoose");
const app = express();
const authRouter = require("./routers/auth.router");
const userRouter = require("./routers/user.router");

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use("/auth", authRouter);
app.use("/users", userRouter);

app.get("/", (req, res) => {
  res.json({ a: 10 });
});

app.listen(3000, async () => {
  await mongoose.connect(`mongodb://127.0.0.1:27017/demoTest`);
});
