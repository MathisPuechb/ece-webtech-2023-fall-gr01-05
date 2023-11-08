import { useState } from 'react';
import Layout from "../components/Layout";

function LoginNative() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [size, setSize] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        const formData = new FormData(e.target);
        const enteredUsername = formData.get('username');
        const enteredPassword = formData.get('password');
        const enteredSize = formData.get('size');
        
        setUsername(enteredUsername);
        setPassword(enteredPassword);
        setSize(189);
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
                            <input type="password" id="password" name="password" required />
                        </div>
                        <div>
                            <label htmlFor="size">Size:</label>
                            <input type="text" id="size" name="size" required />
                        </div>
                        <button type="submit">Login</button>
                        
                        <div>
                            <p>Entered Username: {username}</p>
                            <p>Entered Password: {password}</p>
                            <p>Current Size: {formData.get('size')}</p>
                        </div>
                    </form>
                </center>
            </div>
        </Layout>
    );
}

export default LoginNative;
