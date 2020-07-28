const path= require('path');

const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const session = require('express-session');
const MongoDBStore = require('connect-mongodb-session')(session);

const errorController = require('./controllers/error');
const User = require('./models/user');

const MONGODB_URI =
  'mongodb+srv://nahamad:Y1mb4c4T4b0g0@cluster0.3pcv2.mongodb.net/ORIENTALDANCE';

const app = express();
const store = new MongoDBStore({
  uri: MONGODB_URI,
  collection: 'sessions'
});

// Set view engine to use, in this case 'ejs'
app.set('view engine', 'ejs');
app.set('views', 'views');


const staticsRoutes = require('./routes/statics');
const authRoutes = require('./routes/auth');
const adminRoutes = require('./routes/admin');
const classesRoutes = require('./routes/classes');




app.use(bodyParser.urlencoded({extended: false}));
app.use(express.static(path.join(__dirname, 'public')));
app.use(
  session({ 
    secret: 'oriental dance', 
    resave: false, 
    saveUninitialized: false,
    store: store 
  })
);

app.use((req, res, next) => {
  if (!req.session.user) {
    return next();
  }
  User.findById(req.session.user._id)
    .then(user => {
      req.user = user;
      next();
    })
    .catch(err => console.log(err));
});

app.use('/admin', adminRoutes);
app.use(classesRoutes);
app.use(staticsRoutes);
app.use(authRoutes);

  

  app.use(errorController.get404);
  
  mongoose
  .connect(
    MONGODB_URI
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
