import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './Consultas.css';
import profilePlaceholder from './assets/images/profile_placeholder.jpeg';
import Header from '../components/HeaderComponent/Header';

function Consultas() {
  const [consultas, setConsultas] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchConsultas = async () => {
      const token = localStorage.getItem('token');
      const vetId = localStorage.getItem('vetId');
      
      const response = await fetch(`https://backend-ks2k.onrender.com/vet/${vetId}/consulta`, {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        }
      });
      if (response.ok) {
        const data = await response.json();
        setConsultas(data);
      }
    };

    fetchConsultas();
  }, []);

  const handleAddConsulta = () => {
    navigate('/register-consulta');
  };

  const redirectToConsulta = (consultaId) => {
    navigate(`/consulta/${consultaId}`);
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return `${date.getDate().toString().padStart(2, '0')}/${(date.getMonth() + 1).toString().padStart(2, '0')}/${date.getFullYear()}`;
  };

  return (
    <div>
      <Header propsLinkHome="/home" propsLinkProfile="/perfil" />
      <div className="consultas-container">
        <h1 className="consultas-title">Consultas</h1>
        <button className="add-consulta-button" onClick={handleAddConsulta}>
          ➕ Adicionar Consulta
        </button>
        {consultas.map(consulta => (
          <button key={consulta._id} onClick={() => redirectToConsulta(consulta._id)} className="consulta-button">
            {formatDate(consulta.data)} - {consulta.animalId.nome}
            <img src={consulta.animalId.photo || profilePlaceholder} alt={consulta.animalId.nome} className="pet-photo-consultas" />
          </button>
        ))}
      </div>
    </div>
  );
}

export default Consultas;
