import { useState } from 'react';
import axios from 'axios';

export const useAuthState = () => {
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
  const authenticate = async (email, password, isLogin) => {
    let requestBody = {
      query: `
        query CreateUser($email: String!, $password: String!) {
          login(email: $email, password: $password) 
          {
            userId
            token
            tokenExpiration
          }
        }
      `,
      variables: {
        email,
        password
      }
    };

    if (!isLogin) {
      requestBody = {
        query: `
        mutation Login($email: String!, $password: String!){
          createUser(userInput: {email: $email, password: $password})
          {
            _id
            email
          }
        }
      `,
        variables: {
          email,
          password
        }
      };
    }

    const res = await axios({
      method: 'post',
      url: 'http://localhost:8000/graphql',
      headers: {
        'Content-Type': 'application/json'
      },
      data: JSON.stringify(requestBody)
    });
    if (res.status !== 200 && res.status !== 201) {
      throw new Error('Failed!');
    }
    const resData = res.data.data;
    if (resData.login) {
      login(
        resData.login.token,
        resData.login.userId,
        resData.login.tokenExpiration
      );
    }
    return res.data;
  };
  return [token, userId, tokenExpiration, login, logout, authenticate];
};
