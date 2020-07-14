const path = require('path');

const express = require('express');

const productsController = require('../controllers/products');

const router = express.Router();


// /admin/add-class => GET
router.get('/add-class', productsController.getAddClass);

// /admin/add-class => POST
router.post('/add-class',productsController.postAddClass );

module.exports = router;

