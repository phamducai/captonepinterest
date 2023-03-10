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
imageRoute.get("/:id", getImageByID);
imageRoute.get("/name/:name", getImageByName);
imageRoute.get("/getImageByUserID/:id", getImageByUserID);
imageRoute.delete("/:id", deleteImageByID);

module.exports = imageRoute;
