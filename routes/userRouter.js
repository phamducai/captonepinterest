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
userRoute.post("/upload/:id", upload.single("file"), uploadAvatar);

userRoute.post("/login", login);
userRoute.post("/register", register);
userRoute.get("/detail/:id", getDetailUserbyID);
userRoute.put("/:id", updateUser);

module.exports = userRoute;
