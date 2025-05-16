// Chocolates.jsx
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import './chocolates.css';
import { AddToCart } from './store';

function Chocolates() {
  const chocolates = useSelector((globalState) => globalState.products.Chocolates);
  const dispatch = useDispatch();

  // the list of chocolates //
  const chocoCards = chocolates.map((item, index) => (
    <div className="choco-card" key={index}>
      <img src={`/images/${item.image}`} alt={item.name} />
      <div className="choco-name">{item.name}</div>
      <div className="choco-price">₹{item.price.toFixed(2)}</div>
      <button onClick={() => dispatch(AddToCart(item))}>Add to Cart</button>
    </div>
  ));

  return (
    <div className="choco-section">
      <h2>Delicious Chocolates</h2>
      <div className="choco-scroll-container">
        {chocoCards}
      </div>
    </div>
  );
}

export default Chocolates;
