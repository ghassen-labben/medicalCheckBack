const express=require('express');
const port=8000;
const app=express();  
const db=require('./config/mongoose');
const Doctor=require('./models/Doctor');
const Patient=require('./models/Patient');
const Meeting=require('./models/Meeting');
const Ordonnance=require('./models/Ordonnance'); 
const Notification=require('./models/Notification');
const session=require('express-session'); 
const cors=require('cors');
app.use(cors());
const passport = require('passport');
const bodyParser=require('body-parser');
const path=require('path');

// Other setup code...
// Initialize Passport
app.use(passport.initialize());
app.use(session({ secret: 'medicalcheck', resave: false, saveUninitialized: false }));
const passportJWTDoctor=require('./config/passport-jwt-doctor');
const passportJWTPatient=require('./config/passport-jwt-patient');
app.use(passport.session()); 

app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());
app.use('/uploads/users/avatars', express.static(path.join(__dirname, 'uploads/users/avatars')));

app.use('/',require('./routes/api'));
app.listen(port,function(err){
    if(err){
        console.log(`Error in running the server: ${err}`);
    }
    console.log(`Server is running on port: ${port}`);
}
);