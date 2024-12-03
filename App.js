// import { createRoot } from 'react-dom/client';
import React from 'react';
import ReactDOM from 'react-dom/client';
import Header from './components/Header';
import TopRestaurantCards from './components/TopRestaurantCards';
import restObj from './components/SwiggyRestaurantData';

// Food App Steps
// 1. Header
  // Logo
  // Navigation Items
// 2.  Body
  // Search Bar
  // Components (Restaurant Cards)
  // Read more button
// 3. Footer
  // Company Logo
  // Copy Rights
  // Company
  // Contact Us
  // Available in
  // Careers
  // Social Media Lins



const Body = () => {
  return (
    <div className="container margin-bottom">
      <div className="search-container margin-bottom">
        <input type="text" placeholder="Search for your favourite food" />
        <button className="search-button">Search</button>
      </div>
      <div className="top-restaurants padding margin-bottom">
        <h2>Top restaurant chains near you</h2>
        <TopRestaurantCards resData={restObj}/>
      </div>
    </div>
  )
}
const AppLayout = () => {
  return (
    <div className="app-container">
      <Header />
      <Body />
    </div>
  )
}

const root = document.getElementById('root');
ReactDOM.createRoot(root).render(<AppLayout />);