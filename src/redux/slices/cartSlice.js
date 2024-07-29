import { createSlice } from "@reduxjs/toolkit";

const initialState = {
	totalPrice: 0,
	totalItems: 0,
	items: [],
};

export const cartSlice = createSlice({
	name: "cart",
	initialState,
	reducers: {
		// addProduct: (state, action) => {
		// 	state.items.push(action.payload);
		// 	state.totalPrice += action.payload.price;
		// },
		addProduct: (state, action) => {
			const findItem = state.items.find((obj) => obj.id === action.payload.id);

			if (findItem) {
				findItem.count++;
			} else
				state.items.push({
					...action.payload,
					count: 1,
				});

			state.totalItems += 1;
			state.totalPrice += action.payload.price;
		},
		removeProduct: (state, action) => {
			const findItem = state.items.find((obj) => obj.id === action.payload.id);

			if (findItem.count > 1) {
				findItem.count--;
			} else if (findItem.count <= 1) {
				state.items = state.items.filter((obj) => obj !== findItem);
			}

			state.totalItems -= 1;
			state.totalPrice -= action.payload.price;
		},
		removeProducts: (state, action) => {
			const { price, count } = state.items.find(
				(obj) => obj.id === action.payload
			);
			state.items = state.items.filter((obj) => obj.id !== action.payload);
			state.totalItems -= count;
			state.totalPrice -= price * count;
		},
		clearProducts: (state) => {
			state.items = [];
			state.totalItems = 0;
			state.totalPrice = 0;
		},
	},
});

export const { addProduct, removeProduct, removeProducts, clearProducts } =
	cartSlice.actions;

export default cartSlice.reducer;
