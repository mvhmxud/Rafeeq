import React from "react";

const SquareLoder = () => {
  return (
    <svg className="ldr-container" viewBox="0 0 35 35" height="35" width="35">
      <rect
        className="ldr-track"
        x="2.5"
        y="2.5"
        fill="none"
        strokeWidth="5px"
        width="32.5"
        height="32.5"
      />
      <rect
        className="ldr-car"
        x="2.5"
        y="2.5"
        fill="none"
        strokeWidth="5px"
        width="32.5"
        height="32.5"
        pathLength="100"
      />
    </svg>
  );
};

export default SquareLoder;
