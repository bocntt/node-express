// var db = require('../db');
// var shortid = require('shortid');
var User = require('../models/user.model');

module.exports.index = async function(request, response) {
  // console.log(request.cookies);
  var users = await User.find();

  response.render('users/index', {
    users: users
  });
};

module.exports.search = async function(req, res) {
  var q = req.query.q;

  var matchUsers = await User.find({name: q.toLowerCase()});

  // var matchUsers = db.get('users').value().filter(function(user) {
  //   return user.name.toLowerCase().indexOf(q.toLowerCase()) !== -1;
  // });

  res.render('users/index', {
    users: matchUsers
  });
};

module.exports.create = function(req, res) {
  res.render('users/create');
};

module.exports.createPost = function(req, res) {
  // console.log(res.locals);

  // req.body.id = shortid.generate();
  req.body.avatar = req.file.path.split('/').slice(1).join('/');
  //req.body.avatar = req.file.path;
  // db.get('users').push(req.body).write();

  var user = new User({
    name: req.body.name,
    phone: req.body.phone,
    avatar: req.body.avatar
  });
  user.save();

  res.redirect('/users');
};

module.exports.edit = function(req, res) {
  var id = req.params.id;

  // var user = db.get('users').find({id: id}).value();
  var user = User.find({_id: id});

  res.render('users/view', {user: user});
};