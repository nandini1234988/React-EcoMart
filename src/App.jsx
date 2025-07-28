import React from 'react';
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import './navbar.css';
import {
  FaHome, FaLeaf, FaDrumstickBite, FaGlassWhiskey, FaCandyCane,
  FaShoppingCart, FaBox, FaInfoCircle, FaPhoneAlt, FaSignInAlt,
} from 'react-icons/fa';

import Home from './Home';
import Veg from './Veg';
import NonVeg from './NonVeg';
import Milk from './Milk';
import Chocolates from './Chocolates';
import Cart from './Cart';
import Orders from './Orders';
import AboutUs from './AboutUs';
import ContactUs from './ContactUs';
import Signing from './Signing';
import SignUp from './SignUp';
import { logOut } from './store';

function App() {
  const cartItems = useSelector(state => state.cart);
  const cartCount = cartItems.reduce((total, item) => total + item.quantity, 0);
  const dispatch = useDispatch();
  const isAuthenticated = useSelector(state => state.users.isAuthenticated);
  const currentUser = useSelector(state => state.users.currentUser);

  return (
    <BrowserRouter basename="/React-EcoMart">
      <nav className="navbar">
        <div className="navbar-links">
          
          <Link to="/" className="navbar-link"><FaHome className="icon" /> Home</Link>
          <Link to="/Veg" className="navbar-link"><FaLeaf className="icon" /> Veg</Link>
          <Link to="/NonVeg" className="navbar-link"><FaDrumstickBite className="icon" /> Non-Veg</Link>
          <Link to="/Milk" className="navbar-link"><FaGlassWhiskey className="icon" /> Milk</Link>
          <Link to="/Chocolates" className="navbar-link"><FaCandyCane className="icon" /> Chocolates</Link>
          <Link to="/Cart" className="navbar-link"><FaShoppingCart className="icon" /> Cart({cartCount})</Link>
          <Link to="/Orders" className="navbar-link"><FaBox className="icon" /> Orders</Link>
          <Link to="/AboutUs" className="navbar-link"><FaInfoCircle className="icon" /> AboutUs</Link>
          <Link to="/ContactUs" className="navbar-link"><FaPhoneAlt className="icon" /> ContactUs</Link>
          {isAuthenticated ? (
            <div>
              <span style={{ color: 'pink', fontWeight: 'bold' }}>Welcome, {currentUser.username}</span>
              <button onClick={() => dispatch(logOut())}>Log Out</button>
            </div>
          ) : (
            <Link to="/Signing" className="navbar-link"><FaSignInAlt className="icon" /> Sign In</Link>
          )}
        </div>
      </nav>

      <div className="main-content">
        <Routes>
         
          <Route path="/" element={<Home />} />
          <Route path="/Veg" element={<Veg />} />
          <Route path="/NonVeg" element={<NonVeg />} />
          <Route path="/Milk" element={<Milk />} />
          <Route path="/Chocolates" element={<Chocolates />} />
          <Route path="/Signing" element={<Signing />} />
          <Route path="/SignUp" element={<SignUp />} />
          <Route path="/Cart" element={<Cart />} />
          <Route path="/Orders" element={<Orders />} />
          <Route path="/AboutUs" element={<AboutUs />} />
          <Route path="/ContactUs" element={<ContactUs />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;