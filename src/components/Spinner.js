import React, { Component } from "react";
import "../spinner.css";

export class Spinner extends Component {
  render() {
    return (

      <div className="spinner-container d-flex justify-content-center">
        <div className="loading-spinner"></div>
      </div>
    );
  }
}

export default Spinner;
