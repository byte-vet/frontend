// src/pages/Register.js
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import InputField from '../components/InputField';
import Button from '../components/Button';

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
      return;
    }

    try {
      const response = await fetch('ENDPOINT_DE_REGISTRO_SUBSTITUIR_DEPOIS', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          fullName, // assumindo que o backend espera um campo 'fullName'
          email,
          password,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        console.log('Registro bem-sucedido', data);
        navigate('/login');
      } else {
        alert(`Erro no registro: ${data.message}`);
      }
    } catch (error) {
      console.error('Erro ao fazer a requisição de registro', error);
      alert('Ocorreu um erro ao fazer a requisição de registro.');
    }
  };

  return (
    <div>
      <h2>Cadastre-se</h2>
      <form onSubmit={handleRegister}>
        <InputField label="Nome completo" type="text" name="fullName" value={fullName} onChange={e => setFullName(e.target.value)} />
        <InputField label="Digite seu e-mail" type="email" name="email" value={email} onChange={e => setEmail(e.target.value)} />
        <InputField label="Digite sua senha" type="password" name="password" value={password} onChange={e => setPassword(e.target.value)} />
        <InputField label="Confirme a senha" type="password" name="confirmPassword" value={confirmPassword} onChange={e => setConfirmPassword(e.target.value)} />
        <Button type="submit">Criar conta</Button>
      </form>
      <Link to="/login">Já possui conta? Entrar.</Link>
    </div>
  );
}

export default Register;
