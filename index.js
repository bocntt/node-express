var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');

var db = require('./db');

var userRouters = require('./routers/user.router');
var authRouter = require('./routers/auth.router');

var auth = require('./middlewares/auth.middleware');

var port = 3000;

app.set('view engine', 'pug');
app.set('views', './views');

app.use(express.static('public'));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(cookieParser());

app.get('/', function(request, response) {
  response.render('index', {
    name: 'aaa'
  });
});

app.use('/users', auth.authLogin, userRouters);

app.use('/auth', authRouter);

app.listen(port, function() {
  console.log('server listing on port 3000');
});