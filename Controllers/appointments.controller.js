const isAuth  = require("../auth/isAuth");
const Appointments = require("../Models/Appointment.model");
const Doctor = require("../Models/UserDoctor.model");

// handles fetchs appointments for patients 
module.exports.getAppointmentsByPatient = (req, res) => {
  try {
    const userId = isAuth(req);
    if (userId !== null) {
      Appointments.find({ userId }).then((response) => res.json(response));
    }
  } catch (err) {
    console.log(err);
  }
};

// handle appointments for doctors
module.exports.getAppointmentsByDoctor = (req, res) => {
  const userId = isAuth(req);
  if (userId !== null) {
    Doctor.findById({ _id: userId }).then(doc => {
        const doctor = doc.name + " " + doc.surname;
        Appointments.find({ doctor }).then((response) => {
          console.log(response);
          res.json(response)
        });
    })
  }
};

// handle appointments for admins.
module.exports.getAppointmentByAdmin = (req, res) => {
  try {
    const userId = isAuth(req);
    if (userId !== null) {
      Appointments.find().then((allAppointments) => res.json(allAppointments));
    }
  } catch (err) {
    console.log(err);
  }
};

// deletes appointmenst out of the system.
module.exports.deleteAppointment = (req, res) => {
  Appointments.findByIdAndDelete(req.params.id)
    .then(() => res.json({ message: "Appointment deleted" }))
    .catch((err) => console.log(err));
};

// insters the diagnosis in the selected appointment.
module.exports.addDiagnosis = (req, res) => {
  const userId = isAuth(req);
  if ( userId !== null ) {
    Appointments.findById(req.params.id).then((diagnosis) => {
      console.log(diagnosis);

        diagnosis.doctor = diagnosis.doctor
        diagnosis.symptoms = diagnosis.symptoms
        diagnosis.description =  diagnosis.description
        diagnosis.diagnosis = req.body.diagnosis

        diagnosis.save()
        .then(() => res.json({message: "Diagnosis added"}))
        .catch((err) => console.log(err));
    });
  }
};


module.exports.addDateScheduled = (req, res) => {
  const userId = isAuth(req);
  if ( userId !== null ) {
    Appointments.findById(req.params.id).then((date) => {
      console.log(date);

        date.dateScheduled = req.body.dateScheduled

        date.save()
        .then(() => res.json({message: "Date scheduled added"}))
        .catch((err) => console.log(err));
    });
  }
};

// adding a appointment to the database
module.exports.addAppointment = (req, res) => {
    const doctor = req.body.doctor;
    const symptoms = req.body.symptoms;
    const description = req.body.description;
  const userId = isAuth(req);
  console.log(userId);
  if (userId !== null) {
    const newAppointment = new Appointments({
        userId,
        doctor,
        symptoms,
        description
    });

    newAppointment.save()
      .then(() => res.json({ message: "Appointment added" }))
      .catch((err) => console.log(err));
  }
};

// fetching an appointment by id.
module.exports.getAppointmentById = (req, res) => {
  console.log(req.params.id)
  Appointments.findById(req.params.id)
    .then((appointment) => res.json(appointment))
    .catch((err) => console.log(err));
};

// update the appointment per id.
module.exports.updateAppointmentById = (req, res) => {
  Appointments.findById(req.params.id).then((appointment) => {
    appointment.doctor = req.body.doctor;
    appointment.symptoms = req.body.symptoms;
    appointment.description = req.body.description;

    appointment
      .save()
      .then(() => res.json("Appointment updated"))
      .catch((err) => console.log(err));
  });
};
