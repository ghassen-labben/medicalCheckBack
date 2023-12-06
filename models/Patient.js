const mongoose = require('mongoose');
const multer = require('multer');
const path=require('path')
const AVATAR_PATH=path.join('/uploads/users/avatars')

const PatientSchema = new mongoose.Schema({
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
        required:false
    },
    governorat:{
        type:String,
        required:false
    },
    latitude:{
        type:String,
        required:false
    },
    longitude:{
        type:String,
        required:false
    },
    avatar: {
        type: String,
        required:true
    },

    gender:{
        type:String,
        required:false
    },
    notifications: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Notification',
    }],
   
}, { timestamps: true });
  
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
      
  PatientSchema.statics.uploadedAvatar=multer({ storage: storage, fileFilter: fileFilter }).single('avatar')//single mean one file get upploaded
  PatientSchema.statics.avatarPath=AVATAR_PATH;
const Patient = mongoose.model('Patient', PatientSchema);

module.exports = Patient;
