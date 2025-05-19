import {useParams} from "react-router"
import Shimmer from "./Shimmer";
import useRestroData from "../utils/useRestroData";

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