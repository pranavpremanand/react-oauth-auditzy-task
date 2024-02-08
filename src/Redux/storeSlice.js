import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  products: [],
  isLoading: false,
};

const storeSlice = createSlice({
  name: "storeSlice",
  initialState,
  reducers: {
    setLoading: (state, action) => {
      state.isLoading = action.payload;
    },
    setProducts: (state, action) => {
      state.products = action.payload;
    },
    addProductItem: (state, action) => {
      state.products = [...state.products,action.payload];
    },
    updateItem: (state, action) => {
      const index = state.products.findIndex(
        (item) => item.id === action.payload.id
      );
      if (index !== -1) {
        state.products[index] = action.payload;
      }
    },
    deleteItem: (state, action) => {
      state.products = state.products.filter(
        (item) => item.id !== action.payload
      );
    },
  },
});

export const {
  setLoading,
  setProducts,
  addProductItem,
  updateItem,
  deleteItem,
} = storeSlice.actions;
export default storeSlice.reducer;
