const express = require("express");
const saveImageRoute = express.Router();
const {
  getImageByIDSave,
  getImageByUserIDSave,
} = require("../controllers/saveImgaeController");

saveImageRoute.get("/getImageByIdSave/:id", getImageByIDSave);
saveImageRoute.get("/getImageByUserIdSave/:id", getImageByUserIDSave);

module.exports = saveImageRoute;
