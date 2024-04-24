import React, { useState } from 'react';
import './Home.css';
import logo from './assets/images/logo.png';
import { useNavigate } from 'react-router-dom';

function Home() {
  let navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleSearch = () => {
    console.log('Função de busca acionada com:', searchTerm);
    // incluir chamada para o backend
  };

  // substituir os console.logs por chamadas para o backend
  const handleMyPets = () => {
    console.log('Acessar Meus Pets');
  };

  const handleAppointments = () => {
    console.log('Acessar Consultas');
  };

  const handleVaccines = () => {
    console.log('Acessar Vacinas');
  };

  const handleAddPet = () => {
    navigate('/add-pet');
  };

  const handleProfile = () => {
    console.log('Acessar Meu Perfil');
  };

  return (
    <div className="home-container">
      <img src={logo} alt="ByteVet Logo" className="home-logo" />
      <h1 className="home-title">ByteVet</h1>
      <div className="search-bar">
        <input
          type="text"
          placeholder="Buscar..."
          className="input-field"
          value={searchTerm}
          onChange={handleSearchChange}
        />
        <button className="search-button" onClick={handleSearch}>🔍</button>
      </div>
      <div className="main-buttons">
        <button className="button my-pets" onClick={handleMyPets}>🐾 Meus pets</button>
        <button className="button appointments" onClick={handleAppointments}>🩺 Consultas</button>
        <button className="button vaccines" onClick={handleVaccines}>💉 Vacinas</button>
        <button className="button add-pet" onClick={handleAddPet}>➕ Adicionar pet</button>
        <button className="button profile" onClick={handleProfile}>👤 Meu perfil</button>
      </div>
    </div>
  );
}

export default Home;
