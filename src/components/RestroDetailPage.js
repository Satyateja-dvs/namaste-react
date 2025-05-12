import {useParams} from "react-router"
import {useEffect, useState} from "react"
import React from 'react';
import Shimmer from "./Shimmer";
import {RESTRO_DETAIL_PAGE_URL} from "../utils/constants"

const RestroDetailPage = () => {
  const {id} = useParams();
  const [restroData, setRestroData] = useState(null);

  useEffect(() => {
    getRetroDetail();
  }, [])
  
  async function getRetroDetail() {
    const data = await fetch(`${RESTRO_DETAIL_PAGE_URL}&restaurantId=${id}`)
    const response = await data.json();
    setRestroData(response.data)
  }
  
  if (restroData === null) {
    return <Shimmer />
  }

  const {
    name,
    avgRating,
    totalRatingsString,
    cuisines
  } = restroData?.cards[2]?.card?.card?.info

  console.log("restroData", restroData);

  return (
    <div>
      <h1>
       {name}
      </h1>
      <div>
        <div className="rating-and-price">
          <div>
            {avgRating} ({totalRatingsString})
          </div>
          <div>
            {cuisines.join(", ")}
          </div>
        </div>
      </div>
    </div>
  )
}

export default RestroDetailPage