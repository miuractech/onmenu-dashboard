import React from "react";
import CircularProgress from "@material-ui/core/CircularProgress";

const Loader: React.FC = () => {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        minHeight: 720,
        minWidth: 1280,
        height: "100vh",
        width: "100vw",
      }}
    >
      <CircularProgress />
    </div>
  );
};

export default Loader;
