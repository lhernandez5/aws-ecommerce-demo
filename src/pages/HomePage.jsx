import React, { useState } from 'react';
import ProductCard from '../components/ProductCard/ProductCard';
import { products } from '../utils/mockData';

const HomePage = () => {
  const [cart, setCart] = useState([]);

  const handleAddToCart = (product) => {
    setCart((prev) => [...prev, product]);
    alert(`${product.name} added to cart`);
  };

  return (
    <div>
      <h1>Demo E-Commerce Store</h1>
      <div style={{ display: 'flex', flexWrap: 'wrap' }}>
        {products.map((p) => (
          <ProductCard key={p.id} product={p} onAddToCart={handleAddToCart} />
        ))}
      </div>
      <div>
        <h2>Cart ({cart.length} items)</h2>
      </div>
    </div>
  );
};

export default HomePage;