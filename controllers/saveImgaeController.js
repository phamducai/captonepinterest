const { PrismaClient } = require("@prisma/client");
const model = new PrismaClient();
const { errorCode, failCode, successCode } = require("../config/response");
const getImageByIDSave = async (req, res) => {
  const { id } = req.params;
  try {
    const result = await model.image_save.findUnique({
      where: {
        image_id: +id,
      },
    });
    if (result) {
      return successCode(res, result, "success get image ");
    } else {
      return failCode(res, result, "image not found");
    }
  } catch (error) {
    return errorCode(res, "backend error");
  }
};
const getImageByUserIDSave = async (req, res) => {
  const { id } = req.params;
  try {
    const result = await model.image_save.findMany({
      where: {
        user_id: +id,
      },
    });

    if (result.length > 0) {
      return successCode(res, result, "success get user save image");
    } else {
      return failCode(res, result, "user id not found");
    }
  } catch (error) {
    return errorCode(res, "backend error");
  }
};

module.exports = {
  getImageByIDSave,
  getImageByUserIDSave,
};
