// import { createRoot } from 'react-dom/client';
import React, { useEffect } from 'react';
import ReactDOM from 'react-dom/client';
import Header from './components/Header';
import TopRestaurantCards from './components/TopRestaurantCards';
import restObj from './utils/mockData';
import Shimmer from './components/Shimmer';
import { CONTENT_TYPE_ENUM } from './utils/constants';
import { BrowserRouter, Routes, Route, Outlet } from 'react-router';
import About from './components/About';
import PartnerWithUs from './components/PartnerWithUs';
import ErrorBoundary from './components/ErrorBoundary';
import RestroDetailPage from './components/RestroDetailPage';
import Career from './components/Career';

const Body = () => {
  const [restFilteredData, setRestFilteredData] = React.useState([]);
  const [filteredData, setFilteredData] = React.useState([]);

  // console.log("restFilteredData111", restFilteredData)

  const onInputChange = async (e) => {
    const inputData = e.target.value;
    if (inputData && inputData.length > 0) {
      // console.log("restFilteredData?.cards?.card?.card?.gridElements", restFilteredData.cards)
      // loop through card?.card? and then gridElements and then infoWithStyle has type CONTENT_TYPE_ENUM.GRID_WIDGETS
      // then filter the restaurants based on the input data
      const finalFilterData = restFilteredData?.cards?.map(card => {
        console.log("card?.card?.gridElements?.infoWithStyle?.restaurants", card?.card?.gridElements?.infoWithStyle?.restaurants);
        return card?.card?.gridElements?.infoWithStyle?.restaurants.filter((item) => {
          console.log("item", item);
          return item.info.name.toLowerCase().includes(inputData.toLowerCase())
        });
      });
      // const finalFilterData = restFilteredData?.cards.map(card => {
      //   console.log("card?.card?.gridElements?.infoWithStyle['@type']", card?.card?.gridElements?.infoWithStyle['@type'])
      //   return card?.card?.gridElements?.infoWithStyle['@type'] === CONTENT_TYPE_ENUM.GRID_WIDGETS
      // });
      // const finalFilterData = restFilteredData.cards.map(card => card.card.gridElements.)
      console.log("finalFilterData", finalFilterData);
      // const filteredData = restFilteredData?.cards?.card?.card?.gridElements?.infoWithStyle?.restaurants.filter((item) => {
      //   console.log("item", item);
      //   return item.info.name.toLowerCase().includes(inputData.toLowerCase())
      // });
      // console.log("filteredData", filteredData);
      setFilteredData(filteredData);
    }
  }

  useEffect(() => {
    getAPIResponse();
  }, []);

  const getAPIResponse = async () => {
    const api_response = await fetch("https://www.swiggy.com/dapi/restaurants/list/v5?lat=15.502005&lng=80.0031833&is-seo-homepage-enabled=true&page_type=DESKTOP_WEB_LISTING");
    const data = await api_response.json();
    setRestFilteredData(data.data);
    setFilteredData(data.data);
  }

  return (
    <div className="container margin-bottom">
      <div className="search-box-and-results">
        <div className="search-container margin-bottom">
          <input type="text" placeholder="Search for your favourite food" onChange={onInputChange} />
          <button className="search-button">Search</button>
        </div>
        {/* {restFilteredData?.cards?.length > 0 && 
          <div className="search-result-container">
            <h2>Search results</h2>
            <TopRestaurantCards resData={restFilteredData} />
          </div>
        } */}
      </div>
      <div className="top-restaurants padding margin-bottom">
        <h2>Top restaurant chains near you</h2>
        {filteredData?.cards?.length > 0 ? <TopRestaurantCards resData={restFilteredData} /> : <Shimmer />}
      </div>
    </div>
  )
}
const AppLayout = () => {
  return (
    <div className="app-container">
      <Header />
      <Outlet />
    </div>
  )
}

const browserRouter = (
  <BrowserRouter>
    <Routes>
      <Route element={<AppLayout />}>
        <Route path="/" element={<Body />} />
        <Route path="/about" element={<About />} errorElement= {<ErrorBoundary />} />
        <Route path="/careers" element={<Career />} errorElement= {<ErrorBoundary />} /> 
        <Route path="/partner-with-us" element={<PartnerWithUs />} errorElement= {<ErrorBoundary />} />
        <Route path="/restaurants/:id" element={<RestroDetailPage />} errorElement= {<ErrorBoundary />} />
      </Route>
    </Routes>
  </BrowserRouter>
)

const root = document.getElementById('root');
ReactDOM.createRoot(root).render(browserRouter);