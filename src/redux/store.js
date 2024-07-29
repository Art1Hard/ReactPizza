import { configureStore } from "@reduxjs/toolkit";
import filterReducer from "./slices/filterSlice";
import searchRedicer from "./slices/searchSlice";

export const store = configureStore({
	reducer: {
		filter: filterReducer,
		search: searchRedicer,
	},
});
