import React, { useState, useEffect } from 'react';
import './RegisterPet.css';  // Assegure-se que o caminho está correto
import Header from '../components/HeaderComponent/Header'; // Confirme o caminho do componente Header
import { useNavigate } from 'react-router-dom';
import logo from './assets/images/logo.png'; // Confirme que o caminho para o logo está correto

function RegisterConsulta() {
  const navigate = useNavigate();
  const [consulta, setConsulta] = useState({
    animalId: '',
    vetId: '',
    data: '',
    motivo: '',
    diagnostico: ''
  });
  const [animais, setAnimais] = useState([]);
  const [error, setError] = useState(''); // Declarando a variável de erro no estado

  useEffect(() => {
    const token = localStorage.getItem('token');
    const headers = {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    };

    async function fetchData() {
      try {
        const animaisResponse = await fetch('https://backend-ks2k.onrender.com/animais', { headers });
        const animaisData = await animaisResponse.json();
        setAnimais(animaisData);
      } catch (error) {
        setError('Falha ao carregar dados dos animais');
        console.error('Error fetching animals:', error);
      }
    }

    fetchData();
  }, [navigate]);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setConsulta(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const token = localStorage.getItem('token');
    if (!token) {
      setError('Você precisa estar logado para registrar uma consulta.');
      return;
    }

    try {
      const response = await fetch(`https://backend-ks2k.onrender.com/vet/${consulta.vetId}/consulta`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(consulta)
      });

      if (!response.ok) {
        const respData = await response.json();
        setError(respData.message);
        throw new Error(respData.message);
      }

      navigate('/consultas');
    } catch (error) {
      console.error('Failed to submit consultation:', error);
    }
  };

  return (
    <div className="body-pet">
      <Header propsLinkHome="/home" propsLinkProfile="/perfil" />
      <div className="register-pet-container">
        <img src={logo} alt="ByteVet Logo" className="register-pet-logo" />
        <h1 className="register-pet-title">Registrar Consulta</h1>
        {error && <p className="error">{error}</p>}
        <form onSubmit={handleSubmit} className="register-pet-form">
          <label className="register-pet-label">
            Pet atendido:
            <select name="animalId" value={consulta.animalId} onChange={handleChange} className="register-pet-select" required>
              {animais.map(animal => (
                <option key={animal._id} value={animal._id}>{animal.nome}</option>
              ))}
            </select>
          </label>
          <label className="register-pet-label">
            Data da consulta:
            <input type="date" name="data" value={consulta.data} onChange={handleChange} className="register-pet-input" required />
          </label>
          <label className="register-pet-label">
            Motivo:
            <input type="text" name="motivo" value={consulta.motivo} onChange={handleChange} className="register-pet-input" required />
          </label>
          <label className="register-pet-label">
            Diagnóstico:
            <textarea name="diagnostico" value={consulta.diagnostico} onChange={handleChange} className="register-pet-input" required />
          </label>
          <button type="submit" className="button register">Registrar</button>
        </form>
      </div>
    </div>
  );
}

export default RegisterConsulta;
