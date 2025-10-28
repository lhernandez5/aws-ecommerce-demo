import React from "react";
import { useCart } from "../../context/CartContext";
import "./OrderSummary.css";
import { Link } from "react-router-dom";

export default function OrderSummary() {
  const { cart } = useCart();

  const total = cart.reduce((s, it) => s + it.price * it.quantity, 0);
  const itemCount = cart.reduce((s, it) => s + it.quantity, 0);

  if (cart.length === 0) {
    return (
      <div className="order-summary empty">
        <p>Your cart is empty.</p>
        <Link to="/">Back to products</Link>
      </div>
    );
  }

  return (
    <div className="order-summary">
      <h3>Order Summary</h3>
      <div className="items">
        {cart.map((it) => (
          <div key={it.id} className="summary-item">
            <div className="meta">
              <div className="name">{it.name}</div>
              <div className="qty">x{it.quantity}</div>
            </div>
            <div className="price">${(it.price * it.quantity).toFixed(2)}</div>
          </div>
        ))}
      </div>

      <div className="summary-footer">
        <div className="line">
          <div>Items ({itemCount})</div>
          <div>${total.toFixed(2)}</div>
        </div>

        <div className="note">
          This is a mock checkout — payments are not processed in Phase 1.
        </div>
      </div>
    </div>
  );
}