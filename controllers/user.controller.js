var db = require('../db');
var shortid = require('shortid');

module.exports.index = function(request, response) {
  console.log(request.cookies);
  response.render('users/index', {
    users: db.get('users').value()
  });
};

module.exports.search = function(req, res) {
  var q = req.query.q;
  var matchUsers = db.get('users').value().filter(function(user) {
    return user.name.toLowerCase().indexOf(q.toLowerCase()) !== -1;
  });
  res.render('users/index', {
    users: matchUsers
  });
};

module.exports.create = function(req, res) {
  res.render('users/create');
};

module.exports.createPost = function(req, res) {
  console.log(res.locals);
  req.body.id = shortid.generate();
  req.body.avatar = req.file.path.split('/').slice(1).join('/');
  //req.body.avatar = req.file.path;

  db.get('users').push(req.body).write();
  res.redirect('/users');
};

module.exports.edit = function(req, res) {
  var id = req.params.id;

  var user = db.get('users').find({id: id}).value();
  res.render('users/view', {user: user});
};