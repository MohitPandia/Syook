// models/item.js
const mongoose = require('mongoose');

const itemSchema = new mongoose.Schema({
  name: String,
  price: Number,
  deleted: { type: Boolean, default: false }, // Added field for soft deletion
});

module.exports = mongoose.model('Item', itemSchema);

