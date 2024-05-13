import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './Consultas.css';
import Header from '../components/HeaderComponent/Header';
import cachorroImage from './assets/images/cachorro.jpg';

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
        await Promise.all(data.map(async (consulta) => {
          const animalResponse = await fetch(`https://backend-ks2k.onrender.com/vet/animais/${consulta.animalId}`, {
            headers: {
              'Authorization': `Bearer ${token}`,
              'Content-Type': 'application/json',
            }
          });
          if (animalResponse.ok) {
            const animalData = await animalResponse.json();
            consulta.animalDetails = animalData; // Store animal details within each consulta
          }
        }));
        setConsultas(data);
      }
    };

    fetchConsultas();
  }, []);

  const handleAddConsulta = () => {
    navigate('/register-consulta');
  };

  const redirectToConsulta = (consultaId) => {
    const vetId = localStorage.getItem('vetId');
    navigate(`/vet/${vetId}/consulta/${consultaId}`);
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
            {formatDate(consulta.data)} - {consulta.animalDetails ? consulta.animalDetails.nome : 'Loading animal...'}
            <img src={consulta.animalDetails && consulta.animalDetails.photo ? consulta.animalDetails.photo : cachorroImage} alt={consulta.animalDetails ? consulta.animalDetails.nome : 'Animal'} className="pet-photo-consultas" />
          </button>
        ))}
      </div>
    </div>
  );
}

export default Consultas;
