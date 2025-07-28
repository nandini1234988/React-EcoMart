// src/pages/Home.jsx
import React from 'react';
import './home.css';
import { Link } from 'react-router-dom';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

const Home = () => {
  const sliderSettings = {
    autoplay: true,
    autoplaySpeed: 3000,
    infinite: true,
    dots: true,
    arrows: false,
  };

  return (
    <div className="home-container">
      {/* Hero Section with Carousel */}
      <header className="hero-section">
        <div className="hero-content">
          <Slider {...sliderSettings}>
            <div>
              <h1>Welcome to EcoMart 🛒</h1>
              <p>Your one-step to shop for fresh, organic, and affordable groceries!</p>
            </div>
            <div>
              <h1>Fresh Vegetables Delivered 🥬</h1>
              <p>From local farms to your doorstep in no time!</p>
            </div>
            <div>
              <h1>Daily Dairy & Meats 🧀</h1>
              <p>Pure milk, paneer, and fresh Icecreams🍨from trusted sources.</p>
            </div>
            <div>
              <h1>Sweet Deals on Chocolates 🍫</h1>
              <p>Grab delicious treats at affordable prices.</p>
            </div>
          </Slider>
          <Link to="/Veg" className="shop-btn">Start Shopping</Link>
        </div>
      </header>

      {/* Features Section */}
      <section className="features-section">
        <h2>✨ Why Choose Us?</h2>
        <ul>
          <li>🚚 Superfast & Contactless Delivery</li>
          <li>💳 Multiple Payment Options</li>
          <li>🎁 Exclusive Coupons & Offers</li>
          <li>🌱 Fresh from Local Farmers</li>
        </ul>
      </section>

      {/* CTA Section */}
      <section className="cta-section">
        <h3>💼 Already placed an order?</h3>
        <p>Track or manage your orders anytime!</p>
        <Link to="/orders">
          <button className="secondary-btn">📦 My Orders</button>
        </Link>
      </section>

      {/* Footer */}
      <footer className="footer">
        <div className="footer-content">
          <p>© {new Date().getFullYear()} Eco-Mart Grocery Store</p>
          <p>📞 Support: +91-9848326168 | ✉ Email: nandini17224@gmail.com</p>
        </div>
      </footer>
    </div>
  );
};

export default Home;
