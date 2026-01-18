import React, { createContext, useState, useContext } from 'react';

// Create the Context
const CartContext = createContext();

// Create the Provider (The wrapper that holds the data)
export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);

  // Function to add item
  const addToCart = (product) => {
    setCart((prevCart) => {
      // Check if item is already in cart
      const existingItem = prevCart.find((item) => item._id === product._id);
      
      if (existingItem) {
        // If yes, just increase quantity
        return prevCart.map((item) =>
          item._id === product._id ? { ...item, quantity: item.quantity + 1 } : item
        );
      } else {
        // If no, add new item with quantity 1
        return [...prevCart, { ...product, quantity: 1 }];
      }
    });
    alert("Added to Cart!"); // Simple feedback
  };

  // Function to remove item
  const removeFromCart = (id) => {
    setCart((prevCart) => prevCart.filter((item) => item._id !== id));
  };

  return (
    <CartContext.Provider value={{ cart, addToCart, removeFromCart }}>
      {children}
    </CartContext.Provider>
  );
};

// Custom Hook to use the Cart easily
export const useCart = () => useContext(CartContext);