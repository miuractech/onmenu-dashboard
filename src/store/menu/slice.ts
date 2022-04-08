import { createSlice } from "@reduxjs/toolkit";

import MenuReducer from "./reducer";
import MenuState from "./state";

const MenuSlice = createSlice({
  name: "menu",
  initialState: MenuState,
  reducers: MenuReducer,
});

export const {
  setActiveMenu,
  setActiveMenuType,
  setMenus,
  addMenu,
  editMenu,
  setShowMenuEditForm,
  pubUnpubMenu,
} = MenuSlice.actions;

export default MenuSlice.reducer;
