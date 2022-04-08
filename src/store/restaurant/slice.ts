import { createSlice } from "@reduxjs/toolkit";

import RestaurantState from "./state";
import RestaurantReducer from "./reducer";

const RestaurantSlice = createSlice({
  name: "restaurant",
  initialState: RestaurantState,
  reducers: RestaurantReducer,
});

export const { setRestaurantInfo } = RestaurantSlice.actions;
export default RestaurantSlice.reducer;
