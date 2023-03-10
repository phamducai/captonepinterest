const { PrismaClient } = require("@prisma/client");
const { errorCode, failCode, successCode } = require("../config/response");
const model = new PrismaClient();

const getAllImages = async (req, res) => {
  try {
    const getAllImage = await model.image.findMany();
    return successCode(res, getAllImage, "Get all images successfully");
  } catch (error) {
    return errorCode(res, "Backend error");
  }
};

const getImageByID = async (req, res) => {
  const { id } = req.params;
  try {
    const image = await model.image.findUnique({
      where: {
        id: +id,
      },
      include: {
        users: true,
      },
    });
    delete image.user_id;

    return successCode(res, image, "getImageByID successfully");
  } catch (error) {
    return error(res, "backend error");
  }
};

const getImageByName = async (req, res) => {
  const { name } = req.params;
  try {
    const image = await model.image.findMany({
      where: {
        image_name: {
          contains: name,
        },
      },
    });
    return successCode(res, image, "search successfully");
  } catch (error) {
    return error(res, "backend error");
  }
};

module.exports = {
  getAllImages,
  getImageByID,
  getImageByName,
};
