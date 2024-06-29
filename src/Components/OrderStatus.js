import React from 'react';
import { useNavigate } from 'react-router-dom';
import './OrderStatus.css';
import cookingGif from './assets/cooking.gif'; // Make sure to add your gif in the assets folder

const OrderStatus = () => {
  const navigate = useNavigate();

  const handleViewBill = () => {
    navigate('/billed');
  };

  const handleGoHome = () => {
    navigate('/');
  };

  return (
    <div className="order-status-container">
      <h2>Order Status</h2>
      <div className="order-status-steps">
        <div className="step completed">
          <div className="step-icon">1</div>
          <p>Order Placed</p>
        </div>
        <div className="step active">
          <div className="step-icon">2</div>
          <p>Cooking</p>
        </div>
        <div className="step">
          <div className="step-icon">3</div>
          <p>On the Way</p>
        </div>
        <div className="step">
          <div className="step-icon">4</div>
          <p>Delivered</p>
        </div>
      </div>
      <div className="order-status-message">
        <p>Your delicious food is being prepared!</p>
        <img src={cookingGif} alt="Cooking" className="cooking-gif" />
      </div>
      <div className="order-status-buttons">
        <button onClick={handleViewBill} className="status-button">View Bill</button>
        <button onClick={handleGoHome} className="status-button">Home</button>
      </div>
    </div>
  );
};

export default OrderStatus;
