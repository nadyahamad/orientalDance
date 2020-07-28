const path = require('path');
const express = require('express');
const rootDir = require('../util/path');
const staticsControllers = require('../controllers/statics');
const router = express.Router();


router.get('/', staticsControllers.getIndex);


module.exports = router;