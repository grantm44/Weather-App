'use strict';

var mongoose = require('mongoose');

var UserSchema = new mongoose.Schema({
  googleId: String,
  access_token: String,
  refresh_token: String,
  name: String
});
var User = mongoose.model('User', UserSchema);
module.exports = User;
