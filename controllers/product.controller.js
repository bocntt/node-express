// var db = require('../db');
// var shortid = require('shortid');

var Product = require('../models/product.model');

module.exports.index = async function(req, res) {
  // var page = parseInt(req.query.page) || 1;
  // var perPage = 8;

  // var start = (page - 1) * perPage;
  // var end = page * perPage;

  // var total = db.get('products').value().length;
  // var countPage = Math.ceil(total / perPage);

  // var products = db.get('products').value().slice(start, end);
  // res.render('product/index', {products: products, total: total, countPage: countPage, page: page});

  var products = await Product.find();

  res.render('product/index', {products: products});
}