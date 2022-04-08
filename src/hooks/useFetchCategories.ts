// direct npm packages imports
import React from "react";
import { useSelector, useDispatch } from "react-redux";

// services imports
import fetchCategories from "../service/category/category.fetchall.service";
import checkContainsEmptyString from "../service/utils/check.empty.string";

// reducers imports
import { setCategories } from "../store/category/slice";

// types imports
import { RootState } from "../store/store.root";

function useFetchCategories() {
  const state = useSelector((state: RootState) => state);
  const dispatch = useDispatch();

  React.useEffect(() => {
    async function fetchCategoriesHook() {
      if (
        checkContainsEmptyString([
          state.menu.activeMenu,
          state.restaurant.restaurantId,
        ])
      ) {
        const res = await fetchCategories(
          state.menu.activeMenu,
          state.restaurant.restaurantId
        );
        dispatch(setCategories(res));
      } else {
        dispatch(setCategories([]));
      }
    }
    fetchCategoriesHook();
  }, [
    state.menu.activeMenu,
    state.menu.activeMenuType,
    state.restaurant.restaurantId,
    dispatch,
  ]);
}

export default useFetchCategories;
