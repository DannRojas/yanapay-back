const { incomesModel } = require("../models");
const { handleHttpError } = require("../utils/handleError");
const { matchedData } = require("express-validator");
const { verifyToken } = require("../utils/handlejwt");

const getDataToken = async (req) => {
  const token = req.headers.authorization.split(" ").pop();
  const dataToken = await verifyToken(token);
  return dataToken;
};

const getItems = async (req, res) => {
  try {
    const dataToken = await getDataToken(req);
    const data = await incomesModel.find({ userId: dataToken._id });
    // console.log(data);
    res.send(data);
  } catch (error) {
    console.log(error);
    handleHttpError(res, "Error obteniendo las ventas", 500);
  }
};

const getItem = async (req, res) => {
  try {
    const dataToken = await getDataToken(req);
    const request = matchedData(req);
    const { id } = request;
    const data = await incomesModel.findOne({ _id: id });
    if (data.userId === dataToken._id) res.send(data);
    else
      handleHttpError(
        res,
        "No tiene autorización para solicitar la información",
        401
      );
  } catch (error) {
    console.log(error);
    handleHttpError(res, "Error obteniendo la venta", 500);
  }
};

const createItem = async (req, res) => {
  try {
    const dataToken = await getDataToken(req);
    const request = matchedData(req);
    request.userId = dataToken._id;
    const data = await incomesModel.create(request);
    res.send(data);
  } catch (error) {
    console.log(error);
    handleHttpError(res, "Error al guardar la venta", 500);
  }
};

const updateItem = async (req, res) => {
  try {
    const { id, ...body } = matchedData(req);
    const data = await incomesModel.findByIdAndUpdate(id, body, {
      new: true,
    });
    res.send(data);
  } catch (error) {
    console.log(error);
    handleHttpError(res, "Error modificando la venta", 500);
  }
};

const deleteItem = async (req, res) => {
  try {
    req = matchedData(req);
    const { id } = req;
    const data = await incomesModel.deleteOne({ _id: id });
    res.send(data);
  } catch (error) {
    console.log(error);
    handleHttpError(res, "Error eliminando la venta", 500);
  }
};

module.exports = { getItems, getItem, createItem, updateItem, deleteItem };
