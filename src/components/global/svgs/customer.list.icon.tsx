import React from "react";

import SystemColors from "../../../constants/colors";
import ISideNavSvgProps from "./types/sidenav.svg.props.types";

const CustomerListIcon: React.FC<ISideNavSvgProps> = ({ selected }) => {
  return (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M8 6H21"
        stroke={selected ? SystemColors.Blue : SystemColors.Secondary}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M8 12H21"
        stroke={selected ? SystemColors.Blue : SystemColors.Secondary}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M8 18H21"
        stroke={selected ? SystemColors.Blue : SystemColors.Secondary}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M3 6H3.01"
        stroke={selected ? SystemColors.Blue : SystemColors.Secondary}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M3 12H3.01"
        stroke={selected ? SystemColors.Blue : SystemColors.Secondary}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M3 18H3.01"
        stroke={selected ? SystemColors.Blue : SystemColors.Secondary}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};

export default CustomerListIcon;
