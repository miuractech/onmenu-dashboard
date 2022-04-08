import React from "react";

import SystemColors from "../../../constants/colors";

const FixedBackGround: React.FC = ({ children }) => {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        position: "fixed",
        top: 0,
        left: 0,
        zIndex: 9999,
        background: SystemColors.Primary,
        minHeight: "720px",
        minWidth: "1280px",
        height: "100vh",
        width: "100vw",
      }}
    >
      {children}
    </div>
  );
};

export default FixedBackGround;
