import { useState, useEffect } from "react";

// KEY for localStorage
const CART_KEY = "ecom_demo_cart";

const useCart = () => {
  const [cart, setCart] = useState([]);
  const [notification, setNotification] = useState(null);

  // Load cart from localStorage on first render
  useEffect(() => {
    try {
      const stored = localStorage.getItem(CART_KEY);
      if (stored) {
        setCart(JSON.parse(stored));
      }
    } catch (err) {
      console.error("Failed to load cart:", err);
    }
  }, []);

  // Save cart to localStorage whenever it changes
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
      const existing = prev.find((p) => p.id === product.id);
      if (existing) {
        return prev.map((p) =>
          p.id === product.id ? { ...p, quantity: p.quantity + 1 } : p
        );
      } else {
        return [...prev, { ...product, quantity: 1 }];
      }
    });

    // Show notification
    setNotification(`${product.name} added to cart`);
    setTimeout(() => setNotification(null), 2000);
  };

  // Remove by id
  const removeFromCart = (id) => {
    setCart((prev) => prev.filter((p) => p.id !== id));
  };

  // Clear cart
  const clearCart = () => setCart([]);

  return { cart, addToCart, removeFromCart, clearCart, notification };
};

export default useCart;
