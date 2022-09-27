const { handleHttpError } = require("../utils/handleError");
const { verifyToken } = require("../utils/handlejwt");
const { usersModel } = require("../models");

const authMiddleware = async (req, res, next) => {
  try {
    if (!req.headers.authorization) {
      handleHttpError(res, "No tiene token de autorización", 401);
      return;
    }
    const token = req.headers.authorization.split(" ").pop();
    // console.log(token);
    const dataToken = await verifyToken(token);

    if (!dataToken) {
      handleHttpError(res, "Token inválido", 401);
      return;
    }

    const query = {
      _id: dataToken._id,
    };
    const user = await usersModel.findOne(query);
    req.user = user;
    next();
  } catch (error) {
    handleHttpError(res, "No tiene una session activa", 401);
  }
};

module.exports = authMiddleware;
