import React from "react";
import "./css/app.scss";
import { Routes, Route } from "react-router-dom";
import Main from "./components/Main";
import LoadingPage from "./components/LoadingPage";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<LoadingPage />} />
        <Route path="/main" element={<Main />} />
      </Routes>
    </>
  );
}

export default App;
