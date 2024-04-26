import React, { useState, useEffect } from 'react'; // Import useEffect here
import './MyPet.css';
import logo from './assets/images/logo.png';
import profilePlaceholder from './assets/images/profile_placeholder.jpeg';

// Pass token and petId as props if they're not supposed to be hard-coded
function MyPet({ token, petId }) { // Assuming token and petId are props
  const [pet, setPet] = useState({
    name: 'Café',
    age: 3,
    photo: profilePlaceholder,
    breed: 'Poodle',
    species: 'Cachorro',
    weight: 3,
    vaccineCardUrl: '', // You need to have a URL for downloading the vaccination card
  });

  useEffect(() => {
    const fetchPet = async () => {
      try {
        // Use the token from props
        const response = await fetch(`http://localhost:3000/users/${token}/pets/${petId}`, {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${token}` // Use the token from props
          }
        });
        
        const data = await response.json();
    
        if (response.ok) {
          setPet({
            ...pet,
            name: data.nome,
            age: data.idade,
            photo: data.foto || profilePlaceholder,
            vaccineCard: data.cartaoVacina || [],
            vaccineCardUrl: data.vaccineCardUrl, // Make sure this data is provided by your backend
          });
        } else {
          console.error('Erro ao carregar informações do pet', data.message);
        }
      } catch (error) {
        console.error('Falha na requisição', error);
      }
    };

    fetchPet();
  }, [petId, token]); // Use the variables from props as dependencies

  
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
