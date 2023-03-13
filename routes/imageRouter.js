const express = require("express");
const imageRoute = express.Router();
const { verifyToken } = require("../util/jwttoken");
const {
  getAllImages,
  getImageByName,
  getImageByID,
  getImageByUserID,
  deleteImageByID,
} = require("../controllers/imageController");

imageRoute.get("", verifyToken, getAllImages);

imageRoute.get("/:id",verifyToken, getImageByID);
imageRoute.get("/name/:name",verifyToken, getImageByName);
imageRoute.get("/getImageByUserID/:id",verifyToken, getImageByUserID);
imageRoute.delete("/:id",verifyToken,deleteImageByID);

module.exports = imageRoute;
