const { Router } = require("express");

const getCountries = require("../controllers/getCountries")
const getAllActivity = require("../controllers/getAllActivity");
const getCountryById = require("../controllers/getCountryById")
const getCountryByName = require("../controllers/getCountryByName")
const postActivity = require("../controllers/postActivity");

const router = Router();

router.get("/countries/name", getCountryByName);
router.get("/countries/:idPais" , getCountryById)
router.get("/countries" , getCountries )
router.get("/activities" , getAllActivity)
router.post("/activities" , postActivity)

module.exports = router;
