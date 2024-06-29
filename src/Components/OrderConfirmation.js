import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './OrderConfirmation.css';
import orderGif from './assets/order.gif'; // Ensure the gif is in the correct path

const OrderConfirmation = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setTimeout(() => {
      navigate('/order-status');
    }, 3000);

    return () => clearTimeout(timer);
  }, [navigate]);

  return (
    <div className="order-confirmation">
      <h2>Order Placed Successfully!</h2>
      <img src={orderGif} alt="Order placed" className="order-gif" />
    </div>
  );
};

export default OrderConfirmation;
