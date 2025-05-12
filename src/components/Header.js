import React from 'react';
import MyImage from '../../assets/app-logo.png';
import CartIcon from '../../assets/cart.svg';
import { NavLink } from 'react-router';

const Header = () => {
  return (
    <div className="header margin-bottom">
      <div className="logo-container">
        {/* rgb(37, 150, 190) */}
        <img className="logo" src={MyImage} alt="Food App Logo" />
      </div>
      <div className="nav-items">
        <nav className='nav-list'>
          <NavLink to="/"> Home </NavLink>
          <NavLink to="/about">About</NavLink>
          <NavLink to="/partner-with-us"> PartnerWithUs</NavLink>
          <NavLink to="/cart" className="cart-link">
            <img src={CartIcon} alt="Cart Icon" />
            Cart
          </NavLink>
        </nav>
      </div>
    </div>
  )
};

export default Header;