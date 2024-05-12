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
    nomeClinica: '',
    descricao: ''
  });
  const [animais, setAnimais] = useState([]); // Lista de animais
  const [veterinarios, setVeterinarios] = useState([]); // Lista de veterinários

  useEffect(() => {
    // Fetch Animals and Vets
  }, []);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setConsulta(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    // Logic to submit the data
  };

  return (
    <div className="register-pet-container">
      <img src={logo} alt="ByteVet Logo" className="register-pet-logo" />
      <h1 className="bytevet-title">ByteVet</h1>
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
          Veterinário:
          <select name="vetId" value={consulta.vetId} onChange={handleChange} className="register-pet-select" required>
            {veterinarios.map(vet => (
              <option key={vet._id} value={vet._id}>{vet.nome}</option>
            ))}
          </select>
        </label>
        <label className="register-pet-label">
          Data da consulta:
          <input type="date" name="data" value={consulta.data} onChange={handleChange} className="register-pet-input" required />
        </label>
        <label className="register-pet-label">
          Nome da clínica:
          <input type="text" name="nomeClinica" value={consulta.nomeClinica} onChange={handleChange} className="register-pet-input" required />
        </label>
        <label className="register-pet-label">
          Descrição:
          <textarea name="descricao" value={consulta.descricao} onChange={handleChange} className="register-pet-input" required />
        </label>
        <button type="submit" className="button register">Registrar</button>
      </form>
    </div>
  );
}

export default RegisterConsulta;
