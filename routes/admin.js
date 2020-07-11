const express = require('express');

const rootDir = require('../util/path');

const router = express.Router();

router.use('/add-class', (req, res, next) => {
    res.sendFile(path.join(rootDir, 'views', 'admin.html'));
});

router.post('/add-class', (req, res, next) => {
    console.log(req.body);
    res.redirect("/");
});

module.exports = router;