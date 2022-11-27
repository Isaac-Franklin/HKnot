const express = require("express");
const router = express.Router();
const { patientSignup, patientLogin } = require("./Controller/PatientAccess");

router.post("/signup", patientSignup);
router.post("/login", patientLogin);

module.exports = router;
