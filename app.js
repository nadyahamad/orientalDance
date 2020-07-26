/**
 * Module dependencies.
 */
const path= require('path');
const express = require('express');
const bodyParser = require('body-parser');
const errorController = require('./controllers/error');
const mongoConnect = require('./util/database').mongoConnect;
const User = require('./models/user');

const app = express();


// Set view engine to use, in this case 'ejs'
app.set('view engine', 'ejs');
app.set('views', 'views');


const staticsRoutes = require('./routes/statics');
const authRoutes = require('./routes/auth');
const adminRoutes = require('./routes/admin');
const classesRoutes = require('./routes/classes');




app.use(bodyParser.urlencoded({extended: false}));
app.use(express.static(path.join(__dirname, 'public')));

app.use((req, res, next) => {
  User.findById('5f1c9d3dd548f777b01c052e')
    .then(user => {
      req.user = new User(user.username, user.full_name, user.email, user.phone, user.password, user.cart, user._id);
      next();
    })
    .catch(err => console.log(err));
});

app.use('/admin', adminRoutes);
app.use(classesRoutes);
app.use(staticsRoutes);
app.use(authRoutes);

  

  app.use(errorController.get404);
  
  mongoConnect(() => {
    app.listen(3300);
  });