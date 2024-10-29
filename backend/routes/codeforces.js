// routes/codeforcesRouter.js

const express = require('express');
const codeforcesController = require('../controllers/codeforcesController');

const router = express.Router();

// Define route for fetching Codeforces data
router.get('/:username', codeforcesController);

module.exports = router;
