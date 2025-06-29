import { createSlice } from "@reduxjs/toolkit";

const cartSlice = createSlice({
  name: "cart",
  initialState: {
    items: [],
    paymentMode: "Cash",
  },
  reducers: {
    addToCart(state, action) {
      const product = action.payload;
      const existing = state.items.find((item) => item._id === product._id);
      if (existing) existing.qty += 1;
      else state.items.unshift({ ...product, qty: 1 });
    },
    removeFromCart(state, action) {
      const id = action.payload;
      const index = state.items.findIndex((item) => item._id === id);
      if (index !== -1) {
        if (state.items[index].qty > 1) state.items[index].qty--;
        else state.items.splice(index, 1);
      }
    },
    setPaymentMode(state, action) {
      state.paymentMode = action.payload;
    },
    clearCart(state) {
      state.items = [];
      state.paymentMode = "Cash";
    },
  },
});

export const { addToCart, removeFromCart, setPaymentMode, clearCart } = cartSlice.actions;
export default cartSlice.reducer;
