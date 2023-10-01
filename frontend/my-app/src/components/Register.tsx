import React, { useState } from 'react';
import { useUser } from '../UserContext';
import { useNavigate } from 'react-router-dom';
import {
  ChakraProvider,
  theme,
  Input,
  Button,
  Text,
  Heading
} from '@chakra-ui/react';

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
    <ChakraProvider theme={theme}>
      {registrationSuccess ? (
        <Text>Registration Successful. You are now logged in!</Text>
      ) : (
        <>
          <Heading>Register</Heading>
          {registrationError && (
            <Text style={{ color: 'red' }}>Registration failed. Please try again.</Text>
          )}
          <Input
            type="text"
            placeholder="Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <Input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <Button onClick={handleRegister}>Register</Button>
        </>
      )}

      <Button onClick={() => navigate('/')}>Back to Shop</Button>
    </ChakraProvider>
  );
}

export default Register;
