const express = require("express");
const commentRoute = express.Router();
const { verifyToken } = require("../util/jwttoken");
const {
  getCommentByImageID,
  postComment,
} = require("../controllers/commentController");

commentRoute.get("/:id", verifyToken,getCommentByImageID);
commentRoute.post("", verifyToken,postComment);

module.exports = commentRoute;
