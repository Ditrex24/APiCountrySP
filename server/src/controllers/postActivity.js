const { Activity , Country } = require('../db');

const postActivity = async (req, res) => {

    const { name, difficulty, duration, season , countries } = req.body;
    try {
    const activityCreada = await Activity.create({
      name,
      difficulty,
      duration,
      season,
    });
  console.log("creado")
  const countriesEncontrados = await Country.findAll({
    where: {
        countryid: countries,
    },
  });

  // emparejar los paises encontrados con la actividad creada
  await activityCreada.setCountries(countriesEncontrados);

    

    return res.status(200).json(activityCreada);
  } catch (error) {
    return res.status(500).send({ message: error.message });
  }
};

module.exports = postActivity;