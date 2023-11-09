import React, { useState } from "react";
import Layout from "../components/Layout";
import { useUser } from "../components/UserContext";
import LoggedIn from "../components/LoggedIn";
import LoggedOut from "../components/LoggedOut";

function Pages({ title, component }) {
  return (
    <div className="relative flex items-center">
      <div className="absolute top-0 right-0 w-16 h-full bg-blue-500"></div>
      <div className="p-4 relative">
        <p className="wt-title">{title}</p>
        <div className="text-lg">{component}</div>
      </div>
    </div>
  );
}

function LoginNative({ onLogin }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [profile, setProfile] = useState(null);
  const [editedSize, setEditedSize] = useState("");
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const enteredUsername = formData.get("username");
    const enteredPassword = formData.get("password");

    setUsername(enteredUsername);
    setPassword(enteredPassword);

    try {
      const response = await fetch(`/api/profile?username=${enteredUsername}&password=${enteredPassword}`);
      if (response.ok) {
        const data = await response.json();
        setProfile(data);
        if (data.username === enteredUsername && data.password === enteredPassword) {
          onLogin(data);
          setError(null);
        } else {
          onLogin(null); // Set user as logged out if the condition is not met
          setError("Invalid username or password");
        }
      } else {
        setProfile(null);
        const errorData = await response.json();
        setError(errorData.message || "Login failed");
      }
    } catch (error) {
      console.error("Error accessing profile data:", error);
      setProfile(null);
      onLogin(null); // Set user as logged out if there's an error
      setError("An error occurred during login");
    }
  };

  const handleSizeChange = (e) => {
    setEditedSize(e.target.value);
  };

  const handleSaveSize = () => {
    setProfile((prevProfile) => ({ ...prevProfile, size: editedSize }));
  };

  return (
    <div>
      <center>
        <form onSubmit={handleSubmit}>
          <div>
            <label htmlFor="username">Username:</label>
            <input type="text" id="username" name="username" required />
          </div>
          <div>
            <label htmlFor="password">Password:</label>
            <input type="password" id="password" name="password" required />
          </div>
          <button type="submit">Login</button>
          <div>
            {error && <p className="text-red-500">{error}</p>}
            <p>Entered Username: {username}</p>
            <p>Entered Password: {password}</p>
            <p>DATA BASE</p>
            {profile ? (
              <div>
                <p>Username: {profile.username}</p>
                <p>Password: {profile.password}</p>
                {profile.username === username && profile.password === password && (
                  <div>
                    <p>Profile Data:</p>
                    <p>Username: {profile.username}</p>
                    <p>Password: {profile.password}</p>
                    <p>Size: {profile.size}</p>

                    <input type="text" id="editedSize" name="editedSize" placeholder="Enter new size" value={editedSize} onChange={handleSizeChange} />
                    <button type="button" onClick={handleSaveSize}>
                      Save Size
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <p>*********************************</p>
            )}
          </div>
        </form>
      </center>
    </div>
  );
}

export default function HomePage() {
  const { user, login, logout } = useUser();

  const handleLogin = (userData) => {
    if (userData) {
      login(userData);
    } else {
      logout();
    }
  };

  const onClickLogout = () => {
    logout();
  };

  return (
    <Layout>
      <div className="bg-gray-100 p-4">
        <Pages
          title="Home Page"
          component={
            user ? (
              <LoggedIn onClickLogout={onClickLogout} />
            ) : (
              <LoggedOut onClickLogin={() => handleLogin(null)} /> // Pass null to handle the logout case
            )
          }
        />
        {!user && <LoginNative onLogin={handleLogin} />}
      </div>
    </Layout>
  );
}
