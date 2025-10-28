import React from "react";

const ProductCard = ({ product, onAdd, quantity }) => {
  return (
    <div
      className="product-card"
      style={{ border: "1px solid #ddd", padding: "1rem" }}
    >
      <img src={product.image} alt={product.name} width="150" height="150" />
      <h3>{product.name}</h3>
      <p>${product.price.toFixed(2)}</p>
      <button onClick={onAdd}>Add to Cart</button>
      {quantity > 0 && (
        <p style={{ marginTop: "0.5rem" }}>In Cart: {quantity}</p>
      )}
    </div>
  );
};

export default ProductCard;
