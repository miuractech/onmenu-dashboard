import React from "react";

import SideNavItems, { AdminSideNavItems } from "./sidenav.items";
import SingleItem from "./item.component";
import { useSelector } from "react-redux";
import { RootState } from "../../../store/store.root";
import _ from "lodash";

const SideNav: React.FC = () => {
  const role = useSelector((state: RootState) => state.user.user?.role);
  const navItems = (role==="admin")?[...SideNavItems,...AdminSideNavItems]:SideNavItems
  return (
    <div
      style={{ display: "flex", flexDirection: "column", maxWidth: "250px" }}
    >
      {_.sortBy(navItems,'id').map((item) => (
        <SingleItem
          key={item.id}
          itemName={item.itemName}
          svgComponent={item.svgComponent}
          routeArg={item.routeArg}
        />
      ))}
    </div>
  );
};

export default SideNav;
