
const passport = require('passport');
const jwt = require('jsonwebtoken');
const Doctor = require('../../models/Doctor');

module.exports.test = (req, res) => {
  res.json({ msg: 'Doctors API works' });
};
module.exports.getAllDoctors = (req, res) => {
    Doctor.find({}).populate('prescriptions').populate('patients')
        .then(doctors => res.json(doctors))
        .catch(err => res.status(400).json({ error: err.message }));
    }
module.exports.getDoctorById = (req, res) => {
    Doctor.findById(req.params.id)
        .then(doctor => res.json(doctor))
        .catch(err => res.status(400).json({ error: err.message }));
    }

    
module.exports.getDoctorBySpecialization = (req, res) => { 
    Doctor.find({specialization:req.params.specialization})
        .then(doctor => res.json(doctor))
        .catch(err => res.status(400).json({ error: err.message }));
    }
module.exports.getDoctorByGovernorat = (req, res) => {
    Doctor.find({governorat:req.params.governorat})
        .then(doctor => res.json(doctor))
        .catch(err => res.status(400).json({ error: err.message }));
    } 
    module.exports.getDoctorBySpecializationAndGovernorat = (req, res) => { 
      Doctor.find({specialization:req.params.specialization,governorat:req.params.governorat}) 
          .then(doctor => res.json(doctor))
          .catch(err => res.status(400).json({ error: err.message }));
      }
      
module.exports.getDoctorByLocation = (req, res) => {
    Doctor.find({latitude:req.params.latitude,longitude:req.params.longitude})
        .then(doctor => res.json(doctor))
        .catch(err => res.status(400).json({ error: err.message }));
    }

    module.exports.register = (req, res) => {
      console.log(req.body);
    
      const newDoctor = new Doctor({
        email: req.body.email,
        password: req.body.password,
        name: req.body.name,
        phone: req.body.phone,
        latitude: req.body.latitude,
        longitude: req.body.longitude,
        governorat: req.body.governorat, 
        specialization: req.body.specialization,
      });
      newDoctor.save().then(doctor => res.json(doctor)).catch(err => res.status(400).json({ error: err.message }));
    

        
    };
    
    
  module.exports.update=async (req,res)=>{
    try {
      var user = await Doctor.findById(req.params.id);
      console.log(user);
      Doctor.uploadedAvatar(req, res, (err) => {
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

module.exports.login = (req, res) => {
    const email = req.body.email;
    const password = req.body.password;
  
    Doctor.findOne({ email })
      .then(doctor => {
        if (!doctor) {
          return res.status(404).json({ email: 'Doctor not found' });
        }
  
        // Check password
        if (password === doctor.password) {
          // Doctor matched
  
          // Create a JWT token
          const token = jwt.sign({ _id: doctor._id }, 'medicalcheck', { expiresIn: '1d' });
  
          // Send the token in the response or store it in a secure HTTP-only cookie
          res.cookie('token', token, { httpOnly: true, maxAge: 86400000 }); // 1 day in milliseconds
  
          // Return success response with the token
          return res.json({ success: true, token });
        } else {
          return res.status(400).json({ password: 'Password incorrect' });
        }
      });
  };

module.exports.getCurrentDoctor = (req, res) => {
  // This route should be protected with passport.authenticate('jwt', { session: false })
  // Your existing logic to return the current doctor
 return res.json({
    id: req.user.id,
    email: req.user.email,
    name: req.user.name,
    specialization: req.user.specialization,
    phone:req.user.phone,
    governorat:req.user.governorat,
    latitude:req.user.latitude,
    longitude:req.user.longitude,
    patients:req.user.patients,
    avatar:req.user.avatar,
  });
};
