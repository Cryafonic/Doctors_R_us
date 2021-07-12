const router = require('express').Router();
const doctors = require('../Controllers/doctor.controller');

// routes for the doctors.
router.get('/doctors', doctors.getDoctor);

module.exports = router;