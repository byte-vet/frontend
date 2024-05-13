import React, { useState, useEffect } from 'react';
import './MyPets.css';
import './MyPet.css';
import Header from '../components/HeaderComponent/Header';
import cachorroImage from './assets/images/cachorro.jpg';
import { useNavigate } from 'react-router-dom';

function CartaoDeVacinacao({ petId, petName, petPhoto }) {
  const [vaccines, setVaccines] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchVaccines = async () => {
      const token = localStorage.getItem('token');
      try {
        const response = await fetch(`https://backend-ks2k.onrender.com/${localStorage.getItem('userId')}/pets/${petId}/vacinas`, {
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
          }
        });
        if (!response.ok) {
          throw new Error('Failed to fetch vaccines');
        }
        const data = await response.json();
        setVaccines(data);
      } catch (error) {
        console.error('Error fetching vaccines:', error);
      }
    };

    fetchVaccines();
  }, [petId]); // Dependency array includes petId to refetch if it changes

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return `${date.getDate().toString().padStart(2, '0')}/${(date.getMonth() + 1).toString().padStart(2, '0')}/${date.getFullYear()}`;
  };

  const handleAddVaccine = () => {
    navigate(`/register-vacina`)
  };

  return (
    <div className="mypets-container">
      <Header propsLinkHome="/home" propsLinkProfile="/perfil" />
      <img src={petPhoto || cachorroImage} alt={petName} className="pet-photo-my-pet" style={{ marginTop: '20px' }} />
      <h1 className="mypets-title" style={{ marginTop: '10px' }}>{petName}</h1>
      <button className="button add-pet" onClick={handleAddVaccine}>Adicionar Vacinas</button>
      <h2 className="mypets-header">Vacinas:</h2>
      <div className="pets-list">
        {vaccines.map((vaccine) => (
          <div key={vaccine.id} className="pet-card">
            <div>
              <div className="pet-name-my-pets" style={{ fontWeight: 'normal', fontSize: '1em' }}>{vaccine.name}</div>
              <div className="pet-name-my-pets" style={{ fontWeight: 'normal', fontSize: '0.8em' }}>{formatDate(vaccine.date)}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default CartaoDeVacinacao;
