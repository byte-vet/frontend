import React, { useState } from 'react';
import './Consultas.css';
import logo from './assets/images/logo.png';
import profilePlaceholder from './assets/images/profile_placeholder.jpeg';
import Header from '../components/HeaderComponent/Header';

function Consultas() {
  const [consultas, setConsultas] = useState([
    { id: 1, date: '2023-05-07', petName: 'Café', petPhoto: '' },
    { id: 2, date: '2023-05-08', petName: 'Ranziza', petPhoto: '' },
  ]);

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return `${date.getDate().toString().padStart(2, '0')}/${(date.getMonth() + 1).toString().padStart(2, '0')}/${date.getFullYear()}`;
  };

  return (
    <div>
    <Header />
    <div className="consultas-container">
      <h1 className="consultas-title">Consultas</h1>
      {consultas.map(consulta => (
        <button key={consulta.id} className="consulta-button">
          {formatDate(consulta.date)} - {consulta.petName}
          <img src={consulta.petPhoto || profilePlaceholder} alt={consulta.petName} className="pet-photo" />
        </button>
      ))}
    </div>
    </div>
  );
}

export default Consultas;