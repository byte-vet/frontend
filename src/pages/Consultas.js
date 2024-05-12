import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Importando useNavigate
import './Consultas.css';
import profilePlaceholder from './assets/images/profile_placeholder.jpeg';
import Header from '../components/HeaderComponent/Header';

function Consultas() {
  const [consultas, setConsultas] = useState([
    { id: 1, date: '2023-05-07', petName: 'Café', petPhoto: '' },
    { id: 2, date: '2023-05-08', petName: 'Ranziza', petPhoto: '' },
  ]);
  const navigate = useNavigate(); // Hook para navegação

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return `${date.getDate().toString().padStart(2, '0')}/${(date.getMonth() + 1).toString().padStart(2, '0')}/${date.getFullYear()}`;
  };

  const handleAddConsulta = () => {
    // Ação para adicionar consulta
    console.log("Adicionar nova consulta");  // Placeholder para ação futura
  };

  const redirectToConsulta = () => {
    navigate('/consulta'); // Redirecionamento para a rota /consulta
  };

  return (
    <div>
    <Header 
          propsLinkHome="/home"
          propsLinkProfile="/perfil"
        />
    <div className="consultas-container">
      <h1 className="consultas-title">Consultas</h1>
      <button className="add-consulta-button" onClick={handleAddConsulta}>
        ➕ Adicionar Consulta
      </button>
      {consultas.map(consulta => (
        <button key={consulta.id} className="consulta-button" onClick={() => redirectToConsulta()}>
          {formatDate(consulta.date)} - {consulta.petName}
          <img src={consulta.petPhoto || profilePlaceholder} alt={consulta.petName} className="pet-photo-consultas" />
        </button>
      ))}
    </div>
    </div>
  );
}

export default Consultas;
