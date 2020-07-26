const Product = require('../models/product');


// /products/classes => GET
exports.getClasses = (req, res, next) => {
	Product.fetchAll()
		.then(products => {
		res.render('classes/classes', {
			prods: products,
			title: 'Our classes',
			path: '/classes'
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
        path: '/class-details'
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
        products: products
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
    
/* 

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
 */