// npm package direct imports
import { configureStore } from "@reduxjs/toolkit";

// slices imports
import RestaurantSliceReducer from "./restaurant/slice";
import MenuSliceReducer from "./menu/slice";
import CategorySliceReducer from "./category/slice";
import DishSliceReducer from "./dish/slice";
import UserSliceReducer from "./user/slice";

const store = configureStore({
  reducer: {
    restaurant: RestaurantSliceReducer,
    menu: MenuSliceReducer,
    category: CategorySliceReducer,
    dish: DishSliceReducer,
    user: UserSliceReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export default store;
