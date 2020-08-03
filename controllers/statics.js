// const nodemailer = require('nodemailer');
// const sendgridTransport = require('nodemailer-sendgrid-transport');
// const { validationResult } = require('express-validator');


// /index => GET
exports.getIndex = (req, res, next) => {
    res.render(
        'statics/index', 
        {title: 'Oriental Dance', 
        path: '/',
    });
};


// /index => GET
exports.getContact = (req, res, next) => {
    res.render(
        'statics/contact', 
        {title: 'Contact Us', 
        path: '/contact_us',
    });
};
