import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import './milk.css';
import { AddToCart } from './store';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function Milk() {
  const milkList = useSelector((globalState) => globalState.products.Milk);
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

  // Apply filters
  const filteredMilkList =
    selectedRanges.length === 0
      ? milkList
      : milkList.filter((item) =>
          activeRanges.some(
            (range) => item.price >= range.min && item.price <= range.max
          )
        );

  // Pagination
  const itemsPerPage = 5;
  const [currentPage, setCurrentPage] = useState(1);
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredMilkList.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(filteredMilkList.length / itemsPerPage);

  const goToPage = (page) => {
    setCurrentPage(page);
  };

  // Create milk cards
  const milkCards = currentItems.map((item, index) => (
    <div className="milk-card" key={index}>
     <img
  src={import.meta.env.BASE_URL + 'images/' + item.image}
  alt={item.name}
/>

      <div className="milk-name">{item.name}</div>
      <div className="milk-price">₹{item.price.toFixed(2)}</div>
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
    <div className="milk-section">
      <h2>Dairy Products</h2>

      {/* Layout wrapper */}
      <div className="milk-content">
        {/* Cards Display */}
        <div className="milk-scroll-container">
          {milkCards.length > 0 ? milkCards : <p>No milk products in this price range.</p>}
        </div>

        {/* Filter UI */}
        <div className="filter-section">
          <h4>Price Ranges</h4>
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
          <button onClick={clearAll} style={{ marginTop: '10px' }}>
            Clear All
          </button>
        </div>
      </div>

      {/* Pagination Controls */}
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

      {/* Toastify */}
      <ToastContainer />
    </div>
  );
}

export default Milk;
