import React from 'react';
import MyImage from '../../assets/app-logo.png';
import CartIcon from '../../assets/cart.svg';
import { NavLink, Link } from 'react-router';
import useOnlineStatus from '../utils/useOnlineStatus';
import { useContext } from 'react';
import UserContext from "../utils/UserContext";
import { useSelector } from 'react-redux';


const Header = () => {
  const isOnline = useOnlineStatus();
  const {loggedInUser} = useContext(UserContext);

  const cartItems = useSelector((store) => store.cart.items);

  return (
    <div className="flex justify-between bg-stone-100">
      <div className="w-23">
        {/* rgb(37, 150, 190) */}
        <Link to={"/"}>
          <img className="logo" src={MyImage} alt="Food App Logo" />

        </Link>
      </div>
      <div className="">
        <nav className='flex justify-between'>
          <NavLink className="m-4 p-4" style={{color: "black"}}> Online Status: {isOnline ? "🟢": "🔴"} </NavLink>
          <NavLink className="m-4 p-4" to="/"> Home </NavLink>
          <NavLink className="m-4 p-4" to="/about">About</NavLink>
          <NavLink className="m-4 p-4" to="/partner-with-us"> Partner With Us</NavLink>
          <NavLink className="m-4 p-4" to="/careers">Careers</NavLink>
          <NavLink className="m-4 p-4 text-green-600" to="/contact">Hey! {loggedInUser}</NavLink>
          <NavLink className="m-4 p-4 flex" to="/cart">
            <img src={CartIcon} alt="Cart Icon" />
            Cart <span className='font-bold'>({cartItems.length})</span>
          </NavLink>
        </nav>
      </div>
    </div>
  )
};

export default Header;