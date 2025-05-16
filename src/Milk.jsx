import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import './milk.css';
import { AddToCart } from './store';

function Milk() {
  const milkList = useSelector((globalState) => globalState.products.Milk);
  const dispatch = useDispatch();

  //the list of milk item //
  const milkCards = milkList.map((item, index) => (
    <div className="milk-card" key={index}>
      <img src={`/images/${item.image}`} alt={item.name} />
      <div className="milk-name">{item.name}</div>
      <div className="milk-price">₹{item.price.toFixed(2)}</div>
      <button onClick={() => dispatch(AddToCart(item))}>Add to Cart</button>
    </div>
  ));

  return (
    <div className="milk-section">
      <h2>Dairy Products</h2>
      <div className="milk-scroll-container">
        {milkCards}
      </div>
    </div>
  );
}

export default Milk;
