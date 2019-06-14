import React, { useContext, useState } from 'react';
import { useInputState } from '../hooks/useInputState';
import { AuthContext } from '../context/auth-context';
import './AuthPage.css';

const AuthPage = () => {
  const [email, setEmail] = useInputState('');
  const [password, setPassword] = useInputState('');
  const [isLogin, setIsLogin] = useState(true);
  const { authenticate } = useContext(AuthContext);

  const handleSetLogin = () => setIsLogin(!isLogin);

  const handleSubmit = e => {
    e.preventDefault();
    if (email.trim().length === 0 || password.trim().length === 0) {
      return;
    }

    authenticate(email, password, isLogin);
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
