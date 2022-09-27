const { check } = require("express-validator");
const validateResults = require("../utils/handleValidator");

const validatorCreateExpense = [
  check("name")
    .exists()
    .withMessage("Nombre vacio")
    .notEmpty()
    .withMessage("Nombre del item es requerido")
    .isLength({ min: 2, max: 50 })
    .withMessage("Nombre de item, mínimo 2 caracteres, máximo 50 caracteres"),
  check("type").exists().withMessage("Tipo de item vacio"),
  check("unitPrice")
    .exists()
    .withMessage("Precio unitario vacio")
    .isNumeric()
    .withMessage("Precio unitario inválido"),
  check("units")
    .exists()
    .withMessage("Unidades vacio")
    .isNumeric()
    .withMessage("Las unidades tienen un formato inválido"),
  check("totalBuy")
    .exists()
    .withMessage("Total pago vacio")
    .isNumeric()
    .withMessage("Total pago inválido"),
  check("date")
    .exists()
    .withMessage("Fecha pago vacio")
    .toDate()
    .withMessage("Fecha de pago inválido"),
  // check("userId")
  //   .exists()
  //   .withMessage("Id foráneo vacío")
  //   .isMongoId()
  //   .withMessage("Id foráneo inválido"),
  (req, res, next) => {
    return validateResults(req, res, next);
  },
];

const validatorGetExpense = [
  check("id")
    .exists()
    .notEmpty()
    .withMessage("No se especificó el Id del ingreso")
    .isMongoId()
    .withMessage("Id no tiene un formato válido"),
  // check("id").exists().notEmpty().isMongoId(),
  (req, res, next) => {
    return validateResults(req, res, next);
  },
];

module.exports = { validatorCreateExpense, validatorGetExpense };
