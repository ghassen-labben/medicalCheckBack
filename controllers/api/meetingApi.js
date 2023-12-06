const jwt = require('jsonwebtoken');
const Meeting = require('../../models/Meeting');
const notificationController = require("./notificationApi")// Check the correct path
const { v4: uuidv4 } = require('uuid');

// Get all meetings
module.exports.getAllMeetings = (req, res) => {
    Meeting.find()
        .populate('doctor patient')
        .then(meetings => res.json(meetings))
        .catch(err => res.status(400).json({ error: err.message }));
};

// Get a meeting by ID
module.exports.getMeetingById = (req, res) => {
    Meeting.findById(req.params.id)
        .populate('doctor patient')
        .then(meeting => res.json(meeting))
        .catch(err => res.status(400).json({ error: err.message }));
};

// Get meetings by patient ID
module.exports.getMeetingsByPatient = (req, res) => {
    Meeting.find({ patient: req.params.patient })
        .populate('doctor patient')
        .then(meetings => res.json(meetings))
        .catch(err => res.status(400).json({ error: err.message }));
};

// Get meetings by doctor ID
module.exports.getMeetingsByDoctor = (req, res) => { 
    Meeting.find({ doctor: req.params.doctor })
        .populate('doctor patient')
        .then(meetings => res.json(meetings))
        .catch(err => res.status(400).json({ error: err.message }));
};

// Create a new meeting

// Create a new meeting
module.exports.createMeeting = async (req, res) => {
    try {
        // Create a new meeting
        const newMeeting = new Meeting({
            date_time: req.body.date_time,
            purpose: req.body.purpose,
            doctor: req.body.doctor,
            patient: req.body.patient,
            status: req.body.status || 'pending',
            jitsiRoom: uuidv4(),
        });

        // Save the new meeting
        const savedMeeting = await newMeeting.save();

        // Send notifications to doctor and patient
        const doctorNotification = await notificationController.createNotification(
            savedMeeting.doctor,
            savedMeeting.patient,

            'Meeting Notification',
            'New meeting scheduled.'
        );
       

        console.log(doctorNotification);
        res.json({ meeting: savedMeeting, doctorNotification });
    } catch (err) {
        console.error("Error creating meeting:", err.message);
        res.status(400).json({ error: err.message });
    }
};


// Update a meeting by ID
// Update a meeting by ID
module.exports.updateMeetingById = async (req, res) => {
    const { id } = req.params;
    const { status } = req.body;

    // Validate that the provided status is one of the allowed values
    if (!['pending', 'accepted', 'refused'].includes(status)) {
        return res.status(400).json({ error: 'Invalid status value' });
    }

    try {
        // Update the meeting status
        const updatedMeeting = await Meeting.findByIdAndUpdate(id, { status }, { new: true });

        if (!updatedMeeting) {
            return res.status(404).json({ error: 'Meeting not found' });
        }

        // Send notifications to doctor and patient on status update
        const notificationText = `Meeting status updated to ${status}.`;
        const doctorNotification = await notificationController.createNotification(
            updatedMeeting.doctor,
            updatedMeeting.patient,
            'Meeting Status Update',
            notificationText
        );

        console.log(doctorNotification);
        res.json({ updatedMeeting, doctorNotification });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// Delete a meeting by ID
module.exports.deleteMeetingById = (req, res) => {
    // Check if the user making the request is the doctor or patient associated with the meeting
    const userId = req.user._id; // Assuming you have the user ID in the request (you may need to adjust this based on your authentication setup)
    
    Meeting.findById(req.params.id)
        .then(meeting => {
            if (!meeting) {
                return res.status(404).json({ error: 'Meeting not found' });
            }

            // Check if the user is the doctor or patient associated with the meeting
            if (userId.toString() !== meeting.doctor.toString() && userId.toString() !== meeting.patient.toString()) {
                return res.status(403).json({ error: 'Unauthorized access' });
            }

            // Delete the meeting
            Meeting.findByIdAndRemove(req.params.id)
                .then(deletedMeeting => res.json(deletedMeeting))
                .catch(err => res.status(400).json({ error: err.message }));
        })
        .catch(err => res.status(400).json({ error: err.message }));
};
