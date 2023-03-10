const express = require("express");
const commentRoute = express.Router();

const {
  getCommentByImageID,
  postComment,
} = require("../controllers/commentController");

commentRoute.get("/:id", getCommentByImageID);
commentRoute.post("", postComment);

module.exports = commentRoute;
