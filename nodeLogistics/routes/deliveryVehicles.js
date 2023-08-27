const express = require('express');
const router = express.Router();
const DeliveryVehicle = require('../models/deliveryVehicle');

// Create a new delivery vehicle
router.post('/', async (req, res) => {
  try {
    const newDeliveryVehicle = await DeliveryVehicle.create(req.body);
    res.json(newDeliveryVehicle);
  } catch (err) {
    res.status(500).json({ error: 'Error creating delivery vehicle' });
  }
});

// Get all delivery vehicles
router.get('/', async (req, res) => {
  try {
    const deliveryVehicles = await DeliveryVehicle.find();
    res.json(deliveryVehicles);
  } catch (err) {
    res.status(500).json({ error: 'Error getting delivery vehicles' });
  }
});

// Get delivery vehicle by ID
router.get('/:deliveryVehicleId', async (req, res) => {
  try {
    const deliveryVehicle = await DeliveryVehicle.findById(req.params.deliveryVehicleId);
    if (deliveryVehicle) {
      res.json(deliveryVehicle);
    } else {
      res.status(404).json({ error: 'Delivery vehicle not found' });
    }
  } catch (err) {
    res.status(500).json({ error: 'Error getting delivery vehicle' });
  }
});

// Update delivery vehicle by ID
router.put('/:deliveryVehicleId', async (req, res) => {
  try {
    const updatedDeliveryVehicle = await DeliveryVehicle.findByIdAndUpdate(
      req.params.deliveryVehicleId,
      req.body,
      { new: true }
    );
    if (updatedDeliveryVehicle) {
      res.json(updatedDeliveryVehicle);
    } else {
      res.status(404).json({ error: 'Delivery vehicle not found' });
    }
  } catch (err) {
    res.status(500).json({ error: 'Error updating delivery vehicle' });
  }
});

// Delete delivery vehicle by ID (soft delete)
router.delete('/:deliveryVehicleId', async (req, res) => {
  try {
    const updatedDeliveryVehicle = await DeliveryVehicle.findByIdAndUpdate(
      req.params.deliveryVehicleId,
      { $set: { deleted: true } },
      { new: true }
    );
    if (updatedDeliveryVehicle) {
      res.json({ message: 'Delivery vehicle soft deleted' });
    } else {
      res.status(404).json({ error: 'Delivery vehicle not found' });
    }
  } catch (err) {
    res.status(500).json({ error: 'Error soft deleting delivery vehicle' });
  }
});

module.exports = router;
