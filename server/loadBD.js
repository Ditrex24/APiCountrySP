require("dotenv").config();

const axios = require("axios");
const { Country } = require("./src/db");

const loadBD = async () => {
  try {
    const response = await axios.get("http://localhost:5000/countries");
    const countries = response.data;

    const countriesToCreate = countries.map((country) => ({
      countryid: country.cca3,
      name: country.name.common,
      image: country.flags.svg,
      continent: country.continents[0],
      capital: Array.isArray(country.capital) ? "" : country.capital,
      subregion: country.subregion,
      area: country.area,
      population: country.population,
    }));

    await Country.bulkCreate(countriesToCreate);

    console.log("Países guardados en la base de datos");
  } catch (error) {
    console.error(
      "Error al obtener los países desde la API:",
      error
    );
  }
};

module.exports = { loadBD };

