const createError = require('http-errors');
const express = require('express');
//indirilen express session tanımlaması session olarak yapıldı...
const  session = require('express-session');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');

//redisStore tanımlaması
const redisStore = require('./helpers/redisStore');


//indirdiğimiz passport modülünü tanımlıyoruz..
const passport = require('passport');
//dotenv tanımlamamızı yaptık...
const dotenv = require('dotenv');
dotenv.config();


const indexRouter = require('./routes/index');
const authRouter = require('./routes/auth');
const chatRouter = require('./routes/chat');
const messageRouter = require('./routes/messages');

const app = express();

//veri tabanı bağlantısı
const db = require('./helpers/db')();


//middleware işlemi
const isAuthenticated = require('./middleware/isAuthenticated');

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, 'bower_components')));



//yukarıda tanımlanan express session kullanılıyor..
app.use(session({
    store : redisStore,
    secret : process.env.SESSION_SECRET_KEY,
    resave : false,
    saveUninitialized : true,
    cookie : { maxAge : 14 * 24 * 3600000 }
}));


//passport initialize işlemi
app.use(passport.initialize());
//passport session :D
app.use(passport.session());


app.use('/', indexRouter);
app.use('/auth', authRouter);
app.use('/chat', isAuthenticated, chatRouter);
app.use('/messages', isAuthenticated, messageRouter);

// catch 404 and forward to error handler
app.use((req, res, next) => {
  next(createError(404));
});

// error handler
app.use((err, req, res, next) => {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
