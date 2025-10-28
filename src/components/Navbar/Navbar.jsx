import React, { useContext } from "react";
import { CartContext } from "../../context/CartContext";
import { Link } from "react-router-dom";

const Navbar = () => {
  const { cart } = useContext(CartContext);

  return (
    <nav style={{ padding: "10px", borderBottom: "1px solid #ddd" }}>
      <Link to="/">Home</Link> |{" "}
      <Link to="/cart">Cart ({cart.length})</Link>
    </nav>
  );
};

export default Navbar;