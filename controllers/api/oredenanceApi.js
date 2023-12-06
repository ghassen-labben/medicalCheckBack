const jwt = require('jsonwebtoken');
const Ordonnance = require('../../models/Ordonnance');

module.exports.getAllPrescriptions = (req, res) => {
    Ordonnance.find()
        .populate('doctor patient') // Populate the referenced doctor and patient details
        .then(prescriptions => res.json(prescriptions))
        .catch(err => res.status(400).json({ error: err.message }));
};

module.exports.getPrescriptionById = (req, res) => {
    Ordonnance.findById(req.params.id)
        .populate('doctor patient') // Populate the referenced doctor and patient details
        .then(prescription =>
            {
                console.log("salam" ,req.params.id);
                res.json(prescription)
            } )
        .catch(err => res.status(400).json({ error: err.message }));
};

module.exports.getPrescriptionByPatient= (req, res) => {
    Ordonnance.find({patient:req.params.id})
        .populate('doctor patient') // Populate the referenced doctor and patient details
        .then(prescription =>{
                console.log(prescription);
                
             res.json(prescription)
            })
        .catch(err => res.status(400).json({ error: err.message }));
}


module.exports.createPrescription = (req, res) => {
    console.log(req.body);
    const newPrescription = new Ordonnance({
        Date_prescription: req.body.prescriptionDate,
        medicaments: req.body.prescribedMedications,
        posologie: req.body.dosageInstructions,
        Duree: req.body.prescriptionDuration,
        Instructions: req.body.specialInstructions,
        doctor: req.body.doctor, // Assuming you send the doctor's ObjectId in the request body
        patient: req.body.patient, // Assuming you send the patient's ObjectId in the request body
    });

    newPrescription.save()
        .then(prescription => res.json(prescription))
        .catch(err => res.status(400).json({ error: err.message }));
};

module.exports.updatePrescriptionById = (req, res) => {
    Ordonnance.findByIdAndUpdate(req.params.id, req.body, { new: true })
        .then(updatedPrescription => res.json(updatedPrescription))
        .catch(err => res.status(400).json({ error: err.message }));
};

module.exports.deletePrescriptionById = (req, res) => {
    Ordonnance.findByIdAndRemove(req.params.id)
        .then(deletedPrescription => res.json(deletedPrescription))
        .catch(err => res.status(400).json({ error: err.message }));
};
