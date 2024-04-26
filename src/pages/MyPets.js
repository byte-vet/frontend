import React, { useState } from 'react';
import './MyPets.css';
import logo from './assets/images/logo.png';
import profilePlaceholder from './assets/images/profile_placeholder.jpeg';
import { useNavigate } from 'react-router-dom';

function MyPets() {
  let navigate = useNavigate();
  const [pets, setPets] = useState([
    { id: 1, name: 'Café', photo: profilePlaceholder },
    { id: 2, name: 'Ranziza', photo: profilePlaceholder }
    // outros pets...
  ]);

  // função para lidar com o clique no pet
  const handlePetClick = (petId) => {
    // integrar com o backend para levar para a tela do pet, individualmente
    console.log("Pet clicked:", petId);
    navigate(`/mypet/${petId}`);
  };

  const handleAddPet = () => {
    navigate('/add-pet');
  };

  const [searchTerm, setSearchTerm] = useState('');

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleSearch = () => {
    console.log('Função de busca acionada com:', searchTerm);
    // incluir chamada para o backend
  };

  return (
    <div className="mypets-container">
      <img src={logo} alt="ByteVet Logo" className="mypets-logo" />
      <h1 className="mypets-title">ByteVet</h1>
      <div className="search-bar">
        <input type="text" placeholder="Buscar..." className="input-field" onChange={handleSearchChange} />
        <button className="search-button" onClick={handleSearch}>🔍</button>
      </div>
      <button className="button add-pet" onClick={handleAddPet}>➕ Adicionar pet</button>
      <h1 className="mypets-header">Meus pets</h1>
      {pets.map((pet) => (
        <button key={pet.id} className="pet-button" onClick={() => handlePetClick(pet.id)}>
          <img src={pet.photo} alt={pet.name} className="pet-photo" />
          {pet.name}
        </button>
      ))}
    </div>
  );
}

export default MyPets;
