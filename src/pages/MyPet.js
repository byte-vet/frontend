import React, { useState, useEffect } from 'react';
import './MyPet.css';
import profilePlaceholder from './assets/images/profile_placeholder.jpeg';

function MyPet({ petId, token }) { // Assumindo que petId e token são passados como props
  const [pet, setPet] = useState({
    name: '',
    age: '',
    photo: profilePlaceholder,
    vaccineCard: []
  });

  useEffect(() => {
    const fetchPet = async () => {
      try {
        const response = await fetch(`http://localhost:3000/users/${token}/pets/${petId}`, {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${data.token}` // Certifique-se de que o token está sendo passado corretamente
          }
        });
        
        const data = await response.json();
    
        if (response.ok) {
          setPet({
            ...pet,
            name: data.nome,
            age: data.idade,
            photo: data.foto || profilePlaceholder,
            vaccineCard: data.cartaoVacina || []
          });
        } else {
          console.error('Erro ao carregar informações do pet', data.message);
        }
      } catch (error) {
        console.error('Falha na requisição', error);
      }
    };

    fetchPet();
  }, [petId, token]); // Dependências do useEffect

  // Resto do seu componente...
  return (
    <div className="pet-container">
      <img src={pet.photo} alt={pet.name} className="my-pet-photo" />
      <h1 className="pet-name">{pet.name}</h1>
      <p className="pet-age">Idade: {pet.age} anos</p>
      <div className="vaccine-card-container">
        <h2>Cartão de Vacinação</h2>
        <ul className="vaccine-list">
          {pet.vaccineCard.map((entry, index) => (
            <li key={index} className="vaccine-entry">
              <span className="vaccine-date">{entry.date}</span>
              <span className="vaccine-name">{entry.vacina}</span>
            </li>
          ))}
        </ul>
      </div>
      {/* Restante do seu JSX para Editar, Deletar, etc. */}
    </div>
  );
}

export default MyPet;
