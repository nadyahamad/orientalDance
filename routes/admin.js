const path = require('path');
const express = require('express');
const adminController = require('../controllers/admin');
const isAuth = require('../middleware/is-auth');
const router = express.Router();



// /admin/add-class => GET
router.get('/add-class', isAuth, adminController.getAddClass);

// /admin/add-class => POST
router.post('/add-class', isAuth, adminController.postAddClass );

// /admin/classes-list => GET
router.get('/classes-list', isAuth, adminController.getClassesList);

// /admin/edit-class => GET
router.get('/edit-class/:productId', isAuth, adminController.getEditClass);

// /admin/edit-class => POST
router.post('/edit-class', isAuth, adminController.postEditClass);

// /admin/delete-class => POST
router.post('/delete-class', isAuth, adminController.postDeleteClass);



module.exports = router;

