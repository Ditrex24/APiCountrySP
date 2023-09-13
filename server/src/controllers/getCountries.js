const { Country } = require("../db");

const getCountries = async (req, res) => {
  try {
    // Utiliza el modelo `Country` de Sequelize para buscar todos los países en la base de datos.
    const countries = await Country.findAll();

    // Devuelve una respuesta JSON con el arreglo de objetos de países.
    return res.status(200).json(countries);
  } catch (error) {
    // En caso de error, devuelve una respuesta de error con un mensaje.
    return res.status(500).send({ message: error.message });
  }
};

module.exports = getCountries;


