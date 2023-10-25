
import React, { useState, useEffect } from 'react';

function Header() {
  const [profile, setProfile] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch('/api/profile') 
      .then((response) => {
        if (response.status === 200) {
          return response.json();
        } else {
          throw new Error('Database do not respond...');
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
      {profile ? (
        <div className="text-4xl text-white font-bold">
            {`${profile.username}'s profile`}
        </div>
      ) : (
        <p>{error ? error : 'Please log in'}</p>
      )}
    </div>
  );
}

export default Header;

