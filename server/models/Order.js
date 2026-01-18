const mongoose = require('mongoose');

const OrderSchema = new mongoose.Schema({
  customerName: { type: String, required: true },
  address: { type: String, required: true },
  phone: { type: String, required: true },
  
  // What did they buy?
  items: [
    {
      productId: { type: String },
      name: { type: String },
      quantity: { type: Number },
      price: { type: Number }
    }
  ],
  
  totalAmount: { type: Number, required: true },
  status: { type: String, default: "Pending" } // Pending, Shipped, Delivered
}, { timestamps: true });

module.exports = mongoose.model('Order', OrderSchema);