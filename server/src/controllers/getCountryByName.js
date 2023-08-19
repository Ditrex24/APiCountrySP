const { Op } = require("sequelize");
const { Country } = require("../db");

const getCountryByName = async (req , res) => {
    try {
        const { name } = req.query;
    
        
        const countries = await Country.findAll({
          where: {
            name: {
              [Op.iLike]: `%${name}%`, 
            },
          },
        });
    
        if (countries.length === 0) {
          return res.status(404).json({ message: 'No se encontraron países con el nombre proporcionado.' });
        }
    
        return res.status(200).json(countries);
      } catch (error) {
        return res.status(500).json({ message: 'Error al obtener países por nombre', error: error.message });
      }
}

module.exports = getCountryByName