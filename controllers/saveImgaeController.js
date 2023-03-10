const { PrismaClient } = require("@prisma/client");
const model = new PrismaClient();

const getImageByIDSave = async (req, res) => {
  const { id } = req.params;
  console.log(id);
  const result = await model.imge_save.findMany({
    where: {
      image_id: +id,
    },
  });
  res.status(200).send(result);
};
module.exports = {
  getImageByIDSave,
};
