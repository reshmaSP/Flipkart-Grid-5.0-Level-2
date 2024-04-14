import React, { useState, useEffect } from 'react';
import '../css/service.css';
import { Link } from 'react-router-dom';


function processImageUrl(image) {
  const imageUrlArray = image.match(/\[([^\]]+)\]/);
  const imageUrls = imageUrlArray ? imageUrlArray[1].split(', ').map(url => url.replace(/\"/g, '')) : [];
  return imageUrls;
}

const Beauty = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    // Fetch products from your Flask API
    fetch('http://localhost:5000/products')
      .then(response => response.json())
      .then(data => {
        // Filter products based on category "Automotive"
        const automotiveProducts = data.filter(product => product.category === 'Beauty and Personal Care');
        setProducts(automotiveProducts);
      })
      .catch(error => console.error('Error fetching products:', error));
  }, []);

  return (
    <div className="app-container">
      <h1>Beauty and Personal Care</h1>
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
//   const [products, setProducts] = useState([]);
//   var category;
  
//   useEffect(() => {
//     // Fetch products from your Flask API
//     fetch('http://localhost:5000/products')
//       .then(response => response.json())
//       .then(data => {
//         // Filter products based on category "Clothing"
//         const clothingProducts = data.filter(product => product.category === 'Beauty and Personal Care');
//         setProducts(clothingProducts);
//       })
//       .catch(error => console.error('Error fetching products:', error));
//   }, []);

//   return (
//     <div className="App">
//       <h1>Product Collection</h1>
//       <div className="product-grid">
//         {products.map(product => (
//           <div key={product.product_name} className="product-card">
//             <img src={product.image} alt={product.product_name} />
//             <h3>{product.product_name}</h3>
//             <p>Price: Rs. {product.discounted_price}</p>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// }
export default Beauty;
