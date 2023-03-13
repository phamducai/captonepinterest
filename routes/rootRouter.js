const express = require("express");

const rootRouter = express.Router();

const userRoute = require("./userRouter");
const saveImageRoute = require("./saveImageRouter");
const imageRoute = require("./imageRouter");
const commentRoute = require("./commentRouter");
// middleware của express
rootRouter.use("/users", userRoute);
rootRouter.use("/saveimage", saveImageRoute);
rootRouter.use("/image", imageRoute);
rootRouter.use("/comment", commentRoute);

module.exports = rootRouter;
