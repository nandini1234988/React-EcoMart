import React from "react";
import { useSelector } from 'react-redux';
import "./Orders.css";

function Orders() {
  const orders = useSelector(state => state.orders || []);

  if (orders.length === 0) {
    return <h2>No orders placed yet 🛍️</h2>;
  }

  return (
    <div className="order-list">
      <h2>🛍️ Order History</h2>
      {orders.map(order => (
        <div key={order.id} className="order-card">
          <h3>Order 🆔: {order.id}</h3>
          <p> 📅{order.date}</p>
          <p>Total: ₹{order.total}</p>
          <h4>Items:</h4>
          <ul>
            {order.items.map(item => (
              <li key={item.id}>
                {item.name} × {item.quantity} — ₹{item.price} each
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
}

export default Orders;
