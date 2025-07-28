import { Link } from 'react-router-dom';
import './Navbar.css'; // Make sure this matches your CSS filename

function Navbar() {
  return (
    <nav className="navbar">
      {/* Logo Section */}
      <Link to="/" className="logo-link">
        <img
          src="/images/logooo.jpg"
          alt="EcoMart Logo"
          className="logo-img"
        />
        <span className="logo-text">EcoMart</span>
      </Link>

      {/* Navigation Links */}
      <div className="navbar-links">
        <Link to="/" className="navbar-link"><span className="icon">🏠</span>Home</Link>
        <Link to="/veg" className="navbar-link"><span className="icon">🥬</span>Veg</Link>
        <Link to="/non-veg" className="navbar-link"><span className="icon">🍗</span>Non-Veg</Link>
        <Link to="/milk" className="navbar-link"><span className="icon">🥛</span>Milk</Link>
        <Link to="/chocolates" className="navbar-link"><span className="icon">🍫</span>Chocolates</Link>
        <Link to="/cart" className="navbar-link"><span className="icon">🛒</span>Cart</Link>
        <Link to="/orders" className="navbar-link"><span className="icon">📦</span>Orders</Link>
        <Link to="/about" className="navbar-link"><span className="icon">📘</span>About Us</Link>
        <Link to="/contact" className="navbar-link"><span className="icon">📞</span>Contact Us</Link>
        <Link to="/signin" className="navbar-link"><span className="icon">🔐</span>Sign In</Link>
      </div>
    </nav>
  );
}

export default Navbar;
