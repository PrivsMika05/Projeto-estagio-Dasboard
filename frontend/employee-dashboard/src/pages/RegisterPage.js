import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { register } from '../api';
import '../styles/global.css';
import logo from '../assets/newwork-logo.png'; // certifique-te que o caminho está certo

function RegisterPage() {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      const defaultRole = 'USER';
      await register({ username, email, password, role: defaultRole });
      setSuccess('Utilizador registado com sucesso! Redirecionando...');
      setError('');
      setTimeout(() => navigate('/login'), 2000);
    } catch (err) {
      if (err.response && err.response.data) {
        setError(`Erro: ${err.response.data}`);
      } else {
        setError('Erro ao registar utilizador');
      }
      setSuccess('');
      console.error('Erro de registo:', err);
    }
  };

  return (
    <div className="login-container">
      <img
        src={logo}
        alt="New Work Logo"
        className="login-logo"
        onClick={() => navigate('/')}
        style={{ cursor: 'pointer' }}
      />
      <div className="login-box">
        <h2>Registo</h2>
        <p>Criar uma nova conta</p>
        {error && <p className="login-error">{error}</p>}
        {success && <p className="success-message">{success}</p>}
        <form onSubmit={handleRegister}>
          <input
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder="Palavra-passe"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <button type="submit">Registar</button>
        </form>
      </div>
    </div>
  );
}

export default RegisterPage;
