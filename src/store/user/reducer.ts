import IAction from "../../types/action.type";
import IUser from "./type";

const UserReducer = {
  setUser: (state: IUser, action: IAction) => {
    state.user = action.payload;
  },
  setMultiRestaurant: (state: IUser, action: IAction) => {
    state.multiRestaurant = action.payload;
  },
  setAuthPageToggle: (state: IUser, action: IAction) => {
    state.authPageToggle = action.payload;
  },
};

export default UserReducer;
