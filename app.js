const path= require('path');
const fs = require('fs');
const https = require('https');

const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const session = require('express-session');
const MongoDBStore = require('connect-mongodb-session')(session);
const csrf = require('csurf');
const flash = require('connect-flash');
//const helmet = require('helmet');
//const compression = require('compression');
//const morgan = require('morgan');


const errorController = require('./controllers/error');
const User = require('./models/user');

console.log(process.env.NODE_ENV);

const MONGODB_URI = `mongodb+srv://${process.env.MONGO_USER}:${
  process.env.MONGO_PASSWORD
}@cluster0.3pcv2.mongodb.net/${process.env.MONGO_DEFAULT_DATABASE}`;

const app = express();
const store = new MongoDBStore({
  uri: MONGODB_URI,
  collection: 'sessions'
});

const csrfProtection = csrf();

// Set view engine to use, in this case 'ejs'
app.set('view engine', 'ejs');
app.set('views', 'views');


const staticsRoutes = require('./routes/statics');
const authRoutes = require('./routes/auth');
const adminRoutes = require('./routes/admin');
const classesRoutes = require('./routes/classes');

const accessLogStream = fs.createWriteStream(
  path.join(__dirname, 'access.log'),
  { flags: 'a' }
);

//app.use(helmet());
//app.use(compression());
//app.use(morgan('combined', { stream: accessLogStream }));

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

app.use(csrfProtection);
app.use(flash());

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

app.use((req, res, next) => {
  res.locals.isAuthenticated = req.session.isLoggedIn;
  res.locals.csrfToken = req.csrfToken();
  next();
});

app.use('/admin', adminRoutes);
app.use(classesRoutes);
app.use(staticsRoutes);
app.use(authRoutes);

  

  app.use(errorController.get404);
  
  mongoose
  .connect(MONGODB_URI)
  .then(result => {
    app.listen(process.env.PORT || 3300);
  })
  .catch(err => {
    console.log(err);
  });
