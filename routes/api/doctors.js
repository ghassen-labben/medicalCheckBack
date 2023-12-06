const express = require('express');
const router = express.Router();
const passport = require('passport');
const doctorController = require('../../controllers/api/doctorsApi');

router.get('/test', doctorController.test);
router.post('/register', doctorController.register);

router.post('/login', doctorController.login);
router.get('/current', passport.authenticate('passport-jwt-doctor', { session: false }), doctorController.getCurrentDoctor);
router.get('/', doctorController.getAllDoctors);
router.get('/:id', doctorController.getDoctorById);
router.get('/specialization/:specialization', doctorController.getDoctorBySpecialization); 
router.get('/governorat/:governorat', doctorController.getDoctorByGovernorat);
router.post('/update/:id', doctorController.update);

router.get('/getDoctorBySpecializationAndGovernorat/:governorat/:specialization', doctorController.getDoctorBySpecializationAndGovernorat);

module.exports = router;
