/**
 * Module dependencies.
 */
const path= require('path');

const express = require('express');
const bodyParser = require('body-parser');

const errorController = require('./controllers/error');

const app = express();


// Set view engine to use, in this case 'ejs'
app.set('view engine', 'ejs');
app.set('views', 'views');


const indexRoutes = require('./routes/index');
const sign_inRoutes = require('./routes/sign-in');


const adminRoutes = require('./routes/admin');
const classesRoutes = require('./routes/classes');

app.use(bodyParser.urlencoded({extended: false}));
app.use(express.static(path.join(__dirname, 'public')));


app.use(indexRoutes);
app.use(sign_inRoutes);

app.use('/admin', adminRoutes);
app.use(classesRoutes);


app.use(errorController.get404);

app.listen(3300);
