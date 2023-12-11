// HomePage.js

import React, { useEffect, useState } from "react";
import { useUser } from '../components/UserContext';
import Layout from "../components/Layout";
import supabase from "./supabase-config";


export default function HomePage() {
  const { user, login, handleLogout } = useUser();
  const [userInfo, setUserInfo] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      const queryString = window.location.hash.substring(1);
      const urlParams = new URLSearchParams(queryString);
      const accessToken = urlParams.get("access_token");

      if (accessToken) {
        await login(); // Utilisez la fonction login du contexte utilisateur
      }
    };

    fetchData();
  }, [login]); 

  const handleGitHubLogin = () => {
    try {
      window.location.href = `${process.env.NEXT_PUBLIC_SUPABASE_URL}/auth/v1/authorize?provider=github`;
    } catch (error) {
      console.error("Échec de la connexion GitHub:", error.message);
    }
  };

  const renderUserEmail = () => {
    if (user && user.email) {
      return <p>email de connexion: {user.email}</p>;
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
