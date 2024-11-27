const express = require('express');
const auth = require('../middleware/auth');
const router = express.Router();

// Public Route (Accessible by anyone)
router.get('/public', (req, res) => {
    res.send('This is a public route');
});

// User-only Route
router.get('/user', auth('user'), (req, res) => {
    res.send('Hello, User!');
});

// Admin-only Route
router.get('/admin', auth('admin'), (req, res) => {
    res.send('Hello, Admin!');
});

module.exports = router;
