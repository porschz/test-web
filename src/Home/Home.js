import React, { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import profileData from "../data.json";

const Home = () => {
  const [profile, setProfile] = useState(null);
  
  useEffect(() => {
    setProfile(profileData);
  }, []);

  const { t } = useTranslation();

  return (
    <div>
      <h1>{t("welcomeMessage")}</h1>
      {profile && <p>{t("greeting", { name: profile.name })}</p>}
    </div>
  );
};

export default Home;
