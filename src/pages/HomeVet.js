import React, { useState } from 'react';
import './Home.css';
import logo from './assets/images/logo.png';
import { useNavigate } from 'react-router-dom';

function HomeVet() {
  let navigate = useNavigate();

  const handleAddConsulta = () => {
    navigate('/add-consulta');
  };

  const handleAppointments = () => {
    navigate('/consultas');
  };

  return (
    <div className="home-container">
      <img src={logo} alt="ByteVet Logo" className="home-logo" />
      <h1 className="home-title">ByteVet</h1>
      <div className="main-buttons">
        <button className="button add-consulta" onClick={handleAddConsulta}>➕ Adicionar Consulta</button>
        <button className="button appointments" onClick={handleAppointments}>🩺 Consultas</button>
      </div>
    </div>
  );
}

export default HomeVet;
