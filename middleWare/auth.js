const jwt = require("jsonwebtoken");

const authToken = async (req, res, next) => {
  const token = req.headers.authorization.slice(7);
  const data = jwt.verify(token, "test");

  req.user = data;
  next();
};

module.exports = { authToken };
