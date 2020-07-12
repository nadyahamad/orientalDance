
const path = require('path');

const express = require('express');

const rootDir = require('../util/path');
const adminData = require('./admin');

const router = express.Router();

router.get('/classes', (req, res, next) => {
  const products = adminData.products;
  res.render('classes', {
    prods: products,
    title: 'classes',
    path: '/classes',
    hasProducts: products.length > 0,
    activeProduct: true,
    productCSS: true
  });
});

module.exports = router;
