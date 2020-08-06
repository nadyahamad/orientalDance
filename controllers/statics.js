// const nodemailer = require('nodemailer');
// const sendgridTransport = require('nodemailer-sendgrid-transport');
const { validationResult } = require('express-validator');
const User = require('../models/user');


// /index => GET
exports.getIndex = (req, res, next) => {
    res.render(
        'statics/index', 
        {title: 'Oriental Dance', 
        path: '/',
    });
};

// /admin/add-class => GET
exports.getLanding = (req, res, next) => {
    User.find({ userId: req.user._id })
  // .select('title price -_id')
  // .populate('userId', 'name')
    .then(user => {
      res.render('statics/landing', {
        user: user,
        title: req.user.full_name,
        path: '/landing'
      });
    })
    .catch(err => console.log(err));
};
  


// /index => GET
exports.getContact = (req, res, next) => {
    res.render(
        'statics/contact', 
        {title: 'Contact Us', 
        path: '/contact_us',
    });
};
