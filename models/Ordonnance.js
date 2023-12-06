const mongoose = require('mongoose');

const OrdonnanceSchema = new mongoose.Schema({
    Date_prescription: Date,
    medicaments: String,
    posologie: String,
    Duree: String,
    Instructions: String,
    doctor: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Doctor'
    },
    patient: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Patient'
    },
}, { timestamps: true });

const Ordonnance = mongoose.model('Ordonnance', OrdonnanceSchema);

module.exports = Ordonnance;
