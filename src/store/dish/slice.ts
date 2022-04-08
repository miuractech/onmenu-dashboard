import { createSlice } from "@reduxjs/toolkit";
import DishReducer from "./reducer";
import DishState from "./state";

const DishSlice = createSlice({
  name: "dish",
  initialState: DishState,
  reducers: DishReducer,
});

export const {
  setShowDishForm,
  setDishes,
  setAddDish,
  setPublishDish,
  setDeleteDish,
} = DishSlice.actions;
export default DishSlice.reducer;
