import React, { useState } from 'react';
import { useUser } from '../UserContext';
import { Link, useNavigate } from 'react-router-dom';
import {
  ChakraProvider,
  theme,
  Input,
  Button,
  Text
} from '@chakra-ui/react';


const Login: React.FC =() => {
  const { user, loginUser } = useUser();
  const [email, setEmail] = useState('');
  const navigate = useNavigate();

  const handleLogin = async () => {
    await loginUser(email);
    navigate('/')
  };

  return (<div>
      <ChakraProvider theme={theme}>
      {!user ? (
          <><Input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)} /><Button onClick={handleLogin}>Login</Button>
          <Text>
            Don't have an account?{' '}
            <Link to="/register">Register</Link>
          </Text></>
      ) : (
        <div>
          <>
          <Text>Logged In</Text>
          </>
        </div>
      )}
    </ChakraProvider>
    </div>
  );
}

export default Login;
