const Doctor = require('../Models/UserDoctor.model');

// fetch all doctors.
module.exports.getDoctor = (req, res) => {
    Doctor.find().then((doctors) => res.json(doctors));
};