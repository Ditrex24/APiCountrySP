const { Activity , Country } = require("../db");

const getAllActivity = async (req , res) => {
    try {
       const allCtivities = await Activity.findAll({
            include: Country,
       })

        res.status(200).json(allCtivities)
    } catch (error) {
      return res.status(500).send({ message: error.message });  
    }
}

module.exports = getAllActivity