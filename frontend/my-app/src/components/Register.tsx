import React, { useState } from 'react';
import { useUser } from '../UserContext';
import { useNavigate } from 'react-router-dom';

function Register() {
  const { registerUser } = useUser();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [registrationSuccess, setRegistrationSuccess] = useState(false);
  const [registrationError, setRegistrationError] = useState(false);
  const navigate = useNavigate();

  const handleRegister = async () => {
    try {
      // Attempt registration
      await registerUser(name, email);
      setRegistrationSuccess(true);
      setRegistrationError(false);

      // Redirect to home page on successful registration
      navigate('/');
    } catch (error) {
      // Handle registration error
      setRegistrationSuccess(false);
      setRegistrationError(true);
    }
  };

  return (
    <div>
      {registrationSuccess ? (
        <p>Registration Successful. You are now logged in!</p>
      ) : (
        <>
          <h2>Register</h2>
          {registrationError && (
            <p style={{ color: 'red' }}>Registration failed. Please try again.</p>
          )}
          <input
            type="text"
            placeholder="Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <button onClick={handleRegister}>Register</button>
        </>
      )}

      <button onClick={() => navigate('/')}>Back to Shop</button>
    </div>
  );
}

export default Register;
