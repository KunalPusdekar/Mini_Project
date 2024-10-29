const express = require('express');
const gfgController = require('../controllers/gfgController');

const router = express.Router();

router.get('/:id', gfgController);

module.exports = router;
