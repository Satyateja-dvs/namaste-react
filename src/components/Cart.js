import { useSelector, useDispatch } from "react-redux";
import RestaurantDish from "./RestaurantDish";
import { clearCart } from "../utils/cartSlice";

const Cart = () => {

  const cartItems = useSelector((store) => store.cart.items);
  const dispatch = useDispatch();

  const handleClearCart = () => {
    // Dispatch an action to clear the cart
    dispatch(clearCart())
  }

  return (
    <div className="text-center my-4">
      <div className="flex w-6/12 m-auto">
        <h1 className="w-10/12 text-3xl font-bold text-center">Cart</h1>
        <button className="w-2/12 text-black font-bold hover:text-red-800 underline" onClick={() => handleClearCart()}>
          Clear Cart
        </button>
      </div>
      <div className="w-6/12 m-auto bg-gray-50 shadow-lg">
        <RestaurantDish RestaurantDishCards={cartItems} action={"cart"}/>
      </div>
    </div>
  );
}

export default Cart;