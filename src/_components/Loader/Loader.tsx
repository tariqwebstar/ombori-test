import React from "react";
import "./Loader.css";

const LoadingComponent: React.FC = () => {
  return (
    <div className="loader-wrapper">
      <div className="loader"></div>
      <div className="loader"></div>
      <div className="loader"></div>
    </div>
  );
};

export default LoadingComponent;
