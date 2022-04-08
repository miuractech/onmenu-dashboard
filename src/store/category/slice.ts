import { createSlice } from "@reduxjs/toolkit";

import CategoryReducer from "./reducer";
import CategoryState from "./state";

const CategorySlice = createSlice({
  name: "category",
  initialState: CategoryState,
  reducers: CategoryReducer,
});

export const {
  setShowCategoryForm,
  setShowCategoryEditForm,
  setActiveCategory,
  setCategories,
  editCategory,
  pubUnpubCategory
} = CategorySlice.actions;

export default CategorySlice.reducer;
