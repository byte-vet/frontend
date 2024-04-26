import React, { useState } from 'react';
import './Login.css';
import logo from './assets/images/logo.png'; // Importação correta do logo

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

    // Função para lidar com o login
  const handleLogin = async (email, password) => {
    try {
      const response = await fetch('http://localhost:3000/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ email, password })
      });

      const data = await response.json();

      if (response.ok) {
        // Salva o token no localStorage ou no estado do aplicativo
        localStorage.setItem('token', data.token);
        console.log('Login realizado com sucesso!');
      } else {
        console.error('Erro no login:', data.message);
      }
    } catch (error) {
      console.error('Erro ao fazer login:', error);
    }
  };


  return (
    <div className="login-background">
      <div className="login-container">
        <div className="login-logo">
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
