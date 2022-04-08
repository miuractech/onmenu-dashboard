import _ from "lodash";

import IMenuState from "./type";
import IAction from "../../types/action.type";

const MenuReducer = {
  setShowMenuEditForm: (state: IMenuState, action: IAction) => {
    state.showMenuEditForm = action.payload;
  },
  setActiveMenuType: (state: IMenuState, { type, payload }: IAction) => {
    state.activeMenuType = payload;
    state.activeMenu = "";
  },
  setActiveMenu: (state: IMenuState, { type, payload }: IAction) => {
    state.activeMenu = payload;
  },
  setMenus: (state: IMenuState, action: IAction) => {
    state.menus = action.payload;
  },
  addMenu: (state: IMenuState, { type, payload }: IAction) => {
    state.menus = [...state.menus, payload];
  },
  editMenu: (state: IMenuState, { type, payload }: IAction) => {
    const index = _.findIndex(
      state.menus,
      (menu) => menu.menuId === payload.id
    );
    state.menus[index] = payload.editedMenu;
  },
  pubUnpubMenu: (state: IMenuState, { type, payload }: IAction) => {
    const index = _.findIndex(
      state.menus,
      (menu) => menu.menuId === payload.id
    );
    state.menus[index].published = payload.published;
  },
};

export default MenuReducer;
