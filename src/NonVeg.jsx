import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import './nonVeg.css';
import { AddToCart } from './store';

function NonVeg() {
  const nonVegList = useSelector((globalState) => globalState.products.NonVeg);
  const dispatch = useDispatch();

  // ✅ Price filter using slider
  const maxAvailablePrice = Math.max(...nonVegList.map((item) => item.price));
  const [maxPrice, setMaxPrice] = useState(maxAvailablePrice);

  const handleSliderChange = (e) => {
    setMaxPrice(Number(e.target.value));
    setCurrentPage(1); // reset to page 1 when filtering
  };

  const filteredList = nonVegList.filter((item) => item.price <= maxPrice);

  // ✅ Pagination logic
  const itemsPerPage = 5;
  const [currentPage, setCurrentPage] = useState(1);
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredList.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(filteredList.length / itemsPerPage);

  const goToPage = (page) => {
    setCurrentPage(page);
  };

  // ✅ List of cards
  const nonVegCards = currentItems.map((item, index) => (
    <div className="nonveg-card" key={index}>
      <img src={`/images/${item.image}`} alt={item.name} />
      <div className="nonveg-name">{item.name}</div>
      <div className="nonveg-price">₹{item.price.toFixed(2)}</div>
      <button onClick={() => dispatch(AddToCart(item))}>Add to Cart</button>
    </div>
  ));

  return (
    <div className="nonveg-section">
      <h2>Fresh Non-Veg Items</h2>

      {/* ✅ Slider Filter */}
      <div className="slider-filter">
        <label htmlFor="priceSlider">
          Filter by Max Price: ₹{maxPrice}
        </label>
        <input
          type="range"
          id="priceSlider"
          min="0"
          max={maxAvailablePrice}
          step="1"
          value={maxPrice}
          onChange={handleSliderChange}
          style={{ width: '100%', marginTop: '10px' }}
        />
      </div>

      {/* ✅ Cards */}
      <div className="nonveg-scroll-container">
        {nonVegCards.length > 0 ? nonVegCards : <p>No items under ₹{maxPrice}</p>}
      </div>

      {/* ✅ Pagination Controls */}
      <div className="pagination-controls">
        <button
          onClick={() => goToPage(currentPage - 1)}
          disabled={currentPage === 1}
        >
          Previous
        </button>

        {Array.from({ length: totalPages }, (_, index) => (
          <button
            key={index + 1}
            onClick={() => goToPage(index + 1)}
            style={{
              margin: '0 5px',
              fontWeight: currentPage === index + 1 ? 'bold' : 'normal',
            }}
          >
            {index + 1}
          </button>
        ))}

        <button
          onClick={() => goToPage(currentPage + 1)}
          disabled={currentPage === totalPages}
        >
          Next
        </button>
      </div>
    </div>
  );
}

export default NonVeg;
