import { getDatabase, onValue, ref, update } from 'firebase/database';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import './AdminPage.css';

const AdminPage = () => {
  const [waiterCall, setWaiterCall] = useState(false);
  const [audio] = useState(new Audio('/path/to/sound.mp3')); // Path to your sound file

  useEffect(() => {
    const db = getDatabase();
    const waiterRef = ref(db, 'waiter-calls');
    onValue(waiterRef, (snapshot) => {
      const data = snapshot.val();
      if (data && data.call === 'yes') {
        setWaiterCall(true);
      }
    });
  }, []);

  const handlePlaySound = () => {
    audio.play();
  };

  const handleOkClick = () => {
    const db = getDatabase();
    const waiterRef = ref(db, 'waiter-calls');
    update(waiterRef, { call: 'no' })
      .then(() => {
        setWaiterCall(false);
      })
      .catch((error) => {
        console.error('Error updating waiter call:', error);
      });
  };

  return (
    <div className="admin-page">
      <h2>Admin Dashboard</h2>
      <div className="admin-links">
        <Link to="/admin/add-category" className="admin-link">Add Category</Link>
        <Link to="/admin/add-food" className="admin-link">Add Food</Link>
      </div>

      {waiterCall && (
        <div className="waiter-popup">
          <div className="popup-content calling-animation">
            <p>Table 1 is requesting for the waiter!</p>
            <div className="popup-buttons">
              {/* <button onClick={handlePlaySound}>Play Sound</button> */}
              <button onClick={handleOkClick}>OK</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminPage;
