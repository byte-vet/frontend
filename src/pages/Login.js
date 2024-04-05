import React, { useState } from 'react';
import './Login.css';
import logo from './assets/images/logo.png'; // Importação correta do logo

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = (e) => {
    e.preventDefault();
    // Lógica para processar o login
    console.log('Login attempt:', { email, password });
  };

  return (
    <div className="login-background">
      <div className="login-container">
        <div className="login-logo">
          {/* Use a variável logo para o atributo src */}
          <img src={logo} alt="ByteVet" />
        </div>
        <h1 className="login-title">ByteVet</h1>
        <form className="login-form" onSubmit={handleLogin}>
          <div className="input-wrapper">
            <input
              type="email"
              placeholder="Email"
              className="input-field"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="input-wrapper">
            <input
              type="password"
              placeholder="Senha"
              className="input-field"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <button type="submit" className="login-button">Entrar</button>
          <div className="login-links">
            <a href="/forgot-password" className="login-link">Esqueci minha senha</a>
            <a href="/register" className="login-link">Não possui conta? Registre-se.</a>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Login;
