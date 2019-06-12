import React, { useContext, useState } from 'react';
import axios from 'axios';
import { useInputState } from '../hooks/useInputState';
import { AuthContext } from '../context/auth-context';
import './AuthPage.css';

const AuthPage = () => {
  const [email, setEmail] = useInputState('');
  const [password, setPassword] = useInputState('');
  const [isLogin, setIsLogin] = useState(true);
  const { token, login } = useContext(AuthContext);

  const handleSetLogin = () => setIsLogin(!isLogin);

  const handleSubmit = e => {
    e.preventDefault();
    if (email.trim().length === 0 || password.trim().length === 0) {
      return;
    }

    let requestBody = {
      query: `
        query {
          login(email: "${email}", password: "${password}") 
          {
            userId
            token
            tokenExpiration
          }
        }
      `
    };

    if (!isLogin) {
      requestBody = {
        query: `
        mutation {
          createUser(userInput: {email: "${email}", password: "${password}"})
          {
            _id
            email
          }
        }
      `
      };
    }

    axios({
      method: 'post',
      url: 'http://localhost:8000/graphql',
      headers: {
        'Content-Type': 'application/json'
      },
      data: JSON.stringify(requestBody)
    })
      .then(res => {
        if (res.status !== 200 && res.status !== 201) {
          throw new Error('Failed!');
        }
        return res.data;
      })
      .then(resData => {
        if (resData.data.login.token) {
          login(
            resData.data.login.token,
            resData.data.login.userId,
            resData.data.login.tokenExpiration
          );
        }
      })
      .catch(err => {
        console.log(err);
      });
  };

  return (
    <form onSubmit={handleSubmit} className="auth-form">
      <div className="form-control">
        <label htmlFor="email">Email</label>
        <input type="email" id="email" value={email} onChange={setEmail} />
      </div>
      <div className="form-control">
        <label htmlFor="password">Password</label>
        <input
          type="password"
          id="password"
          value={password}
          onChange={setPassword}
        />
      </div>
      <div className="form-actions">
        <button type="submit">Submit</button>
        <button type="button" onClick={handleSetLogin}>
          Switch to {isLogin ? 'Signup' : 'Login'}
        </button>
      </div>
    </form>
  );
};

export default AuthPage;
