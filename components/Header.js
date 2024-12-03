import React from 'react';
import MyImage from '../assets/app-logo.png';
import CartIcon from '../assets/cart.svg';

const Header = () => {
  return (
    <div className="header margin-bottom">
      <div className="logo-container">
        {/* rgb(37, 150, 190) */}
        <img className="logo" src={MyImage} alt="Food App Logo" />
      </div>
      <div className="nav-items">
        <ul>
          <li>Home</li>
          <li>About</li>
          <li>Partner with Us</li>
          <li className="header-cart-container">
            <img src={CartIcon} alt="Cart Icon" />
            <span>Cart</span>
          </li>
        </ul>
      </div>
    </div>
  )
};

export default Header;