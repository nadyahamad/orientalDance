const Product = require('../models/product');

// /products/classes => GET
exports.getClasses = (req, res, next) => {
	Product.fetchAll()
		.then(products => {
		res.render('classes/classes', {
			prods: products,
			title: 'Our classes',
      path: '/classes',
      isAuthenticated: req.isLoggedIn
		});
	})
	.catch(err => {
	console.log(err);
	});
};

exports.getProduct = (req, res, next) => {
    const prodId = req.params.productId;
    Product.findById(prodId)
    .then(product => {
      	res.render('classes/class-details', {
        	product: product,
        	title: product.title,
          path: '/class-details',
          isAuthenticated: req.isLoggedIn
      });
    })
    .catch(err => console.log(err));
};

exports.getCart = (req, res, next) => {
  req.user
    .getCart()
    .then(products => {
      res.render('classes/booking-cart', {
        path: '/booking-cart',
        title: 'Your Cart',
        products: products,
        isAuthenticated: req.isLoggedIn
      });
    })
    .catch(err => console.log(err));
};


exports.postCart = (req, res, next) => {
  const prodId = req.body.productId;
  Product.findById(prodId)
    .then(product => {
      return req.user.addToCart(product);
    })
    .then(result => {
      console.log(result);
      res.redirect('/booking-cart');
    });
};

exports.postCartDeleteProduct = (req, res, next) => {
  const prodId = req.body.productId;
  req.user
    .deleteItemFromCart(prodId)
    .then(result => {
      res.redirect('/booking-cart');
    })
    .catch(err => console.log(err));
}; 

exports.postOrder = (req, res, next) => {
  let fetchedCart;
  req.user
    .addOrder()
    .then(result => {
      res.redirect('/bookings');
    })
    .catch(err => console.log(err));
};

exports.getOrders = (req, res, next) => {
  req.user
    .getOrders()
    .then(orders => {
      res.render('classes/bookings', {
        path: '/bookings',
        title: 'Your Bookings',
        orders: orders,
        isAuthenticated: req.isLoggedIn
      });
    })
    .catch(err => console.log(err));
};

 