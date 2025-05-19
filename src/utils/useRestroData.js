import { useEffect, useState } from "react";
import { RESTRO_DETAIL_PAGE_URL } from "./constants";

/**
 * This is a custom hook that follows the Single Responsibility Principle (SRP).
 * Custom hook to fetch restaurant data based on the provided ID.
 * @param {string} id - The ID of the restaurant to fetch data for.
 * @return {object} - The restaurant data.
 */
const useRestroData = (id) => {
  const [restroData, setRestroData] = useState(null);

  useEffect(() => {
    getRestaurantData();
  }, [])

  async function getRestaurantData() {
    const data = await fetch(`${RESTRO_DETAIL_PAGE_URL}&restaurantId=${id}`)
    const response = await data.json();
    setRestroData(response.data)
  }
  
  return restroData;
}

export default useRestroData;