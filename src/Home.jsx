import './Home.css';

export default function Home() {
  return (
    <div className="home-page">
      <section className="hero-section">
        <div className="hero-text slide-in-right">
          <h1>Welcome to EcoMart</h1>
          <p>Your neighbourhood grocer. A collection of local brands, here for you.</p>
        </div>
     


      </section>

      <section className="reasons-section">
        <h2>Reasons to love us</h2>
        <div className="reasons-container">
          <div className="reason-card">
            <div className="emoji">🛒</div>
            <h3>Wide Range</h3>
            <p>Groceries, veggies, snacks & more</p>
          </div>
          <div className="reason-card">
            <div className="emoji">🏪</div>
            <h3>Independent</h3>
            <p>Proudly run by local vendors</p>
          </div>
          <div className="reason-card">
            <div className="emoji">🥕🍗🍨🍫</div>
            <h3>Fresh Variety</h3>
            <p>Veg, non-veg, chocolates and more</p>
          </div>
          <div className="reason-card">
            <div className="emoji">💬</div>
            <h3>Engaged</h3>
            <p>Friendly and responsive service</p>
          </div>
        </div>
      </section>
    </div>
  );
}
