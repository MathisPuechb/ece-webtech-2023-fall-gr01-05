import React from 'react';
import { useUser } from './UserContext';

function LoggedOut({ onClickLogin }) {
  const { user } = useUser();

  return (
    <div>
      <p>Please log in</p>
      <button onClick={onClickLogin}>Login</button>
    </div>
  );
}

export default LoggedOut;
