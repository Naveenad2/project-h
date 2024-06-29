import { getDatabase, onValue, ref } from 'firebase/database';
import React, { useEffect, useState } from 'react';
import { app } from '../firebase';
import './BilledPage.css';

const BilledPage = () => {
  const [billedDetails, setBilledDetails] = useState([]);

  useEffect(() => {
    const db = getDatabase(app);
    const billedDetailsRef = ref(db, 'billed-details');

    onValue(billedDetailsRef, (snapshot) => {
      const data = snapshot.val();
      if (data) {
        const details = Object.keys(data).map(key => ({
          id: key,
          ...data[key]
        }));
        setBilledDetails(details);
      }
    });
  }, []);

  if (billedDetails.length === 0) {
    return <div className="loading">Loading...</div>;
  }

  return (
    <div className="billed-page">
      <h2>Bill Details</h2>
      {billedDetails.map((bill, index) => (
        <div className="bill-summary" key={index}>
          <h3>Order Summary</h3>
          {bill.items.map((item, itemIndex) => (
            <div className="bill-item" key={itemIndex}>
              <img src={item.imageUrl} alt={item.foodName} className="bill-item-image" />
              <div className="bill-item-details">
                <h4>{item.foodName}</h4>
                <p>Quantity: {item.quantity}</p>
                <p>Price: ${Number(item.foodPrice).toFixed(2)}</p>
                <p>Total: ${(Number(item.foodPrice) * item.quantity).toFixed(2)}</p>
              </div>
            </div>
          ))}
          <div className="bill-total-summary">
            <p>Item Total: ₹{bill.total.toFixed(2)}</p>
            <p>Platform Fee: ₹{5.00.toFixed(2)}</p>
            <p>GST and Restaurant Charges: ₹{163.40.toFixed(2)}</p>
            <h4>Total Amount: ₹{(bill.total + 5.00 + 163.40).toFixed(2)}</h4>
          </div>
        </div>
      ))}
    </div>
  );
};

export default BilledPage;
