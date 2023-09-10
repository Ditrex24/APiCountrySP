// Importa los módulos necesarios
const express = require("express");
const router = express.Router();
const { Activity, Country } = require("../db"); // Asegúrate de importar tus modelos

// Ruta POST para crear una actividad turística y relacionarla con países
router.post("/activities", async (req, res) => {
  const { name, difficulty, duration, season, countries } = req.body;

  try {
    if (!name || !difficulty || !duration || !season || !countries) {
      return res.status(400).json({ message: "Falta información requerida" });
    }

    // Crea la actividad turística en la base de datos
    const activity = await Activity.create({
      name,
      difficulty,
      duration,
      season,
    });

    // Busca los países relacionados con los nombres proporcionados
    const associatedCountries = await Country.findAll({
      where: {
        countryid: countries,
      },
    });

    // Asocia los países a la actividad
    if (associatedCountries.length > 0) {
      await activity.setCountries(associatedCountries);
    }

    return res.status(201).json(activity);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
});

module.exports = router;


// const { Activity, Country } = require('../db');

// const postActivity = async (req, res) => {
//   // Extrae los datos necesarios del cuerpo de la solicitud (req.body).
//   const { name, difficulty, duration, season, countries } = req.body;
  
//   try {
//     // Crea una nueva actividad turística en la base de datos.
//     const activityCreada = await Activity.create({
//       name,
//       difficulty,
//       duration,
//       season,
//     });

//     // Busca los países relacionados con los IDs proporcionados en la solicitud.
//     const countriesEncontrados = await Country.findAll({
//       where: {
//         countryid: countries,
//       },
//     });

//     // Establece la relación entre la actividad creada y los países encontrados.
//     await activityCreada.setCountries(countriesEncontrados);

//     // Responde con un estado HTTP 200 y la actividad turística creada.
//     return res.status(200).json(activityCreada);
//   } catch (error) {
//     // En caso de error, responde con un estado HTTP 500 y un mensaje de error.
//     return res.status(500).send({ message: error.message });
//   }
// };

// module.exports = postActivity;
