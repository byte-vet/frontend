import React, { useState } from 'react';
import './Register.css';
import logo from './assets/images/logo.png';
import { Link, useNavigate } from 'react-router-dom';

function Register() {
  const navigate = useNavigate();
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const handleRegister = async (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      alert("As senhas não coincidem.");
      console.log(password, confirmPassword)
      return;
    }

    try {
      const response = await fetch('https://backend-ks2k.onrender.com/auth/signup', { 
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer bytevet`
        },
        body: JSON.stringify({
          fullName,
          email,
          password,
          confirmPassword
        }),
      });

      const data = await response.json();

      if (response.ok) {
        alert('Registro realizado com sucesso! Faça login para acessar a plataforma.');
        navigate('/');
      } else {
        alert(`Erro no registro: ${data.message}`);
      }
    } catch (error) {
      alert('Ocorreu um erro ao fazer a requisição de registro.');
    }
  };

  return (
    <div className="register-container">
      <img src={logo} alt="ByteVet Logo" className="mypet-logo" />
      <h1 className="bytevet-title">ByteVet</h1>
      <h1 className="register-title">Cadastre-se</h1>
      <form className="register-form" onSubmit={handleRegister}>
        <div className="input-row">
          <label htmlFor="fullName">Nome</label>
          <input type="text" id="fullName" name="fullName" value={fullName} onChange={e => setFullName(e.target.value)} className="input-field" />
        </div>
        <div className="input-row">
          <label htmlFor="email">Digite seu email</label>
          <input type="email" id="email" name="email" value={email} onChange={e => setEmail(e.target.value)} className="input-field" />
        </div>
        <div className="input-row">
          <label htmlFor="password">Digite sua senha</label>
          <input type="password" id="password" name="password" value={password} onChange={e => setPassword(e.target.value)} className="input-field" />
        </div>
        <div className="input-row">
          <label htmlFor="confirmPassword">Confirme a senha</label>
          <input type="password" id="confirmPassword" name="confirmPassword" value={confirmPassword} onChange={e => setConfirmPassword(e.target.value)} className="input-field" />
        </div>
        <button type="submit" className="register-button">Criar conta</button>
      </form>
      <Link to="/login" className="register-link">Já possui conta? Entrar</Link>
    </div>
  );
}

export default Register;
