const User = require('../models/user');

exports.getLogin = (req, res, next) => {
  // const isLoggedIn = req
  //   .get('Cookie')
  //   .split(';')[0]
  //   .trim()
  //   .split('=')[1] ==='true';
  console.log(req.session.isLoggedIn);
  res.render('auth/login', {
    path: '/login',
    title: 'Login',
    isAuthenticated: false
  });
};

exports.postLogin = (req, res, next) => {
  User.findById('5f1e161f23814343d1b14062')
  .then(user => {
    req.session.isLoggedIn = true;
    req.session.save(err => {
      console.log(err);
      res.redirect('/');
    });
  })
  .catch(err => console.log(err));
  };

  exports.postLogout = (req, res, next) => {
    req.session.destroy(err => {
      console.log(err);
      res.redirect('/');
    });
  };
  