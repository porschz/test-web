// App.js
import React, { useState, useEffect } from "react";
import { Routes, Route, Link } from "react-router-dom";
import Home from "./Home/Home";
import ContactList from "./Contact/ContactList";
import Contact from "./Contact/Contact";
import { useTranslation } from "react-i18next";
import logo from "./logo.svg";
import data from "./data.json";
import "./App.scss";

const App = () => {
  const { t, i18n } = useTranslation();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const [information, setInformation] = useState(data);

  useEffect(() => {
    setInformation(data);
  }, []);

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

  const closeDropdown = () => {
    setDropdownOpen(false);
  };

  const openCurrentLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          const googleMapsUrl = `https://www.google.com/maps?q=${latitude},${longitude}`;
          window.open(googleMapsUrl, '_blank');
          closeSidebar();
        },
        (error) => {
          console.error('Error getting location:', error);
          alert('Unable to retrieve your location. Please enable location services.');
          closeSidebar();
        }
      );
    } else {
      alert('Geolocation is not supported by your browser.');
      closeSidebar();
    }
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

          <button className="hamburger" onClick={toggleSidebar} aria-label="Toggle menu">
            <span className={sidebarOpen ? 'active' : ''}></span>
            <span className={sidebarOpen ? 'active' : ''}></span>
            <span className={sidebarOpen ? 'active' : ''}></span>
          </button>
        </div>
      </nav>

      {sidebarOpen && <div className="overlay" onClick={closeSidebar}></div>}
      {dropdownOpen && <div className="dropdown-overlay" onClick={closeDropdown}></div>}

      <aside className={`sidebar ${sidebarOpen ? 'open' : ''}`}>
        <nav className="sidebar-nav">
          <Link to="/" className="sidebar-link" onClick={closeSidebar}>
            <span className="link-icon">🏠</span>
            {t("Home")}
          </Link>
          <div className="sidebar-section">
            <div className="sidebar-section-title">
              <span className="link-icon">👥</span>
              {t("Contact")}
            </div>
            <Link to="/contacts/list" className="sidebar-link sidebar-sublink" onClick={closeSidebar}>
              <span className="link-icon">📋</span>
              {t("List")}
            </Link>
            <Link to="/contacts" className="sidebar-link sidebar-sublink" onClick={closeSidebar}>
              <span className="link-icon">➕</span>
              {t("Create")}
            </Link>
          </div>
          <div className="sidebar-divider"></div>
          <button className="sidebar-link" onClick={openCurrentLocation}>
            <span className="link-icon">📍</span>
            {t("Current Location")}
          </button>
          <button className="sidebar-button" onClick={() => { toggleLanguage(); closeSidebar(); }}>
            <span className="link-icon">🌐</span>
            {i18n.language === 'en' ? 'ไทย' : 'English'}
          </button>
        </nav>
      </aside>

      <main className="main-content">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/contacts">
            <Route path="list" element={<ContactList />} />
            <Route index element={<Contact />} />
          </Route>
        </Routes>
      </main>

      <footer className="footer">
        <div className="footer-container">
          <div className="footer-section">
            <h3 className="footer-title">{t("Contact Us")}</h3>
            <div className="footer-content">
              <div className="footer-item">
                <span className="footer-icon">📍</span>
                <div>
                  <p className="footer-label">{t("Address")}</p>
                  <p className="footer-text">
                    {information.address?.street}, {information.address?.city}, {information.address?.state} {information.address?.zip}
                  </p>
                </div>
              </div>
              <div className="footer-item">
                <span className="footer-icon">📞</span>
                <div>
                  <p className="footer-label">{t("Phone")}</p>
                  <a href={`tel:${information.phoneNumber.replace(/[^0-9+]/g, '')}`} className="footer-link">
                    {information.phoneNumber}
                  </a>
                </div>
              </div>
              <div className="footer-item">
                <span className="footer-icon">📧</span>
                <div>
                  <p className="footer-label">{t("Email")}</p>
                  <a href={`mailto:${information.email}`} className="footer-link">{information.email}</a>
                </div>
              </div>
              <div className="footer-item">
                <span className="footer-icon">💬</span>
                <div>
                  <p className="footer-label">{t("LINE")}</p>
                  <a href={`https://line.me/ti/p/${information.line}`} target="_blank" rel="noopener noreferrer" className="footer-link">
                    @{information.line}
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="footer-bottom">
          <p>&copy; {new Date().getFullYear()} {t("All rights reserved")}</p>
        </div>
      </footer>
    </div>
  );
};

export default App;
