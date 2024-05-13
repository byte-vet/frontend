import React, { useState, useEffect } from 'react';
import './RegisterPet.css';  // Reutilizando o CSS de RegisterPet
import logo from './assets/images/logo.png';
import { useNavigate } from 'react-router-dom';

function RegisterConsulta() {
  const navigate = useNavigate();
  const [consulta, setConsulta] = useState({
    animalId: '',
    vetId: '',
    data: '',
    motivo: '',
    diagnostico: ''
  });
  const [animais, setAnimais] = useState([]); // Lista de animais
  const [veterinarios, setVeterinarios] = useState([]); // Lista de veterinários

  useEffect(() => {
    const token = localStorage.getItem('token');
    const headers = {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    };

    async function fetchAnimais() {
      const response = await fetch('https://backend-ks2k.onrender.com/animais', { headers });
      const data = await response.json();
      setAnimais(data);
    }
    async function fetchVeterinarios() {
      const response = await fetch('https://backend-ks2k.onrender.com/vet/', { headers });
      const data = await response.json();
      setVeterinarios(data);
    }
    fetchAnimais();
    fetchVeterinarios();
  }, []);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setConsulta(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const token = localStorage.getItem('token');
    const vetId = localStorage.getItem('vetId');
    const headers = {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    };
    
    try {
      const response = await fetch(`https://backend-ks2k.onrender.com/vet/${vetId}/consulta`, {
        method: 'POST',
        headers,
        body: JSON.stringify(consulta)
      });
      const data = await response.json();
      if (response.ok) {
        console.log(JSON.stringify(data, null, 2));
        navigate('/consultas');
      } else {
        alert(data.message); // Display errors from server
      }
    } catch (error) {
      console.error('Failed to submit consulta:', error);
    }
  };

  return (
    <div className="register-pet-container">
      <img src={logo} alt="ByteVet Logo" className="register-pet-logo" />
      <h1 className="bytevet-title">Registrar consulta</h1>
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
          Diagnostico:
          <textarea name="diagnostico" value={consulta.diagnostico} onChange={handleChange} className="register-pet-input" required />
        </label>
        <button type="submit" className="button register">Registrar</button>
      </form>
    </div>
  );
}

export default RegisterConsulta;
