import React, { useEffect, useState } from 'react';
import './MyPets.css';
import cachorroImage from './assets/images/cachorro.jpg';
import { useNavigate } from 'react-router-dom';
import Header from '../components/HeaderComponent/Header';

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

  return (
    <div className="mypets-container">
      <Header 
          propsLinkHome="/home"
          propsLinkProfile="/perfil"
        />
      <button className="button add-pet" onClick={handleAddPet}>➕ Adicionar pet</button>
      <h1 className="mypets-header">Meus pets</h1>
      <div className="pets-list">
        {pets.map((pet) => (
          <div key={pet._id} className="pet-card" onClick={() => handlePetClick(pet._id)}>
            <img src={pet.photo || cachorroImage} alt={pet.nome} className="pet-photo-my-pets" />
            <div className="pet-name-my-pets">{pet.nome}</div>
            <button className="delete-button" onClick={(e) => {
              e.stopPropagation();
              deletePet(pet._id);
            }}>🗑️</button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default MyPets;
