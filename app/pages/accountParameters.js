// Import necessary dependencies and components
import React, { useState, useEffect } from 'react';
import { useUser } from '../components/UserContext'; // Import the UserContext for user information
import Layout from '@/components/Layout'; // Import the layout component
import { useRouter } from 'next/router'; // Import the Next.js router

// Define the functional component for account parameters
const AccountParameters = () => {
  const router = useRouter();
  const { user } = useUser(); // Use the user context hook to get user information

  // State variables for managing username and email editing
  const [editingUsername, setEditingUsername] = useState(false);
  const [newUsername, setNewUsername] = useState(user?.user_metadata.name || '');

  const [editingEmail, setEditingEmail] = useState(false);
  const [newEmail, setNewEmail] = useState(user?.email || '');

  // Event handler for username change
  const handleUsernameChange = (event) => {
    setNewUsername(event.target.value);
  };

  // Event handler for email change
  const handleEmailChange = (event) => {
    setNewEmail(event.target.value);
  };

  // useEffect hook to redirect if user is not logged in
  useEffect(() => {
    if (!user) {
      // Redirect to the home page with a 1-second delay
      const redirectTimer = setTimeout(() => {
        router.push('/'); // Make sure the URL corresponds to your home page
      }, 1000);

      // Clean up the timer when the component is unmounted
      return () => clearTimeout(redirectTimer);
    }
  }, [user, router]);

  // JSX for rendering the component
  return (
    <Layout>
      {/* Account settings container */}
      <div className="max-w-2xl mx-auto p-4 border rounded shadow">
        <h2 className="text-2xl font-bold mb-4">Account Settings</h2>
        {user ? (
          <div className="flex items-center">
            {/* User avatar */}
            <img
              src={user.user_metadata.avatar_url}
              alt="User Avatar"
              className="w-12 h-12 rounded-full mr-4"
            />
            <div>
              {/* Username section */}
              <p className="text-lg font-semibold">Username: 
                {editingUsername ? (
                  <input
                    type="text"
                    value={newUsername}
                    onChange={handleUsernameChange}
                    className="border rounded p-2 mr-2"
                  />
                ) : (
                  user.user_metadata.name
                )}
                {/* Edit button */}
                <button
                  onClick={() => setEditingUsername(!editingUsername)}
                  className="bg-gray-200 px-3 py-1 rounded"
                >
                  {editingUsername ? 'Cancel' : 'Edit'}
                </button>
              </p>

              {/* Email section */}
              <p className="text-gray-600">Email: 
                {editingEmail ? (
                  <input
                    type="text"
                    value={newEmail}
                    onChange={handleEmailChange}
                    className="border rounded p-2 mr-2"
                  />
                ) : (
                  user.email
                )}
                {/* Edit button */}
                <button
                  onClick={() => setEditingEmail(!editingEmail)}
                  className="bg-gray-200 px-3 py-1 rounded"
                >
                  {editingEmail ? 'Cancel' : 'Edit'}
                </button>
              </p>

              {/* Last login information */}
              <p className="text-gray-600">Last Login: {user.last_sign_in_at}</p>
              <p className="text-gray-600">user id: {user.id}</p>
            </div>
          </div>
        ) : (
          // Display message if the user is not logged in
          <p>You are not logged in. Redirecting to the home page...</p>
        )}
      </div>
    </Layout>
  );
};

export default AccountParameters; // Export the AccountParameters component
