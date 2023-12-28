// accountParameters.js
import React, { useState, useEffect } from 'react';
import { useUser } from '../components/UserContext';
import Layout from '@/components/Layout';
import { useRouter } from 'next/router';

const AccountParameters = () => {
  const router = useRouter();
  const { user } = useUser(); // Make sure your useUser hook returns updateUser

  const [editingUsername, setEditingUsername] = useState(false);
  const [newUsername, setNewUsername] = useState(user?.user_metadata.name || '');

  const [editingEmail, setEditingEmail] = useState(false);
  const [newEmail, setNewEmail] = useState(user?.email || '');

  const handleUsernameChange = (event) => {
    setNewUsername(event.target.value);
  };

  const handleEmailChange = (event) => {
    setNewEmail(event.target.value);
  };

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

  return (
    <Layout>
      <div className="max-w-2xl mx-auto p-4 border rounded shadow">
        <h2 className="text-2xl font-bold mb-4">Account Settings</h2>
        {user ? (
          <div className="flex items-center">
            <img
              src={user.user_metadata.avatar_url}
              alt="User Avatar"
              className="w-12 h-12 rounded-full mr-4"
            />
            <div>
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
                <button
                  onClick={() => setEditingUsername(!editingUsername)}
                  className="bg-gray-200 px-3 py-1 rounded"
                >
                  {editingUsername ? 'Cancel' : 'Edit'}
                </button>
              </p>

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
                <button
                  onClick={() => setEditingEmail(!editingEmail)}
                  className="bg-gray-200 px-3 py-1 rounded"
                >
                  {editingEmail ? 'Cancel' : 'Edit'}
                </button>
              </p>

              <p className="text-gray-600">Last Login: {user.last_sign_in_at}</p>
            </div>
          </div>
        ) : (
          <p>You are not logged in. Redirecting to the home page...</p>
        )}
      </div>
    </Layout>
  );
};

export default AccountParameters;
