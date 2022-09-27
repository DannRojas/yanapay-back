const { encrypt, compare } = require("../utils/handlePassword");
const { usersModel } = require("../models");
const { tokenSign } = require("../utils/handlejwt");
const { handleHttpError } = require("../utils/handleError");
const { matchedData } = require("express-validator");

const registerCtrl = async (req, res) => {
  try {
    req = matchedData(req);
    const passwordHash = await encrypt(req.password);
    const body = { ...req, password: passwordHash };
    const dataUser = await usersModel.create(body);
    console.log(dataUser);
    dataUser.set("password", undefined, { strict: false });
    const data = {
      token: await tokenSign(dataUser),
      user: dataUser,
    };
    res.send(data);
  } catch (error) {
    console.log(error.message);
    handleHttpError(res, "A ocurrido un error al registar el usuario", 500);
  }
};

const loginCtrl = async (req, res) => {
  try {
    req = matchedData(req);
    const user = await usersModel
      .findOne({ email: req.email })
      .select("password names firstName lastName email business");
    if (!user) {
      handleHttpError(res, "El usuario no existe", 404);
      return;
    }
    const hashPassword = user.password;
    const check = await compare(req.password, hashPassword);
    if (!check) {
      handleHttpError(res, "Contraseña inválida", 401);
      return;
    }
    user.set("password", undefined, { strict: false });
    const data = {
      token: await tokenSign(user),
      user,
    };
    res.send(data);
  } catch (error) {
    console.log(error);
    handleHttpError(res, "Ha ocurrido un error al iniciar sesión", 500);
  }
};

module.exports = { registerCtrl, loginCtrl };
