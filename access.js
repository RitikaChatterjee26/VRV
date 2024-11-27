const express = require('express');
const auth = require('../middleware/auth');
const router = express.Router();

router.get('/public', (req, res) => {
    res.send('This is a public route');
});


router.get('/user', auth('user'), (req, res) => {
    res.send('Hello, User!');
});

router.get('/admin', auth('admin'), (req, res) => {
    res.send('Hello, Admin!');
});

module.exports = router;
