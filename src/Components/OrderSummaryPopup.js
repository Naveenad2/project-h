import React from 'react';
import { useNavigate } from 'react-router-dom';
import './OrderSummaryPopup.css';

const OrderSummaryPopup = ({ totalQuantity, totalPrice, onClearCart }) => {
  const navigate = useNavigate();

  const handleCheckout = () => {
    navigate('/checkout');
  };

  return (
    <div className="order-summary-popup">
      <div className="order-summary-content">
        <img src="https://freepngimg.com/thumb/categories/1325.png" alt="Restaurant" className="restaurant-img" />
        <div className="order-summary-details">
          <h4>Orders</h4>
          <a href="#" className="view-menu">View Full Menu</a>
        </div>
        <div className="order-summary-actions">
          <button className="order-now" onClick={handleCheckout}>{totalQuantity} items | ₹{totalPrice.toFixed(2)} Checkout</button>
          <button className="delete-order" onClick={onClearCart}>
            <img src="https://cdn-icons-png.freepik.com/512/3807/3807871.png" alt="Delete" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default OrderSummaryPopup;
