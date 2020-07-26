
const path = require('path');

const express = require('express');

const classesController = require('../controllers/classes');

const router = express.Router();

router.get('/classes', classesController.getClasses);

router.get('/classes/:productId', classesController.getProduct);

router.get('/booking-cart', classesController.getCart);

router.post('/booking-cart',classesController.postCart);

router.post('/cart-delete-item', classesController.postCartDeleteProduct);

router.post('/create-order', classesController.postOrder);

router.get('/bookings', classesController.getOrders);



module.exports = router;
