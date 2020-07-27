const Product = require('../models/product');
const Order = require('../models/order');

// /products/classes => GET
exports.getClasses = (req, res, next) => {
	Product.find()
		.then(products => {
      console.log(products);
      res.render('classes/classes', {
        prods: products,
        title: 'Our classes',
        path: '/classes'
        //isAuthenticated: req.isLoggedIn
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
          //isAuthenticated: req.isLoggedIn
      });
    })
    .catch(err => console.log(err));
};

exports.getCart = (req, res, next) => {
    req.user
    .populate('cart.items.productId')
    .execPopulate()
    .then(user => {
      const products = user.cart.items;
      res.render('classes/booking-cart', {
        path: '/booking-cart',
        title: 'Your Booking Basket',
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
    .removeFromCart(prodId)
    .then(result => {
      res.redirect('/booking-cart');
    })
    .catch(err => console.log(err));
}; 

exports.postOrder = (req, res, next) => {
  req.user
    .populate('cart.items.productId')
    .execPopulate()
    .then(user => {
      const products = user.cart.items.map(i => {
        return { quantity: i.quantity, product: { ...i.productId._doc } };
      });
      const order = new Order({
        user: {
          name: req.user.name,
          userId: req.user
        },
        products: products
      });
      return order.save();
    })
    .then(result => {
      return req.user.clearCart();
    })
    .then(() => {
      res.redirect('/bookings');
    })
    .catch(err => console.log(err));
};

exports.getOrders = (req, res, next) => {
  Order.find({ 'user.userId': req.user._id })
    .then(orders => {
      res.render('classes/bookings', {
        path: '/bookings',
        title: 'Your Bookings',
        orders: orders
        //isAuthenticated: req.isLoggedIn
      });
    })
    .catch(err => console.log(err));
};

 