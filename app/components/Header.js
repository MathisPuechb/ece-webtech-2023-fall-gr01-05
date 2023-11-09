import React, { useState, useEffect } from 'react';
import { useUser } from './UserContext';
import { useRouter } from 'next/router';

function Header() {
  const [profile, setProfile] = useState(null);
  const [error, setError] = useState(null);
  const { user } = useUser();
  const router = useRouter();

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

  const handleRedirect = () => {
    // Redirect to the Index page
    router.push('/');
  };

  return (
    <div className="bg-blue-500 py-4">
      <h1 className="text-4xl text-white font-bold">Public Profile</h1>
      {user ? (
        <div className="text-4xl text-white font-bold">
          {profile ? (
            `${user.username}'s Account`
          ) : (
            'Loading profile...'
          )}
        </div>
      ) : (
        <div>
          <button onClick={handleRedirect} className="text-2xl text-white font-bold">
          Please log in
          </button>
        </div>
      )}
    </div>
  );
}

export default Header;
