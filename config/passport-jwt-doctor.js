const passport = require('passport');
const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;
const Doctor = require('../models/Doctor');

const opts = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: 'medicalcheck',
};

passport.use('passport-jwt-doctor',
 new JwtStrategy(opts, (jwtPayload, done) => {
  Doctor.findById(jwtPayload._id)
    .then(doctor => {
      if (doctor) {
        return done(null, doctor);
      }
      return done(null, false);
    })
    .catch(err => {
      console.error(err);
      return done(err, false);
    });
}));

module.exports = passport;
