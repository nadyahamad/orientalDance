
const path = require('path');

const express = require('express');

const classesController = require('../controllers/classes');

const router = express.Router();

router.get('/classes', classesController.getClasses);

router.get('/classes/:class_id', classesController.getClass);

router.get('/book-class', classesController.getBookClass);

router.post('/book-class',classesController.postBookClass);

router.get('/bookings', classesController.getBookings);

router.get('/booking-checkout', classesController.getBookingCheckout);

module.exports = router;
