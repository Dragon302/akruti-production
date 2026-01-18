import React, { useEffect, useState } from 'react';
import { api } from '../api';
import { useNavigate } from 'react-router-dom'; // <--- 1. Import Navigation Hook

export default function AdminOrders() {
  const [orders, setOrders] = useState([]);
  const navigate = useNavigate(); // <--- 2. Initialize Navigation

  useEffect(() => {
    // --- SECURITY CHECK START ---
    const token = localStorage.getItem("token");
    const isAdmin = localStorage.getItem("isAdmin");

    // If no token, or user is not an admin -> Kick them out!
    if (!token || isAdmin !== "true") {
      alert("Access Denied! You must log in as Admin first.");
      navigate("/login"); 
      return; 
    }
    // --- SECURITY CHECK END ---

    // Fetch all orders (Only runs if security check passes)
    api.get('/orders') 
      .then(res => setOrders(res.data))
      .catch(err => console.error(err));
  }, [navigate]);

  return (
    <div className="admin-container">
      <h1>Admin Dashboard: Incoming Orders</h1>
      
      {/* Logout Button for convenience */}
      <button 
        onClick={() => {
          localStorage.clear();
          navigate("/login");
        }}
        style={{ background: 'red', color: 'white', border: 'none', padding: '5px 10px', cursor: 'pointer', marginBottom: '20px' }}
      >
        Logout
      </button>

      {orders.length === 0 ? <p>No orders yet.</p> : (
        <table className="orders-table">
          <thead>
            <tr>
              <th>Order ID</th>
              <th>Customer</th>
              <th>Address</th>
              <th>Items</th>
              <th>Total</th>
              <th>Date</th>
            </tr>
          </thead>
          <tbody>
            {orders.map(order => (
              <tr key={order._id}>
                <td>{order._id.substring(0, 8)}...</td>
                <td>
                  <strong>{order.customerName}</strong><br/>
                  {order.phone}
                </td>
                <td>{order.address}</td>
                <td>
                  {order.items.map((item, index) => (
                    <div key={index}>
                      {item.quantity}x {item.name}
                    </div>
                  ))}
                </td>
                <td>₹{order.totalAmount}</td>
                <td>{new Date(order.createdAt).toLocaleDateString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}