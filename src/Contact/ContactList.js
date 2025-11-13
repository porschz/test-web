import React, { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import "./ContactList.scss";
import namesData from "./data.json";

const generateRandomName = (index) => {
  const { firstNames, lastNames } = namesData;

  const firstName = firstNames[Math.floor(Math.random() * firstNames.length)];
  const lastName = lastNames[Math.floor(Math.random() * lastNames.length)];
  const age = Math.floor(Math.random() * (65 - 18 + 1)) + 18;

  return {
    id: index,
    firstName,
    lastName,
    fullName: `${firstName} ${lastName}`,
    age
  };
};

const generateContacts = () => {
  return Array.from({ length: 100 }, (_, index) => generateRandomName(index + 1));
};

const ContactList = () => {
  const { t } = useTranslation();
  const [allContacts, setAllContacts] = useState([]);
  const [displayedContacts, setDisplayedContacts] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [isSearching, setIsSearching] = useState(false);

  const PAGE_SIZE = 20;

  useEffect(() => {
    const contacts = generateContacts();
    setAllContacts(contacts);
    setDisplayedContacts(contacts);
  }, []);

  useEffect(() => {
    if (searchTerm.length >= 3) {
      setIsSearching(true);
      const filtered = allContacts.filter(contact =>
        contact.fullName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        contact.firstName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        contact.lastName.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setDisplayedContacts(filtered);
      setCurrentPage(1);
    } else if (searchTerm.length === 0) {
      setIsSearching(false);
      setDisplayedContacts(allContacts);
      setCurrentPage(1);
    }
  }, [searchTerm, allContacts]);

  const handleDelete = (id) => {
    const updatedAll = allContacts.filter(contact => contact.id !== id);
    const updatedDisplayed = displayedContacts.filter(contact => contact.id !== id);
    setAllContacts(updatedAll);
    setDisplayedContacts(updatedDisplayed);

    const totalPages = Math.ceil(updatedDisplayed.length / PAGE_SIZE);
    if (currentPage > totalPages && totalPages > 0) {
      setCurrentPage(totalPages);
    }
  };

  const handleClearSearch = () => {
    setSearchTerm("");
    setIsSearching(false);
    setDisplayedContacts(allContacts);
    setCurrentPage(1);
  };

  const totalPages = Math.ceil(displayedContacts.length / PAGE_SIZE);
  const startIndex = (currentPage - 1) * PAGE_SIZE;
  const endIndex = startIndex + PAGE_SIZE;
  const currentContacts = displayedContacts.slice(startIndex, endIndex);

  const goToPage = (page) => {
    setCurrentPage(page);
  };

  const goToPreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const goToNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const getPageNumbers = () => {
    const pages = [];
    const maxVisible = 5;

    if (totalPages <= maxVisible) {
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      if (currentPage <= 3) {
        for (let i = 1; i <= 4; i++) {
          pages.push(i);
        }
        pages.push('...');
        pages.push(totalPages);
      } else if (currentPage >= totalPages - 2) {
        pages.push(1);
        pages.push('...');
        for (let i = totalPages - 3; i <= totalPages; i++) {
          pages.push(i);
        }
      } else {
        pages.push(1);
        pages.push('...');
        pages.push(currentPage - 1);
        pages.push(currentPage);
        pages.push(currentPage + 1);
        pages.push('...');
        pages.push(totalPages);
      }
    }

    return pages;
  };

  return (
    <div className="contact-list-container">
      <h2 className="contact-list-title">{t("Contact List")}</h2>

      <div className="search-section">
        <div className="search-box">
          <input
            type="text"
            className="search-input"
            placeholder={t("Search by name or surname (min 3 characters)...")}
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          {searchTerm && (
            <button className="clear-button" onClick={handleClearSearch}>
              {t("Clear")}
            </button>
          )}
        </div>
        <div className="search-info">
          {searchTerm.length > 0 && searchTerm.length < 3 && (
            <span className="search-hint">{t("Type at least 3 characters to search")}</span>
          )}
          {isSearching && (
            <span className="search-results">
              {t("Found {{count}} result(s)", { count: displayedContacts.length })}
            </span>
          )}
        </div>
      </div>

      <div className="table-container">
        <table className="contact-table">
          <thead>
            <tr>
              <th>#</th>
              <th>{t("First Name")}</th>
              <th>{t("Last Name")}</th>
              <th>{t("Age")}</th>
              <th>{t("Action")}</th>
            </tr>
          </thead>
          <tbody>
            {currentContacts.length > 0 ? (
              currentContacts.map((contact, index) => (
                <tr key={contact.id}>
                  <td>{startIndex + index + 1}</td>
                  <td>{contact.firstName}</td>
                  <td>{contact.lastName}</td>
                  <td>{contact.age}</td>
                  <td>
                    <button
                      className="delete-button"
                      onClick={() => handleDelete(contact.id)}
                    >
                      {t("Delete")}
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="5" className="no-results">
                  {t("No contacts found")}
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {totalPages > 0 && (
        <div className="pagination">
          <button
            className="pagination-button"
            onClick={goToPreviousPage}
            disabled={currentPage === 1}
          >
            {t("Previous")}
          </button>

          <div className="page-numbers">
            {getPageNumbers().map((page, index) => (
              page === '...' ? (
                <span key={`ellipsis-${index}`} className="pagination-ellipsis">
                  ...
                </span>
              ) : (
                <button
                  key={page}
                  className={`page-number ${currentPage === page ? 'active' : ''}`}
                  onClick={() => goToPage(page)}
                >
                  {page}
                </button>
              )
            ))}
          </div>

          <button
            className="pagination-button"
            onClick={goToNextPage}
            disabled={currentPage === totalPages}
          >
            {t("Next")}
          </button>

          <div className="pagination-info">
            {t("Page {{current}} of {{total}} ({{count}} total contacts)", {
              current: currentPage,
              total: totalPages,
              count: displayedContacts.length
            })}
          </div>
        </div>
      )}
    </div>
  );
};

export default ContactList;
