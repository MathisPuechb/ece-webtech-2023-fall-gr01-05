import React, { useState, useEffect } from 'react';
import { useUser } from './UserContext';

function Header() {
  const [profile, setProfile] = useState(null);
  const [error, setError] = useState(null);
  const { user } = useUser();

  useEffect(() => {
    // Fetch the user profile when the component mounts
    fetch('/api/profile') 
      .then((response) => {
        if (response.status === 200) {
          return response.json();
        } else {
          throw new Error('Database does not respond...');
        }
      })
      .then((data) => {
        setProfile(data);
      })
      .catch((error) => {
        setError(error.message);
      });
  }, []);

  return (
    <div className="bg-blue-500 py-4">
      <h1 className="text-4xl text-white font-bold">User Profile</h1>
      {user ? (
        <div className="text-4xl text-white font-bold">
          {profile ? (
            `${user.username}'s profile`
          ) : (
            'Loading profile...'
          )}
        </div>
      ) : (
        <p>Please log in</p>
      )}
    </div>
  );
}

export default Header;
