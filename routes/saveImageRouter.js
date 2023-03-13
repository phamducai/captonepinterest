const express = require("express");
const saveImageRoute = express.Router();
const {
  getImageByIDSave,
  getImageByUserIDSave,
} = require("../controllers/saveImgaeController");
const { verifyToken } = require("../util/jwttoken");

saveImageRoute.get("/getImageByIdSave/:id", verifyToken,getImageByIDSave);
saveImageRoute.get("/getImageByUserIdSave/:id",verifyToken, getImageByUserIDSave);

module.exports = saveImageRoute;
