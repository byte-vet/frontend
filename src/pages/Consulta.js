import React from 'react';
import './Consulta.css';
import logo from './assets/images/logo.png';
import profilePlaceholder from './assets/images/profile_placeholder.jpeg';
function Consulta() {
  const consulta = {
    date: '2023-05-07',
    petName: 'Café',
    petPhoto: profilePlaceholder,
    doctorName: 'Dr. T',
    clinicName: 'Clinica Vet',
    description: 'Consulta de rotina para verificação de vacinas e saúde geral. Realizado exame de sangue e vacinação.'
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return `${date.getDate().toString().padStart(2, '0')}/${(date.getMonth() + 1).toString().padStart(2, '0')}/${date.getFullYear()}`;
  };

  return (
    <div className="consulta-container">
      <div className="bytevet-logo">
        <img src={logo} alt="ByteVet Logo" />
        <h1 className="bytevet-logo-title">ByteVet</h1>
      </div>
      <h1 className="consulta-title">Consulta</h1>
      <div className="consulta-details">
        <img src={consulta.petPhoto} alt={consulta.petName} className="detail-photo" />
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