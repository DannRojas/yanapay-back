const express = require("express");
const fs = require("fs");
const router = express.Router();

const PATH_ROUTES = __dirname; // Dirección actual del directorio

const removeExtension = (fileName) => {
  return fileName.split(".").shift(); // Extrae el nombre del archivo sin la extensión
};

const a = fs.readdirSync(PATH_ROUTES).filter((file) => {
  const name = removeExtension(file);
  if (name !== "index") {
    console.log(name);
    router.use(`/${name}`, require(`./${file}`));
    // console.log(`/${name}`);
  }
});

module.exports = router;
