import {RESTRO_IMAGE_BASE_URL} from "../utils/constants";
const RestaurantDish = ({RestaurantDishCards}) => {
  console.log("RestaurantDishCards", RestaurantDishCards);
  return (
    <div> 
      {RestaurantDishCards?.map((dish) => {
        const {id, name, description, price, imageId, defaultPrice} = dish?.card?.info
        return (
          <div className="flex m-4 border-b-2 border-gray-200" key={id}>
            <div className="flex flex-col text-left m-4 w-9/12">
              <div className="font-bold text-lg">
                {name}
              </div>
              <div className="font-bold text-sm">
                ₹ {price ? price/100 : defaultPrice/100}
              </div>
              <div className="text-gray-500 text-sm break-normal">
                {description}
              </div>
            </div>
            <div className="w-3/12 m-4">
              <div className="relative">
                <img src={`${RESTRO_IMAGE_BASE_URL}/${imageId}`} alt={name} className="rounded-xl"/>
                <div className="absolute left-0 right-0 -bottom-4">
                  <button className="text-green-600 font-bold bg-white px-8 py-2 rounded-lg">
                    ADD
                  </button>

                </div>
              </div>
            </div>
          </div>
        )
      })}
    </div>
  )
}

export default RestaurantDish;