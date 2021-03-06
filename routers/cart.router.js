var express = require('express');

var router = express.Router();

var controller = require('../controllers/cart.controller');

router.get('/', controller.index);

router.get('/add/:productId', controller.AddToCart);

module.exports = router;