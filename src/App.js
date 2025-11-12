// App.js
import React from "react";
import { Routes, Route, Link } from "react-router-dom";
import Home from "./Home/Home";
import { useTranslation } from "react-i18next";

const App = () => {
  const { t, i18n } = useTranslation();

  const changeLanguage = (lng) => {
    i18n.changeLanguage(lng);
  };

  return (
    <div>
      <nav>
        <Link to="/">{t("Home")}</Link>
        <button onClick={() => changeLanguage("en")}>English</button>
        <button onClick={() => changeLanguage("th")}>ไทย</button>
      </nav>
      <Routes>
        <Route path="/" element={<Home />} />
      </Routes>
    </div>
  );
};

export default App;
