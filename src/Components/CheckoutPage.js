import { getDatabase, onValue, push, ref, remove } from 'firebase/database';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { app } from '../firebase';
import './CheckoutPage.css';

const CheckoutPage = () => {
  const [cartItems, setCartItems] = useState([]);
  const [itemTotal, setItemTotal] = useState(0);
  const platformFee = 5.00;
  const gstAndCharges = 163.40;
  const navigate = useNavigate();

  useEffect(() => {
    const db = getDatabase(app);
    const cartRef = ref(db, 'cart');

    onValue(cartRef, (snapshot) => {
      const data = snapshot.val();
      if (data) {
        const fetchedCartItems = Object.keys(data).map((key) => ({
          id: key,
          ...data[key],
        }));
        setCartItems(fetchedCartItems);
        const total = fetchedCartItems.reduce((sum, item) => sum + Number(item.foodPrice) * item.quantity, 0);
        setItemTotal(total);
      } else {
        setCartItems([]);
        setItemTotal(0);
      }
    });
  }, []);

  const placeOrder = () => {
    const db = getDatabase(app);
    const billedDetailsRef = ref(db, 'billed-details');

    const billedDetails = {
      // adminView:"False",
      items: cartItems,
      total: itemTotal + platformFee + gstAndCharges,
      timestamp: new Date().toISOString(),
    };

    // Add billed details to the database
    push(billedDetailsRef, billedDetails)
      .then(() => {
        // Remove all items from the cart
        const cartRef = ref(db, 'cart');
        remove(cartRef)
          .then(() => {
            console.log('Cart cleared successfully');
            navigate('/order-confirmation');
          })
          .catch((error) => {
            console.error('Error clearing cart:', error);
          });
      })
      .catch((error) => {
        console.error('Error adding billed details:', error);
      });
  };

  const totalToPay = itemTotal + platformFee + gstAndCharges;

  return (
    <div className="checkout-page">
      <h2>Checkout</h2>
      <div className="checkout-items">
        {cartItems.map((item) => (
          <div className="checkout-item" key={item.id}>
            <img src={item.imageUrl} alt={item.foodName} className="checkout-image" />
            <div className="checkout-details">
              <h3>{item.foodName}</h3>
              <p>Price: ${Number(item.foodPrice).toFixed(2)}</p>
              <p>Quantity: {item.quantity}</p>
              <p>Total: ${(Number(item.foodPrice) * item.quantity).toFixed(2)}</p>
            </div>
          </div>
        ))}
      </div>
      <div className="bill-details">
        <h3>Bill Details</h3>
        <div className="bill-item">
          <span>Item Total</span>
          <span>₹{itemTotal.toFixed(2)}</span>
        </div>
        <div className="bill-item">
          <span>Platform Fee</span>
          <span>₹{platformFee.toFixed(2)}</span>
        </div>
        <div className="bill-item">
          <span>GST and Restaurant Charges</span>
          <span>₹{gstAndCharges.toFixed(2)}</span>
        </div>
        <div className="bill-total">
          <span>To Pay</span>
          <span>₹{totalToPay.toFixed(2)}</span>
        </div>
      </div>
      <button className="place-order" onClick={placeOrder}>Place Order</button>
    </div>
  );
};

export default CheckoutPage;
