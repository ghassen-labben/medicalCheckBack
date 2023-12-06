const mongoose = require('mongoose');
const multer = require('multer');
const path=require('path')
const AVATAR_PATH=path.join('/uploads/users/avatars')
const DoctorSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
    name: {
        type: String,
        required: true,
    },
    phone:{
        type:String,
        required:true
    },
    governorat:{
        type:String,
        required:false
    },
    latitude:{
        type:String,
        required:true
    },
    longitude:{
        type:String,
        required:true
    },
    avatar: {
        type: String,
    },
    specialization:{
        type:String,
        required:false
    },
    patients: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Patient'
    }],

    meetings: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Meeting'
    }],

    prescriptions: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Ordonnance'
    }],

    notifications: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Notification'
    }],
  
},{timestamps:true});

let storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, path.join(__dirname,'..',AVATAR_PATH))
    },
    filename: function (req, file, cb) {
      const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
      cb(null, file.fieldname + '-' + uniqueSuffix)
    }
  });

  const fileFilter = (req, file, cb) => {
    // Check if the file is an image
    if (file.mimetype.startsWith('image/')) {
      cb(null, true); // Accept the file
    } else {
       cb(new Error('File type not supported!'), false); // Reject the file
    }
  };
 
    
  DoctorSchema.statics.uploadedAvatar=multer({ storage: storage, fileFilter: fileFilter }).single('avatar')//single mean one file get upploaded
  DoctorSchema.statics.avatarPath=AVATAR_PATH;
const Doctor=mongoose.model('Doctor',DoctorSchema);

module.exports=Doctor;