import React, { useState } from 'react';
import { useCart } from '../context/CartContext';
import { api } from '../api';
import { useNavigate } from 'react-router-dom';

export default function Cart() {
  const { cart, removeFromCart } = useCart();
  const navigate = useNavigate();
  
  // State for user details
  const [formData, setFormData] = useState({ name: '', address: '', phone: '' });

  const total = cart.reduce((acc, item) => acc + (item.price * item.quantity), 0);

  const handleCheckout = async () => {
    if (!formData.name || !formData.address || !formData.phone) {
      alert("Please fill in your details first!");
      return;
    }

    const orderData = {
      customerName: formData.name,
      address: formData.address,
      phone: formData.phone,
      items: cart,
      totalAmount: total
    };

    try {
      // Check your port (5000 or 5001)
      await api.get('/orders', orderData);
      alert("Order Placed Successfully! We will contact you soon.");
      // Ideally, clear cart here (we can add a clearCart function later)
      navigate('/'); // Go back to shop
    } catch (err) {
      console.error("Order failed", err);
      alert("Something went wrong. Check console.");
    }
  };

  if (cart.length === 0) return <h2>Your Cart is Empty</h2>;

  return (
    <div className="cart-container">
      <h1>Your Shopping Cart</h1>
      
      {/* List Items */}
      {cart.map((item) => (
        <div key={item._id} className="cart-item">
          <img src={item.imageUrl} className="cart-img" alt="" />
          <div className="cart-details">
            <h3>{item.name}</h3>
            <p>₹{item.price} x {item.quantity}</p>
          </div>
          <button onClick={() => removeFromCart(item._id)} className="remove-btn">Remove</button>
        </div>
      ))}

      {/* Checkout Form */}
      <div className="checkout-section">
        <h3>Shipping Details</h3>
        <input 
          placeholder="Your Name" 
          className="input-field"
          onChange={(e) => setFormData({...formData, name: e.target.value})}
        />
        <input 
          placeholder="Full Address" 
          className="input-field"
          onChange={(e) => setFormData({...formData, address: e.target.value})}
        />
        <input 
          placeholder="Phone Number" 
          className="input-field"
          onChange={(e) => setFormData({...formData, phone: e.target.value})}
        />

        <h2>Total: ₹{total}</h2>
        <button onClick={handleCheckout} className="checkout-btn">Place Order</button>
      </div>
    </div>
  );
}