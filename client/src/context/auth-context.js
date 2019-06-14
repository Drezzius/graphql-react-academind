import React, { createContext } from 'react';
import { EventsProvider } from './events-context';
import { useAuthState } from '../hooks/useAuthState';

export const AuthContext = createContext();

export const AuthProvider = props => {
  const [
    token,
    userId,
    tokenExpiration,
    login,
    logout,
    authenticate
  ] = useAuthState();

  return (
    <AuthContext.Provider
      value={{ token, userId, tokenExpiration, login, logout, authenticate }}
    >
      <EventsProvider>{props.children}</EventsProvider>
    </AuthContext.Provider>
  );
};
