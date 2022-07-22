import "./App.css";

import React, { Component } from "react";
import Navbar from "./components/Navbar";
import News from "./components/News";

export default class App extends Component {
  render() {
    return (
      <>
        <Navbar />
        <News
          pageSize={5}
          apiKey="95a1932962814593a37f42c357e22595"
          country="in"
          category="general"
        />
      </>
    );
  }
}
