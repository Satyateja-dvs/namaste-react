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
// 2. Body
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
  const [restFilteredData, setRestFilteredData] = React.useState([]);
  const onInputChange = (e) => {
    const inputData = e.target.value;
    if (inputData && inputData.length > 0) {
      const filteredData = restObj.filter((item) => item.info.name.toLowerCase().includes(inputData.toLowerCase()) || item.info.cuisines.join(", ").toLowerCase().includes(inputData.toLowerCase()));
      setRestFilteredData(filteredData);
    } else {
      setRestFilteredData([]);
    }
  }

  return (
    <div className="container margin-bottom">
      <div className="search-box-and-results">
        <div className="search-container margin-bottom">
          <input type="text" placeholder="Search for your favourite food" onChange={onInputChange}/>
          <button className="search-button">Search</button>
        </div>
        {restFilteredData.length > 0 && 
          <div className="search-result-container">
            <h2>Search results</h2>
            <TopRestaurantCards resData={restFilteredData} />
          </div>
        }
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