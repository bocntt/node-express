require('dotenv').config();

var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
var csurf = require('csurf');
var mongoose = require('mongoose');

var db = require('./db');
mongoose.connect(process.env.MONGO_URL);

var userRouters = require('./routers/user.router');
var authRouter = require('./routers/auth.router');
var productRouter = require('./routers/product.router');
var cartRouter = require('./routers/cart.router');
var transferRouter = require('./routers/transfer.router');

// api
var apiProductRouter = require('./api/routers/product.router');

var auth = require('./middlewares/auth.middleware');
var sessionMiddleware = require('./middlewares/session.middleware');

var port = process.env.PORT || 3000;

// set up csrf middleware
var csrfProtected = csurf({cookie: true});

app.set('view engine', 'pug');
app.set('views', './views');

app.use(express.static('public'));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(cookieParser(process.env.SESSION_SECRET));
app.use(sessionMiddleware);

// app.use(csurf({cookie: true}));

app.get('/', function(request, response) {
  response.render('index', {
    name: 'aaa'
  });
});

app.use('/users', auth.authLogin, userRouters);

app.use('/auth', authRouter);

app.use('/product', productRouter);

app.use('/cart', cartRouter);

app.use('/transfer', auth.authLogin, csrfProtected, transferRouter);

// api
app.use('/api/product', apiProductRouter);

app.listen(port, function() {
  console.log('server listing on port 3000');
});