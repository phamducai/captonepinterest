const express = require("express");
const userRoute = express.Router();
const {
  login,
  getDetailUserbyID,
  register,
} = require("../controllers/userController");

userRoute.post("/login", login);
userRoute.post("/register", register);
userRoute.get("/detail/:id", getDetailUserbyID);

module.exports = userRoute;
