import React, { useState } from 'react';
import { useUser } from '../UserContext';
import { Link } from 'react-router-dom';

function Login() {
  const { user, loginUser } = useUser();
  const [email, setEmail] = useState('');
  const [loggedIn, setLoggedIn] = useState(false);

  const handleLogin = async () => {
    await loginUser(email);
    setLoggedIn(true);
  };

  return (
    <div>
      {!loggedIn ? (
        <>
          <h2>Login</h2>
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <button onClick={handleLogin}>Login</button>
          <p>
            Don't have an account?{' '}
            <Link to="/register">Register</Link>
          </p>
        </>
      ) : (
        <p>Logged In</p>
      )}
    </div>
  );
}

export default Login;
