import React from 'react';
import './AboutUs.css'; // Make sure to import your CSS for styling

function AboutUs() {
  return (
    <div className="about-container">
      <div className="about-header">
        <h2>About Us</h2>
        <p className="about-subheading">
          Your Trusted Online Eco-Basket Partner for Fresh and Quality Products
        </p>
      </div>
      
      <div className="about-content">
        <div className="about-text">
          <p>
            Welcome to EcoBasket! We are committed to delivering fresh and quality groceries right to your doorstep.
          </p>
          <p>
            Our mission is to make grocery shopping convenient, affordable, and fast. We offer a wide range of vegetables, fruits, dairy products, packaged goods, and more.
          </p>
          <p>
            With a strong delivery network and user-friendly platform, we ensure you get what you need with just a few clicks.
          </p>
          <p>
            Thank you for choosing us. We look forward to serving you!
          </p>
        </div>

        <div className="about-image">
          <img src="/images/about-us-image.jpg" alt="Fresh groceries" />
        </div>
      </div>
    </div>
  );
}

export default AboutUs;
