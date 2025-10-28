import React from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import HomePage from "./pages/HomePage/HomePage";
import CartPage from "./pages/CartPage/CartPage";
import CheckoutPage from "./pages/CheckoutPage/CheckoutPage";
import ThankYouPage from "./pages/ThankYouPage/ThankYouPage";
import Notification from "./components/Notification/Notification";
import { CartProvider, useCart } from "./context/CartContext";

const Layout=()=> {
  const { notification, cart } = useCart();
  // Count total items in cart
  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <>
      <nav>
        <Link to="/">Home</Link>
        <Link to="/cart">Cart ({totalItems})</Link>
        <Link to="/checkout">Checkout</Link>
      </nav>

      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/cart" element={<CartPage />} />
        <Route path="/checkout" element={<CheckoutPage />} />
        <Route path="/thank-you" element={<ThankYouPage />} />
      </Routes>

      <Notification message={notification} />
    </>
  );
}

function App() {
  return (
    <CartProvider>
      <Router>
        <Layout />
      </Router>
    </CartProvider>
  );
}

export default App;
