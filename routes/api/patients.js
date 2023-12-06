const express = require('express');
const router = express.Router();
const passport = require('passport');
const patientController = require('../../controllers/api/patientApi');

router.get('/test', patientController.test);
router.post('/register', patientController.register);
router.post('/login', patientController.login);
router.get('/current', passport.authenticate('passport-jwt-patient', { session: false }), patientController.getCurrentPatient); 
router.post('/update/:id', patientController.update);

router.get('/', patientController.getAllPatients);
router.get('/:id', patientController.getPatientById);
router.get('/governorat/:governorat', patientController.getPatientByGovernorat);



module.exports = router;
