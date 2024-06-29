import { getDatabase, ref, update } from 'firebase/database';
import React, { useState } from 'react';
import { FaBell, FaClipboardList, FaHome, FaReceipt } from 'react-icons/fa';
import { NavLink } from 'react-router-dom';
import './BottomNav.css';

const BottomNav = () => {
  const [showWaiterPopup, setShowWaiterPopup] = useState(false);

  const handleCallWaiter = () => {
    setShowWaiterPopup(true);
  };

  const confirmCallWaiter = () => {
    const db = getDatabase();
    const waiterRef = ref(db, 'waiter-calls');
    update(waiterRef, { call: 'yes' })
      .then(() => {
        alert('Waiter called successfully!');
      })
      .catch((error) => {
        console.error('Error calling waiter:', error);
      })
      .finally(() => {
        setShowWaiterPopup(false);
      });
  };

  const cancelCallWaiter = () => {
    setShowWaiterPopup(false);
  };

  return (
    <div className="bottom-nav">
      <NavLink to="/" className="nav-icon" activeClassName="active">
        <FaHome size={24} />
        <span>Home</span>
      </NavLink>
     
      <NavLink to="/billed" className="nav-icon" activeClassName="active">
        <FaReceipt size={24} />
        <span>Bill</span>
      </NavLink>
      <div className="nav-icon" onClick={handleCallWaiter}>
        <FaBell size={24} />
        <span>Waiter</span>
      </div>
      <NavLink to="/order-status" className="nav-icon" activeClassName="active">
        <FaClipboardList size={24} />
        <span>your orders</span>
      </NavLink>

      {showWaiterPopup && (
        <div className="waiter-popup">
          <div className="popup-content">
            <p>Do you want to call the waiter?</p>
            <div className="popup-buttons">
              <button onClick={confirmCallWaiter}>OK</button>
              <button onClick={cancelCallWaiter}>Cancel</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default BottomNav;
