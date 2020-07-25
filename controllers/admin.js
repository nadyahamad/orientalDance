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
    const title = req.body.title;
    const imageUrl = req.body.imageUrl;
    const description = req.body.description;
    const studio_num = req.body.studio_num;
    const product = new Product(
      title, 
      imageUrl, 
      description, 
      studio_num, 
      null, 
      req.user._id
    );
    product
        .save()
        .then(result => {
            // console.log(result);
            console.log('Created Product');
            res.redirect('/admin/classes-list');
          })
          .catch(err => {
            console.log(err);
          });
};

exports.getClassesList = (req, res, next) => {
    Product.fetchAll()
      .then(products => {
        res.render('admin/classes-list', {
          prods: products,
            title: 'Admin Products',
          path: 'admin/classes-list'
        });
      })
      .catch(err => console.log(err));
};


exports.getEditClass = (req, res, next) => {
    const editMode = req.query.edit;
    if (!editMode) {
      return res.redirect('/');
    }
    const prodId = req.params.productId;
    Product.findById(prodId)
      // Product.findById(prodId)
      .then(product => {
        if (!product) {
          return res.redirect('/');
        }
        res.render('admin/edit-class', {
          title: 'Edit Class',
          path: 'admin/edit-class',
          editing: editMode,
          product: product
        });
      })
      .catch(err => console.log(err));
  };

  exports.postEditClass = (req, res, next) => {
    const prodId = req.body.productId;
    const updatedTitle = req.body.title;
    const updatedImageUrl = req.body.imageUrl;
    const updatedDesc = req.body.description;
    const updatedStudio = req.body.studio_num;
  
    const product = new Product(
      updatedTitle,
      updatedImageUrl,
      updatedDesc,
      updatedStudio,
      prodId
    );
    product
      .save()
      .then(result => {
        console.log('UPDATED PRODUCT!');
        res.redirect('/admin/classes-list');
      })
      .catch(err => console.log(err));
};
  


exports.postDeleteClass = (req, res, next) => {
    const prodId = req.body.productId;
    Product.deleteById(prodId)
    .then(() => {
      console.log('DESTROYED PRODUCT');
      res.redirect('/admin/classes-list');
    })
    .catch(err => console.log(err));
}; 

