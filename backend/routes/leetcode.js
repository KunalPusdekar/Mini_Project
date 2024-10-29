const express = require('express');
const leetcodeController = require('../controllers/leetcodeController');

const router = express.Router();

router.get('/', (req, res) => {
    res.send(`<b>API URL:</b>/<b style="color:crimson;">yourLeetcodeUsername</b>`);
});

router.get('/:id', leetcodeController);

module.exports = router;
