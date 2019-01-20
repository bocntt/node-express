require('dotenv').config();

var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');

var db = require('./db');

var userRouters = require('./routers/user.router');
var authRouter = require('./routers/auth.router');
var productRouter = require('./routers/product.router');
var cartRouter = require('./routers/cart.router');

var auth = require('./middlewares/auth.middleware');
var sessionMiddleware = require('./middlewares/session.middleware');

var port = 3000;

app.set('view engine', 'pug');
app.set('views', './views');

app.use(express.static('public'));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(cookieParser(process.env.SESSION_SECRET));
app.use(sessionMiddleware);

app.get('/', function(request, response) {
  response.render('index', {
    name: 'aaa'
  });
});

app.use('/users', auth.authLogin, userRouters);

app.use('/auth', authRouter);

app.use('/product', productRouter);

app.use('/cart', cartRouter);

app.listen(port, function() {
  console.log('server listing on port 3000');
});