import React from 'react';
import './aboutus.css';

const AboutUs = () => {
  const cards = [
    {
      title: "OUR STORY",
      text: "We began with a passion for innovation and a desire to make a difference. From our humble beginnings, we’ve grown with integrity and purpose.",
    },
    {
      title: "OUR TEAM",
      text: "Our team is made up of professionals dedicated to excellence. We value collaboration, creativity, and commitment in everything we do.",
    },
    {
      title: "OUR HISTORY",
      text: "Over the years, we’ve reached major milestones and helped countless clients achieve success through our consistent quality and innovation.",
    },
    {
      title: "OUR FUTURE",
      text: "Looking ahead, we aim to lead with sustainability, embrace new technologies, and continue growing stronger together with our partners.",
    },
  ];

  return (
    <div className="about-container">
      <h1 className="about-title">ABOUT US</h1>
      <div className="about-hero"></div>
      <div className="card-container">
        {cards.map((card, index) => (
          <div key={index} className="about-card">
            <h2>{card.title}</h2>
            <p>{card.text}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AboutUs;
