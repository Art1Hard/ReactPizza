import { createSlice } from "@reduxjs/toolkit";

const initialState = {
	categoryIndex: 0,
	sort: {
		name: "популярности",
		sortProperty: "rating",
	},
	isDesc: false,
};

export const filterSlice = createSlice({
	name: "filter",
	initialState,
	reducers: {
		setCategoryIndex: (state, action) => {
			state.categoryIndex = action.payload;
		},
		setSort: (state, action) => {
			state.sort = action.payload;
		},
		setIsDesc: (state, action) => {
			state.isDesc = action.payload;
		},
		setFilters: (state, action) => {
			state.sort = action.payload.sort;
			state.categoryIndex = Number(action.payload.categoryIndex);
			state.isDesc = JSON.parse(action.payload.sortIsDesc);
		},
	},
});

export const { setCategoryIndex, setSort, setIsDesc, setFilters } =
	filterSlice.actions;

export default filterSlice.reducer;
