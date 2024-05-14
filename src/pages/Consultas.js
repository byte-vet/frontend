import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './Consultas.css';
import Header from '../components/HeaderComponent/Header';
import cachorroImage from './assets/images/cachorro.jpg';

function Consultas() {
  const [consultas, setConsultas] = useState([]);
  const navigate = useNavigate();
  const vetId = localStorage.getItem('vetId'); // Ensure vetId is stored in localStorage

  useEffect(() => {
      const fetchConsultas = async () => {
          const token = localStorage.getItem('tokenVet');
          const response = await fetch(`https://backend-ks2k.onrender.com/vet/${vetId}/consulta`, {
              headers: {
                  'Authorization': `Bearer ${token}`,
                  'Content-Type': 'application/json'
              }
          });

          if (!response.ok) {
              console.error('Failed to fetch consultas:', await response.text());
              return;
          }
          const data = await response.json();
          setConsultas(data);
      };

      fetchConsultas();
  }, [vetId]);

  const redirectToConsulta = (consultaId) => {
    navigate(`/vet/${vetId}/consulta/${consultaId}`);
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return `${date.getDate().toString().padStart(2, '0')}/${(date.getMonth() + 1).toString().padStart(2, '0')}/${date.getFullYear()}`;
  };

  const handleAddConsulta = () => {
    navigate('/register-consulta');
  };

  return (
    <div>
      <Header propsLinkHome="/home-vet" propsLinkProfile="/perfil-vet" />
      <div className="consultas-container">
        <h1 className="consultas-title">Consultas</h1>
        <button className="add-consulta-button" onClick={handleAddConsulta}>
          ➕ Adicionar Consulta
        </button>
        {consultas.map(consulta => (
          <button key={consulta._id} onClick={() => redirectToConsulta(consulta._id)} className="consulta-button">
              {formatDate(consulta.data)} - {consulta.motivo}
              <img src={cachorroImage} alt='Consulta' className="pet-photo-consultas" />
          </button>
      ))}
      </div>
    </div>
  );
}

export default Consultas;
