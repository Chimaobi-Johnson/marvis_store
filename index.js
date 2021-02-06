const path = require('path');

const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const session = require('express-session');
const MongoDBStore = require('connect-mongodb-session')(session);
const csrf = require('csurf');
const flash = require('connect-flash');
const User = require('./model/User');

const keys = require('./config/keys');
// const errorController = require('./controllers/error');

const app = express();
const csrfProtection = csrf();

app.set('view engine', 'ejs');
app.set('views', 'views');

const adminRoutes = require('./routes/admin');
const storeRoutes = require('./routes/store');
const authRoutes = require('./routes/auth');


app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

const store = new MongoDBStore({
    uri: keys.MONGO_URI,
    collection: 'sessions'
});

app.use(session({ secret: keys.SESSION_SECRET, resave: false, saveUninitialized: false, store: store }))

app.use(csrfProtection);
app.use(flash());

app.use((req, res, next) => {
    // throw new Error('Sync Dummy');
    if (!req.session.user) {
      return next();
    }
    User.findById(req.session.user._id)
      .then(user => {
        if (!user) {
          return next();
        }
        req.user = user;
        next();
      })
      .catch(err => {
        next(new Error(err));
      });
  });

app.use((req, res, next) => {
    res.locals.isAuthenticated = req.session.isLoggedIn;
    res.locals.csrfToken = req.csrfToken();
    next();
});

// app.use((error, req, res, next) => {
//     // res.status(error.httpStatusCode).render(...);
//     // res.redirect('/500');
//     res.status(500).render('500', {
//         pageTitle: 'Error!',
//         path: '/500',
//         isAuthenticated: req.session.isLoggedIn
//     });
// });

app.use('/admin', adminRoutes);
app.use(storeRoutes);
app.use(authRoutes);


// app.use(errorController.get404);

mongoose.connect(keys.MONGO_URI).then(connected => {
    console.log("DB Connected")
    app.listen(8000);
}).catch(err => {
    console.log(err);
})


