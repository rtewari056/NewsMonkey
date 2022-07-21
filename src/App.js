import "./App.css";

import React, { Component } from "react";
import Navbar from "./components/Navbar";
import News from "./components/News";

export default class App extends Component {
  render() {
    return (
      <>
        <Navbar />
        <News />
      </>
    );
  }
}


// Website: https://newsapi.org/s/india-news-api
// Email: noqubina@labworld.org
// Password: bekGkZh%e^BUJ9q#