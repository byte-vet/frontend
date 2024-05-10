import React, { useState } from 'react';
import './Home.css';
import logo from './assets/images/logo.png';
import { useNavigate } from 'react-router-dom';

function Home() {
  let navigate = useNavigate();

  const handleMyPets = () => {
    navigate('/mypets');
  };

  const handleAppointments = () => {
    navigate('/consultas');
  };

  const handleVaccines = () => {
    console.log('Acessar Vacinas');
  };

  const handleAddPet = () => {
    navigate('/add-pet');
  };

  return (
    <div className="home-container">
      <img src={logo} alt="ByteVet Logo" className="home-logo" />
      <h1 className="home-title">ByteVet</h1>
      <div className="main-buttons">
      <button className="button add-pet" onClick={handleAddPet}>➕ Adicionar pet</button>
        <button className="button my-pets" onClick={handleMyPets}>🐾 Meus pets</button>
        <button className="button appointments" onClick={handleAppointments}>🩺 Consultas</button>
      </div>
    </div>
  );
}

export default Home;
