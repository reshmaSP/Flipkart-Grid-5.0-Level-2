

import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import '../css/service.css';

function processImageUrl(image) {
  const imageUrlArray = image.match(/\[([^\]]+)\]/);
  const imageUrls = imageUrlArray ? imageUrlArray[1].split(', ').map(url => url.replace(/\"/g, '')) : [];
  return imageUrls;
}


const Automotive = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    // Fetch products from your Flask API
    fetch('http://localhost:5000/products')
      .then(response => response.json())
      .then(data => {
        // Filter products based on category "Automotive"
        const automotiveProducts = data.filter(product => product.category === 'Automotive');
        setProducts(automotiveProducts);
      })
      .catch(error => console.error('Error fetching products:', error));
  }, []);

  return (
    <div className="app-container">
      <h1>Automotive Collection</h1>
      <div className="product-grid">
        {products.map(product => (
          <Link
            to={`/products/${product.uniq_id}`} // Replace with the actual URL for the product page
            key={product.product_name}
            className="product-card-link"
          >
            <div className="product-card">
              <img src={processImageUrl(product.image)[0]} alt={product.product_name} />
              <h3>{product.product_name}</h3>
              <p>Price: Rs. {product.discounted_price}</p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Automotive;