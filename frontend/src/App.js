import React, { useEffect, useState } from 'react';
import './App.css';
import Home  from './components/home';

// import React from 'react';
import { Link } from 'react-router-dom';
import { BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import Navbar from './components/Navbar';
import Clothing from './components/clothing';
import ProductList from './components/service';
import Automotive from './components/Automotive';
import Footwear from './components/Footwear';
import Decor from './components/Decor';
import Kitchen from './components/Kitchen';
import Mobile from './components/Mobile';
import Beauty from './components/Beauty';
import Watches from './components/Watches';
import Furnishing from './components/Furnishing';
import ProductDetails from './components/Details/ProductDetails';
import Login from './components/Login';
import SignupCardOg from './components/signup';


function App() {
    return(
      <div>
      {/* <Navbar></Navbar> */}
      <Router>
      <Routes>

        <Route path="/home" exact element={<Home/>} />
        <Route path="/login" exact element={<Login/>} />
        <Route path="/" exact element={<SignupCardOg/>} />
        <Route path="/product" element={<ProductList/>} />
        <Route path="/clothing" element={<Clothing/>} />
        <Route path="/automotive" element={<Automotive/>} />
        <Route path="/footwear" element={<Footwear/>} />
        <Route path="/kitchen" element={<Kitchen/>} />
        <Route path="/mobile" element={<Mobile/>} />
        <Route path="/beauty" element={<Beauty/>} />
        <Route path="/watch" element={<Watches/>} />
        <Route path="/furnishing" element={<Furnishing/>} />
        <Route path="/decor" element={<Decor/>} />
        <Route path="/products/:productId" element={<ProductDetails/>} />
     </Routes>
    </Router>
   
      </div>
    );
}


export default App;
