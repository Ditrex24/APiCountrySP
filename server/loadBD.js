// Importa la librería dotenv para cargar variables de entorno desde un archivo .env
require("dotenv").config();

// Importa la librería Axios para realizar solicitudes HTTP
const axios = require("axios");

// Importa el modelo "Country" desde el archivo "./src/db"
const { Country } = require("./src/db");

// Define una función asincrónica llamada "loadBD" que carga datos de países y los guarda en la base de datos
const loadBD = async () => {
  try {
    // Realiza una solicitud GET a la URL de la API local que proporciona datos de países
    const response = await axios.get("http://localhost:5000/countries");
    
    // Obtiene los datos de países de la respuesta
    const countries = response.data;

    // Mapea los datos de países para que coincidan con el modelo de la base de datos y crea un arreglo "countriesToCreate"
    const countriesToCreate = countries.map((country) => ({
      countryid: country.cca3, // Código de tres letras del país
      name: country.name.common, // Nombre común del país
      image: country.flags.svg, // URL de la bandera del país en formato SVG
      continent: country.continents[0], // Continente al que pertenece el país
      capital: country.capital?.[0] || "No tiene capital", // Capital del país (si existe, de lo contrario, se establece como "No tiene capital")
      subregion: country.subregion, // Subregión del país
      area: country.area, // Área del país
      population: country.population, // Población del país
    }));

    // Utiliza el método "bulkCreate" de Sequelize para crear registros de países en la base de datos
    await Country.bulkCreate(countriesToCreate);

    // Imprime un mensaje en la consola para indicar que los países se han guardado en la base de datos
    console.log("Países guardados en la base de datos");
  } catch (error) {
    // Si se produce un error al obtener los datos de países desde la API, imprime un mensaje de error en la consola
    console.error(
      "Error al obtener los países desde la API:",
      error
    );
  }
};

// Exporta la función "loadBD" para que pueda ser utilizada desde otros módulos
module.exports = { loadBD };
