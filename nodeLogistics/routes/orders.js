const express = require('express');
const router = express.Router();
const Order = require('../models/order');
const DeliveryVehicle = require('../models/deliveryVehicle');
const Customer = require('../models/customer');

// Create a new order
// router.post('/', async (req, res) => {
//   try {
//     const newOrder = await Order.create(req.body);
//     res.json(newOrder);
//   } catch (err) {
//     res.status(500).json({ error: 'Error creating order' });
//   }
// });

// Create a new order
router.post('/', async (req, res) => {
    try {
      const { itemId, customerId } = req.body;
  
      // Check if there's an available delivery vehicle in the customer's city
      const customer = await Customer.findById(customerId);
      const availableVehicle = await DeliveryVehicle.findOne({
        city: customer.city,
        activeOrdersCount: { $lt: 2 }, // Check if the vehicle has less than 2 active orders
      });
  
      if (!availableVehicle) {
        return res.status(400).json({ error: 'No available vehicle for delivery' });
      }
  
      // Create the order and assign the available vehicle
      const newItem = await Order.create({
        itemId,
        customerId,
        deliveryVehicleId: availableVehicle._id,
        price: 0, // You'll need to set the actual price based on the item's price
      });
  
      // Increment the activeOrdersCount of the assigned delivery vehicle
      await DeliveryVehicle.findByIdAndUpdate(availableVehicle._id, { $inc: { activeOrdersCount: 1 } });
  
      res.json(newItem);
    } catch (err) {
      res.status(500).json({ error: 'Error creating order' });
    }
  });



// Get all orders
router.get('/', async (req, res) => {
  try {
    const orders = await Order.find();
    res.json(orders);
  } catch (err) {
    res.status(500).json({ error: 'Error getting orders' });
  }
});

// Get order by ID
router.get('/:orderId', async (req, res) => {
  try {
    const order = await Order.findById(req.params.orderId);
    if (order) {
      res.json(order);
    } else {
      res.status(404).json({ error: 'Order not found' });
    }
  } catch (err) {
    res.status(500).json({ error: 'Error getting order' });
  }
});

// Update order by ID
router.put('/:orderId', async (req, res) => {
  try {
    const updatedOrder = await Order.findByIdAndUpdate(req.params.orderId, req.body, { new: true });
    if (updatedOrder) {
      res.json(updatedOrder);
    } else {
      res.status(404).json({ error: 'Order not found' });
    }
  } catch (err) {
    res.status(500).json({ error: 'Error updating order' });
  }
});

// Delete order by ID (soft delete)
router.delete('/:orderId', async (req, res) => {
  try {
    const updatedOrder = await Order.findByIdAndUpdate(
      req.params.orderId,
      { $set: { deleted: true } },
      { new: true }
    );
    if (updatedOrder) {
      res.json({ message: 'Order soft deleted' });
    } else {
      res.status(404).json({ error: 'Order not found' });
    }
  } catch (err) {
    res.status(500).json({ error: 'Error soft deleting order' });
  }
});

module.exports = router;
