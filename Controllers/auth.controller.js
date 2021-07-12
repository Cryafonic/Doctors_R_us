const Doctor = require('../Models/UserDoctor.model');
const Patient = require('../Models/UserPatient.model');
const { hash, compare } = require('bcryptjs');
const { createAccessToken, sendAccessToken } = require('../auth/token');

//  singing up a patient
module.exports.signupPatient = (req, res) => {
    const { email, password, name, surname} = req.body

    // check if all fields are filled in.
    console.log(email, password,name,surname);
    if (!email || !password || !name || !surname) {
        res.status(400).json({message: 'Please fill in all fields'})
    }
    
    Patient.findOne({email}).then( async (user) => {
        if (user) {
           return res.status(201).json({message: 'User already exists'})
        }

        const hashedPassword = await hash(password, 10);
        const newPatient = new Patient({
            email,
            password: hashedPassword,
            name,
            surname
        })

        newPatient.save()
        .then(() => res.json({message: 'registerd'}));
    }).catch(err => res.json(err));
};

// siging up a doctor
module.exports.signupDoctor = (req, res) => {
    const { email, password, name, surname} = req.body

    // check if all fields are filled in. doctors
    if (!email || !password || !name || !surname) {
        res.status(400).json({message: 'Please fill in all fields'})
    }

    Doctor.findOne({email}).then( async (user) => {
        if (user) {
            return res.status(201).json({message: 'Doctor already exists'})
        }

        const hashedPassword = await hash(password, 10);
        const newDoctor = new Doctor({
            email,
            password: hashedPassword,
            name,
            surname
        });

        newDoctor.save()
            .then(() => res.json({message: 'Registerd'}));
    }).catch(err => console.log(err));
};

// logging in.
module.exports.login = (req, res) => {
    const { email, password } = req.body
    console.log(email, password);
    Patient.findOne({email}).then(async (patient) => {
        if (patient) {
            const valid = await compare(password, patient.password);
            if (!valid) return res.json({message: 'Credentials invalid'});

            const accessToken = createAccessToken(patient._id);

            sendAccessToken(res, accessToken, patient._id, patient.role);
            return
        }

        Doctor.findOne({email}).then(async (doctor) => {
            if (doctor) {
                const valid = await compare(password, doctor.password);
                if (!valid) return res.json({message: 'Credentials invalid'});
    
                const accessToken = createAccessToken(doctor._id);
    
                sendAccessToken(res, accessToken, doctor._id, doctor.role);
                return
            }
            res.json({message: 'Credentials invalid'});
        });
    });
};