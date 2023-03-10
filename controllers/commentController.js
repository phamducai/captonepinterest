const { PrismaClient } = require("@prisma/client");
const model = new PrismaClient();
const { errorCode, failCode, successCode } = require("../config/response");
const getCommentByImageID = async (req, res) => {
  const { id } = req.params;
  try {
    const result = await model.comment.findMany({
      where: {
        image_id: +id,
      },
    });
    successCode(res, result, "success message");
  } catch (error) {
    errorCode(res, "backend error");
  }
};

const postComment = async (req, res) => {
  const now = new Date();
  now.setHours(now.getHours() + 7);
  try {
    const { user_id, image_id, content } = req.body;
    const user = await model.users.findUnique({
      where: {
        id: +user_id,
      },
    });

    if (!user) {
      return errorCode(res, "user not found");
    }
    const image = await model.image.findUnique({
      where: {
        id: +image_id,
      },
    });
    if (!image) {
      return errorCode(res, "image not found");
    }

    const postimage = await model.comment.create({
      data: {
        user_id,
        image_id,
        content,
        comment_date: now,
      },
    });

    res.status(200).send(postimage);
  } catch (error) {
    const { code } = error;
    if (code === "P2003") {
      return res.status(404).send("user or image not found");
    }
    return errorCode(res, "backend error");
  }
};

module.exports = {
  getCommentByImageID,
  postComment,
};
