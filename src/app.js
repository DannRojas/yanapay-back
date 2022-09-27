require("dotenv").config();
const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
const dbConnectNoSql = require("./config/mongo");
const app = express();
// const morganBody = require("morgan-body");

app.use(cors());
app.use(express.json());
app.use(morgan("dev"));
// app.use(express.static(`${__dirname}/storage`));

const port = process.env.PORT || 3000;

app.use("/api", require("./routes"));
app.get("/", (req, res) => {
  res.send({
    author: "Dann R.",
    Project: "Proyecto Yanapay-Net",
    version: "1.0",
    description:
      "Proyecto Backend de un sistema de inventarios simple en NodeJS",
  });
});

app.listen(port, () => {
  console.log("La aplicación está lista en el puerto:", port);
});

dbConnectNoSql();
