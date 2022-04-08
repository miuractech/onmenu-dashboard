import React from "react";
import { useDispatch } from "react-redux";

import logout from "../service/auth/logout.service";
import { setMultiRestaurant, setUser } from "../store/user/slice";
const Logout: React.FC = () => {
  const dispatch = useDispatch()
  React.useEffect(() => {
    localStorage.removeItem("restaurantId");
    dispatch(setMultiRestaurant(null));
    dispatch(setUser(null))
    logout();
  }, []);
  return null;
};

export default Logout;
