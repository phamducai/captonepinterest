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
const getImageByUserID = async (req, res) => {
  const { id } = req.params;
  try {
    const result = await model.image.findMany({
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

const deleteImageByID = async (req, res) => {
  try {
    const { id } = req.params;
    try {
      const result2 = await model.image_save.delete({
        where: {
          image_id: +id,
        },
      });
    } catch (error) {
    } finally {
      try {
        const result1 = await model.comment.deleteMany({
          where: {
            image_id: +id,
          },
        });
      } catch (error) {
      } finally {
        const result3 = await model.image.delete({
          where: {
            id: +id,
          },
        });
        successCode(res, result3, "delete image successfully");
      }
    }
  } catch (error) {
    console.log(error);
    const { code } = error;
    if (code === "P2025") {
      errorCode(res, "image to delete does not exist");
    }
  }
};
module.exports = {
  getAllImages,
  getImageByID,
  getImageByName,
  getImageByUserID,
  deleteImageByID,
};
