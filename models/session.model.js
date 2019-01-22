var mongoose = require('mongoose');

var sessionSchema = mongoose.Schema({
  sessionId: String,
  cart: Array
});

var Session = mongoose.model('Session', sessionSchema, 'sessions');

module.exports = Session;