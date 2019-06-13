import React, { useState, createContext } from 'react';
import { EventsProvider } from './events-context';

export const AuthContext = createContext();

export const AuthProvider = props => {
  const [token, setToken] = useState(null);
  const [userId, setUserId] = useState(null);
  const [tokenExpiration, setTokenExpiration] = useState(null);

  const login = (token, userId, tokenExpiration) => {
    setToken(token);
    setUserId(userId);
    setTokenExpiration(tokenExpiration);
  };

  const logout = () => {
    setToken(null);
    setUserId(null);
  };

  return (
    <AuthContext.Provider
      value={{ token, userId, tokenExpiration, login, logout }}
    >
      <EventsProvider>{props.children}</EventsProvider>
    </AuthContext.Provider>
  );
};
