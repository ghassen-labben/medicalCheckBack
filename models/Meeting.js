const mongoose = require('mongoose');

const MeetingSchema = new mongoose.Schema({
    date_time: {
        type: Date,
        required: true
    },
    purpose: {
        type: String,
        required: true
    },
    doctor: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Doctor'
    },
    patient: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Patient'
    },
    status: {
        type: String,
        enum: ['pending', 'accepted', 'refused'],
        default: 'pending'
    },
    jitsiRoom: {
        type: String,
        required: true,
        unique: true,
    },
}, { timestamps: true });

const Meeting = mongoose.model('Meeting', MeetingSchema);

module.exports = Meeting;
