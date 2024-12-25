const express = require('express');
const router = express.Router();
const patientControllers = require("../Controllers/patient");
const { route } = require('../Routes/testRoutes')


router.post('/post',patientControllers.postPatient);                       // Add a new patient
router.get('/get/:id',patientControllers.getPatientById);                  // Get a patient by ID
router.get('/getStatus/:statusFind',patientControllers.getPatientByStatus);    // Get patients by status
router.put('/:id',patientControllers.updatePatient);                       // Update a patient by ID
router.get('/:id/testDetails',patientControllers.getpatientTestDetails);   // Get patient's test details
router.delete('/:id', patientControllers.deletePatient);                    // Delete a patient by ID


module.exports = router;