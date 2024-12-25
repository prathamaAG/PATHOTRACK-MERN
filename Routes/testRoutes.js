const express = require('express');
const router = express.Router();
const testcontrollers = require("../Controllers/test");

// Define routes for test-related operations
router.post('/post', testcontrollers.postTest);              // Add a new test
router.get('/get', testcontrollers.getTest);                 // Get all tests
router.get('/getTest/:id', testcontrollers.getTestByid);     // Get a test by ID

module.exports = router;
