import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Container, Grid, Paper, Typography, ThemeProvider } from '@mui/material';
import theme from '../Theme/theme'; // Import your custom theme
import './ProductDetails.css'; // Import your custom CSS
import { Link } from 'react-router-dom';

function processImageUrl(image) {
  const imageUrlArray = image.match(/\[([^\]]+)\]/);
  const imageUrls = imageUrlArray ? imageUrlArray[1].split(', ').map(url => url.replace(/\"/g, '')) : [];
  return imageUrls;
}

const ProductDetails = () => {
  const { productId } = useParams();
  const [productDetails, setProductDetails] = useState(null);
  const [recommendedProducts, setRecommendedProducts] = useState([]);

  useEffect(() => {
    // Fetch product details using the productId from your API
    fetch(`http://localhost:5000/products/${productId}`)
      .then(response => response.json())
      .then(data => {
        setProductDetails(data.product_details);
        setRecommendedProducts(data.recommended_products);
      })
      .catch(error => console.error('Error fetching product details:', error));
  }, [productId]);

  if (!productDetails) {
    return <div>Loading...</div>;
  }

  const imageUrlArray = productDetails.image.match(/\[([^\]]+)\]/);
  const imageUrls = imageUrlArray ? imageUrlArray[1].split(', ').map(url => url.replace(/\"/g, '')) : [];

  return (
    <ThemeProvider theme={theme}>
      <Container maxWidth="lg">
        <Paper elevation={3} className="product-details-container">
          <Grid container spacing={3}>
            <Grid item xs={12} md={6}>
              <div className="product-image-container">
                {imageUrls.map((imageUrl, index) => (
                  <img
                    key={index}
                    className="product-image"
                    src={imageUrl}
                    alt={productDetails.product_name}
                  />
                ))}
              </div>
            </Grid>
            <Grid item xs={12} md={6}>
              <div className="product-info">
                <Typography variant="h5" component="h2" className="product-name">
                  {productDetails.product_name}
                </Typography>
                <Typography variant="h6" color="primary" className="product-price">
                  Price: Rs. {productDetails.discounted_price}
                </Typography>
                <Typography variant="body1" className="product-description">
                  {productDetails.description}
                </Typography>
                {/* Add more details here */}
              </div>
            </Grid>
          </Grid>
        </Paper>
        <h1> Related & Similar Products</h1>
        <Grid container spacing={3}>
          {recommendedProducts.map(recommendedProduct => (
            <Grid item key={recommendedProduct.uniq_id} xs={12} sm={6} md={4} lg={3}>
              <Paper className="recommended-product">
              <Link to={`/products/${recommendedProduct.uniq_id}`}>
                 <img src={processImageUrl(recommendedProduct.image)[0]}
                  alt={recommendedProduct.product_name}
                />
                <Typography variant="subtitle1" className="recommended-product-name">
                  {recommendedProduct.product_name}
                </Typography>
                <Typography variant="subtitle2" className="recommended-product-name" style={{ color: 'red'}}>Price: Rs.{' '} 
                    {recommendedProduct.discounted_price}
                </Typography>
                </Link>
              </Paper>
            </Grid>
          ))}
        </Grid>
      </Container>
    </ThemeProvider>
  );
};

export default ProductDetails;
