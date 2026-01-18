import React, { useEffect, useState } from 'react';
import { api } from '../api'; // Import the new file
import ProductCard from '../components/ProductCard';

export default function Shop() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch products from backend when page loads
  useEffect(() => {
    // CHANGE 5001 TO 5000 IF YOU DID NOT CHANGE YOUR SERVER PORT
   api.get('/products') // Remove the 'http://localhost...' part // Make sure it is 5000 
      .then(res => {
        setProducts(res.data);
        setLoading(false);
      })
      .catch(err => {
        console.error(err);
        setLoading(false);
      });
  }, []);

  return (
    <div className="shop-container">
      <h1>Akruti 3D Store</h1>
      
      {loading ? (
        <p>Loading cool 3D parts...</p>
      ) : (
        <div className="products-grid">
          {products.length === 0 ? (
             <p>No products found. (We need to add some!)</p>
          ) : (
            products.map(product => (
              <ProductCard key={product._id} product={product} />
            ))
          )}
        </div>
      )}
    </div>
  );
}