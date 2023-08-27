const express = require('express');
const router = express.Router();
const Customer = require('../models/customer');

// Create a new customer
router.post('/', async (req, res) => {
  try {
    const newCustomer = await Customer.create(req.body);
    res.json(newCustomer);
  } catch (err) {
    res.status(500).json({ error: 'Error creating customer' });
  }
});

// Get all customers
router.get('/', async (req, res) => {
  try {
    const customers = await Customer.find();
    res.json(customers);
  } catch (err) {
    res.status(500).json({ error: 'Error getting customers' });
  }
});

// Get customer by ID
router.get('/:customerId', async (req, res) => {
  try {
    const customer = await Customer.findById(req.params.customerId);
    if (customer) {
      res.json(customer);
    } else {
      res.status(404).json({ error: 'Customer not found' });
    }
  } catch (err) {
    res.status(500).json({ error: 'Error getting customer' });
  }
});

// Update customer by ID
router.put('/:customerId', async (req, res) => {
  try {
    const updatedCustomer = await Customer.findByIdAndUpdate(req.params.customerId, req.body, { new: true });
    if (updatedCustomer) {
      res.json(updatedCustomer);
    } else {
      res.status(404).json({ error: 'Customer not found' });
    }
  } catch (err) {
    res.status(500).json({ error: 'Error updating customer' });
  }
});

// Delete customer by ID (soft delete)
router.delete('/:customerId', async (req, res) => {
  try {
    const updatedCustomer = await Customer.findByIdAndUpdate(
      req.params.customerId,
      { $set: { deleted: true } },
      { new: true }
    );
    if (updatedCustomer) {
      res.json({ message: 'Customer soft deleted' });
    } else {
      res.status(404).json({ error: 'Customer not found' });
    }
  } catch (err) {
    res.status(500).json({ error: 'Error soft deleting customer' });
  }
});

module.exports = router;
