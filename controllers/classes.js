const Product = require('../models/product');

// /products/classes => GET
exports.getClasses = (req, res, next) => {
    Product.fetchAll((products) => {
        res.render('classes/classes', {
            prods: products,
            title: 'classes',
            path: '/classes',
        });
    });
};

exports.getClassDetails = (req, res, next) => {
    Product.fetchAll((products) => {
        res.render('classes/class-details', {
            path: '/class-details',
            title: 'Class Details',
        });
    });
};

exports.getBookClass = (req, res, next) => {
    Product.fetchAll((products) => {
        res.render('classes/book-class', {
            path: '/book-class',
            title: 'Your booking',
        });
    });
};

exports.getBooking = (req, res, next) => {
    Product.fetchAll((products) => {
        res.render('classes/booking', {
            path: '/booking',
            title: 'Your booking Confirmation',
        });
    });
};

