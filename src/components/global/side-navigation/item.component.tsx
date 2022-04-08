import React from "react";

import SystemColors from "../../../constants/colors";
import checkActiveSideNavItem from "../../../service/utils/sidenav.active.check";
import styles from "./styles/item.component.module.scss";

interface IProps {
  itemName: string;
  svgComponent: JSX.Element;
  routeArg: string;
}

const SingleItem: React.FC<IProps> = ({ itemName, svgComponent, routeArg }) => {
  const fontColor = checkActiveSideNavItem(routeArg)
    ? SystemColors.Blue
    : SystemColors.Secondary;

  return (
    <a
      href={routeArg === "" ? "/" : `/${routeArg}/`}
      className={styles["container"]}
    >
      {svgComponent}
      <h3 style={{ color: fontColor }} className={styles["item-name"]}>
        {itemName}
      </h3>
    </a>
  );
};

export default SingleItem;
