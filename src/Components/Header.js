import React from 'react';
import { FaBell, FaCog } from 'react-icons/fa';
import { NavLink, useLocation } from 'react-router-dom';
import './Header.css';

const Header = () => {
  const location = useLocation();

  return (
    <div className="header">
      <div className="location">
        <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQzCW8ayM9K_iNzX81NSjgpGcl30jDvsTSiIg&s" alt="Profile" className="profile-pic" />
        <span>{location.pathname.startsWith('/admin') ? 'Admin Dashboard' : 'Hotel Name'}</span>
      </div>
      <div className="icons">
        <FaBell className="icon" />
        <NavLink to="/admin" className="nav-icon" activeClassName="active">
        <FaCog className="icon" />
      
      </NavLink>
        
      </div>
    </div>
  );
};

export default Header;
