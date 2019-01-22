var shortid = require('shortid');
var db = require('../db');
var User = require('../models/user.model');
var Product = require('../models/product.model');
var Session = require('../models/session.model');

module.exports.index = function(req, res) {
  var sessionId = req.signedCookies.sessionId;

  // var carts = db.get('sessions')
  //               .find({id: sessionId})
  //               .get('cart')
  //               .value();
  var carts = Session.find({sessionId: sessionId}, 'cart');

  var products = [];

  for (cart in carts) {
    // var product = db.get('products')
    //                 .find({id: cart})
    //                 .value();
    var product = Product.find({_id: cart});
    if (product) {
      products[cart] = product;
    }
  }

  res.render('cart/index', {carts: carts, products: products});
};

module.exports.AddToCart = function(req, res,) {
  var productId = req.params.productId;
  var sessionId = req.signedCookies.sessionId;

  if (!sessionId) {
    res.redirect('/product');
    return;
  }

  // var count = db.get('sessions')
  //               .find({id: sessionId})
  //               .get('cart.' + productId, 0)
  //               .value();
  var count = Session.count({sessionId: sessionId}, 'cart').where(productId);

  db.get('sessions')
    .find({ id: sessionId })
    .set('cart.' + productId, count + 1)
    .write();

  res.redirect('/product');
};