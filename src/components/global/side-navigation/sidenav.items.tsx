import ISideNavItem from "./types/sidenav.items.types";

import MenuPageIcon from "../svgs/menu.page.icon";
import UserCheckIcon from "../svgs/user.check.icon";
import CustomerListIcon from "../svgs/customer.list.icon";
import LoyaltyAlertIcon from "../svgs/loyalty.alert.icon";
import AnalyticsIcon from "../svgs/analytics.icon";
import BinIcon from "../svgs/bin.icon";
import InstructionIcon from "../svgs/instruction.icon";
import LogoutIcon from "../svgs/logout.icon";
import ServiceAlertIcon from "../svgs/service.alert.icon";
import SettingsIcon from "../svgs/settings.icon";
import PaymentIcon from "../svgs/payment.icon";

import checkActiveSideNavItem from "../../../service/utils/sidenav.active.check";
import LocalDining from "@material-ui/icons/LocalDining"
import OrderIcon from "../svgs/orderIcon";

const SideNavItems: Array<ISideNavItem> = [
  {
    id: 0,
    itemName: "Menu Page",
    svgComponent: <MenuPageIcon selected={checkActiveSideNavItem("")} />,
    routeArg: "menus",
  },
  {
    id: 1,
    itemName: "Active Customers",
    svgComponent: (
      <UserCheckIcon selected={checkActiveSideNavItem("active-customers")} />
    ),
    routeArg: "active-customers",
  },
  // {
  //   id: 2,
  //   itemName: "Customer List",
  //   svgComponent: (
  //     <CustomerListIcon selected={checkActiveSideNavItem("customer-list")} />
  //   ),
  //   routeArg: "customer-list",
  // },
  {
    id: 3,
    itemName: "Loyalty Alert",
    svgComponent: (
      <LoyaltyAlertIcon selected={checkActiveSideNavItem("loyalty-alert")} />
    ),
    routeArg: "loyalty-alert",
  },
  {
    id: 4,
    itemName: "Service Alert",
    svgComponent: (
      <ServiceAlertIcon selected={checkActiveSideNavItem("service-alert")} />
    ),
    routeArg: "service-alert",
  },
  
  {
    id: 6,
    itemName: "Payments",
    svgComponent: <PaymentIcon selected={checkActiveSideNavItem("payments")} />,
    routeArg: "payments",
  },
  {
    id: 7,
    itemName: "Takeaway Orders",
    svgComponent: <OrderIcon selected={checkActiveSideNavItem("orders")} />,
    routeArg: "orders",
  },
  
  {
    id: 9,
    itemName: "Instructions",
    svgComponent: (
      <InstructionIcon selected={checkActiveSideNavItem("instructions")} />
    ),
    routeArg: "instructions",
  },
  {
    id: 11,
    itemName: "Logout",
    svgComponent: <LogoutIcon selected={checkActiveSideNavItem("logout")} />,
    routeArg: "logout",
  },
];


export default SideNavItems;

export const AdminSideNavItems: Array<ISideNavItem> = [
  {
    id: 8,
    itemName: "Settings",
    svgComponent: (
      <SettingsIcon selected={checkActiveSideNavItem("settings")} />
    ),
    routeArg: "settings",
  },
  {
    id: 10,
    itemName: "Bin",
    svgComponent: <BinIcon selected={checkActiveSideNavItem("bin")} />,
    routeArg: "bin",
  },
  {
    id: 5,
    itemName: "Analytics",
    svgComponent: (
      <AnalyticsIcon selected={checkActiveSideNavItem("analytics")} />
    ),
    routeArg: "analytics",
  },
]