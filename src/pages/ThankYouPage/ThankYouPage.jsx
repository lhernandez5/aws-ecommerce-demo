import React from "react";
import { useLocation, Link } from "react-router-dom";
import "./ThankYouPage.css";

export default function ThankYouPage() {
  const { state } = useLocation();
  const order = state?.order;

  if (!order) {
    return (
      <div className="thank-page">
        <h2>No recent order found.</h2>
        <Link to="/">Return to store</Link>
      </div>
    );
  }

  return (
    <div className="thank-page">
      <h1>Thank you for your order!</h1>
      <p>Order ID: <strong>{order.id}</strong></p>
      <p>Placed: {new Date(order.createdAt).toLocaleString()}</p>

      <h3>Shipping</h3>
      <div className="shipping">
        <div>{order.customer.fullName}</div>
        <div>{order.customer.address}</div>
        <div>
          {order.customer.city}, {order.customer.state} {order.customer.zip}
        </div>
        <div>{order.customer.email}</div>
      </div>

      <h3>Items</h3>
      <ul className="thank-items">
        {order.items.map((it) => (
          <li key={it.id}>
            {it.name} x{it.quantity} — ${(it.price * it.quantity).toFixed(2)}
          </li>
        ))}
      </ul>

      <h3>Total Paid (mock)</h3>
      <p><strong>${order.total.toFixed(2)}</strong></p>

      <Link className="back-link" to="/">Back to store</Link>
    </div>
  );
}