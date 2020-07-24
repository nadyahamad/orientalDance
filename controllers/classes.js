const Product = require('../models/product');
const Cart = require('../models/cart');

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


exports.getClass = (req, res, next) => {
    const prodId = req.params.productId;
    Product.findById(prodId)
    .then(product => {
      res.render('classes/class-details', {
        product: product,
        title: product.title,
        path: '/classes'
      });
    })
    .catch(err => console.log(err));
};


exports.getBookClass = (req, res, next) => {
    Cart.getCart(cart => {
        Product.fetchAll(products => {
            const cartProducts = [];
            for (product of products) {
                const cartProductData = cart.products.find(prod => prod.classId === product.classId);
                if (cartProductData){
                    cartProducts.push({productData: product, qty: cartProductData.qty });
                }
            }
            res.render('classes/book-class', {
            path: '/book-class',
            title: 'Your booking',
            products: cartProducts
            });
        });
   });   
};

exports.postBookClass = (req, res, next) => {
    const cId = req.body.classid;
    Product.findById(cId, (product) => {
        Cart.addProduct(cId, product.price);
    });
    res.redirect('/book-class');
};

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
