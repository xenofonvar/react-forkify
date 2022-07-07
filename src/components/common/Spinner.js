import React from "react";
import icons from "../../img/icons.svg";

const Spinner = () => {
  return (
    <div className="spinner">
      <svg>
        <use href={icons + "#icon-loader"}></use>
      </svg>
    </div>
  );
};

export default Spinner;
