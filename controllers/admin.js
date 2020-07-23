const Product = require('../models/product');

// /admin/add-class => GET
exports.getAddClass = (req, res, next) => {
    res.render('admin/edit-class', {
        title: 'Add Class',
        path: '/admin/add-class',
        editing: false
    });
};

exports.postAddClass = (req, res, next) => {
    const class_name = req.body.class_name;
    const imageUrl = req.body.imageUrl;
    const description = req.body.description;
    const studio_num = req.body.studio_num;
    const product = new Product(null, class_name, imageUrl, description, studio_num);
    product.save();
    res.redirect('/classes');
};

exports.getEditClass = (req, res, next) => {
    const editMode = req.query.edit;
    if (!editMode) {
        return res.redirect('/');
    }
    const cId = req.params.classId;
    Product.findById(cId, product => {
    if (!product) {
        return res.redirect('/');
    }
    res.render('admin/edit-class', {
        title: 'Edit Class',
        path: '/admin/edit-class',
        editing: editMode,
        product: product
        });
    });
};

exports.postEditClass = (req, res, next) => {
    const cId = req.body.class_id;
    const updatedName = req.body.class_name;
    const updatedImageUrl = req.body.imageUrl;
    const updatedDesc = req.body.description;
    const updatedStudio_num = req.body.studio_num;
    const updatedClass = new Product (
        cId,
        updatedName,
         updatedImageUrl,
        updatedDesc,
        updatedStudio_num
    );
    updatedClass.save();
    res.redirect('/admin/classes-list');
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


exports.postDeleteClass = (req, res, next) => {
    const cId = req.body.class_id;
    Product.deleteById(cId);
    res.redirect('/admin/classes-list');
};


