// MyPet.js
import React, { useState } from 'react';
import './MyPet.css';
import profilePlaceholder from './assets/images/profile_placeholder.jpeg';

function MyPet() {
  const [pet, setPet] = useState({
    name: 'Café',
    age: 3,
    photo: profilePlaceholder,
    vaccineCard: [
      { date: '2021-01-01', vaccine: 'Rabies' },
      // ...mais vacinas
    ]
  });

  // Aqui você poderia carregar as informações do pet do backend
  // useEffect(() => { ... }, []);

  return (
    <div className="pet-container">
      <img src={pet.photo} alt={pet.name} className="my-pet-photo" />
      <h1 className="pet-name">{pet.name}</h1>
      <p className="pet-age">Idade: {pet.age} anos</p>
      <div className="button-pet">
        <h2>Cartão de Vacinação </h2>
        <ul className="vaccine-list">
          {pet.vaccineCard.map((entry, index) => (
            <li key={index} className="vaccine-entry">
              <span className="vaccine-date">{entry.date}</span>
              <span className="vaccine-name">{entry.vaccine}</span>
            </li>
          ))}
        </ul>
      </div>
      <button className="button-pet-edit">Editar</button>
    </div>
  );
}

export default MyPet;
