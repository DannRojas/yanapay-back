const { check } = require("express-validator");
const userModel = require("../models/user.model");
const validateResults = require("../utils/handleValidator");

const validatorRegister = [
  check("names")
    .exists()
    .withMessage("Nombre de usuario vacio")
    .notEmpty()
    .withMessage("Nombre de usuario requerido")
    .isLength({ min: 2, max: 30 })
    .withMessage(
      "Nombre de usuario, mínimo 2 caracteres, máximo 30 caracteres"
    ),
  check("firstName").exists().withMessage("Apellido paterno vacio"),
  check("lastName").exists().withMessage("Apellido materno vacio"),
  check("email")
    .exists()
    .withMessage("Email vacio")
    .notEmpty()
    .withMessage("Email requerido")
    .isEmail()
    .withMessage("Formato de email inválido")
    .custom((value) => {
      return userModel.findOne({ email: value }).then((user) => {
        if (user) {
          return Promise.reject("Email ya registrado en el sistema");
        }
      });
    }),
  check("password")
    .exists()
    .withMessage("Contraseña de usuario vacia")
    .notEmpty()
    .withMessage("Contraseña de usuario requerida")
    .isLength({ min: 8, max: 15 })
    .withMessage("Contraseña, mínimo 8 caracteres, máximo 15 caracteres"),
  check("business")
    .exists()
    .withMessage("Nombre de empresa o negocio vacio")
    .notEmpty()
    .withMessage("Nombre de empresa o negocio requerido")
    .isLength({ min: 3, max: 30 })
    .withMessage(
      "Nombre de empresa o negocio, mínimo 8 caracteres, máximo 15 caracteres"
    ),
  (req, res, next) => {
    return validateResults(req, res, next);
  },
];

const validatorLogin = [
  check("email")
    .exists()
    .notEmpty()
    .withMessage("Email requerido")
    .isEmail()
    .withMessage("Formato de email inválido"),
  check("password")
    .exists()
    .notEmpty()
    .withMessage("Contraseña de usuario requerida")
    .isLength({ min: 8, max: 15 })
    .withMessage("Contraseña, mínimo 8 caracteres, máximo 15 caracteres"),
  (req, res, next) => {
    return validateResults(req, res, next);
  },
];

module.exports = { validatorRegister, validatorLogin };
