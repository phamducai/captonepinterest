const express = require("express");
const imageRoute = express.Router();
const { verifyToken } = require("../util/jwttoken");
const {
  getAllImages,
  getImageByName,
  getImageByID,
} = require("../controllers/imageController");

imageRoute.get("", verifyToken, getAllImages);
imageRoute.get("/:id", getImageByID);
imageRoute.get("/name/:name", getImageByName);

module.exports = imageRoute;
