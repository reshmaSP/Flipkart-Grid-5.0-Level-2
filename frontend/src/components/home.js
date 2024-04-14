import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import '../css/Home.css'; // Import your custom CSS here
import axios from 'axios';

function processImageUrl(image) {
  const imageUrlArray = image.match(/\[([^\]]+)\]/);
  const imageUrls = imageUrlArray ? imageUrlArray[1].split(', ').map(url => url.replace(/\"/g, '')) : [];
  return imageUrls;
}

function Home() {
  const navigate = useNavigate();
  const [selectedOption, setSelectedOption] = useState('');
  const [recommendedProducts, setRecommendedProducts] = useState([]);
  const [loading, setLoading] = useState(true); // Define the loading state

  const handleOptionChange = (event) => {
    setSelectedOption(event.target.value);
    // Redirect to the selected route
    navigate(event.target.value);
  };

  useEffect(() => {
    async function fetchRecommendedProducts() {
      try {
        const response = await axios.get('http://localhost:5000/home');
        setRecommendedProducts(response.data.recommended_products); // Make sure the response.data.recommended_products is an array
        setLoading(false);
      } catch (error) {
        console.error('Error fetching recommended products:', error);
        setLoading(false);
      }
    }

    fetchRecommendedProducts();
  }, []);

  return (
    <div className="home-container">
      <h2 className="page-title">Explore Categories</h2>
      <select
        value={selectedOption}
        onChange={handleOptionChange}
        className="category-select"
      >
        <option value="">Select a category</option>
        <option value="/product">Jewellery</option>
        <option value="/automotive">Automotive</option>
        <option value="/footwear">Footwear</option>
        <option value="/decor">Home Decor and Festive Needs</option>
        <option value="/kitchen">Kitchen & Dining</option>
        <option value="/watch">Watch</option>
        <option value="/furnishing">Furnishing</option>
        <option value="/beauty">Beauty and Personal Care</option>
        <option value="/mobile">Mobiles & Accessories</option>
        <option value="/clothing">Clothing</option>
      </select>
      <h1> Products you would like</h1>
      <div className="recommended-products-grid">
        {recommendedProducts.map((product, index) => (
           <Link to={`/products/${product.uniq_id}`} className="product-link">
          <div key={index} className="recommended-product">
            <img
              src={processImageUrl(product.image)[0]} // Adjust this based on the actual image field
              alt={product.product_name}
            />
            <p className="recommended-product-name">{product.product_name}</p>
            <p className="recommended-product-price">
              Price: Rs. {product.discounted_price}
            </p>
          </div></Link>
        ))}
      </div>
    </div>
  );
}

export default Home;
