const util = require("util");
const { PrismaClient } = require("@prisma/client");
const model = new PrismaClient();
const { errorCode, failCode, successCode } = require("../config/response");
const { createToken } = require("../util/jwttoken");
const bcrypt = require("bcrypt");
let fs = require("fs");
const readFileAsync = util.promisify(fs.readFile);
const unlinkAsync = util.promisify(fs.unlink);
const login = async (req, res) => {
  const { email, password } = req.body;
  try {
    let checkUser = await model.users.findUnique({
      where: { email },
    });
    console.log(checkUser)
    if (!!checkUser) {
      let checkPass = bcrypt.compareSync(password, checkUser.password);
      if (checkPass) {
        delete checkUser.avatar
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
  const { id } = req.params;
  try {
    const user = await model.users.findUnique({
      where: {
        id: +id,
      },
    });
    if (!!user) {
      return successCode(res, user, "successfully get detail user");
    } else {
      return failCode(res, user, "user not found");
    }
  } catch (error) {
    errorCode(res, "backend error");
  }
};

const updateUser = async (req, res) => {
  const { id } = req.params;
  try {
    const { email, password, name, age, avatar } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    const updateUser = await model.users.update({
      where: {
        id: +id,
      },
      data: {
        email: email,
        name: name,
        age: age,
        avatar: avatar,
        password: hashedPassword,
      },
    });
    delete updateUser.password;
    successCode(res, updateUser, "update user successfully");
  } catch (error) {
    const { code } = error;
    if (code === "P2025") {
      return errorCode(res, "user not found");
    }
    return errorCode(res, "update user failed");
  }
};
const uploadAvatar = async (req, res) => {
console.log(req.file)
    
  let { id } = req.params;
  console.log(id)
  try {
    const fileData = await readFileAsync(
      process.cwd() + "/public/img/" + req.file.filename
    );
    const fileName = `data:${req.file.mimetype};base64,${Buffer.from(
      fileData
    ).toString("base64")}`;

    // delete file server
    await unlinkAsync(process.cwd() + "/public/img/" + req.file.filename);

    const updateUser = await model.users.update({
      where: { id: +id },
      data: { avatar: fileName },
    });
    return successCode(res, updateUser, "update avatar successfully");
  } catch (error) {
    console.log(error)
    const { code } = error;
    if (code === "P2025") {
      return errorCode(res, "user not found");
    }
    errorCode(res, "backend error");
  }
};

module.exports = {
  login,
  register,
  getDetailUserbyID,
  updateUser,
  uploadAvatar,
};
