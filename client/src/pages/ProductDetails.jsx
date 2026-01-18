import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { api } from '../api'; // Import the new file
import { useCart } from '../context/CartContext'; // <--- Import 1

export default function ProductDetails() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const { addToCart } = useCart(); // <--- Import 2

  useEffect(() => {
    api.get(`/products/${id}`) // Check your port!
      .then(res => setProduct(res.data))
      .catch(err => console.log(err));
  }, [id]);

  if (!product) return <h2>Loading...</h2>;

  return (
    <div className="details-container">
      <div className="left-column">
        <img src={product.imageUrl} alt={product.name} />
      </div>
      <div className="right-column">
        <h1>{product.name}</h1>
        <h2 className="price">₹{product.price}</h2>
        <p>{product.description}</p>
        
        {/* Update the Button */}
        <button onClick={() => addToCart(product)} className="buy-btn">
          Add to Cart
        </button>
      </div>
    </div>
  );
}