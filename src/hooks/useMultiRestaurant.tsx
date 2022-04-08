// npm packages direct imports
import React from "react";
import { useDispatch, useSelector } from "react-redux";

// services imports
import getResPartner from "../service/auth/res.partner.service";
import fetchRestaurantInfoService from "../service/restaurant/restaurant.info.service";

// reducers imports
import { setActiveMenuType } from "../store/menu/slice";
import { setRestaurantInfo } from "../store/restaurant/slice";
import firebase from "firebase/app"
import 'firebase/auth'
// types imports
import { RootState } from "../store/store.root";

import logout from "../service/auth/logout.service";

function useMultiRestaurant() {
  const state = useSelector((state: RootState) => state);
  const userData = firebase.auth().currentUser;
  const dispatch = useDispatch();

  React.useEffect(() => {
    async function onStart() {
        alert('inside effect')
        console.log(state.user);
        
      if (
        state.user.multiRestaurant?.length <1 &&
        userData?.email
      ) {
        const res = await getResPartner(userData?.email);
        // console.log(res);
        // alert('inside')
        // dispatch(setMultiRestaurant(restaurantInfo));
        //@ts-ignore
        // const restaurantInfo = await fetchRestaurantInfoService(
        //   res.restaurantId
        // );
        // if (Object.keys(restaurantInfo).length > 0) {

        //   dispatch(setRestaurantInfo(restaurantInfo));

        //   dispatch(setActiveMenuType("deli"));
        // }
        // else{
        //   alert('error')
        // }
      }
      else{
        alert(`You're not Authorized! please contact onmenu`)
        logout()
      }
    }
    onStart();
  }, [dispatch, state.user.user]);
}

export default useMultiRestaurant;
