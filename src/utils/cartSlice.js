import {createSlice} from "@reduxjs/toolkit"

const cartSlice = createSlice({
  name: "cart",
  initialState: {
    items: [],
  },
  reducers: {
    addItem: (state, action) => {
      state.items.push(action.payload);
    },
    removeItem: (state, action) => {
      console.log("Removing item:", action.payload);
      console.log("Current items before removal:", state.items);
      // action.payload.card.info.id
      state.items = state.items.filter(item => item.card.info.id !== action.payload.card.info.id);
    },
    clearCart: (state) => {
      state.items = [];
    },
  }
})

export const {addItem, removeItem, clearCart} = cartSlice.actions;
export default cartSlice.reducer;