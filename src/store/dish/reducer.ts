import _ from "lodash";

import IAction from "../../types/action.type";
import IDishState from "./type";

const DishReducer = {
  setShowDishForm: (state: IDishState, action: IAction) => {
    state.showDishForm = action.payload;
  },
  setDishes: (state: IDishState, action: IAction) => {
    state.dishes = action.payload;
  },
  setAddDish: (state: IDishState, action: IAction) => {
    state.dishes = [...state.dishes, action.payload];
  },
  setPublishDish: (state: IDishState, action: IAction) => {
    const findIndex = _.findIndex(
      state.dishes,
      (dish) => dish.dish_id === action.payload.dishId
    );
    state.dishes[findIndex].published = action.payload.published;
  },
  setDeleteDish: (state: IDishState, action: IAction) => {
    const filteredDishes = state.dishes.filter(
      (dish) => dish.dish_id !== action.payload.dishId
    );
    state.dishes = filteredDishes;
  },
};

export default DishReducer;
