const mongoose = require("mongoose");

const dbConnect = () => {
  const DB_URI = process.env.DB_URI;
  mongoose.connect(
    DB_URI,
    {
      useNewURLParser: true,
      UseUnifiedTopology: true,
    },
    (err, res) => {
      if (!err) {
        console.log("***** CONEXIÓN CORRECTA ****");
      } else {
        console.log("**** ERROR DE CONEXIÓN ****");
      }
    }
  );
};

module.exports = dbConnect;
