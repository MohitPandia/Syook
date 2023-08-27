// models/item.js

const express = require('express');
const router = express.Router();
const Item = require('../models/item');

// Create a new item
router.post('/', async (req, res) => {
  try {
    const newItem = await Item.create(req.body);
    res.json(newItem);
  } catch (err) {
    res.status(500).json({ error: 'Error creating item' });
  }
});

// Get all items
router.get('/', async (req, res) => {
  try {
    const items = await Item.find();
    res.json(items);
  } catch (err) {
    res.status(500).json({ error: 'Error getting items' });
  }
});

// Get item by ID
router.get('/:itemId', async (req, res) => {
  try {
    const item = await Item.findById(req.params.itemId);
    if (item) {
      res.json(item);
    } else {
      res.status(404).json({ error: 'Item not found' });
    }
  } catch (err) {
    res.status(500).json({ error: 'Error getting item' });
  }
});

// Update item by ID
router.put('/:itemId', async (req, res) => {
  try {
    const updatedItem = await Item.findByIdAndUpdate(req.params.itemId, req.body, { new: true });
    if (updatedItem) {
      res.json(updatedItem);
    } else {
      res.status(404).json({ error: 'Item not found' });
    }
  } catch (err) {
    res.status(500).json({ error: 'Error updating item' });
  }
});

// Delete item by ID
// Delete item by ID (soft delete)
router.delete('/:itemId', async (req, res) => {
  try {
    const updatedItem = await Item.findByIdAndUpdate(
      req.params.itemId,
      { $set: { deleted: true } },
      { new: true }
    );
    if (updatedItem) {
      res.json({ message: 'Item soft deleted' });
    } else {
      res.status(404).json({ error: 'Item not found' });
    }
  } catch (err) {
    res.status(500).json({ error: 'Error soft deleting item' });
  }
});


module.exports = router;
