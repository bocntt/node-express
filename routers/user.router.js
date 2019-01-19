var express = require('express');
var multer = require('multer');

var router = express.Router();
var upload = multer({dest: 'public/uploads/'});

var controller = require('../controllers/user.controller');
var validate = require('../validate/user.validate');

router.get('/', controller.index);

router.get('/cookie', function(req, res) {
  res.cookie('user-id', 12345);
  res.send('hello');
});

router.get('/search', controller.search);

router.get('/create', controller.create);

router.post('/create', upload.single('avatar'), validate.createPost, controller.createPost);

router.get('/:id', controller.edit);

module.exports = router;