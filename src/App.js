import React, { useState } from "react";
import Navbar from "./components/Navbar";
import News from "./components/News";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import LoadingBar from "react-top-loading-bar";

const App = () => {
  const pageSize = 6; // Change this variable to set number of articles you want to show on the page
  const apiKey = process.env.REACT_APP_NEWS_API_KEY; // Hiding API Key by Adding Custom Environment Variables inside .env file
  const country = "in";

  const [progress, setProgress] = useState(0);

  return (
    <BrowserRouter>
      <Navbar />
      <LoadingBar height={3} color="#f11946" progress={progress} />
      <Routes>
        <Route
          path="/"
          element={
            <News
              setProgress={setProgress}
              key="general" // Adding unique key will forcefully remount the component with updated props
              pageSize={pageSize}
              apiKey={apiKey}
              country={country}
              category="general"
            />
          }
        />
        <Route
          path="/business"
          element={
            <News
              setProgress={setProgress}
              key="business"
              pageSize={pageSize}
              apiKey={apiKey}
              country={country}
              category="business"
            />
          }
        />
        <Route
          path="/entertainment"
          element={
            <News
              setProgress={setProgress}
              key="entertainment"
              pageSize={pageSize}
              apiKey={apiKey}
              country={country}
              category="entertainment"
            />
          }
        />
        <Route
          path="/health"
          element={
            <News
              setProgress={setProgress}
              key="health"
              pageSize={pageSize}
              apiKey={apiKey}
              country={country}
              category="health"
            />
          }
        />
        <Route
          path="/science"
          element={
            <News
              setProgress={setProgress}
              key="science"
              pageSize={pageSize}
              apiKey={apiKey}
              country={country}
              category="science"
            />
          }
        />
        <Route
          path="/sports"
          element={
            <News
              setProgress={setProgress}
              key="sports"
              pageSize={pageSize}
              apiKey={apiKey}
              country={country}
              category="sports"
            />
          }
        />
        <Route
          path="/technology"
          element={
            <News
              setProgress={setProgress}
              key="technology"
              pageSize={pageSize}
              apiKey={apiKey}
              country={country}
              category="technology"
            />
          }
        />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
