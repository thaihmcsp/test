const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema(
  {
    username: String,
    password: String,
    token: String,
  },
  {
    timestamp: true,
  }
);

const UserModel = mongoose.model("user", UserSchema);

module.exports = UserModel;
