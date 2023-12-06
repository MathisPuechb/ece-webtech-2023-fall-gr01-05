import React, { useEffect, useState } from "react";
import Layout from "../components/Layout";
import supabase from "./supabase-config";

export default function HomePage() {
  const [userInfo, setUserInfo] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      const queryString = window.location.hash.substring(1);
      const urlParams = new URLSearchParams(queryString);
      const accessToken = urlParams.get("access_token");

      if (accessToken) {
        await getUserInfo();
      }
    };

    fetchData();
  }, []);

  const handleGitHubLogin = () => {
    try {
      window.location.href = `${process.env.NEXT_PUBLIC_SUPABASE_URL}/auth/v1/authorize?provider=github`;
      getUserInfo();
    } catch (error) {
      console.error("Échec de la connexion GitHub:", error.message);
    }
  };

  const handleLogout = async () => {
    // Implement logout logic here if needed
    // For example, clear user data from state
    setUserInfo(null);
  };

  const getUserInfo = async () => {
  try {
    const { data } = await supabase.from('profiles').select('*');
    const { data: profile } = await supabase
      .from('profiles')
      .select('email');

    // Use the state updater function to ensure the latest state
    setUserInfo((prevUserInfo) => ({
      ...prevUserInfo,
      ...profile,
    }));
    
    console.log("profile: ",profile);
  } catch (error) {
    console.error("Erreur lors de la récupération des informations de l'utilisateur:", error.message);
  }
};


const renderUserEmail = () => {
  if (userInfo && userInfo[0] && userInfo[0].email) {
    return <p>email de connexion: {userInfo[0].email}</p>;
  }
  return null;
};

  return (
    <Layout>
      {renderUserEmail()}
      <button onClick={handleGitHubLogin}>Se connecter avec GitHub</button>
      <button onClick={handleLogout}>Se déconnecter</button>
    </Layout>
  );
}
