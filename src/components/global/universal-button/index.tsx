import React from "react";
import SystemColors from "../../../constants/colors";

interface IProps {
  height?: number;
  width?: number;
  selected: boolean;
  handleClick?: () => void;
  children: React.ReactChild;
  type?: "submit";
  disabled?: boolean;
}

const UniversalButton: React.FC<IProps> = ({
  height,
  width,
  selected,
  handleClick,
  children,
  disabled,
  type,
  ...rop
}) => {
  return (
    <button
      onClick={handleClick}
      disabled={disabled}
      type={type}
      // @ts-ignore: Unreachable code error
      {...rop}
      style={{
        height: height,
        width: width,
        borderRadius: "5px",
        background: selected ? SystemColors.Blue : SystemColors.Gray_6,
        color: selected ? SystemColors.Gray_6 : SystemColors.Primary,
        border: "none",
        cursor: "pointer",
        // @ts-ignore: Unreachable code error
        ...rop.style
      }}
    >
      {children}
    </button>
  );
};

export default UniversalButton;
