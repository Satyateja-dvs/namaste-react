import RestaurantDish from "./RestaurantDish";
import {useState} from "react";
import { useContext } from "react";
import UserContext from "../utils/UserContext";

const RestaurantItemCategory = ({data}) => {
  const [openAccordion, setOpenAccordion] = useState(0)
  const {loggedInUser} = useContext(UserContext);

  const handleAccordionToggle = (index) => {
    setOpenAccordion((prevIndex) => ( prevIndex === index ? null : index));
  }

  return (
    <div>
      <h1 className="font-bold text-lg">Hey! {loggedInUser}</h1>
      {data?.map((item, index) => {
        const {title, categoryId} = item?.card?.card
        const RestaurantDishCards = item?.card?.card?.itemCards
        return (
          <div key={categoryId} className="w-6/12 sm:w-10/12 m-auto bg-gray-50 hover:bg-gray-100 shadow-lg">
            <div className="flex justify-between p-4 m-4 cursor-pointer " onClick={() => handleAccordionToggle(index)}>
              <div className="font-bold">
                {title} ({RestaurantDishCards?.length})
              </div>
              <div>
                {openAccordion === index ? "▲" : "▼"}
              </div>
            </div>
            {openAccordion === index && <RestaurantDish RestaurantDishCards={RestaurantDishCards}/>}
          </div>
        )
      })}
    </div>
  )
}

export default RestaurantItemCategory;