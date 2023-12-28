// UserContext.js

// Import necessary dependencies and supabase configuration
import React, { createContext, useContext, useState, useEffect } from 'react';
import supabase from '../pages/supabase-config';

// Create a context for user information
const UserContext = createContext();

// Define the UserProvider component for managing user state
export const UserProvider = ({ children }) => {
  // State to store user information
  const [user, setUser] = useState(null);

  // useEffect to fetch user data when the component mounts
  useEffect(() => {
    // Function to fetch user data from the URL hash (for authentication)
    const fetchData = async () => {
      const queryString = window.location.hash.substring(1);
      const urlParams = new URLSearchParams(queryString);
      const accessToken = urlParams.get("access_token");

      if (accessToken) {
        // Call the login function if an access token is present
        await login();
      }
    };

    // Fetch user data when the component mounts
    fetchData();
  }, []); 

  // Function to handle user login
  const login = async () => {
    try {
      // Fetch user information from supabase
      const {
        data: { user },
      } = await supabase.auth.getUser();
      
      // Extract user metadata
      let metadata = user.user_metadata;

      // Set user state with the retrieved information
      setUser((prevUserInfo) => ({
        ...prevUserInfo,
        ...user,
      }));
    } catch (error) {
      console.error("Error retrieving user information:", error.message);
    }
  };

  // Function to handle user logout
  const handleLogout = async () => {
    console.log("Logged out");
    // Sign out from supabase authentication
    const { error } = await supabase.auth.signOut();
    
    // Reset user state to null
    setUser(null);
  };

  // Provide the user context to the child components
  return (
    <UserContext.Provider value={{ user, login, handleLogout }}>
      {children}
    </UserContext.Provider>
  );
};

// Custom hook to use the user context in functional components
export const useUser = () => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error('useUser must be used within a UserProvider');
  }
  return context;
};
