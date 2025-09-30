import React from 'react';
import './ProductCard.css';

const ProductCard = ({ product, onAddToCart }) => (
  <div className="product-card">
    <img src={product.image} alt={product.name} />
    <h3>{product.name}</h3>
    <p>${product.price.toFixed(2)}</p>
    <p>{product.description}</p>
    <button onClick={() => onAddToCart(product)}>Add to Cart</button>
  </div>
);

export default ProductCard;