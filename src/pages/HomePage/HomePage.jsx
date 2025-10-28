import React, { useState } from "react";
import ProductCard from "../../components/ProductCard/ProductCard";
import { products } from "../../utils/mockData";
import { useCart } from "../../context/CartContext";
import "./HomePage.css";

const HomePage = () => {
  const { cart, addToCart } = useCart();

  return (
    <div className="home-container">
      <h1>Products</h1>
      <div className="product-grid" style={{ display: "flex", gap: "1rem", flexWrap: "wrap" }}>
        {products.map((p) => {
          // Find the product in the cart
          const inCart = cart.find((c) => c.id === p.id);
          return (
            <ProductCard
              key={p.id}
              product={p}
              onAdd={() => addToCart(p)}
              quantity={inCart ? inCart.quantity : 0} // pass quantity
            />
          );
        })}
      </div>
    </div>
  );
};

export default HomePage;
