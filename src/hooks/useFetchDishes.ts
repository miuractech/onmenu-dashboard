// npm packages direct imports
import React from "react";
import { useSelector, useDispatch } from "react-redux";

// services imports
import fetchDishes from "../service/dish/dish.fetchall.service";
import checkContainsEmptyString from "../service/utils/check.empty.string";

// reducers imports
import { setDishes } from "../store/dish/slice";

// types imports
import { RootState } from "../store/store.root";

function useFetchDishes() {
  const state = useSelector((state: RootState) => state);
  const dispatch = useDispatch();

  React.useEffect(() => {
    async function fetchDishesHook() {
      if (
        checkContainsEmptyString([
          state.restaurant.restaurantId,
          state.menu.activeMenuType,
          state.menu.activeMenu,
          // state.category.activeCategory,
        ])
      ) {
        const res = await fetchDishes(
          state.restaurant.restaurantId,
          state.category.activeCategory,
          state.menu.activeMenuType,
          state.menu.activeMenu,
        );
        dispatch(setDishes(res));
      } else {
        dispatch(setDishes([]));
      }
    }
    fetchDishesHook();
  }, [
    state.menu.activeMenuType,
    state.menu.activeMenu,
    state.category.activeCategory,
    state.restaurant.restaurantId,
    dispatch,
  ]);
}

export default useFetchDishes;
