import React from "react";
import { Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import FillInTheBlanksPage from "./pages/FillInTheBlanksPage";
import ResultPage from "./pages/ResultPage";

function App() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/quiz" element={<FillInTheBlanksPage />} />
      <Route path="/result" element={<ResultPage />} />
    </Routes>
  );
}

export default App;
