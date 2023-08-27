const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
  orderNumber: { type: String, unique: true },
  itemId: { type: mongoose.Schema.Types.ObjectId, ref: 'Item' },
  price: Number,
  customerId: { type: mongoose.Schema.Types.ObjectId, ref: 'Customer' },
  deliveryVehicleId: { type: mongoose.Schema.Types.ObjectId, ref: 'DeliveryVehicle' },
  isDelivered: { type: Boolean, default: false },
  deleted: { type: Boolean, default: false }, // Added field for soft deletion
});

module.exports = mongoose.model('Order', orderSchema);
