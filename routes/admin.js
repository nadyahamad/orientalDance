const path = require('path');

const express = require('express');

const rootDir = require('../util/path');

const router = express.Router();

const products = [];

// /admin/add-class => GET
router.get('/add-class', (req, res, next) => {
  res.render('add-class', {
    title: 'Add Class',
    path: '/admin/add-class',
    formsCSS: true,
    productCSS: true,
    activeAddProduct: true
  });
});

// /admin/add-product => POST
router.post('/add-class', (req, res, next) => {
  products.push({ title: req.body.title });
  res.redirect('/classes');
});

exports.routes = router;
exports.products = products;
