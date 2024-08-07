import React, { useState } from 'react';
import './Register.css';
import logo from './assets/images/logo.png';
import { Link, useNavigate } from 'react-router-dom';
import { GoogleLogin } from '@react-oauth/google';
import { jwtDecode } from 'jwt-decode';


function RegisterVet() {
  const navigate = useNavigate();
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [nomeClinica, setNomeClinica] = useState('');

  const handleRegister = async (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      alert("As senhas não coincidem.");
      return;
    }

    try {
      const response = await fetch('https://backend-ks2k.onrender.com/auth/vet/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer bytevet`
        },
        body: JSON.stringify({
          fullName,
          email,
          password,
          confirmPassword,
          nomeClinica
        }),
      });

      const data = await response.json();

      if (response.ok) {
        alert('Registro realizado com sucesso! Faça login para acessar a plataforma.');
        navigate('/login-vet');
      } else {
        alert(`Erro no registro: ${data.message}`);
      }
    } catch (error) {
      alert('Ocorreu um erro ao fazer a requisição de registro.');
    }
  };

  const handleGoogleRegister = async (credential) => {
    if (nomeClinica !== '') {
      const { email, name, sub } = jwtDecode(credential?.credential);
      try {
        const response = await fetch('https://backend-ks2k.onrender.com/auth/vet/google/signup', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({ email, fullName: name, password: sub, nomeClinica })
        });

        const data = await response.json();

        if (response.ok) {
          localStorage.setItem('tokenVet', data.token);
          localStorage.setItem('vetId', data.id);
          alert('Registro realizado com sucesso!');
          navigate('/home-vet');
        }
        else {
          console.log(data)
        }
      } catch (error) {
        alert(error)
      }
    }
    else {
      alert('O nome da clínica precisa estar preenchido para realizar cadastro com o Google.')
    }
  };

  return (
    <div className="body-register">
      <div className="register-container">
        <img src={logo} alt="ByteVet Logo" className="mypet-logo" />
        <h1 className="bytevet-title">ByteVet</h1>
        <h1 className="register-title">Veterinario</h1>
        <h1 className="register-title">Cadastre-se</h1>
        <form className="register-form" onSubmit={handleRegister}>
          <div className="input-row">
            {/* <label htmlFor="fullName">Nome</label> */}
            <input type="text" id="fullName" name="fullName" value={fullName} onChange={e => setFullName(e.target.value)} placeholder="Digite seu nome completo" className="input-field" />
          </div>
          <div className="input-row">
            {/* <label htmlFor="email">Digite seu email</label> */}
            <input type="email" id="email" name="email" value={email} onChange={e => setEmail(e.target.value)} placeholder="Digite seu email" className="input-field" />
          </div>
          <div className="input-row">
            {/* <label htmlFor="password">Digite sua senha</label> */}
            <input type="password" id="password" name="password" value={password} placeholder="Digite sua senha" onChange={e => setPassword(e.target.value)} className="input-field" />
          </div>
          <div className="input-row">
            {/* <label htmlFor="confirmPassword">Confirme a senha</label> */}
            <input type="password" id="confirmPassword" name="confirmPassword" value={confirmPassword} placeholder="Confirme sua senha" onChange={e => setConfirmPassword(e.target.value)} className="input-field" />
          </div>
          <div className="input-row">
            {/* <label htmlFor="nomeClinica">Digite o nome da clinica</label> */}
            <input type="text" id="nomeClinica" name="nomeClinica" value={nomeClinica} onChange={e => setNomeClinica(e.target.value)} placeholder="Digite o nome da sua clínica" className="input-field" />
          </div>
          <button type="submit" className="register-button">Criar conta</button>
          <GoogleLogin
            onSuccess={credentialResponse => {
              handleGoogleRegister(credentialResponse);
            }}
            onError={() => {
              alert('Erro ao fazer login.');
            }}
          />
        </form>
        <Link to="/login-vet" className="login-link">Já possui conta? Entrar</Link>
      </div>
    </div>
  );
}

export default RegisterVet;
