
const path = require('path');

const express = require('express');

const classesController = require('../controllers/classes');
const isAuth = require('../middleware/is-auth');

const router = express.Router();

router.get('/classes', classesController.getClasses);

router.get('/classes/:productId', classesController.getProduct);

router.get('/booking-cart', isAuth, classesController.getCart);

router.post('/booking-cart', isAuth, classesController.postCart);

router.post('/cart-delete-item', isAuth, classesController.postCartDeleteProduct);

router.post('/create-order', isAuth, classesController.postOrder);

router.get('/bookings', isAuth, classesController.getOrders);



module.exports = router;
