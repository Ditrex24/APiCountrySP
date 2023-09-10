const { Country, Activity } = require("../db");

const getCountryById = async (req, res) => {
  try {
    // Obtén el parámetro `idPais` de la URL.
    const { idPais } = req.params;

    // Utiliza `Country.findByPk` para buscar un país específico por su ID.
    const country = await Country.findByPk(idPais, {
      // Incluye las actividades turísticas asociadas a este país.
      include: {
        model: Activity,
        attributes: ['name', 'difficulty', 'duration', 'season'],
      },
    });

    // Si no se encuentra el país, responde con un estado HTTP 404 y un mensaje.
    if (!country) {
      return res.status(404).json({ message: 'País no encontrado' });
    }

    // Si se encuentra el país, responde con un estado HTTP 200 y el objeto del país.
    return res.status(200).json(country);
  } catch (error) {
    // En caso de error, responde con un estado HTTP 500 y un mensaje de error.
    return res.status(500).json({ message: 'Error al obtener el país', error: error.message });
  }
};

module.exports = getCountryById;
