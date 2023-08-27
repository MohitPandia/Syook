const mongoose = require('mongoose');

const customerSchema = new mongoose.Schema({
  name: String,
  city: String,
  deleted: { type: Boolean, default: false }, // Added field for soft deletion
});

module.exports = mongoose.model('Customer', customerSchema);
