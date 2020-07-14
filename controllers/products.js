const Product = require('../models/product');

// /admin/add-class => GET
exports.getAddClass = (req, res, next) => {
    res.render('add-class', {
        title: 'Add Class',
        path: '/admin/add-class',
        formsCSS: true,
        productCSS: true,
        activeAddProduct: true
    });
};

exports.postAddClass = (req, res, next) => {
    const product = new Product(req.body.title);
    product.save();
    res.redirect('/classes');
};


exports.getClasses = (req, res, next) => {
    Product.fetchAll((products) => {
        res.render('classes', {
            prods: products,
            title: 'classes',
            path: '/classes',
            hasProducts: products.length > 0,
            activeProduct: true,
            productCSS: true
        });
    });
};