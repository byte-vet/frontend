import React, { useState } from 'react';
import './MyPet.css';
import logo from './assets/images/logo.png';
import profilePlaceholder from './assets/images/profile_placeholder.jpeg';

function MyPet() {
  const [pet, setPet] = useState({
    name: 'Café',
    age: 3,
    photo: profilePlaceholder,
    breed: 'Poodle',
    species: 'Cachorro',
    weight: 3
  });

  return (
    <div className="pet-container">
      <img src={logo} alt="ByteVet Logo" className="mypet-logo" />
      <h1 className="mypet-title">ByteVet</h1>
      <img src={pet.photo} alt={pet.name} className="pet-photo" />
      <h1 className="pet-name">{pet.name}</h1>
      <p className="pet-age">Idade: {pet.age} anos</p>
      <p className="pet-info">Peso: {pet.weight}kg</p>
      <p className="pet-info">Raça: {pet.breed}</p>
      <p className="pet-info">Espécie: {pet.species}</p>
      <a 
        href={pet.vaccineCardUrl} 
        className="button-vaccination-card"
        download={`Cartao-Vacinacao-${pet.name}.pdf`}
      >
        Cartão de Vacinação
      </a>
      <button className="button-appointments-card">Histórico de consultas</button>
    </div>
  );
}

export default MyPet;
