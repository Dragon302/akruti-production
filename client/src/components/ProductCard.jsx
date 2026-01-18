import React from 'react';
import { Link } from 'react-router-dom'; // <--- Import Link

export default function ProductCard({ product }) {
  return (
    <div className="product-card">
      <img src={product.imageUrl} alt={product.name} className="product-image" />
      <div className="product-info">
        <h3>{product.name}</h3>
        <p className="category">{product.category}</p>
        <div className="price-row">
          <span className="price">₹{product.price}</span>
          {/* Change Button to Link */}
          <Link to={`/product/${product._id}`} className="add-btn">
            View Details
          </Link>
        </div>
      </div>
    </div>
  );
}