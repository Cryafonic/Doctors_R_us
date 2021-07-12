const appointments = require('../Controllers/appointments.controller');
const router = require('express').Router();

// Routes for the appointments 
router.post("/patient/appointments", appointments.getAppointmentsByPatient);
router.post("/doctor/appointments", appointments.getAppointmentsByDoctor);
router.post("/admin/appointments", appointments.getAppointmentByAdmin);
router.delete("/delete/:id", appointments.deleteAppointment);
router.post("/add", appointments.addAppointment);
router.post("/update/:id", appointments.updateAppointmentById);
router.get("/get/:id", appointments.getAppointmentById);
router.post("/diagnosis/:id", appointments.addDiagnosis);
router.post("/dateScheduled/:id", appointments.addDateScheduled);

module.exports = router;