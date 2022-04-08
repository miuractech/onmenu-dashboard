// npm packages direct imports
import React from "react";
import { useDispatch, useSelector } from "react-redux";

// services imports
import getResPartner from "../service/auth/res.partner.service";
import fetchRestaurantInfoService from "../service/restaurant/restaurant.info.service";

// reducers imports
import { setActiveMenuType } from "../store/menu/slice";
import { setRestaurantInfo } from "../store/restaurant/slice";

// types imports
import { RootState } from "../store/store.root";

import logout from "../service/auth/logout.service";

function useFetchRestaurantInfo() {
  const state = useSelector((state: RootState) => state);
  const dispatch = useDispatch();

  React.useEffect(() => {
    async function onStart() {
      if (
        state.user.user?.email !== null &&
        state.user.user?.email !== undefined
      ) {
        const res = await getResPartner(state.user.user?.email);
        //@ts-ignore
        const restaurantInfo = await fetchRestaurantInfoService(
          // res[0].restaurantId
        );
        if (Object.keys(restaurantInfo).length > 0) {

          dispatch(setRestaurantInfo(restaurantInfo));

          dispatch(setActiveMenuType("deli"));
        }
        else{
          alert('error')
        }
      }
      else{
        alert(`You're not Authorized!`)
        logout()
      }
    }
    onStart();
  }, [dispatch, state.user.user]);
}

export default useFetchRestaurantInfo;
