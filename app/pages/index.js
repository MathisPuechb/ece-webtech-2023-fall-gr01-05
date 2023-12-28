// Import necessary dependencies and components
import React, { useEffect, useState } from "react";
import { useUser } from '../components/UserContext'; // custom hook for user authentication
import Layout from "../components/Layout"; // import the default layout
import supabase from "./supabase-config"; // Importing Supabase configuration (not shown)

// Define the HomePage functional component
export default function HomePage() {
  // Destructure values from the useUser custom hook
  const { user, login, handleLogout } = useUser();
  
  // State to store user information
  const [userInfo, setUserInfo] = useState(null);

  // useEffect hook to fetch data when the component mounts
  useEffect(() => {
    // Function to fetch data asynchronously
    const fetchData = async () => {
      // Extract access token from the URL hash
      const queryString = window.location.hash.substring(1);
      const urlParams = new URLSearchParams(queryString);
      const accessToken = urlParams.get("access_token");

      // If access token is present, attempt to log in the user
      if (accessToken) {
        await login();
      }
    };

    // Call the fetchData function when the component mounts
    fetchData();
  }, [login]); // Dependency array ensures that this effect runs only when the 'login' function changes

  // Function to handle GitHub login
  const handleGitHubLogin = () => {
    try {
      // Redirect the user to the GitHub authentication URL
      window.location.href = `${process.env.NEXT_PUBLIC_SUPABASE_URL}/auth/v1/authorize?provider=github`;
    } catch (error) {
      // Log an error message if GitHub login fails
      console.error("GitHub login failed:", error.message);
    }
  };

  // JSX for rendering the component
  return (
    <Layout>
      {/* Main content container */}
      <div className="flex flex-col items-center justify-center h-screen">
        {/* GitHub login button */}
        <button onClick={handleGitHubLogin} className="my-4">CONNECT WITH GitHub</button>
        
        {/* Sign out button */}
        <button onClick={handleLogout} className="my-4">SIGN OUT</button>
      </div>
    </Layout>
  );
}
