// npm packages direct imports
import firebase from "firebase/app";
import "firebase/auth";
import React from "react";
import { useDispatch } from "react-redux";
import logout from "../service/auth/logout.service";

// services imports
import getResPartner from "../service/auth/res.partner.service";
import fetchRestaurantInfoService from "../service/restaurant/restaurant.info.service";
import { setActiveMenuType } from "../store/menu/slice";
import { setRestaurantInfo } from "../store/restaurant/slice";
import IRestaurantState from "../store/restaurant/type";

// reducers imports
import { setMultiRestaurant, setUser } from "../store/user/slice";

function useFetchUser() {
  const dispatch = useDispatch();
  React.useEffect(() => {
    firebase.auth().onAuthStateChanged(async (user) => {
      if (user?.email) {
        // logout()
        const prevSelected = localStorage.getItem('restaurantId')
        const res = await getResPartner(user.email);
        //@ts-ignore
        const filter = res.filter((r:IRestaurantState) => r.restaurantId === prevSelected)
        console.log('filter',filter);
        dispatch(setMultiRestaurant(res));
        if(filter.length>0 && prevSelected){
          dispatch(setUser(filter[0]));
          const restaurantInfo = await fetchRestaurantInfoService(
            prevSelected
            
          );
          if (Object.keys(restaurantInfo).length > 0) {
  
            dispatch(setRestaurantInfo(restaurantInfo));
  
            dispatch(setActiveMenuType("deli"));
          }
          else{
            alert('error')
          }
        }
        
      } else {
        dispatch(setMultiRestaurant(null));
        dispatch(setUser(user));
      }
    });
  }, [dispatch]);
}

export default useFetchUser;
