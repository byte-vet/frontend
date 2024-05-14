import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import './Consulta.css';
import Header from '../components/HeaderComponent/Header';
import cachorroImage from './assets/images/cachorro.jpg';

function Consulta() {
  const { consultaId } = useParams();  // Get the consulta ID from the route parameters
  const [consulta, setConsulta] = useState(null);
  const [animal, setAnimal] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const vetId = localStorage.getItem('vetId');

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      const token = localStorage.getItem('tokenVet');

      try {
        const responseConsulta = await fetch(`https://backend-ks2k.onrender.com/vet/${vetId}/consulta/${consultaId}`, {
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
          }
        });
        if (!responseConsulta.ok) {
          throw new Error('Failed to fetch consulta');
        }

        const dataConsulta = await responseConsulta.json();
        setConsulta(dataConsulta);
        console.log('Fetching animal with ID:', dataConsulta.animalId);
        console.log('URL:', `https://backend-ks2k.onrender.com/vet/animais/${dataConsulta.animalId}`);
        const responseAnimal = await fetch(`https://backend-ks2k.onrender.com/vet/animais/${dataConsulta.animalId}`, {
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
          }
        });
        if (!responseAnimal.ok) {
          throw new Error('Failed to fetch animal');
        }
        const dataAnimal = await responseAnimal.json();
        setAnimal(dataAnimal);
      } catch (e) {
        setError(e.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [vetId, consultaId]);

  if (loading) {
    return <p>Carregando...</p>;
  }
  if (error) {
    return <p>Ocorreu um erro: {error}</p>;
  }
  if (!consulta || !animal) {
    return <p>Nenhum dado disponível.</p>;
  }

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return `${date.getDate().toString().padStart(2, '0')}/${(date.getMonth() + 1).toString().padStart(2, '0')}/${date.getFullYear()}`;
  };

  return (
    <div className="consulta-container">
      <Header propsLinkHome="/home-vet" propsLinkProfile="/perfil-vet" />
      <h1 className="consulta-title">Consulta</h1>
      <div className="consulta-details">
        <img src={consulta.petPhoto || cachorroImage} alt={animal.nome || 'Animal'} className="detail-photo" />
        <div className="detail-item"><strong>Pet:</strong> {animal.nome}</div>
        <div className="detail-item"><strong>Data:</strong> {formatDate(consulta.data)}</div>
        <div className="detail-item"><strong>Motivo:</strong> {consulta.motivo}</div>
        <div className="detail-item"><strong>Diagnostico:</strong> {consulta.diagnostico}</div>
      </div>
    </div>
  );
}

export default Consulta;
