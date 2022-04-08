import { createSlice } from "@reduxjs/toolkit";
import UserReducer from "./reducer";
import User from "./state";

const UserSlice = createSlice({
  name: "user",
  initialState: User,
  reducers: UserReducer,
});

export const { setUser, setAuthPageToggle, setMultiRestaurant } = UserSlice.actions;
export default UserSlice.reducer;
