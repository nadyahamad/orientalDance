const path = require('path');

const express = require('express');

const rootDir = require('../util/path');

const router = express.Router();


router.get('/sign-in', (req, res, next) => {
    res.render('sign-in', {title: 'Sign in'});
});


module.exports = router;