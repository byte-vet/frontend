import React, { useEffect, useState } from 'react';
import './MyPets.css';
import logo from './assets/images/logo.png';
import profilePlaceholder from './assets/images/profile_placeholder.jpeg';
import { useNavigate } from 'react-router-dom';

function MyPets() {
  const navigate = useNavigate();
  const [pets, setPets] = useState([]);

  useEffect(() => {
    const fetchPets = async () => {
      const userId = localStorage.getItem('userId');
      const token = localStorage.getItem('token');
      if (!userId || !token) {
        alert('Você precisa estar logado para ver seus pets.');
        navigate('/login');
        return;
      }

      const endpoint = `https://backend-ks2k.onrender.com/users/${userId}/pets`;
      try {
        const response = await fetch(endpoint, {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });
        if (response.ok) {
          const data = await response.json();
          console.log("Pets data:", data);
          setPets(data);
        } else {
          throw new Error('Falha ao buscar pets');
        }
      } catch (error) {
        alert(error.message);
      }
    };

    fetchPets();
  }, [navigate]);

  const deletePet = async (petId) => {
    const token = localStorage.getItem('token');
    if (!token) {
      alert('Você precisa estar logado para deletar um pet.');
      return;
    }

    const endpoint = `https://backend-ks2k.onrender.com/animais/${petId}`;
    try {
      const response = await fetch(endpoint, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      if (response.ok) {
        alert('Pet deletado com sucesso!');
        setPets(pets.filter(pet => pet._id !== petId)); // Atualiza a lista de pets
      } else {
        throw new Error('Falha ao deletar pet');
      }
    } catch (error) {
      alert(error.message);
    }
  };

  const handlePetClick = (petId) => {
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
      <div className="pets-list">
        {pets.map((pet) => (
          <div key={pet._id} className="pet-card">
            <div onClick={() => handlePetClick(pet._id)} style={{ flex: 1, cursor: 'pointer' }}>
              <img src={pet.photo || profilePlaceholder} alt={pet.nome} className="pet-photo" />
              <div className="pet-info">
                <h2>{pet.nome}</h2>
                <p>Espécie: {pet.especie}</p>
                <p>Raça: {pet.raca}</p>
                <p>Idade: {pet.idade} anos</p>
              </div>
            </div>
            <button className="delete-button" onClick={(e) => {
              e.stopPropagation();
              deletePet(pet._id);
            }}>Excluir</button>
          </div>
        ))}
      </div>
    </div>
  );
  
}

export default MyPets;
