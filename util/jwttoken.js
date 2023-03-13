const jwt = require("jsonwebtoken");
const { errorCode, failCode, successCode } = require("../config/response");
//create token
const createToken = (data) => {
    console.log(data);
  let token = jwt.sign(
    {
      content: data,
    },
    process.env.JWT_SECRET,
    { expiresIn: "10d" }
  );
  return token;
};
const checkToken = (token) => {
  let check = jwt.verify(token, process.env.JWT_SECRET);
 
  return check;
};
const verifyToken = (req, res, next) => {
    console.log(req.headers)
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
//   checkTokenAPI
};
