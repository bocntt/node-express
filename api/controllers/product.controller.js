var Product = require('../../models/product.model');

module.exports.index = async function(req, res, next) {
  var products = await Product.find();
  res.json(products);
};