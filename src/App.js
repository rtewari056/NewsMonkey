import React, { Component } from "react";
import Navbar from "./components/Navbar";
import News from "./components/News";
import { BrowserRouter, Routes, Route } from "react-router-dom";

export default class App extends Component {
  pageSize = 15; // Change this variable to set number of articles you want to show on the page
  apiKey="95a1932962814593a37f42c357e22595";
  country="in"

  render() {
    return (
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route
            path="/"
            element={
              <News
                key="general" // Adding unique key will forcefully remount the component with updated props
                pageSize={this.pageSize}
                apiKey={this.apiKey}
                country={this.country}
                category="general"
              />
            }
          />
          <Route
            path="/business"
            element={
              <News
                key="business"
                pageSize={this.pageSize}
                apiKey={this.apiKey}
                country={this.country}
                category="business"
              />
            }
          />
          <Route
            path="/entertainment"
            element={
              <News
                key="entertainment"
                pageSize={this.pageSize}
                apiKey={this.apiKey}
                country={this.country}
                category="entertainment"
              />
            }
          />
          <Route
            path="/health"
            element={
              <News
                key="health"
                pageSize={this.pageSize}
                apiKey={this.apiKey}
                country={this.country}
                category="health"
              />
            }
          />
          <Route
            path="/science"
            element={
              <News
                key="science"
                pageSize={this.pageSize}
                apiKey={this.apiKey}
                country={this.country}
                category="science"
              />
            }
          />
          <Route
            path="/sports"
            element={
              <News
                key="sports"
                pageSize={this.pageSize}
                apiKey={this.apiKey}
                country={this.country}
                category="sports"
              />
            }
          />
          <Route
            path="/technology"
            element={
              <News
                key="technology"
                pageSize={this.pageSize}
                apiKey={this.apiKey}
                country={this.country}
                category="technology"
              />
            }
          />
        </Routes>
      </BrowserRouter>
    );
  }
}
