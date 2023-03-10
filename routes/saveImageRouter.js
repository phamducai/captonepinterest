const express = require("express");
const saveImageRoute = express.Router();
const { getImageByIDSave } = require("../controllers/saveImgaeController");

saveImageRoute.get("/getImageByIdSave/:id", getImageByIDSave);

module.exports = saveImageRoute;
