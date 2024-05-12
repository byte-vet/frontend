import React, { useState, useEffect } from 'react';
import './MyPet.css';
import logo from './assets/images/logo.png';
import profilePlaceholder from './assets/images/profile_placeholder.jpeg';
import { useParams, useNavigate } from 'react-router-dom';

function MyPet() {
  const { petId } = useParams();  // Assumindo que a rota é algo como '/mypet/:petId'
  const [pet, setPet] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchPet = async () => {
      const token = localStorage.getItem('token');
      if (!token) {
        alert('Você precisa estar logado para acessar essa página.');
        return;
      }

      const endpoint = `https://backend-ks2k.onrender.com/animais/${petId}`;
      try {
        const response = await fetch(endpoint, {
          headers: { 'Authorization': `Bearer ${token}` },
        });
        if (response.ok) {
          const data = await response.json();
          setPet(data);
        } else {
          throw new Error('Falha ao buscar detalhes do pet');
        }
      } catch (error) {
        console.error('Erro ao buscar detalhes do pet:', error);
        alert('Erro ao buscar detalhes do pet');
      }
    };

    fetchPet();
  }, [petId]);

  if (!pet) {
    return <div>Carregando...</div>;
  }

  const handleConsultas = () => {
    navigate('/consultas');
  };

  return (
    <div className="pet-container">
      <img src={logo} alt="ByteVet Logo" className="mypet-logo" />
      <h1 className="mypet-title">ByteVet</h1>
      <img src={pet.photo || profilePlaceholder} alt={pet.nome} className="pet-photo" />
      <h1 className="pet-name">{pet.nome}</h1>
      <p className="pet-age">Idade: {pet.idade} anos</p>
      <p className="pet-info">Peso: {pet.peso}kg</p>
      <p className="pet-info">Raça: {pet.raca}</p>
      <p className="pet-info">Espécie: {pet.especie}</p>
      <a className="button-vaccination-card">Cartão de Vacinação</a>
      <button className="button-appointments-card" onClick={handleConsultas}>Histórico de consultas</button>
    </div>
  );
  
}
export default MyPet;
