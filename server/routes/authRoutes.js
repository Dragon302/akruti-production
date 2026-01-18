const express = require('express');
const router = express.Router();
const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

// REGISTER (Sign Up)
router.post('/register', async (req, res) => {
  try {
    // 1. Scramble the password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(req.body.password, salt);

    // 2. Create User
    const newUser = new User({
      username: req.body.username,
      password: hashedPassword,
      isAdmin: req.body.isAdmin || false
    });

    const user = await newUser.save();
    res.status(200).json(user);
  } catch (err) {
    res.status(500).json(err);
  }
});

// LOGIN
router.post('/login', async (req, res) => {
  try {
    // 1. Find user
    const user = await User.findOne({ username: req.body.username });
    if (!user) return res.status(404).json("User not found");

    // 2. Check password
    const validPassword = await bcrypt.compare(req.body.password, user.password);
    if (!validPassword) return res.status(400).json("Wrong password");

    // 3. Create ID Card (Token)
    // We need a secret key. In production, use .env!
    const token = jwt.sign(
      { id: user._id, isAdmin: user.isAdmin }, 
      "MySecretKey123", 
      { expiresIn: "1h" }
    );

    res.status(200).json({ token, isAdmin: user.isAdmin });
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;