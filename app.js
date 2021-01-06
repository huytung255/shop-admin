require('dotenv').config()
var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const hbs = require('hbs');
const indexRouter = require('./routes/index');
const usersRouter = require('./routes/customer');
const productsRouter = require('./routes/products');
const staffsRouter = require('./routes/staff')
const adminRouter = require('./routes/admin');
const orderRouter = require('./routes/order');
const promoRouter = require('./routes/promo');
var paginateHelper = require('express-handlebars-paginate');
var app = express();
require('./dal/db');

//passport, flash, session
const passport = require('passport');
const flash = require('connect-flash');
const session = require('express-session');
require('./passport/passport')(passport);

// Express session
app.use(
  session({
    secret: 'secret',
    resave: true,
    saveUninitialized: true
  })
);
// Passport middleware
app.use(passport.initialize());
app.use(passport.session());

// Connect flash
app.use(flash());
// Global variables
app.use(function(req, res, next) {
  res.message = req.flash();
  res.locals.user = req.user;
  next();
});

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');


app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/customer', usersRouter);
app.use('/products',productsRouter);
app.use('/staff', staffsRouter);
app.use('/admin', adminRouter);
app.use('/order',orderRouter);
app.use('/promo',promoRouter);
// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

hbs.handlebars.registerHelper('paginateHelper', paginateHelper.createPagination);
hbs.handlebars.registerHelper('cond', function(v1, v2, options) {
  if(v1 === v2) {
    return options.fn(this);
  }
});


module.exports = app;
