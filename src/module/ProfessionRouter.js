const express = require("express")
const router = express.Router();


const [ProfessionalLogin, ProfessionalSignup] = require("./Controller/ProfessionalAccess")

router.post("/signup", ProfessionalSignup)
router.post("/login", ProfessionalLogin)

module.exports = router;