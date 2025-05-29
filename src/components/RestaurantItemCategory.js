import RestaurantDish from "./RestaurantDish";
import {useState} from "react";

const RestaurantItemCategory = ({data}) => {
  const [openAccordion, setOpenAccordion] = useState(null)

  const handleAccordionToggle = (index) => {
    console.log("Accordion index clicked:", index);
    setOpenAccordion((prevIndex) => ({
      index: prevIndex?.index === index ? null : index
    }));
  }

  return (
    <div>
      {data?.map((item, index) => {
        const {title, categoryId} = item?.card?.card
        const RestaurantDishCards = item?.card?.card?.itemCards
        return (
          <div key={categoryId} className="w-6/12 m-auto bg-gray-50 hover:bg-gray-100">
            <div className="flex justify-between p-4 m-4 cursor-pointer" onClick={() => handleAccordionToggle(index)}>
              <div className="font-bold">
                {title} ({RestaurantDishCards?.length})
              </div>
              <div>
                {openAccordion?.index === index ? "▲" : "▼"}
              </div>
            </div>
            {openAccordion?.index === index && <RestaurantDish RestaurantDishCards={RestaurantDishCards}/>}
          </div>
        )
      })}
    </div>
  )
}

export default RestaurantItemCategory;