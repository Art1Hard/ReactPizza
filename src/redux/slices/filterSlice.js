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
	},
});

export const { setCategoryIndex, setSort, setIsDesc } = filterSlice.actions;

export default filterSlice.reducer;
