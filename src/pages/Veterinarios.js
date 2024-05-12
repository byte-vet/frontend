import React, { useEffect, useState } from 'react';
import './MyPets.css';
import './Veterinarios.css';
import logo from './assets/images/logo.png';

function Veterinarios() {
  const [veterinarians, setVeterinarians] = useState([
    // apenas para exemplo
    { id: 1, name: 'Dr. Roberto Silva', clinic: 'Clínica Vet Vida', photo: '' },
    { id: 2, name: 'Dra. Maria Oliveira', clinic: 'Pets Saúde Animal', photo: '' },
    { id: 3, name: 'Dr. João Costa', clinic: 'Veterinário do Bairro', photo: '' }
  ]);

  return (
    <div className="mypets-container">
      <img src={logo} alt="ByteVet Logo" className="mypets-logo" />
      <h1 className="mypets-title">ByteVet</h1>
      <h1 className="mypets-header">Veterinários</h1>
      <div className="pets-list">
        {veterinarians.map((vet) => (
          <div key={vet.id} className="vet-card">
            <div className="vet-name">{vet.name}</div>
            <div className="clinic-name">{vet.clinic}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Veterinarios;
