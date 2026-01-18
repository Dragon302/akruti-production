require('dotenv').config();
const mongoose = require('mongoose');
const User = require('./models/User');
const bcrypt = require('bcryptjs');

// CHANGE THESE TO WHAT YOU WANT
const ADMIN_USER = "admin";
const ADMIN_PASS = "admin123";

mongoose.connect(process.env.MONGO_URI)
  .then(async () => {
    console.log('connected');
    
    // Hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(ADMIN_PASS, salt);

    // Create Admin
    const newAdmin = new User({
      username: ADMIN_USER,
      password: hashedPassword,
      isAdmin: true
    });

    await newAdmin.save();
    console.log('✅ Admin Account Created!');
    process.exit();
  })
  .catch(e => console.log(e));