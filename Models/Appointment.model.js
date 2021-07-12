const mongoose = require('mongoose');

const AppointmentSchema = mongoose.Schema({
    userId: {
        type: String,
        required: false
    },
    doctor: {
        type: String,
        required: true
    },
    symptoms: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    diagnosis: {
        type: String,
        required: false
    },
    dateCreated: {
        type: Date,
        default: Date.now,
        required: false
    },
    dateScheduled: {
        type: String,
        required: false
    }
});

module.exports = mongoose.model('appointments', AppointmentSchema);