import { useState } from 'react';
import Layout from "../components/Layout";

function LoginNative() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [profile, setProfile] = useState(null);
    const [editedSize, setEditedSize] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        const formData = new FormData(e.target);
        const enteredUsername = formData.get('username');
        const enteredPassword = formData.get('password');

        setUsername(enteredUsername);
        setPassword(enteredPassword);

        fetch(`/api/profile?username=${enteredUsername}&password=${enteredPassword}`)
            .then(response => response.json())
            .then(data => setProfile(data))
            .catch(error => console.error('Error fetching profile data:', error));
    };

    const handleSizeChange = (e) => {
        setEditedSize(e.target.value);
    };

    const handleSaveSize = () => {
        setProfile(prevProfile => ({ ...prevProfile, size: editedSize }));
    };

    return (
        <Layout>
            <div>
                <center>
                    <form onSubmit={handleSubmit}>
                        <div>
                            <label htmlFor="username">Username:</label>
                            <input type="text" id="username" name="username" required />
                        </div>
                        <div>
                            <label htmlFor="password">Password:</label>
                            <input type="text" id="password" name="password" required />
                        </div>
                        <button type="submit">Login</button>
                        <div>
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
                                            
                                            <input
                                                type="text"
                                                id="editedSize"
                                                name="editedSize"
                                                placeholder="Enter new size"
                                                value={editedSize}
                                                onChange={handleSizeChange}
                                            />
                                            <button type="button" onClick={handleSaveSize}>
                                                Save Size
                                            </button>
                                        </div>
                                    )}
                                </div>
                            ) : (
                                <p>Loading profile data...</p>
                            )}
                        </div>
                    </form>
                </center>
            </div>
        </Layout>
    );
}

export default LoginNative;
