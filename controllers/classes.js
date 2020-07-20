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

exports.getClass = (req, res, next) => {
    const classId = req.params.classId;
    Product.findById(classId, product => {
        console.log(product);
    });
    res.redirect('/classes');
};


exports.getBookClass = (req, res, next) => {
    Product.fetchAll((products) => {
        res.render('classes/book-class', {
            path: '/book-class',
            title: 'Your booking',
        });
    });
};

exports.getBookingCheckout = (req, res, next) => {
    Product.fetchAll((products) => {
        res.render('classes/booking-checkout', {
            path: '/booking-checkout',
            title: 'Your booking Confirmation',
        });
    });
};


exports.getBookings = (req, res, next) => {
    Product.fetchAll((products) => {
        res.render('classes/bookings', {
            path: '/bookings',
            title: 'Your Bookings',
        });
    });
};
