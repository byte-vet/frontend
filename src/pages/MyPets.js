import React, { useState, useEffect } from 'react';
import './MyPets.css';
import profilePlaceholder from './assets/profile-placeholder.png'; // Substitua pelo caminho da sua imagem padrão de perfil

function MyPets() {
  // Este estado inicialmente terá uma lista falsa de pets para prototipagem
  // No futuro, você buscará essa lista do backend
  const [pets, setPets] = useState([
    { id: 1, name: 'Café', photo: 'path_to_cafes_photo.jpg' },
    { id: 2, name: 'Ranziza', photo: 'path_to_ranzizas_photo.jpg' }
    // Adicione mais pets aqui
  ]);

  // TODO: Substituir com função para carregar pets do backend
  useEffect(() => {
    // Fetch pets from backend and set them in state
  }, []);

  return (
    <div className="mypets-container">
      <h1>Meus pets</h1>
      <button className="button">Cadastrar pet</button>
      <div className="pet-list">
        {pets.map((pet) => (
          <div key={pet.id} className="pet-item">
            <img src={pet.photo || profilePlaceholder} alt={pet.name} className="pet-photo" />
            <div className="pet-info">
              <h2 className="pet-name">{pet.name}</h2>
              <button className="details-button">👉</button>
            </div>
          </div>
        ))}
      </div>
      {/* Aqui você pode adicionar mais funcionalidades e botões, como adicionar um novo pet */}
    </div>
  );
}

export default MyPets;
