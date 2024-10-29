const express = require('express');
const codechefController = require('../controllers/codechefController');

const router = express.Router();

router.get('/:id', codechefController);

module.exports = router;
