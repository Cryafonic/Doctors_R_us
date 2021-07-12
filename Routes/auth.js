const router  =  require('express').Router();
const authController = require('../Controllers/auth.controller');

// routes for the authentication
router.post('/patient/register', authController.signupPatient);
router.post('/doctor/register', authController.signupDoctor);
router.post('/login', authController.login);

module.exports = router;