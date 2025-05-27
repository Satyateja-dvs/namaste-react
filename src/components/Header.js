import React from 'react';
import MyImage from '../../assets/app-logo.png';
import CartIcon from '../../assets/cart.svg';
import { NavLink, Link } from 'react-router';
import useOnlineStatus from '../utils/useOnlineStatus';

const Header = () => {
  const isOnline = useOnlineStatus();
  return (
    <div className="header margin-bottom">
      <div className="logo-container">
        {/* rgb(37, 150, 190) */}
        <Link to={"/"}>
          <img className="logo" src={MyImage} alt="Food App Logo" />

        </Link>
      </div>
      <div className="nav-items">
        <nav className='nav-list'>
          <NavLink style={{color: "black"}}> Online Status: {isOnline ? "🟢": "🔴"} </NavLink>
          <NavLink to="/"> Home </NavLink>
          <NavLink to="/about">About</NavLink>
          <NavLink to="/partner-with-us"> Partner With Us</NavLink>
          <NavLink to="/careers">Careers</NavLink>
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