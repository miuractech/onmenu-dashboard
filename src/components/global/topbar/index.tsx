import React from "react";

import SystemColors from "../../../constants/colors";
import styles from "./styles/topbar.module.scss";
import UserIcon from "../svgs/user.icon";
import BellIcon from "../svgs/bell.icon";
import { useSelector } from "react-redux";
import { RootState } from "../../../store/store.root";
import { Link } from "react-router-dom";
const TopBarMenuItems = [
  {field:"Home",link:'/menus'},
  {field:"Menu Under Work",link:'/under-work'},
  {field:"Published Menu",link:'/published-menus'},
  {field:"Download QR",link:'/qr-code'},
  {field:"Contact On Menu",link:'/'},
  // {field:"Home",link:'/'},
];
const TopBar: React.FC = () => {
  const state = useSelector((state: RootState) => state);

  return (
    <div className={styles["container"]}>
      {TopBarMenuItems.map((item, index) => (
          <a href={item.link}>
        <div className={styles["item-container"]} key={index}>
            <h3
              className={styles["item"]}
              style={{ color: SystemColors.Primary }}
            >
              {item.field}
            </h3>
        </div>
          </a>
      ))}
      <div
        style={{
          display: "flex",
          cursor: "pointer",
          width: "150px",
          justifyContent: "space-between",
          padding: "10px 0 0 10px",
        }}
      >
        <div className={styles["icons"]}>
          <UserIcon />
        </div>
        <h3
          className={styles["item"]}
          style={{
            color: SystemColors.Primary,
            fontFamily: "Poppins",
            fontWeight: "normal",
            fontStyle: "normal",
            fontSize: "1.2rem",
          }}
        >
          {state.user.user?.email}
        </h3>
        <div className={styles["icons"]}>
          <BellIcon />
        </div>
      </div>
    </div>
  );
};

export default TopBar;
