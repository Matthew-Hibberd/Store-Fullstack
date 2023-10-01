import React, { createContext, useState, useContext, ReactNode } from 'react';

interface UserContextType {
  user: User | null;
  loginUser: (email: string) => void;
  registerUser: (name: string, email:string) => void;
  logout: () => void;
}

export interface User {
  email: string,
  uuid: string,
  name: string
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export const UserProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);

  const registerUser = async (name: string, email:string) => {
    try {
      // Make an API call to register the user and get the UUID
      const response = await fetch('http://127.0.0.1:5000/customer', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ "name": name, "email": email }),
      });

      if (response.ok) {
        const data = await response.json();
        console.log("Register", data)
        setUser(data.uuid);
      }
    } catch (error) {
      console.error('Error registering user:', error);
    }
  };

  const loginUser = async (email: string) => {
    try {
      // Make an API call to log in the user and get the UUID
      const response = await fetch('http://127.0.0.1:5000/customers', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ "emails": [email] }),
      });

      if (response.ok) {
        const data = await response.json();
        console.log("Log in data",data)
        setUser(data.customers[0]);
      }
    } catch (error) {
      console.error('Error logging in user:', error);
    }
  };
  const logout = () => {
    // Logic to log out the user and set the user state to null
    setUser(null);
  };
  return (
    <UserContext.Provider value={{ user, registerUser, loginUser, logout }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => {
  const context = useContext(UserContext);
  if (context === undefined) {
    throw new Error('useUser must be used within a UserProvider');
  }
  return context;
};