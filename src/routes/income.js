const express = require("express");
const router = express.Router();
const {
  getItems,
  getItem,
  createItem,
  updateItem,
  deleteItem,
} = require("../controllers/income.controller");
const {
  validatorCreateIncome,
  validatorGetIncome,
} = require("../validators/income.validator");
const authMiddleware = require("../midlewares/session");

//Obtener una lista
router.get("/", authMiddleware, getItems);

//Obtener un detalle
router.get("/:id", [authMiddleware, validatorGetIncome], getItem);

//Insertar un registro
router.post("/", [authMiddleware, validatorCreateIncome], createItem);

//Actualizar un registro
router.put(
  "/:id",
  [authMiddleware, validatorGetIncome, validatorCreateIncome],
  updateItem
);

//Eliminar un registro
router.delete("/:id", [authMiddleware, validatorGetIncome], deleteItem);

module.exports = router;
