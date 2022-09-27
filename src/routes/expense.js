const express = require("express");
const router = express.Router();
const {
  getItems,
  getItem,
  createItem,
  updateItem,
  deleteItem,
} = require("../controllers/expense.controller");
const {
  validatorCreateExpense,
  validatorGetExpense,
} = require("../validators/expense.validator");
const authMiddleware = require("../midlewares/session");

//Obtener una lista
router.get("/", authMiddleware, getItems);

//Obtener un detalle
router.get("/:id", [authMiddleware, validatorGetExpense], getItem);

//Insertar un registro
router.post("/", [authMiddleware, validatorCreateExpense], createItem);

//Actualizar un registro
router.put(
  "/:id",
  [authMiddleware, validatorGetExpense, validatorCreateExpense],
  updateItem
);

//Eliminar un registro
router.delete("/:id", [authMiddleware, validatorGetExpense], deleteItem);

module.exports = router;
