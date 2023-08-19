const { Country } = require("../db");
const getCountries = async (req , res) => {
    try {
        const countries = await Country.findAll();
    
        return res.status(200).json(countries);
      } catch (error) {
        return res.status(500).send({ message: error.message });
      }
}

module.exports = getCountries