import { configureStore } from "@reduxjs/toolkit";
import filterReducer from "./slices/filterSlice";
import searchRedicer from "./slices/searchSlice";
import cartRedicer from "./slices/cartSlice";

export const store = configureStore({
	reducer: {
		filter: filterReducer,
		search: searchRedicer,
		cart: cartRedicer,
	},
});
