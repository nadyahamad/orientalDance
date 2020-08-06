const path = require('path');
const express = require('express');
const rootDir = require('../util/path');
const staticsControllers = require('../controllers/statics');
const router = express.Router();


router.get('/', staticsControllers.getIndex);
router.get('/landing', staticsControllers.getLanding);
router.get('/contact_us', staticsControllers.getContact);
router.get('/contact_us', staticsControllers.getContact);


module.exports = router;