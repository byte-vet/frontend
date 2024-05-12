import React from 'react';
import './Home.css';
import { useNavigate } from 'react-router-dom';
import Header from '../components/HeaderComponent/Header';

function Home() {
  let navigate = useNavigate();

  const handleMyPets = () => {
    navigate('/mypets');
  };

  const handleAppointments = () => {
    navigate('/consultas');
  };

  const handleAddPet = () => {
    navigate('/add-pet');
  };

  return (
    <div className="body-home">
      <div className="home-container">
        <Header />
        <div className="main-buttons">
          <button className="button add-pet-home" onClick={handleAddPet}>➕ Adicionar pet</button>
          <button className="button my-pets" onClick={handleMyPets}>🐾 Meus pets</button>
          <button className="button appointments" onClick={handleAppointments}>🩺 Consultas</button>
        </div>
      </div>
    </div>
  );
}

export default Home;
