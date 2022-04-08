import React from "react";
import { useSelector } from "react-redux";

import { RootState } from "../../store/store.root";
import { CenterDiv } from "./constants";
import Login from "./login";
import Register from "./register";

const AuthPageIndex: React.FC = () => {
  const state = useSelector((state: RootState) => state);

  return (
    <div style={CenterDiv}>
      {state.user.authPageToggle ? <Register /> : <Login />}
    </div>
  );
};

export default AuthPageIndex;
