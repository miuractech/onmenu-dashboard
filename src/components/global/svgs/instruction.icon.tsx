import React from "react";

import SystemColors from "../../../constants/colors";
import ISideNavSvgProps from "./types/sidenav.svg.props.types";

const InstructionIcon: React.FC<ISideNavSvgProps> = ({ selected }) => {
  return (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2Z"
        stroke={selected ? SystemColors.Blue : SystemColors.Secondary}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M12.0349 15.9997L11.9651 12.0003"
        stroke={selected ? SystemColors.Blue : SystemColors.Secondary}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M12 7.99994L11.99 8.00011"
        stroke={selected ? SystemColors.Blue : SystemColors.Secondary}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};

export default InstructionIcon;
