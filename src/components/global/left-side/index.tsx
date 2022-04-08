import React from "react";

import SideNav from "../side-navigation";
import RestaurantLogo from "../restaurant-logo";
import SystemColors from "../../../constants/colors";

import styles from "./styles/left.side.module.scss";

const LeftSide: React.FC = () => {
  return (
    <div
      className={styles["container"]}
      style={{
        borderRight: `1px solid ${SystemColors.Tertiary}`,
      }}
    >
      <RestaurantLogo />
      <SideNav />
    </div>
  );
};

export default LeftSide;
