const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const User = new Schema({
    username: String,
    email: String,
    password: String,
    phone: String,
    slots: Object,
    requests: Array
  });
// Export Model

module.exports = mongoose.model('User', User);