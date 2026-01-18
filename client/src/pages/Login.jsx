import React, { useState } from 'react';
import { api } from '../api';
import { useNavigate } from 'react-router-dom';

export default function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      // Check your port (5000 or 5001)
      const res = await api.get("/auth/login", {
        username,
        password
      });

      // Save the ID Card (Token) in browser storage
      localStorage.setItem("token", res.data.token);
      localStorage.setItem("isAdmin", res.data.isAdmin);

      alert("Login Successful!");
      navigate("/admin"); // Send to Dashboard
    } catch (err) {
      alert("Invalid Credentials");
    }
  };

  return (
    <div style={{ maxWidth: 300, margin: "50px auto", textAlign: "center" }}>
      <h1>Admin Login</h1>
      <form onSubmit={handleLogin} style={{ display: "flex", flexDirection: "column", gap: 10 }}>
        <input 
          placeholder="Username" 
          onChange={(e) => setUsername(e.target.value)}
          style={{ padding: 10 }}
        />
        <input 
          type="password" 
          placeholder="Password" 
          onChange={(e) => setPassword(e.target.value)}
          style={{ padding: 10 }}
        />
        <button type="submit" className="buy-btn">Login</button>
      </form>
    </div>
  );
}