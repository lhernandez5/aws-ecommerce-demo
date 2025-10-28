import React from "react";
import CheckoutForm from "../../components/CheckoutForm/CheckoutForm";
import OrderSummary from "../../components/OrderSummary/OrderSummary";
import "./CheckoutPage.css";

const CheckoutPage = () => {
  return (
    <div className="checkout-page">
      <div className="checkout-left">
        <h1>Checkout</h1>
        <CheckoutForm />
      </div>

      <aside className="checkout-right">
        <OrderSummary />
      </aside>
    </div>
  );
};

export default CheckoutPage;
