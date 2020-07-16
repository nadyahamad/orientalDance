const Product = require('../models/product');

// /admin/add-class => GET
exports.getAddClass = (req, res, next) => {
    res.render('admin/add-class', {
        title: 'Add Class',
        path: '/admin/add-class',
        formsCSS: true,
        productCSS: true,
        activeAddProduct: true
    });
};

exports.postAddClass = (req, res, next) => {
    const title = req.body.title;
    const imageUrl = req.body.imageUrl;
    const price = req.body.price;
    const description = req.body.description;
    const product = new Product(title, imageUrl, description, price);
    product.save();
    res.redirect('/classes');
};


exports.getClassesList = (req, res, next) => {
    Product.fetchAll((products) => {
        res.render('admin/classes-list', {
            prods: products,
            path: '/classes-list',
            title: 'Admin classes',
        });
    });
};