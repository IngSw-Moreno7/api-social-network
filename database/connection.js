import { connect } from "mongoose";
import dotenv from "dotenv";

const connection = async() => {

  try {

    await connect("mongodb://localhost:27017/bd_latribu");
    console.log("Conectado correctamente a la BD: bd_latribu");

  } catch (error) {
    console.error("Error al conectar a la base de datos", error);
    throw new Error("¡No se ha podido conectar a la base de datos!");
  }
}

export default connection;