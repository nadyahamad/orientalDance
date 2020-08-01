const bcrypt = require('bcryptjs');
const User = require('../models/user');


exports.getLogin = (req, res, next) => {
  let message = req.flash('error');
  if (message.length > 0) {
    message = message[0];
  } else {
    message = null;
  }
  res.render('auth/login', {
    path: '/login',
    title: 'Login',
    errorMessage: req.flash('error')
  });
};

exports.getSignup = (req, res, next) => {
  res.render('auth/signup', {
    path: '/signup',
    title: 'Signup'
  });
};

exports.postLogin = (req, res, next) => {
  const email = req.body.email;
  const password = req.body.password;
  User.findOne({ email: email })
    .then(user => {
      if (!user) {
        req.flash('error', 'Invalid email or password.');
        return res.redirect('/login');
      }
      bcrypt
        .compare(password, user.password)
        .then(doMatch => {
          if (doMatch) {
            req.session.isLoggedIn = true;
            req.session.user = user;
            return req.session.save(err => {
              console.log(err);
              res.redirect('/admin/admin-landing');
            });
          }
          res.redirect('/login');
        })
        .catch(err => {
          console.log(err);
          res.redirect('/login');
        });
    })
    .catch(err => console.log(err));
};

 
  exports.postSignup = (req, res, next) => {
    const username = req.body.username;
    const full_name = req.body.full_name;
    const email = req.body.email;
    const phone = req.body.phone;
    const password = req.body.password;
    const confirm_password = req.body.confirm_password;
    User.findOne({ email: email })
      .then(userDoc => {
        if (userDoc) {
          return res.redirect('/signup');
        }
        return bcrypt
          .hash(password, 12)
          .then(hashedPassword => {
            const user = new User({
              username: username,
              full_name: full_name,
              email: email,
              phone: phone,
              password: hashedPassword,
              cart: { items: [] }
            });
            return user.save();
          })
          .then(result => {
            res.redirect('/login');
          });
      })
      .catch(err => {
        console.log(err);
      });
  };

  exports.postLogout = (req, res, next) => {
    req.session.destroy(err => {
      console.log(err);
      res.redirect('/');
    });
  };
  