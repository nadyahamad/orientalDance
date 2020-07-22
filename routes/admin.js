const path = require('path');

const express = require('express');

const adminController = require('../controllers/admin');

const router = express.Router();


// /admin/add-class => GET
router.get('/add-class', adminController.getAddClass);


// /admin/add-class => POST
router.post('/add-class',adminController.postAddClass );


// /admin/edit-class => GET
router.get('/edit-class/:classId', adminController.getEditClass);

// /admin/edit-class => POST
router.post('/edit-class', adminController.postEditClass);

// /admin/classes-list => GET
router.get('/classes-list',  adminController.getClassesList);

// /admin/delete-class => POST
router.post('/delete-class', adminController.postDeleteClass);

module.exports = router;

