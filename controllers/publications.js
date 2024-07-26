import Publication from "../models/publication.js"

// Acciones de prueba
export const testPublication = (req, res) => {
  return res.status(200).send({
    message: "Mensaje enviado desde el controlador: publications.js"
  });
}

// Método para hacer una publicación
export const savePublication = async (req, res) => {
  
  try {

    // Obtener datos del body
    const params = req.body;

    // Verificar que llegue desde el body el parámetro text con su información
    if (!params.text){
      return res.status(400).send({
        status: "error",
        message: "Debes enviar el texto de la publicación"
      });
    }

    // Crear el objeto del modelo
    let newPublication = new Publication(params);

    // Agregar la información del usuario autenticado al objeto de la nueva publicación
    newPublication.user_id = req.user.userId;

    // Guardar la nueva publicación en la BD
    const publicationStored = await newPublication.save();

    // Verificar si se guardó la publicación en la BD (si existe publicationStored)
    if (!publicationStored){
      return res.status(500).send({
        status: "error",
        message: "No se ha guardado la publicación"
      });
    }

    // Devolver respuesta exitosa 
    return res.status(200).send({
      status: "success",
      message: "¡Publicación creada con éxito!",
      publicationStored
    });

  } catch (error) {
    console.log("Error al crear la publicación:", error);
    return res.status(500).send({
      status: "error",
      message: "Error al crear la publicación"
    });
  }
}

// Método para mostrar la publicación
export const showPublication = async (req, res) => {

  try {

    // Obtener el id de la publicación de la url
    const publicationId = req.params.id;

    // Buscar la publicación por id desde la BD
    const publicationStored = await Publication.findById(publicationId).populate('user_id', 'name last_name');

     // Verificar si se encontró la publicación
     if (!publicationStored) {
      return res.status(500).send({
        status: "error",
        message: "No existe la publicación"
      });
    }

    // Devolver respuesta exitosa 
    return res.status(200).send({
      status: "success",
      message: "Publicación encontrada",
      publication: publicationStored
    });

  } catch (error) {
    console.log("Error al mostrar la publicación:", error);
    return res.status(500).send({
      status: "error",
      message: "Error al mostrar la publicación"
    });
    
  }
}

// Método para eliminar una publicación