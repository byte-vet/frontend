import React, { useState } from 'react';
import './Veterinario.css'; // Assumindo que Veterinario.css importa ou contém os estilos de botão de Home.css
import logo from './assets/images/logo.png';
import profilePlaceholder from './assets/images/profile_placeholder.jpeg';

function Veterinario() {
  const [vet, setVet] = useState({
    fullName: 'Dr. João Silva',
    email: 'dr.joao@email.com',
    nomeClinica: 'Clínica Vet Top',
    localizacaoClinica: 'Rua das Flores, 123, Cidade Jardim'
  });

  return (
    <div className="vet-container">
      <img src={logo} alt="ByteVet Logo" className="vet-logo" />
      <h1 className="vet-title">ByteVet</h1>
      <img src={profilePlaceholder} alt={vet.fullName} className="vet-photo" />
      <h1 className="vet-name">{vet.fullName}</h1>
      <div className="main-buttons">
        <button className="button-clinic-info">Email: {vet.email}</button>
        <button className="button-clinic-info">Clínica: {vet.nomeClinica}</button>
        <button className="button-clinic-info">Localização: {vet.localizacaoClinica}</button>
      </div>
    </div>
  );
}

export default Veterinario;
