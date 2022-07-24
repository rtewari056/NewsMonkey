import React from "react";
import "../spinner.css";

const Spinner = () => {
  return (
    <div className="spinner-container d-flex justify-content-center my-5">
      <div className="loading-spinner"></div>
    </div>
  );
};

export default Spinner;
