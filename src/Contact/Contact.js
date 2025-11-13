import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import './Contact.scss';

const Contact = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    age: ''
  });

  const [errors, setErrors] = useState({
    firstName: '',
    lastName: '',
    age: ''
  });

  const [showModal, setShowModal] = useState(false);
  const [modalType, setModalType] = useState('');
  const [modalMessage, setModalMessage] = useState('');

  const validateString = (value) => {
    if (!value.trim()) {
      return 'This field is required';
    }
    const stringRegex = /^[a-zA-Zก-๙\s]+$/;
    if (!stringRegex.test(value)) {
      return 'Please enter letters only';
    }
    return '';
  };

  const validateNumber = (value) => {
    if (!value) {
      return 'This field is required';
    }
    const numberRegex = /^\d+$/;
    if (!numberRegex.test(value)) {
      return 'Please enter numbers only';
    }
    const age = parseInt(value);
    if (age <= 0) {
      return 'Age must be greater than 0';
    }
    if (age > 150) {
      return 'Please enter a valid age';
    }
    return '';
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });

    if (errors[name]) {
      setErrors({
        ...errors,
        [name]: ''
      });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const firstNameError = validateString(formData.firstName);
    const lastNameError = validateString(formData.lastName);
    const ageError = validateNumber(formData.age);

    if (firstNameError || lastNameError || ageError) {
      setErrors({
        firstName: firstNameError,
        lastName: lastNameError,
        age: ageError
      });
      setModalType('error');
      setModalMessage(t('Please correct the errors in the form'));
      setShowModal(true);
      return;
    }

    setModalType('success');
    setModalMessage(t('Contact created successfully!'));
    setShowModal(true);
  };

  const handleModalClose = () => {
    setShowModal(false);
    if (modalType === 'success') {
      navigate('/contacts/list');
    }
  };

  const handleCancel = () => {
    navigate('/contacts/list');
  };

  return (
    <div className="contact-create-container">
      <h2 className="contact-create-title">{t('Create Contact')}</h2>

      <form className="contact-form" onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="firstName" className="form-label">
            {t('First Name')} <span className="required">*</span>
          </label>
          <input
            type="text"
            id="firstName"
            name="firstName"
            className={`form-input ${errors.firstName ? 'error' : ''}`}
            value={formData.firstName}
            onChange={handleInputChange}
            placeholder={t('Enter first name')}
          />
          {errors.firstName && (
            <span className="error-message">{t(errors.firstName)}</span>
          )}
        </div>

        <div className="form-group">
          <label htmlFor="lastName" className="form-label">
            {t('Last Name')} <span className="required">*</span>
          </label>
          <input
            type="text"
            id="lastName"
            name="lastName"
            className={`form-input ${errors.lastName ? 'error' : ''}`}
            value={formData.lastName}
            onChange={handleInputChange}
            placeholder={t('Enter last name')}
          />
          {errors.lastName && (
            <span className="error-message">{t(errors.lastName)}</span>
          )}
        </div>

        <div className="form-group">
          <label htmlFor="age" className="form-label">
            {t('Age')} <span className="required">*</span>
          </label>
          <input
            type="text"
            id="age"
            name="age"
            className={`form-input ${errors.age ? 'error' : ''}`}
            value={formData.age}
            onChange={handleInputChange}
            placeholder={t('Enter age')}
          />
          {errors.age && (
            <span className="error-message">{t(errors.age)}</span>
          )}
        </div>

        <div className="form-actions">
          <button type="button" className="btn-cancel" onClick={handleCancel}>
            {t('Cancel')}
          </button>
          <button type="submit" className="btn-submit">
            {t('Submit')}
          </button>
        </div>
      </form>

      {showModal && (
        <div className="modal-overlay" onClick={handleModalClose}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <div className={`modal-header ${modalType}`}>
              {modalType === 'success' ? (
                <svg className="modal-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              ) : (
                <svg className="modal-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              )}
            </div>
            <div className="modal-body">
              <h3 className="modal-title">
                {modalType === 'success' ? t('Success') : t('Error')}
              </h3>
              <p className="modal-message">{modalMessage}</p>
            </div>
            <div className="modal-footer">
              <button className="modal-button" onClick={handleModalClose}>
                {t('OK')}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Contact;
