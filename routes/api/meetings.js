const express = require('express');
const router = express.Router();
const meetingController = require('../../controllers/api/meetingApi');
const passport = require('passport');

router.get('/', meetingController.getAllMeetings);
router.get('/:id',passport.authenticate(['passport-jwt-doctor', 'passport-jwt-patient'], { session: false }), meetingController.getMeetingById);
router.get('/patient/:patient',passport.authenticate('passport-jwt-patient',{session:false}) ,meetingController.getMeetingsByPatient);
router.get('/doctor/:doctor', passport.authenticate('passport-jwt-doctor',{session:false}),meetingController.getMeetingsByDoctor);
router.post('/', 
    passport.authenticate(['passport-jwt-doctor', 'passport-jwt-patient'], { session: false }),
    meetingController.createMeeting
);

router.put('/:id',passport.authenticate(['passport-jwt-doctor', 'passport-jwt-patient'], { session: false }), meetingController.updateMeetingById);
router.delete('/:id',passport.authenticate(['passport-jwt-doctor', 'passport-jwt-patient'], { session: false }), meetingController.deleteMeetingById);

module.exports = router;
