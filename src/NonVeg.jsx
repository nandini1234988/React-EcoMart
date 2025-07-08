import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import './nonVeg.css';
import { AddToCart } from './store';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function NonVeg() {
  const nonVegList = useSelector((globalState) => globalState.products.NonVeg);
  const dispatch = useDispatch();

  // Price Range Filters
  const priceRanges = [
    { value: 'Rs 1 to Rs 50', min: 1, max: 50 },
    { value: 'Rs 51 to Rs 100', min: 51, max: 100 },
    { value: 'Rs 101 to Rs 200', min: 101, max: 200 },
    { value: 'Rs 201 to Rs 500', min: 201, max: 500 },
    { value: 'more than Rs 500', min: 501, max: Infinity },
  ];
  const [selectedRanges, setSelectedRanges] = useState([]);

  const handleCheckboxChange = (rangeValue) => {
    if (selectedRanges.includes(rangeValue)) {
      setSelectedRanges(selectedRanges.filter((r) => r !== rangeValue));
    } else {
      setSelectedRanges([...selectedRanges, rangeValue]);
    }
    setCurrentPage(1);
  };

  const clearAll = () => {
    setSelectedRanges([]);
  };

  const activeRanges = priceRanges.filter((range) =>
    selectedRanges.includes(range.value)
  );

  const filteredNonVegList =
    selectedRanges.length === 0
      ? nonVegList
      : nonVegList.filter((item) =>
          activeRanges.some(
            (range) => item.price >= range.min && item.price <= range.max
          )
        );

  // Pagination
  const itemsPerPage = 5;
  const [currentPage, setCurrentPage] = useState(1);
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredNonVegList.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(filteredNonVegList.length / itemsPerPage);

  const goToPage = (page) => {
    setCurrentPage(page);
  };

  // Cards
  const nonVegCards = currentItems.map((item, index) => (
    <div className="nonveg-card" key={index}>
      <img
  src={import.meta.env.BASE_URL + 'images/' + item.image}
  alt={item.name}
/>

      <div className="nonveg-name">{item.name}</div>
      <div className="nonveg-price">₹{item.price.toFixed(2)}</div>
      <button
        onClick={() => {
          dispatch(AddToCart(item));
          toast.success(`${item.name} added to cart!`, {
            position: 'top-right',
            autoClose: 2000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: false,
            draggable: true,
            progress: undefined,
          });
        }}
      >
        Add to Cart
      </button>
    </div>
  ));

  return (
    <div className="nonveg-section">
      <h2>Fresh Non-Veg Items</h2>

      <div className="nonveg-content">
        {/* Cards */}
        <div className="nonveg-scroll-container">
          {nonVegCards.length > 0 ? nonVegCards : <p>No non-veg items in this price range.</p>}
        </div>

        {/* Filter UI */}
        <div className="filter-section">
          <h4> Price Ranges</h4>
          {priceRanges.map((range) => (
            <label key={range.value} style={{ display: 'block' }}>
              <input
                type="checkbox"
                checked={selectedRanges.includes(range.value)}
                onChange={() => handleCheckboxChange(range.value)}
              />
              {range.value}
            </label>
          ))}
          <button onClick={clearAll}>Clear All</button>
        </div>
      </div>

      {/* Pagination */}
      <div className="pagination-controls">
        <button onClick={() => goToPage(currentPage - 1)} disabled={currentPage === 1}>
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

        <button onClick={() => goToPage(currentPage + 1)} disabled={currentPage === totalPages}>
          Next
        </button>
      </div>

      <ToastContainer />
    </div>
  );
}

export default NonVeg;
