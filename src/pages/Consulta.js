import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import './Consulta.css';
import Header from '../components/HeaderComponent/Header';
import profilePlaceholder from './assets/images/profile_placeholder.jpeg';

function Consulta() {
  const { consultaId } = useParams(); // Obtenha o ID da consulta dos parâmetros da rota
  const [consulta, setConsulta] = useState(null);

  useEffect(() => {
    const fetchConsulta = async () => {
      const token = localStorage.getItem('token');
      const response = await fetch(`https://backend-ks2k.onrender.com/vet/consulta/${consultaId}`, {
        headers: {
          'Authorization': `Bearer ${token}`,  // Supondo que você esteja usando autenticação JWT
          'Content-Type': 'application/json'
        }
      });
      if (!response.ok) {
        const errorText = await response.text(); // Obtém a resposta como texto para ver o erro
        console.error('Failed to fetch consulta:', errorText);
        return;
      }
      
      const data = await response.json();
      setConsulta(data);
    };
    
    fetchConsulta();
  }, [consultaId]);

  if (!consulta) {
    return <div>Loading...</div>; // Ou algum outro indicador de carregamento
  }

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return `${date.getDate().toString().padStart(2, '0')}/${(date.getMonth() + 1).toString().padStart(2, '0')}/${date.getFullYear()}`;
  };

  return (
    <div className="consulta-container">
      <Header propsLinkHome="/home" propsLinkProfile="/perfil" />
      <h1 className="consulta-title">Consulta</h1>
      <div className="consulta-details">
        <img src={consulta.petPhoto || profilePlaceholder} alt={consulta.petName} className="detail-photo" />
        <div className="detail-item"><strong>Pet:</strong> {consulta.petName}</div>
        <div className="detail-item"><strong>Data:</strong> {formatDate(consulta.date)}</div>
        <div className="detail-item"><strong>Médico:</strong> {consulta.doctorName}</div>
        <div className="detail-item"><strong>Clínica:</strong> {consulta.clinicName}</div>
        <div className="detail-item"><strong>Descrição:</strong> {consulta.description}</div>
      </div>
    </div>
  );
}

export default Consulta;
