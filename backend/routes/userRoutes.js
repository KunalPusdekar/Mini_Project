const express = require('express');
const router = express.Router();
const combineUserData = require('../controllers/combineUserData');

// Define the route for combined user data
router.post('/combinedData', combineUserData);

module.exports = router;
