/**
 * Module dependencies.
 */
const path= require('path');

const express = require('express');
const bodyParser = require('body-parser');

const mongoConnect = require('./util/database');

const app = express();

// Set view engine to use, in this case 'ejs'
app.set('view engine', 'ejs');
app.set('views', 'views');


const indexRoutes = require('./routes/index');
const sign_inRoutes = require('./routes/sign-in');


const adminData = require('./routes/admin');
const classesRoutes = require('./routes/classes');

app.use(bodyParser.urlencoded({extended: false}));
app.use(express.static(path.join(__dirname, 'public')));


app.use(indexRoutes);
app.use(sign_inRoutes);

app.use('/admin', adminData.routes);
app.use(classesRoutes);


app.use((req, res, next) => {
    res.status(404).render('404', {title: 'Page Not Found'});
});


mongoConnect((client) => {
    console.log(client);
    app.listen(3300);
});