import React, { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import profileData from "../data.json";
import "./Home.scss";

const Home = () => {
  const [profile, setProfile] = useState(null);
  const [profileImage, setProfileImage] = useState("");

  useEffect(() => {
    setProfile(profileData);
    const savedImage = localStorage.getItem("profileImage");
    setProfileImage(savedImage || profileData.imageUrl);
  }, []);

  const { t } = useTranslation();

  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    if (file) {

      if (!file.type.startsWith("image/")) {
        alert("Please select a valid image file");
        return;
      }

      if (file.size > 5 * 1024 * 1024) {
        alert("Image size should be less than 5MB");
        return;
      }

      const reader = new FileReader();
      reader.onloadend = () => {
        const imageDataUrl = reader.result;
        setProfileImage(imageDataUrl);
        localStorage.setItem("profileImage", imageDataUrl);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="home-container">
      <div className="hero-section">
        <h1 className="welcome-title">{t("welcomeMessage")}</h1>
      </div>

      {profile && (
        <div className="profile-card">
          <div className="profile-header">
            <div className="profile-image-container">
              <img
                src={profileImage}
                alt={profile.name}
                className="profile-image"
              />
              <div className="upload-overlay">
                <label htmlFor="image-upload" className="upload-button">
                  <svg className="camera-icon" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z"></path>
                    <circle cx="12" cy="13" r="4"></circle>
                  </svg>
                  Upload Photo
                </label>
                <input
                  id="image-upload"
                  type="file"
                  accept="image/*"
                  onChange={handleImageUpload}
                  className="file-input"
                />
              </div>
            </div>
            <p className="profile-name">{profile.name}</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default Home;
