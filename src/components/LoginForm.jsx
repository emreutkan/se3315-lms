import React, { useState, useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import { login as apiLogin, register as apiRegister } from '../api/auth';

export default function LoginForm() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [isLogin, setIsLogin] = useState(true);
  const [error, setError] = useState('');
  const { login } = useContext(AuthContext);

  const handleSubmit = async e => {
    e.preventDefault();
    setError('');

    try {
      if (isLogin) {
        // Handle login
        const { data } = await apiLogin(username, password);
        login(data.access_token);
      } else {
        // Handle registration
        const { data } = await apiRegister(username, password, email, 'user');
        // After successful registration, show a success message
        setError('Registration successful! You can now login.');
        setIsLogin(true); // Switch back to login mode
      }
    } catch (err) {
      setError(isLogin
        ? 'Invalid username or password.'
        : 'An error occurred during registration.'
      );
      console.error(err);
    }
  };

  const toggleForm = () => {
    setIsLogin(!isLogin);
    setError('');
  };

  return (
    <div className="login-container">
      <form className="login-form" onSubmit={handleSubmit}>
        <h2>{isLogin ? 'Login' : 'Register'}</h2>
        {error && <div className={error.includes('successful') ? 'success-message' : 'error-message'}>{error}</div>}

        <div className="form-group">
          <label htmlFor="username">Username:</label>
          <input
            id="username"
            type="text"
            value={username}
            onChange={e => setUsername(e.target.value)}
            required
          />
        </div>

        {!isLogin && (
          <div className="form-group">
            <label htmlFor="email">Email:</label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={e => setEmail(e.target.value)}
              required={!isLogin}
            />
          </div>
        )}

        <div className="form-group">
          <label htmlFor="password">Password:</label>
          <input
            id="password"
            type="password"
            value={password}
            onChange={e => setPassword(e.target.value)}
            required
          />
        </div>

        <button type="submit" className="submit-btn">
          {isLogin ? 'Login' : 'Register'}
        </button>

        <p className="toggle-form">
          {isLogin ? 'Don\'t have an account?' : 'Already have an account?'}
          <button
            type="button"
            className="toggle-btn"
            onClick={toggleForm}
          >
            {isLogin ? 'Register' : 'Login'}
          </button>
        </p>
      </form>
    </div>
  );
}

