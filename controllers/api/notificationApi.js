const Notification = require('../../models/Notification');
const Doctor = require('../../models/Doctor'); // Import your Doctor model
const Patient = require('../../models/Patient'); // Import your Patient model

// Function to create a notification
module.exports.createNotification = async (doctor, patient, subject, content) => {
    console.log("salam")
    try {
        console.log("Creating notification...", doctor, patient, subject, content);
        const newNotification = new Notification({
            date_time: new Date(),
            subject,
            content,
            doctor,
            patient,
        });

        const savedNotification = await newNotification.save();
        console.log("Notification created:", savedNotification);
        return savedNotification;
    } catch (error) {
        console.error("Error creating notification:", error.message);
        throw error;
    }
};
module.exports.getNotificationsByUser = async (req, res) => {
    try {
        // Get user type from request
        const userType = req.params.userType;

        // Get user ID from request
        const userId = req.params.userId;
        console.log(userType, userId)
        if(userType === "Doctor"){
            const notifications = await Notification.find({ doctor: userId }).populate('patient');
            res.json(notifications);

        }else{

            const notifications = await Notification.find({ patient: userId }).populate('doctor'); 
            console.log(notifications)
            res.json(notifications);

        }
            

        // Get notifications by user ID and user type

        // Return notifications
    } catch (error) {
        console.error("Error getting notifications:", error.message);
        res.status(400).json({ error: error.message });
    }
}

