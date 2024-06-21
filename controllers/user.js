import User from "../models/user.js";
import bcrypt from "bcrypt";

// Acciones de prueba
export const testUser = (req, res) => {
  return res.status(200).send({
    message: "Mensaje enviado desde el controlador: user.js"
  });
};

// Registro de los usuarios
export const register = async (req, res) => {
  try {
    // Recoger datos de la petición
    const params = req.body;

    // Validaciones: verificar que los datos obligatorios estén presentes
    if (!params.name?.trim() || !params.last_name?.trim() || !params.email?.trim() || !params.password?.trim() || !params.nick?.trim()) {
      return res.status(400).json({
        status: "error",
        message: "Faltan datos por enviar"
      });
    }

    // Crear una instancia del modelo User con los datos validados
    const user_to_save = new User(params);

    // Buscar si ya existe un usuario con el mismo email o nick
    const existingUser = await User.findOne({
      $or: [
        { email: user_to_save.email },
        { nick: user_to_save.nick }
      ]
    });

    // Si encuentra un usuario, devuelve un mensaje indicando que ya existe
    if (existingUser) {
      return res.status(200).json({
        status: "error",
        message: "El usuario ya existe"
      });
    }

    // Cifrar contraseñas
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(user_to_save.password, salt);
    user_to_save.password = hashedPassword;

    // Guardar el usuario en la BD
    await user_to_save.save();

    // Devolver respuesta exitosa y el usuario registrado
    return res.status(201).json({
      status: "created",
      message: "Usuario registrado con éxito",
      user: user_to_save
    });

  } catch (error) {
    console.error("Error en registro de usuarios:", error);
    return res.status(500).json({
      status: "error",
      message: "Error en registro de usuarios"
    });
  }
};
