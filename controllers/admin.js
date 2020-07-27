const Product = require('../models/product');

// /admin/add-class => GET
exports.getAddClass = (req, res, next) => {
    res.render('admin/edit-class', {
        title: 'Add Class',
        path: '/admin/add-class',
        editing: false
        //isAuthenticated: req.isLoggedIn
    });
};

exports.postAddClass = (req, res, next) => {
    const title = req.body.title;
    const imageUrl = req.body.imageUrl;
    const description = req.body.description;
    const studio_num = req.body.studio_num;
    const product = new Product({
      title: title,
      imageUrl: imageUrl,
      description: description,
      userId: req.user
    });
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
    Product.find()
    // .select('title price -_id')
    // .populate('userId', 'name')
      .then(products => {
        res.render('admin/classes-list', {
          prods: products,
            title: 'Admin Products',
          path: 'admin/classes-list'
          //isAuthenticated: req.isLoggedIn
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
      .then(product => {
        if (!product) {
          return res.redirect('/');
        }
        res.render('admin/edit-class', {
          title: 'Edit Class',
          path: 'admin/edit-class',
          editing: editMode,
          product: product
          //isAuthenticated: req.isLoggedIn
        });
      })
      .catch(err => console.log(err));
  };

  exports.postEditClass = (req, res, next) => {
    const prodId = req.body.productId;
    const updatedTitle = req.body.title;
    const updatedImageUrl = req.body.imageUrl;
    const updatedDesc = req.body.description;
  
    Product.findById(prodId)
    .then(product => {
      product.title = updatedTitle;
      product.imageUrl = updatedImageUrl;
      product.description = updatedDesc;
      return product.save();
    })
    .then(result => {
      console.log('updated Class!');
      res.redirect('/admin/classes-list');
    })
    .catch(err => console.log(err));
};
  


exports.postDeleteClass = (req, res, next) => {
  const prodId = req.body.productId;
  Product.findByIdAndRemove(prodId)
    .then(() => {
      console.log('DESTROYED PRODUCT');
      res.redirect('/admin/classes-list');
    })
    .catch(err => console.log(err));
}; 

