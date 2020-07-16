
const path = require('path');

const express = require('express');

const classesController = require('../controllers/classes');

const router = express.Router();

router.get('/classes', classesController.getClasses);

router.get('/class-details', classesController.getClassDetails);

router.get('/book-class', classesController.getBookClass);

router.get('/booking', classesController.getBooking);

module.exports = router;
