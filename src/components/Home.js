import React, { useEffect } from 'react';
import useOnlineStatus from "../utils/useOnlineStatus";
import TopRestaurantCards from './TopRestaurantCards';
import Shimmer from './Shimmer';
import { CONTENT_TYPE_ENUM } from '../utils/constants';

const Home = () => {
  const [restFilteredData, setRestFilteredData] = React.useState([]);
  const [filteredData, setFilteredData] = React.useState([]);
  const onlineStatus = useOnlineStatus();

  // console.log("restFilteredData111", restFilteredData)

  if(onlineStatus === false) {
    return (
      <div>
        It looks like you are offline. Please check your internet connection.
      </div>
    )
  }
  
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
  console.log("onlineStatus111", onlineStatus);


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
    <div className="flex flex-col">
      <div className="flex flex-row gap-4 m-6 ml-5">
        <input type="text" placeholder="Search for your favourite food" onChange={onInputChange} className='w-md bg-neutral-100 p-3 rounded-md'/>
        <button className="bg-green-600 p-3 rounded-lg pl-8 pr-8 text-white">Search</button>
      </div>
      {/* {restFilteredData?.cards?.length > 0 && 
        <div className="search-result-container">
          <h2>Search results</h2>
          <TopRestaurantCards resData={restFilteredData} />
        </div>
      } */}
      <div className="flex flex-col flex-wrap">
        <h2 className='text-xl ml-5 font-semibold'>Top restaurant chains near you</h2>
        {filteredData?.cards?.length > 0 ? <TopRestaurantCards resData={restFilteredData} /> : <Shimmer />}
      </div>
    </div>
  )
}

export default Home;