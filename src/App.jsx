import React from "react";
import { Routes, Route } from "react-router-dom";
import ChapterList from "./components/ChapterList.jsx";
import MangaReader from "./components/MangaReader/MangaReader.jsx";

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<ChapterList />} />
      <Route path="/chapter/:chapter" element={<MangaReader />} />
    </Routes>
  );
};

export default App;
