import React, { useState, useEffect } from 'react';
import './MyPet.css';
import profilePlaceholder from './assets/images/profile_placeholder.jpeg';
import logo from './assets/images/logo.png';

function MyPet({ petId, token }) { // Assumindo que petId e token são passados como props
  const [pet, setPet] = useState({
    name: 'Café',
    age: 3,
    photo: profilePlaceholder,
    breed: 'Poodle',
    species: 'Cachorro',
    weight: 3
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
    </div>
  );
}


export default MyPet;
