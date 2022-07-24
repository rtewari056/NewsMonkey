import React, { Component } from "react";
import Navbar from "./components/Navbar";
import News from "./components/News";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import LoadingBar from "react-top-loading-bar";

export default class App extends Component {
  pageSize = 6; // Change this variable to set number of articles you want to show on the page
  apiKey = "95a1932962814593a37f42c357e22595";
  country = "in";

  state = {
    progress: 0,
  };

  setProgress = (progress) => {
    this.setState({ progress: progress });
  };

  render() {
    return (
      <BrowserRouter>
        <Navbar />
        <LoadingBar height={3} color="#f11946" progress={this.state.progress} />
        <Routes>
          <Route
            path="/"
            element={
              <News
                setProgress={this.setProgress}
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
                setProgress={this.setProgress}
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
                setProgress={this.setProgress}
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
                setProgress={this.setProgress}
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
                setProgress={this.setProgress}
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
                setProgress={this.setProgress}
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
                setProgress={this.setProgress}
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
