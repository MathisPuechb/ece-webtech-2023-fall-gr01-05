// Header.js

// Import necessary dependencies and hooks
import React, { useState, useEffect } from 'react';
import { useUser } from './UserContext'; // Import the UserContext hook
import { useRouter } from 'next/router';

// Define the Header component
function Header() {
  const [profile, setProfile] = useState(null); // State for storing user profile data
  const [error, setError] = useState(null); // State for storing errors during data fetching
  const { user } = useUser(); // Use the UserContext hook to get user information
  const router = useRouter(); // Next.js router object

  // useEffect hook to fetch user profile data when the component mounts
  useEffect(() => {
    // Fetch user profile data from the server
    fetch('/api/profile')
      .then((response) => {
        // Check if the response status is 200 (OK)
        if (response.status === 200) {
          // Parse the response as JSON and return the data
          return response.json();
        } else {
          // If the response status is not 200, throw an error
          throw new Error('Database does not respond...');
        }
      })
      .then((data) => {
        // Set the retrieved profile data in the state
        setProfile(data);
      })
      .catch((error) => {
        // Set an error message in the state if an error occurs during fetching
        setError(error.message);
      });
  }, []); // Dependency array is empty to ensure the effect runs only on mount

  // Function to handle redirection to the home page
  const handleRedirect = () => {
    router.push('/');
  };

  // JSX for rendering the Header component
  return (
    <div className="bg-blue-500 py-4">
      {/* Display a welcome message or public profile message based on user authentication */}
      <h1 className="text-4xl text-white font-bold">
        {user ? `Welcome, ${user.user_metadata.preferred_username}!` : 'Public Profile'}
      </h1>

      {user ? (
        <div className="text-4xl text-white font-bold">
          {/* Display the account email or a loading message */}
          {user ? (
            `Account email: ${user.email}`
          ) : (
            'Loading profile...'
          )}
        </div>
      ) : (
        <div>
          {/* Button to redirect to the home page for logging in */}
          <button onClick={handleRedirect} className="text-2xl text-white font-bold">
            Please log in
          </button>
        </div>
      )}
    </div>
  );
}

// Export the Header component
export default Header;
