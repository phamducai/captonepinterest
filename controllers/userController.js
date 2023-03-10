const { PrismaClient } = require("@prisma/client");
const model = new PrismaClient();
const { errorCode, failCode, successCode } = require("../config/response");
const { createToken } = require("../util/jwttoken");
const bcrypt = require("bcrypt");

const login = async (req, res) => {
  const { email, password } = req.body;
  try {
    // const result = await prisma.image.findMany({
    //   select: {
    //     id: true,
    //     user_id: true,
    //     image_name: true,
    //     users: {
    //       select: {
    //         email: true,
    //       },
    //     },
    //   },
    //   where: {
    //     users: {
    //       id: {
    //         equals: image.user_id,
    //       },
    //     },
    //   },
    // });

    let checkUser = await model.users.findUnique({
      where: { email },
    });
    if (!!checkUser) {
      let checkPass = bcrypt.compareSync(password, checkUser.password);
      if (checkPass) {
        let token = createToken(checkUser);
        return successCode(res, token, "Login successfully completed");
      } else {
        return errorCode(res, "email or password is incorrect");
      }
    }
    return errorCode(res, "email or password is incorrect");
  } catch (error) {
    return errorCode(res, "backend error");
  }
};

const register = async (req, res) => {
  const { email, password, name, age, avatar } = req.body;
  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await model.users.create({
      data: {
        email,
        password: hashedPassword,
        name,
        age,
        avatar,
      },
    });
    return successCode(res, user, "successfully registered");
  } catch (error) {
    const { code } = error;
    if (code === "P2002") {
      return errorCode(res, "email exsisted ");
    }
    return new Error("registration failed");
  }
};

const getDetailUserbyID = async (req, res) => {
  res.send("detailUser success");
};

module.exports = {
  login,
  register,
  getDetailUserbyID,
};
