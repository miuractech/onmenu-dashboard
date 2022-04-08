// npm packages direct imports
import React from "react";
import { useSelector, useDispatch } from "react-redux";

// services imports
import fetchMenus from "../service/menu/menu.fetchall.service";
import checkContainsEmptyString from "../service/utils/check.empty.string";

// reducers imports
import { setMenus } from "../store/menu/slice";

// types imports
import { RootState } from "../store/store.root";

function useFetchMenus() {
  const RestaurantState = useSelector((state: RootState) => state.restaurant);
  const MenuState = useSelector((state: RootState) => state.menu);
  const dispatch = useDispatch();

  React.useEffect(() => {
    async function fetchMenusHook() {
      if (
        checkContainsEmptyString([
          RestaurantState.restaurantId,
          MenuState.activeMenuType,
        ])
      ) {
        const res = await fetchMenus(
          RestaurantState.restaurantId,
          MenuState.activeMenuType
        );
        dispatch(setMenus(res));
      } else {
        dispatch(setMenus([]));
      }
    }
    fetchMenusHook();
  }, [MenuState.activeMenuType, dispatch, RestaurantState.restaurantId]);
}

export default useFetchMenus;
