import React from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';

export default function Navbar() {
  const { cart } = useCart();

  return (
    <nav className="navbar">
      <Link to="/" className="logo">Akruti 3D Store</Link>
      <div className="nav-links">
        <Link to="/">Shop</Link>
        <Link to="/cart">
          Cart ({cart.length})
        </Link>
      </div>
    </nav>
  );
}