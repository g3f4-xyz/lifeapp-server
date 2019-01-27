const mongoose = require('mongoose');

module.exports = mongoose.Schema({
  endpoint : String,
  expirationTime : String,
  keys : {
    p256dh : String,
    auth : Boolean,
  },
});
