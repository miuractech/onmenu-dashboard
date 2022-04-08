import React from "react";
import { useSelector } from "react-redux";

import { RootState } from "../../../store/store.root";

const RestaurantLogo: React.FC = () => {
  const RestaurantState = useSelector((state: RootState) => state.restaurant);
  return (
    <div style={{ height: "150px", width: "250px" }}>
      <img
        src={RestaurantState.logo}
        alt={RestaurantState.logo}
        style={{ maxHeight: 140, maxWidth: 250 }}
      />
    </div>
  );
};

export default RestaurantLogo;
