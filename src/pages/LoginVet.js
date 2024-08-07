import React, { useState } from 'react';
import './Login.css';
import logo from './assets/images/logo.png'; // Importação correta do logo
import { useNavigate } from 'react-router-dom';
import { GoogleLogin } from '@react-oauth/google';
import { jwtDecode } from 'jwt-decode';

function LoginVet() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  // Função para lidar com o login
  const handleLogin = async (email, password) => {
    try {
      const response = await fetch('https://backend-ks2k.onrender.com/auth/vet/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'

        },
        body: JSON.stringify({ email, password })
      });

      const data = await response.json();
      console.log(data)

      if (response.ok) {
        // Salva o token no localStorage ou no estado do aplicativo
        localStorage.setItem('tokenVet', data.token);  // Certifique-se que o token está sendo enviado na resposta
        if (data.id) {
          localStorage.setItem('vetId', data.id);
          console.log('Login realizado com sucesso!');
          navigate('/home-vet');
        } else {
          console.error('ID do veterinário não foi recebido');
        }
      } else {
        console.error('Erro no login:', data.message);
      }
    } catch (error) {
      console.error('Erro ao fazer login:', error);
    }
  };

  const handleGoogleLogin = async (credential) => {
    const { email, sub } = jwtDecode(credential?.credential);
    try {
      const response = await fetch('http://localhost:3003/auth/vet/google/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ email, password: sub })
      });

      const data = await response.json();

      if (response.ok) {
        localStorage.setItem('tokenVet', data.token);
        localStorage.setItem('vetId', data.id);
        alert('Login realizado com sucesso!');
        navigate('/home-vet');
      }
      else if (!response.ok) {
        alert('Vá até a página de registro para criar uma nova conta. Lembre-se de preencher o nome da clínica.');
      }
    } catch (error) {
      alert('Erro ao fazer login.')
    }
  };


  return (
    <div className="login-background">
      <div className="login-container">
        <div className="login-logo">
          <img src={logo} alt="ByteVet" />
        </div>
        <h1 className="login-title">ByteVet</h1>
        <h1 className="login-title">Veterinario</h1>
        <form className="login-form" onSubmit={(e) => {
          e.preventDefault();
          handleLogin(email, password);
        }}>
          <div className="input-wrapper">
            <input
              type="email"
              placeholder="Email"
              className="input-field"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              style={{ color: '#000' }}
            />
          </div>
          <div className="input-wrapper">
            <input
              type="password"
              placeholder="Senha"
              className="input-field"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              style={{ color: '#000' }}
            />
          </div>
          <button type="submit" className="login-button">Entrar</button>
          <div className="login-links">
            <GoogleLogin
              onSuccess={credentialResponse => {
                handleGoogleLogin(credentialResponse);
              }}
              onError={() => {
                alert('Erro ao fazer login.');
              }}
            />
            <a href="/forgot-password" className="login-link">Esqueci minha senha</a>
            <a href="/register-vet" className="login-link">Não possui conta? Registre-se</a>
            <a href="/" className="login-link">Sou paciente!</a>
          </div>
        </form>
      </div>
    </div>
  );
}

export default LoginVet;
