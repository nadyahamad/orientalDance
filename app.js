/**
 * Module dependencies.
 */
const path= require('path');
const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
//const session = require('express-session');


const errorController = require('./controllers/error');
const User = require('./models/user');

const app = express();


// Set view engine to use, in this case 'ejs'
app.set('view engine', 'ejs');
app.set('views', 'views');


const staticsRoutes = require('./routes/statics');
//const authRoutes = require('./routes/auth');
const adminRoutes = require('./routes/admin');
const classesRoutes = require('./routes/classes');




app.use(bodyParser.urlencoded({extended: false}));
app.use(express.static(path.join(__dirname, 'public')));
// app.use(
//   session({ secret: 'oriental dance', resave: false, saveUninitialized: false })
// );

app.use((req, res, next) => {
  User.findById('5f1e161f23814343d1b14062')
    .then(user => {
      req.user = user;
      next();
    })
    .catch(err => console.log(err));
});

app.use('/admin', adminRoutes);
app.use(classesRoutes);
app.use(staticsRoutes);
//app.use(authRoutes);

  

  app.use(errorController.get404);
  
  mongoose
  .connect(
    'mongodb+srv://nahamad:Y1mb4c4T4b0g0@cluster0.3pcv2.mongodb.net/ORIENTALDANCE?retryWrites=true&w=majority'
  )
  .then(result => {
    User.findOne().then(user => {
      if (!user) {
        const user = new User({
          name: 'Nad',
          email: 'nad@test.com',
          cart: {
            items: []
          }
        });
        user.save();
      }
    });
    app.listen(3300);
  })
  .catch(err => {
    console.log(err);
  });
