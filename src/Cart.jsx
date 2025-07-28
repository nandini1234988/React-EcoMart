import React, { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  addOrder,
  clearCart,
  DecrementItem,
  IncrementItem,
  RemoveFromCart,
} from './store';
import emailjs from '@emailjs/browser';
import './cart.css';
import QRCode from 'react-qr-code';
import { useNavigate } from 'react-router-dom';
import Confetti from 'react-confetti'; // 🎉 NEW IMPORT

function Cart() {
  const cartObjects = useSelector((state) => state.cart);
  const totalCartCount = cartObjects.reduce(
    (sum, item) => sum + item.quantity,
    0
  );

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [discountPercentage, setDiscountPercentage] = useState(0);
  const [couponCodeDiscountPercentage, setCouponCodeDiscountPercentage] = useState(0);
  const [couponName, setCouponName] = useState('');
  const [userEmail, setUserEmail] = useState('');
  const [paymentMethod, setPaymentMethod] = useState('');
  const [countdown, setCountdown] = useState(10);
  const [redirectTarget, setRedirectTarget] = useState(null);
  const [showThankYou, setShowThankYou] = useState(false); // 🎉 NEW STATE

  const couponCodeRef = useRef();
  const emailRef = useRef();

  useEffect(() => {
    let timer;
    if (redirectTarget) {
      timer = setInterval(() => {
        setCountdown((prev) => {
          if (prev <= 1) {
            clearInterval(timer);
            navigate(`/${redirectTarget}`);
          }
          return prev - 1;
        });
      }, 1000);
    }
    return () => clearInterval(timer);
  }, [redirectTarget, navigate]);

  const calculatingAmount = () => {
    let totalPrice = cartObjects.reduce(
      (total, item) => total + item.price * item.quantity,
      0
    );
    const discountAmount = (totalPrice * discountPercentage) / 100;
    const couponDiscountAmount = (totalPrice * couponCodeDiscountPercentage) / 100;
    const priceAfterDiscount = totalPrice - discountAmount - couponDiscountAmount;
    const taxAmount = (priceAfterDiscount * 5) / 100;
    const finalPrice = priceAfterDiscount + taxAmount;
    return {
      totalPrice,
      discountAmount,
      couponDiscountAmount,
      taxAmount,
      finalPrice,
    };
  };

  const {
    totalPrice,
    discountAmount,
    couponDiscountAmount,
    taxAmount,
    finalPrice,
  } = calculatingAmount();

  const handleCouponPercentage = () => {
    const code = couponCodeRef.current.value.trim().toUpperCase();
    setCouponName(code);
    switch (code) {
      case 'NANDINI10':
        setCouponCodeDiscountPercentage(10);
        break;
      case 'NANDINI20':
        setCouponCodeDiscountPercentage(20);
        break;
      case 'NANDINI30':
        setCouponCodeDiscountPercentage(30);
        break;
      default:
        alert('Invalid Coupon Code');
        setCouponCodeDiscountPercentage(0);
    }
  };

  const handleCompletePurchase = () => {
    if (cartObjects.length === 0) {
      setRedirectTarget('veg');
      return;
    }

    if (!userEmail.trim()) {
      alert('❌ Please enter your email.');
      return;
    }

    const purchaseDate = new Date().toLocaleString();
    const purchaseDetails = {
      id: Date.now(),
      date: purchaseDate,
      items: [...cartObjects],
      total: finalPrice.toFixed(2),
    };

    const formattedItems = cartObjects.map((item) => ({
      name: item.name,
      price: (item.price * item.quantity).toFixed(2),
      units: item.quantity,
    }));

    const templateParams = {
      order_id: purchaseDetails.id,
      orders: formattedItems,
      cost: {
        shipping: '0.00',
        tax: taxAmount.toFixed(2),
      },
      email: userEmail,
    };

    emailjs
      .send(
        'service_jrqdmld',
        'template_e0ald1h',
        templateParams,
        'BzWBxTZkuwUTPflZZ'
      )
      .then(() => console.log('✅ Email sent successfully'))
      .catch((error) => console.error('❌ Email sending failed:', error));

    dispatch(addOrder(purchaseDetails));
    dispatch(clearCart());

    setShowThankYou(true); // 🎉 Show confetti & message
    setRedirectTarget('orders');
    setCountdown(5);
  };

  const cartListItems = cartObjects.map((item, index) => (
    <li key={index} className="cart-item">
      <div className="item-details">
        <span><strong>Name:</strong> {item.name}</span>
        <span><strong>Price:</strong> ₹{item.price}</span>
      </div>
      <div className="quantity-control">
        <button onClick={() => dispatch(IncrementItem(item))}>+</button>
        <span className="qty-display">{item.quantity}</span>
        <button onClick={() => dispatch(DecrementItem(item))}>-</button>
        <button className="remove-btn" onClick={() => dispatch(RemoveFromCart(item))}>
          Remove
        </button>
      </div>
    </li>
  ));

  return (
    <div className="cart-container">
      {/* 🎉 Confetti + Thank You */}
      {redirectTarget && showThankYou && (
        <div className="thank-you-message">
          <Confetti width={window.innerWidth} height={window.innerHeight} />
          <h2>🎉 Thank you! Your order has been placed successfully.</h2>
          <p>Redirecting to <strong>/{redirectTarget}</strong> in <strong>{countdown}</strong> seconds...</p>
        </div>
      )}

      {/* Empty Cart */}
      {!redirectTarget && cartObjects.length === 0 && (
  <div className="empty-msg">
  <img
  src={`${import.meta.env.BASE_URL}images/empty-cart.jpg`}
  alt="Empty Cart"
  className="empty-cart-img"
  style={{ width: "300px", display: "block", margin: "auto" }}
/>
    <span>Cart is Empty.</span>
  </div>
)}

      {/* Cart Content */}
      {!redirectTarget && cartObjects.length > 0 && (
        <>
          <ul>{cartListItems}</ul>
          <h3>Total Items in Cart: {totalCartCount}</h3>

          <div className="discount-buttons">
            <button onClick={() => setDiscountPercentage(10)}>Apply 10% Discount</button>
            <button onClick={() => setDiscountPercentage(20)}>Apply 20% Discount</button>
            <button onClick={() => setDiscountPercentage(30)}>Apply 30% Discount</button>
          </div>

          <div className="totals">
            <h4>💰 Total: ₹{totalPrice.toFixed(2)}</h4>
            <input type="text" ref={couponCodeRef} placeholder="Enter Coupon" />
            <button onClick={handleCouponPercentage}>Apply Coupon</button>
            <h4>🏷️ Discount: ₹{discountAmount.toFixed(2)}</h4>
            <h4>🎁 Coupon ({couponName}): ₹{couponDiscountAmount.toFixed(2)}</h4>
            <h4>📄 Tax: ₹{taxAmount.toFixed(2)}</h4>
            <h4>💸 Final: ₹{finalPrice.toFixed(2)}</h4>

            <div className="email-box">
              <label>📩 Email for Order Confirmation:</label>
              <input
                type="email"
                ref={emailRef}
                value={userEmail}
                onChange={(e) => setUserEmail(e.target.value)}
                placeholder="you@example.com"
              />
            </div>

            <div className="payment-method">
              <h3>💰 Choose Payment Method:</h3>
              <button onClick={() => setPaymentMethod('qr')}>📱 QR Code</button>
              <button onClick={() => setPaymentMethod('card')}>💳 Card</button>
            </div>

            {paymentMethod === 'qr' && (
              <div className="qr-section">
                <h4>📷 Scan to Pay ₹{finalPrice.toFixed(2)}</h4>
                <QRCode
                  value={`upi://pay?pa=9848326168@ibl&pn=YourStoreName&am=${finalPrice.toFixed(2)}&cu=INR`}
                />
                <p>UPI ID: 9848326168@ibl</p>
              </div>
            )}

            {paymentMethod === 'card' && (
              <div className="card-section">
                <h4>💳 Card Payment</h4>
                <form
                  onSubmit={(e) => {
                    e.preventDefault();
                    alert('✅ Card payment processed!');
                  }}
                >
                  <div><label>Card Number:</label><input type="text" placeholder="1234 5678 9101 1234" required /></div>
                  <div><label>Cardholder Name:</label><input type="text" placeholder="Annamgari Nandini" required /></div>
                  <div><label>Expiry Date:</label><input type="text" placeholder="MM/YY" required /></div>
                  <div><label>CVV:</label><input type="password" placeholder="123" required /></div>
                  <button type="submit">💳 Pay ₹{finalPrice.toFixed(2)}</button>
                </form>
              </div>
            )}

            <button
              className="purchase-btn"
              onClick={handleCompletePurchase}
              disabled={showThankYou}
              style={{ color: 'green', background: 'lightpink' }}
            >
              {showThankYou ? 'Processing...' : 'Purchase'}
            </button>
          </div>
        </>
      )}
    </div>
  );
}

export default Cart;
