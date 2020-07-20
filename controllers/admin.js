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
    const class_name = req.body.class_name;
    const imageUrl = req.body.imageUrl;
    const description = req.body.description;
    const level = req.body.level;
    const studio_num = req.body.studio_num;
    const product = new Product(class_name, imageUrl, description, level, studio_num);
    product.save();
    res.redirect('/classes');
};

exports.getEditClass = (req, res, next) => {
    Product.fetchAll((products) => {
        res.render('admin/edit-class', {
            prods: products,
            path: '/admin/edit-class',
            title: 'Edit thi class',
        });
    });
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


