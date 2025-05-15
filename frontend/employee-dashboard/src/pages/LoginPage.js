import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { login } from '../api';
import { AuthContext } from '../context/AuthContext';
import '../styles/global.css';
import logo from '../assets/newwork-logo.png';

function LoginPage() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const { setAuth } = useContext(AuthContext);

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await login({ username, password });
      localStorage.setItem('token', res.data.token);
      localStorage.setItem('role', res.data.role);
      setAuth({ authenticated: true, role: res.data.role });
      setError('');
      navigate('/');
    } catch (err) {
      if (err.response && err.response.status === 401) {
        setError('Credenciais inválidas');
      } else {
        setError('Erro ao fazer login');
      }
      console.error('Erro de login:', err);
    }
  };

  return (
    <div className="login-container">
      <img src={logo} alt="Logo" className="login-logo" />
      <div className="login-box">
        <h2>Login</h2>
        <p>Sign in to continue</p>
        {error && <p className="login-error">{error}</p>}
        <form onSubmit={handleLogin}>
          <input
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <button type="submit">Login</button>
        </form>
      </div>
    </div>
  );
}

export default LoginPage;
