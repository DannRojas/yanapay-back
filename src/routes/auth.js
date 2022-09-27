const express = require("express");
const router = express.Router();
const {
  validatorRegister,
  validatorLogin,
} = require("../validators/auth.validator");
const { registerCtrl, loginCtrl } = require("../controllers/auth.controller");

//TODO: http://localhost:3000/api/auth/register
router.post("/register", validatorRegister, registerCtrl);

//TODO: http://localhost:3000/api/auth/login
router.post("/login", validatorLogin, loginCtrl);

module.exports = router;
