const path = require('path');

const express = require('express');

const adminController = require('../controllers/admin');

const router = express.Router();


// /admin/add-class => GET
router.get('/add-class', adminController.getAddClass);

// /admin/classes-list => GET
router.get('/classes-list',  adminController.getClassesList);


// /admin/add-class => POST
router.post('/add-class',adminController.postAddClass );

module.exports = router;

