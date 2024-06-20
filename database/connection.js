const mongoose = require("mongoose");

const connection = async() => {

  try {
    await mongoose.connect("mongodb://localhost:27017/bd_latribu");
    console.log("Conectado correctamente a la BD: bd_latribu ");
  } catch (error) {
    console.log(error);
    throw new error("No se ha podido conectar a la base de datos");
  }
}

module.exports = connection;