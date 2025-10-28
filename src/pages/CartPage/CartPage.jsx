import React from "react";
import { useCart } from "../../context/CartContext";
import "./CartPage.css";

const CartPage = () => {
  const { cart, removeFromCart, clearCart, addToCart, setCart } = useCart();

  // Decrease quantity handler
  const decreaseQuantity = (id) => {
    setCart(
      (prev) =>
        prev
          .map((item) =>
            item.id === id ? { ...item, quantity: item.quantity - 1 } : item
          )
          .filter((item) => item.quantity > 0) // remove if quantity = 0
    );
  };

  // Calculate total price
  const totalPrice = cart.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  if (cart.length === 0) {
    return <h2>Your cart is empty.</h2>;
  }

  return (
    <div>
      <h1>Your Cart</h1>
      <ul>
        {cart.map((item) => (
          <li key={item.id}>
            {item.name} – ${item.price.toFixed(2)} x {item.quantity}
            <button onClick={() => addToCart(item)}>+</button>
            <button onClick={() => decreaseQuantity(item.id)}>-</button>
            <button onClick={() => removeFromCart(item.id)}>Remove</button>
          </li>
        ))}
      </ul>
      <h2>Total: ${totalPrice.toFixed(2)}</h2>
      <button onClick={clearCart}>Clear Cart</button>
    </div>
  );
};

export default CartPage;
