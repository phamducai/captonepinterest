const express = require("express");
const userRoute = express.Router();
const {
  login,
  getDetailUserbyID,
  register,
  updateUser,
  uploadAvatar,
} = require("../controllers/userController");

const upload = require("../upload/index");
const { verifyToken } = require("../util/jwttoken");
userRoute.post("/upload/:id", upload.single("file"),verifyToken, uploadAvatar);

userRoute.post("/login", login);
userRoute.post("/register", register);
userRoute.get("/detail/:id", verifyToken,getDetailUserbyID);
userRoute.put("/:id", verifyToken,updateUser);

module.exports = userRoute;
