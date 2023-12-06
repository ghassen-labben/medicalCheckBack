const passport = require('passport');
const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;
const Patient = require('../models/Patient');

const opts = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: 'medicalcheck',
};

passport.use('passport-jwt-patient',
 new JwtStrategy(opts, (jwtPayload, done) => {
    Patient.findById(jwtPayload._id)
    .then(patient => {
      if (patient) {
        return done(null, patient);
      }
      return done(null, false);
    })
    .catch(err => {
      console.error(err);
      return done(err, false);
    });
}));

module.exports = passport;
