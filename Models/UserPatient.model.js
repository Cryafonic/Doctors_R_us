const mongoose = require('mongoose');
const { isEmail } = require('validator');

const UserPatientSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    surname: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: [true, 'Please enter an email'],
        unique: true,
        lowercase: true,
        validate: [isEmail, 'Please enter a valid email address']
    },
    password: {
        type: String,
        required: [true, 'Please enter a valid password'],
        minlength: [6, 'Minimum password length should be 6 characters']
    },
    role: {
        type: String,
        required: false,
        default: "patient"
    },
    registerDate: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('Patients', UserPatientSchema);