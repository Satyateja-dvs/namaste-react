import {useParams} from "react-router"
import Shimmer from "./Shimmer";
import useRestroData from "../utils/useRestroData";
import RestaurantItemCategory from "./RestaurantItemCategory";
import { useContext } from "react";
import UserContext from "../utils/UserContext";

const RestroDetailPage = () => {
  const {id} = useParams();

  // This is a custom hook that follows the Single Responsibility Principle (SRP)
  const restroData = useRestroData(id);

  if (restroData === null) {
    return <Shimmer />
  }

  const {
    name,
    avgRating,
    totalRatingsString,
    cuisines
  } = restroData?.cards[2]?.card?.card?.info

  const filterCardGroup = restroData?.cards?.filter(c => c.groupedCard)
  const filterAccordionList = filterCardGroup[0].groupedCard.cardGroupMap?.REGULAR?.cards?.filter(c => c?.card?.card?.["@type"] === "type.googleapis.com/swiggy.presentation.food.v2.ItemCategory")

  return (
    <UserContext.Provider value={{loggedInUser: "Updated User"}}>
      <div className="text-center my-4">
        <h1 className="text-3xl font-bold">
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
        {/* Item List */}
        <RestaurantItemCategory data={filterAccordionList} />
      </div>
    </UserContext.Provider >
  )
}

export default RestroDetailPage