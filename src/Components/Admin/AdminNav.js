import React, { useState } from 'react';
import { FaChartBar, FaHome, FaPlus } from 'react-icons/fa';
import { NavLink } from 'react-router-dom';
import './AdminNav.css';

const AdminNav = () => {
  const [showAddOptions, setShowAddOptions] = useState(false);

  const toggleAddOptions = () => {
    setShowAddOptions(!showAddOptions);
  };

  return (
    <div className="admin-nav-container">
      <div className="admin-nav">
        <NavLink to="/admin" className="nav-icon" activeClassName="active">
          <FaHome size={24} />
          <span>Home</span>
        </NavLink>
        <div className="nav-icon add-button" onClick={toggleAddOptions}>
          <FaPlus size={28} />
        </div>
        <NavLink to="/admin/analytics" className="nav-icon" activeClassName="active">
          <FaChartBar size={24} />
          <span>Analytics</span>
        </NavLink>
      </div>
      {showAddOptions && (
        <div className="add-options">
          <NavLink to="/admin/add-category" className="add-option" onClick={toggleAddOptions}>
            Add Category
          </NavLink>
          <NavLink to="/admin/add-food" className="add-option" onClick={toggleAddOptions}>
            Add Food
          </NavLink>
          <NavLink to="/admin/add-trending" className="add-option" onClick={toggleAddOptions}>
            Add Trending
          </NavLink>
        </div>
      )}
    </div>
  );
};

export default AdminNav;
