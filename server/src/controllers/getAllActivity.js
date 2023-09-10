const { Activity, Country } = require("../db");

const getAllActivity = async (req, res) => {
  try {
    // Utiliza el método `Activity.findAll` para obtener todas las actividades turísticas.
    const allActivities = await Activity.findAll({
      // Incluye los países relacionados con cada actividad en la respuesta.
      include: Country,
    });

    // Responde con un estado HTTP 200 y la lista de todas las actividades turísticas.
    res.status(200).json(allActivities);
  } catch (error) {
    // En caso de error, responde con un estado HTTP 500 y un mensaje de error.
    return res.status(500).send({ message: error.message });
  }
};

module.exports = getAllActivity;
