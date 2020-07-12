/**
 * Module dependencies.
 */
const path= require('path');

const express = require('express');
const bodyParser = require('body-parser');

const app = express();

// Set view engine to use, in this case 'ejs'
app.set('view engine', 'ejs');
app.set('views', 'views');

const adminRoutes = require('./routes/admin');
const indexRoutes = require('./routes/index');
const sign_inRoutes = require('./routes/sign-in');

app.use(bodyParser.urlencoded({extended: false}));
app.use(express.static(path.join(__dirname, 'public')));

app.use(adminRoutes);
app.use(indexRoutes);
app.use(sign_inRoutes);


app.use((req, res, next) => {
    res.status(404).render('404', {title: 'Page Not Found'});
});
app.listen(3300);