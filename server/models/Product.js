// server/models/Product.js
const mongoose = require('mongoose');

const ProductSchema = new mongoose.Schema({
    name: { type: String, required: true},
    description: { type: String },
    price: { type: Number, required: true },
    category: { type: String, required: true }, // e.g., "Home Decor", "Engineering", "Toys"
    
    // 3D Printing Specific Fields
    material: { type: String, default: "PLA" }, //PLA, PETG, ABS
    layerBlockSize:{ type: String, default: "0.2mm" },
    printTime: { type: String }, // e.g., "4 hours"
  
  imageUrl: { type: String, required: true },
  inStock: { type: Boolean, default: true }
}, { timestamps: true});

module.exports = mongoose.model('Product', ProductSchema);