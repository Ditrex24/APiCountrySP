const { Country } = require("../db");
const { Op} = require("sequelize")

const getCountriesByName = async (req, res) => {
  try {
    // Obtiene el valor del query "name" de la URL (nombre del país a buscar).
    const { name } = req.query;

    // Utiliza una consulta SQL para buscar países que coincidan con el nombre,
    // independientemente de mayúsculas o minúsculas.
    const countries = await Country.findAll({
      where: {
        name: {
          // Realiza una búsqueda por fragmento de texto, no sensible a mayúsculas/minúsculas.
          [Op.iLike]: `%${name}%`,
        },
      },
    });

    // Si no se encuentran países, responde con un estado HTTP 404 y un mensaje.
    if (countries.length === 0) {
      return res.status(404).json({ message: 'No se encontraron países con ese nombre' });
    }

    // Si se encuentran países, responde con un estado HTTP 200 y un arreglo de países.
    return res.status(200).json(countries);
  } catch (error) {
    // En caso de error, responde con un estado HTTP 500 y un mensaje de error.
    return res.status(500).json({ message: 'Error al buscar países por nombre', error: error.message });
  }
};

module.exports = getCountriesByName;
