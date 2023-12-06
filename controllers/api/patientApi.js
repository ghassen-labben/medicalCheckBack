
const passport = require('passport');
const jwt = require('jsonwebtoken');
const Patient = require('../../models/Patient');
const mongoose = require('mongoose'); 
const fs = require('fs');
const path = require('path');
module.exports.test = (req, res) => {
  res.json({ msg: 'Patient API works' });
};
module.exports.getAllPatients = (req, res) => {
    Patient.find().populate('notifications')
        .then(patients => res.json(patients))
        .catch(err => res.status(400).json({ error: err.message }));
    }
module.exports.getPatientById = (req, res) => {
    Patient.findById(req.params.id).populate('notifications')
        .then(patient => res.json(patient))
        .catch(err => res.status(400).json({ error: err.message }));
    }
module.exports.getPatientByGovernorat = (req, res) => {
    Patient.find({governorat:req.params.governorat})
        .then(patient => res.json(patient))
        .catch(err => res.status(400).json({ error: err.message }));
    }
    

module.exports.register = (req, res) => {
  // ... your existing registration logic
  const newPatient = new Patient({
    email: req.body.email,
    password: req.body.password,
    name: req.body.name,
    gender: req.body.gender,
    phone: req.body.phone,
    governorat: req.body.governorat,
    latitude: req.body.latitude,
    longitude: req.body.longitude
  });
  newPatient.save()
    .then(patient => res.json(patient))
    .catch(err => res.status(400).json({ error: err.message }));
};
module.exports.login = (req, res) => {
    const email = req.body.email;
    const password = req.body.password;
  
    Patient.findOne({ email })
      .then(patient => {
        if (!patient) {
          return res.status(404).json({ email: 'Patient not found' });
        }
  
        // Check password
        if (password === patient.password) {
          // Doctor matched
  
          // Create a JWT token
          const token = jwt.sign({ _id: patient._id }, 'medicalcheck', { expiresIn: '1d' });
  
          // Send the token in the response or store it in a secure HTTP-only cookie
          res.cookie('token', token, { httpOnly: true, maxAge: 86400000 }); // 1 day in milliseconds
  
          // Return success response with the token
          return res.json({ success: true, token });
        } else {
          return res.status(400).json({ password: 'Password incorrect' });
        }
      });
  };

  module.exports.update=async (req,res)=>{
            try {
              var user = await Patient.findById(req.params.id);
              console.log(user);
              Patient.uploadedAvatar(req, res, (err) => {
                if (err) {
                  if (err instanceof multer.MulterError) {
                    console.log('Multer error:', err);
  
                  } else {
                    console.log('Unknown error during upload:', err);
  
                  }
  
                }
                console.log(req.body);  
                if(req.body.name)
                user.name = req.body.name;
              if(req.body.email)
                user.email = req.body.email;
        
                if (req.file) {
                 
                  user.avatar =  req.file.filename; 
                  console.log("success");
                  console.log(user.avatar);
                user.save().then(user => { 
                  console.log(user); 
                }).catch(err => { 
                  console.log(err); 
                });
                }
        
                return res.json({ user });
              });
            } catch (error) {
              console.log(error);
              return res.json({ error })
            }
          } 
        
        
  module.exports.getCurrentPatient = (req, res) => {
            // This route should be protected with passport.authenticate('jwt', { session: false })
            // Your existing logic to return the current patient
        
            // Modify the response to include notifications with doctor details
            return res.json({
                id: req.user.id,
                email: req.user.email,
                name: req.user.name,
                phone: req.user.phone,
                governorat: req.user.governorat,
                latitude: req.user.latitude,
                longitude: req.user.longitude,
                avatar: req.user.avatar,
                // Include the notifications field with the relevant details
                notifications: req.user.notifications.map(notification => ({
                    date_time: notification.date_time,
                    subject: notification.subject,
                    content: notification.content, 
                    doctor: {
                        // Include the details you want to send about the doctor
                        // Assuming the Doctor model has fields like name, email, etc.
                        name: notification.doctor.name,
                        email: notification.doctor.email,
                        // Add other fields as needed
                    },
                })),
            });
          };
              

