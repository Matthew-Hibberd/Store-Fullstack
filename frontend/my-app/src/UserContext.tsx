import React, { createContext, useState, useContext, ReactNode } from 'react';

const UserContext = createContext<{ user: string | null; registerUser: (name: string, email: string) => void; loginUser: (email: string) => void } | undefined>(undefined);

export const UserProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<string | null>(null);

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
        setUser(data.uuid);
      }
    } catch (error) {
      console.error('Error logging in user:', error);
    }
  };return (
    <UserContext.Provider value={{ user, registerUser, loginUser }}>
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