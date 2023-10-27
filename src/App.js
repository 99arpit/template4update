import React from "react";
import Template from "./Template";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import CategoryPage from "./Navigation/CategoryPage";
import ViewNews from "./Navigation/ViewNews";
import Epaper from "./COMPONENT/Epaper/EpaperComponent"
import Epaper_details from "./COMPONENT/Epaper/Epaper_details";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/:id" element={<Template />} />
        <Route path="/:id/DetailedNews/:newsId" element={<ViewNews />} />
        <Route path="/:id/category/:category" element={<CategoryPage />} />
        <Route path="/:id/Epaper/" element={<Epaper />} />
        <Route path="/:id/Epaper/:EpaperId" element={<Epaper_details />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
