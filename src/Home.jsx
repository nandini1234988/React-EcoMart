import React from 'react';
import './Home.css';

const categories = [
  { name: 'Vegetables', image: '/images/vegetables.jpg' },
  { name: 'Non-Veg', image: '/images/nonveg.jpg' },
  { name: 'Milk Products', image: '/images/milk.jpg' },
  { name: 'Chocolates', image: '/images/chocolates.jpg' },
 
];

const features = [
  {
    title: '100% Freshness',
    desc: 'Handpicked goods with utmost care.',
    icon: '🥬',
  },
  {
    title: 'Fast Delivery',
    desc: 'Groceries at your door in hours.',
    icon: '🛵',
  },
  {
    title: 'Secure Payments',
    desc: 'Your data is always safe with us.',
    icon: '🛡️',
  },
  {
    title: 'Customer Support',
    desc: 'Available 24/7 for any queries.',
    icon: '☎️',
  },
];

function Home() {
  return (
    <div className="home-container">
      <h2 className="section-title">Explore Categories</h2>
      <div className="categories">
        {categories.map((cat) => (
          <div className="category-card" key={cat.name}>
            <img src={cat.image} alt={cat.name} />
            <p>{cat.name}</p>
          </div>
        ))}
      </div>

      <div className="quote">
        <em>"Fresh groceries, fast delivery — just a click away."</em>
      </div>

      <h2 className="section-title">Why Shop With Us</h2>
      <div className="features">
        {features.map((feature) => (
          <div className="feature-card" key={feature.title}>
            <h3>{feature.icon} {feature.title}</h3>
            <p>{feature.desc}</p>
          </div>
        ))}
      </div>

      
    </div>
  );
}

export default Home;
