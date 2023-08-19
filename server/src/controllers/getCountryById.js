const { Country, Activity } = require("../db");

const getCountryById = async (req , res) => {
    try {
        const { idPais } = req.params;
    
        
        const country = await Country.findByPk(idPais, {
          include: {
            model: Activity,
            attributes: ['name', 'difficulty', 'duration', 'season'],
          },
        });
    
        if (!country) {
          return res.status(404).json({ message: 'País no encontrado' });
        }
    
        return res.status(200).json(country);
      } catch (error) {
        return res.status(500).json({ message: 'Error al obtener el país', error: error.message });
      }
    };


module.exports = getCountryById