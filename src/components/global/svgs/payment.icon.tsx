import React from "react";

import SystemColors from "../../../constants/colors";
import ISideNavSvgProps from "./types/sidenav.svg.props.types";

const PaymentIcon: React.FC<ISideNavSvgProps> = ({ selected }) => {
  return (
    <svg
      width="23"
      height="23"
      viewBox="0 0 23 23"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <g clipPath="url(#clip0)">
        <path
          d="M20.1249 3.83331H2.87492C1.81637 3.83331 0.958252 4.69143 0.958252 5.74998V17.25C0.958252 18.3085 1.81637 19.1666 2.87492 19.1666H20.1249C21.1835 19.1666 22.0416 18.3085 22.0416 17.25V5.74998C22.0416 4.69143 21.1835 3.83331 20.1249 3.83331Z"
          stroke={selected ? SystemColors.Blue : SystemColors.Secondary}
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M0.958252 9.58331H22.0416"
          stroke={selected ? SystemColors.Blue : SystemColors.Secondary}
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </g>
      <defs>
        <clipPath id="clip0">
          <rect width="23" height="23" fill="white" />
        </clipPath>
      </defs>
    </svg>
  );
};

export default PaymentIcon;
