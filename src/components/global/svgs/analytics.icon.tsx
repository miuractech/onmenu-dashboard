import React from "react";

import SystemColors from "../../../constants/colors";
import ISideNavSvgProps from "./types/sidenav.svg.props.types";

const AnalyticsIcon: React.FC<ISideNavSvgProps> = ({ selected }) => {
  return (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M20 20V10"
        stroke={selected ? SystemColors.Blue : SystemColors.Secondary}
        strokeWidth="2.2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M13 20V4"
        stroke={selected ? SystemColors.Blue : SystemColors.Secondary}
        strokeWidth="2.2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M6 20V14"
        stroke={selected ? SystemColors.Blue : SystemColors.Secondary}
        strokeWidth="2.2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};

export default AnalyticsIcon;
