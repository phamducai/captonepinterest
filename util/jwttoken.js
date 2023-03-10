const jwt = require("jsonwebtoken");
const { errorCode, failCode, successCode } = require("../config/response");
//create token
const createToken = (data) => {
  let token = jwt.sign(
    {
      content: data,
    },
    process.env.JWT_SECRET,
    { expiresIn: "1s" }
  );
  return token;
};
const checkToken = (token) => {
  let check = jwt.verify(token, process.env.JWT_SECRET);
  console.log("check token", check);
  return check;
};
const verifyToken = (req, res, next) => {
  const token = req.headers?.authorization.split(" ")[1];
  try {
    let check = checkToken(token);
    if (check) {
      next();
    }
  } catch (error) {
    return res.status(400).send(error.message);
  }
};
module.exports = {
  createToken,
  checkToken,
  verifyToken,
};
