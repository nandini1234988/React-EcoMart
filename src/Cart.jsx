import React, { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addOrder, clearCart, DecrementItem, IncrementItem, RemoveFromCart } from './store';
import emailjs from '@emailjs/browser';
import './cart.css';
import QRCode from 'react-qr-code';
import { useNavigate } from 'react-router-dom';

function Cart() {
  const cartObjects = useSelector((state) => state.cart);  // Ensure this is mapped correctly
  const totalCartCount = cartObjects.reduce((totalsum, item) => totalsum + item.quantity, 0);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [discountPercentage, setDiscountPercentage] = useState(0);
  const [couponCodeDiscountPercentage, setCouponCodeDiscountPercentage] = useState(0);
  const [couponName, setCouponName] = useState('');

  const couponCodeRef = useRef();
  const emailRef = useRef();
  const [userEmail, setUserEmail] = useState('');
  const [paymentMethod, setPaymentMethod] = useState('');

  useEffect(() => {
    // When cart is cleared, show success alert and reset UI
    if (cartObjects.length === 0 && paymentMethod !== '') {
      alert('✅ Order placed successfully!');
      setPaymentMethod('');  // Reset the payment method
      setDiscountPercentage(0); // Reset discount
      setCouponCodeDiscountPercentage(0); // Reset coupon
      setCouponName('');  // Reset coupon name
      setUserEmail(''); // Reset user email
    }
  }, [cartObjects, paymentMethod]);

  // ✅ STEP 1: Validate email before proceeding
  const handleCompletePurchase = () => {
    if (!userEmail.trim()) {
      alert('❌ Please enter your email.');
      return;
    }

    const purchaseDate = new Date().toLocaleString();
    const { finalPrice, taxAmount } = calculatingAmount();

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
      .send('service_jrqdmld', 'template_e0ald1h', templateParams, 'BzWBxTZkuwUTPflZZ')
      .then(() => console.log('✅ Email sent successfully'))
      .catch((error) => console.error('❌ Email sending failed:', error));

    console.log('Purchased:', purchaseDetails);

    dispatch(addOrder(purchaseDetails));
    dispatch(clearCart()); // Clear cart after order
     
   setTimeout(() => {
   alert('✅ Order placed successfully!');
   navigate('/orders');
   }, 300); 
};

  const cartListItems = cartObjects.map((item, index) => (
    <li key={index}>
      Name: {item.name} - Price: ₹{item.price} - Quantity: {item.quantity}
      <button onClick={() => dispatch(IncrementItem(item))}>+</button>
      <button onClick={() => dispatch(DecrementItem(item))}>-</button>
      <button onClick={() => dispatch(RemoveFromCart(item))}>Remove</button>
    </li>
  ));

  const handleCouponPercentage = () => {
    const couponCode = couponCodeRef.current.value.trim().toUpperCase();
    setCouponName(couponCode);

    switch (couponCode) {
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

  const calculatingAmount = () => {
    let totalPrice = cartObjects.reduce(
      (totalPrice, item) => totalPrice + item.price * item.quantity,
      0
    );
    const discountAmount = (totalPrice * discountPercentage) / 100;
    const couponDiscountAmount = (totalPrice * couponCodeDiscountPercentage) / 100;
    let priceAfterDiscount = totalPrice - discountAmount - couponDiscountAmount;
    const taxAmount = (priceAfterDiscount * 5) / 100;
    let finalPrice = priceAfterDiscount + taxAmount;
    return { totalPrice, discountAmount, couponDiscountAmount, taxAmount, finalPrice };
  };

  const { totalPrice, discountAmount, couponDiscountAmount, taxAmount, finalPrice } = calculatingAmount();

  return (
    <div className="cart-container">
      <h2> 🛒 Cart items will Displayed </h2>
      {cartObjects.length === 0 ? (
        <h2> CART is Empty.</h2>
      ) : (
        <ul>{cartListItems}</ul>
      )}

      <h3>Total Items in Cart: {totalCartCount}</h3>

      <div className="discount-buttons">
        <button onClick={() => setDiscountPercentage(10)}>Apply 10% Discount</button>
        <button onClick={() => setDiscountPercentage(20)}>Apply 20% Discount</button>
        <button onClick={() => setDiscountPercentage(30)}>Apply 30% Discount</button>
      </div>

      <div className="totals">
        <h4>💰 Your total Amount: ₹{totalPrice.toFixed(2)}</h4>

        <input type="text" ref={couponCodeRef} placeholder="Enter The Code" />
        <button onClick={handleCouponPercentage}>Apply Coupon</button>

        <h4>🏷️ Your Discount Amount: ₹{discountAmount.toFixed(2)}</h4>
        <h4>🎁 Applied Coupon ({couponName}) Amount: ₹{couponDiscountAmount.toFixed(2)}</h4>
        <h4>📄 Your Tax Amount: ₹{taxAmount.toFixed(2)}</h4>
        <h4>💸 Your Final Amount: ₹{finalPrice.toFixed(2)}</h4>

        {/* ✅ Email Input for order confirmation */}
        <div className="email-box">
          <label>📩 Enter your Gmail for order confirmation:</label>
          <input
            type="email"
            ref={emailRef}
            value={userEmail}
            onChange={(e) => setUserEmail(e.target.value)}
            placeholder="you@example.com"
            required
          />
        </div>

        <div className="payment-method">
          <h3>💰 Select Payment Method:</h3>
          <div className="payment-buttons">
            <button className="qr-btn" onClick={() => setPaymentMethod('qr')}>📱 QR Code</button>
            <button className="card-btn" onClick={() => setPaymentMethod('card')}>💳 Card</button>
          </div>
        </div>

        {paymentMethod === 'qr' && (
          <div className="qr-section">
            <h4>📷 Scan UPI QR to Pay ₹{finalPrice.toFixed(2)}</h4>
            <QRCode
              value={`upi://pay?pa=9848326168@ibl&pn=YourStoreName&am=${finalPrice.toFixed(2)}&cu=INR`}
            />
            <p>UPI ID: 9848326168@ibl</p>
          </div>
        )}

        {paymentMethod === 'card' && (
          <div className="card-section">
            <h4>💳 Enter Card Details</h4>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                alert('✅ Card payment processed successfully!');
              }}
            >
              <div>
                <label>Card Number: </label>
                <input type="text" placeholder="1234 5678 9101 1234" required />
              </div>
              <div>
                <label>Cardholder Name: </label>
                <input type="text" placeholder="Annamgari Nandini" required />
              </div>
              <div>
                <label>Expiry Date: </label>
                <input type="text" placeholder="MM/YY" required />
              </div>
              <div>
                <label>CVV: </label>
                <input type="password" placeholder="123" required />
              </div>
              <button type="submit">💳 Pay ₹{finalPrice.toFixed(2)}</button>
            </form>
          </div>
        )}

        <button className="purchase-btn" onClick={handleCompletePurchase} style={{ color: 'green', background: 'lightpink' }}>
          Purchase
        </button>
      </div>
    </div>
  );
}

export default Cart;
