const express = require('express');
const router = express.Router();
const passport = require('passport');
const OrdonnanceController = require('../../controllers/api/oredenanceApi');

router.get('/', OrdonnanceController.getAllPrescriptions);
router.post('/',passport.authenticate('passport-jwt-doctor',{session:false}), OrdonnanceController.createPrescription);
router.get('/patient/:id',passport.authenticate('passport-jwt-patient',{session:false}), OrdonnanceController.getPrescriptionByPatient);


module.exports = router;
