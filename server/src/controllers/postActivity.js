// Importa los módulos necesarios
const express = require("express");
const router = express.Router();
const { Activity, Country } = require("../db"); //  importar modelos

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

