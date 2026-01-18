const express = require('express');
const router = express.Router();
const Order = require('../models/Order');

// CREATE NEW ORDER
router.post('/', async (req, res) => {
  try {
    const newOrder = new Order({
      customerName: req.body.customerName,
      address: req.body.address,
      phone: req.body.phone,
      items: req.body.items,
      totalAmount: req.body.totalAmount
    });

    const savedOrder = await newOrder.save();
    res.status(201).json(savedOrder);
  } catch (err) {
    res.status(500).json(err);
  }

  // ... POST route is above this ...

// GET ALL ORDERS (Admin)
router.get('/', async (req, res) => {
  try {
    const orders = await Order.find().sort({ createdAt: -1 }); // Newest first
    res.status(200).json(orders);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
});

module.exports = router;