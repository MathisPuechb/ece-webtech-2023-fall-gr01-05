import React from 'react';
import { useUser } from './UserContext';

function LoggedIn({ onClickLogout }) {
  const { user } = useUser();

  return (
    <div>
      <p>Connected to {user.username}&apos;s account!</p>
      <button onClick={onClickLogout}>Logout</button>
    </div>
  );
}

export default LoggedIn;
