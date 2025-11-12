// App.js
import React, { useState } from "react";
import { Routes, Route, Link } from "react-router-dom";
import Home from "./Home/Home";
import ContactList from "./Contact/ContactList";
import Contact from "./Contact/Contact";
import { useTranslation } from "react-i18next";
import logo from "./logo.svg";
import "./App.scss";

const App = () => {
  const { t, i18n } = useTranslation();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const toggleLanguage = () => {
    const newLang = i18n.language === 'en' ? 'th' : 'en';
    i18n.changeLanguage(newLang);
  };

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  const closeSidebar = () => {
    setSidebarOpen(false);
  };

  return (
    <div className="app">
      <nav className="navbar">
        <div className="navbar-container">
          <div className="navbar-brand">
            <Link to="/" className="logo-link">
              <img src={logo} alt="Logo" className="logo" />
            </Link>
          </div>

          <div className="navbar-menu">
            <div className="nav-links">
              <Link to="/" className="nav-link">{t("Home")}</Link>
              <Link to="/contacts/list" className="nav-link">{t("Contact List")}</Link>
              <Link to="/contacts" className="nav-link">{t("Contacts")}</Link>
            </div>

            <div className="nav-actions">
              <button className="language-toggle" onClick={toggleLanguage}>
                <span className="language-icon">🌐</span>
                {i18n.language === 'en' ? 'ไทย' : 'EN'}
              </button>
            </div>
          </div>

          <button className="hamburger" onClick={toggleSidebar} aria-label="Toggle menu">
            <span className={sidebarOpen ? 'active' : ''}></span>
            <span className={sidebarOpen ? 'active' : ''}></span>
            <span className={sidebarOpen ? 'active' : ''}></span>
          </button>
        </div>
      </nav>

      {sidebarOpen && <div className="overlay" onClick={closeSidebar}></div>}

      <aside className={`sidebar ${sidebarOpen ? 'open' : ''}`}>
        <div className="sidebar-header">
          <div className="sidebar-brand">
            <img src={logo} alt="Logo" className="sidebar-logo" />
            <span>MyApp</span>
          </div>
          <button className="close-btn" onClick={closeSidebar} aria-label="Close menu">
            &times;
          </button>
        </div>
        <nav className="sidebar-nav">
          <Link to="/" className="sidebar-link" onClick={closeSidebar}>
            <span className="link-icon">🏠</span>
            {t("Home")}
          </Link>
          <Link to="/contacts/list" className="sidebar-link" onClick={closeSidebar}>
            <span className="link-icon">📋</span>
            {t("Contact List")}
          </Link>
          <Link to="/contacts" className="sidebar-link" onClick={closeSidebar}>
            <span className="link-icon">👥</span>
            {t("Contacts")}
          </Link>
          <div className="sidebar-divider"></div>
          <button className="sidebar-button" onClick={() => { toggleLanguage(); closeSidebar(); }}>
            <span className="link-icon">🌐</span>
            {i18n.language === 'en' ? 'ไทย' : 'English'}
          </button>
        </nav>
      </aside>

      <main className="main-content">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/contacts/list" element={<ContactList />} />
          <Route path="/contacts" element={<Contact />} />
        </Routes>
      </main>
    </div>
  );
};

export default App;
