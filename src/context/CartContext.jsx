import React, { createContext, useContext, useState, useEffect } from "react";

const CartContext = createContext();
const CART_KEY = "ecom_demo_cart";

export const CartProvider = ({ children })=> {
  const [cart, setCart] = useState([]);
  const [notification, setNotification] = useState(null);

  // Load cart from localStorage
  useEffect(() => {
    try {
      const stored = localStorage.getItem(CART_KEY);
      if (stored) setCart(JSON.parse(stored));
    } catch (err) {
      console.error("Failed to load cart:", err);
    }
  }, []);

  // Save cart to localStorage
  useEffect(() => {
    try {
      localStorage.setItem(CART_KEY, JSON.stringify(cart));
    } catch (err) {
      console.error("Failed to save cart:", err);
    }
  }, [cart]);

  // Add product (increment if exists)
  const addToCart = (product) => {
    setCart((prev) => {
      // Look for matching product by id
      const index = prev.findIndex((p) => p.id === product.id);

      if (index !== -1) {
        // Copy previous state immutably
        const updated = [...prev];
        updated[index] = {
          ...updated[index],
          quantity: updated[index].quantity + 1,
        };
        return updated;
      } else {
        // Add new product with quantity: 1
        return [...prev, { ...product, quantity: 1 }];
      }
    });

    // Show notification
    setNotification(`${product.name} added to cart`);
    setTimeout(() => setNotification(null), 2000);
  };

  const removeFromCart = (id) => {
    setCart((prev) => prev.filter((p) => p.id !== id));
  };

  const clearCart = () => setCart([]);

  return (
    <CartContext.Provider
      value={{
        cart,
        setCart,
        addToCart,
        removeFromCart,
        clearCart,
        notification,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export const useCart=()=> {
  return useContext(CartContext);
}
