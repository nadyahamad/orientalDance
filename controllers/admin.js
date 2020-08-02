const Product = require('../models/product');

// /admin/add-class => GET
exports.getAdminLanding = (req, res, next) => {
  res.render('admin/admin-landing', {
      title: 'Admin Dashboard',
      path: '/admin/admin-landing',
      editing: false
  });
};


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
    const date = req.body.date;
    const time = req.body.time;
    const studio_num = req.body.studio_num;
    const product = new Product({
      title: title,
      imageUrl: imageUrl,
      description: description,
      date: date,
      time: time,
      studio_num:studio_num,
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
        });
      })
      .catch(err => console.log(err));
  };

  exports.postEditClass = (req, res, next) => {
    const prodId = req.body.productId;
    const updatedTitle = req.body.title;
    const updatedImageUrl = req.body.imageUrl;
    const updatedDesc = req.body.description;
    const updatedDate = req.body.date;
    const updatedTime = req.body.time;
    const updatedStudio = req.body.studio_num;
  
    Product.findById(prodId)
    .then(product => {
      if (product.userId.toString() !== req.user._id.toString()) {
        return res.redirect('/');
      }
      product.title = updatedTitle;
      product.imageUrl = updatedImageUrl;
      product.description = updatedDesc;
      product.date = updatedDate;
      product.time = updatedTime;
      product.studio_num = updatedStudio;
      return product.save()
      .then(result => {
        console.log('updated Class!');
        res.redirect('/admin/classes-list');
      });
    })
    .catch(err => console.log(err));
};
  
exports.getClassesList = (req, res, next) => {
  Product.find({ userId: req.user._id })
  // .select('title price -_id')
  // .populate('userId', 'name')
    .then(products => {
      res.render('admin/classes-list', {
        prods: products,
        title: 'Admin Products',
        path: 'admin/classes-list'
      });
    })
    .catch(err => console.log(err));
};


exports.postDeleteClass = (req, res, next) => {
  const prodId = req.body.productId;
  Product.deleteOne( { _id: prodId, userId: req.user._id })
    .then(() => {
      console.log('DESTROYED PRODUCT');
      res.redirect('/admin/classes-list');
    })
    .catch(err => console.log(err));
}; 

