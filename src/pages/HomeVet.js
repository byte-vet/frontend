import React, { useState } from 'react';
import './Home.css';
import Header from '../components/HeaderComponent/Header';
import { useNavigate } from 'react-router-dom';

function HomeVet() {
  let navigate = useNavigate();

  const handleAddConsulta = () => {
    navigate('/register-consulta');
  };

  const handleAppointments = () => {
    navigate('/consultas');
  };

  return (
    <div className="home-container">
      <Header 
          propsLinkHome="/home-vet"
          propsLinkProfile="/perfil-vet"
        />
      <div className="main-buttons">
        <button className="button add-consulta" onClick={handleAddConsulta}>➕ Adicionar Consulta</button>
        <button className="button appointments" onClick={handleAppointments}>🩺 Consultas</button>
      </div>
    </div>
  );
}

export default HomeVet;
