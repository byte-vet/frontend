import React, { useState } from 'react';
import './MyPets.css';
import './MyPet.css';
import Header from '../components/HeaderComponent/Header';
import profilePlaceholder from './assets/images/profile_placeholder.jpeg';

function CartaoDeVacinacao({ petName, petPhoto }) {
  const [vaccines, setVaccines] = useState([
    { id: 1, name: 'Raiva', date: '2023-04-01' },
    { id: 2, name: 'Cinomose', date: '2023-04-15' }
  ]);

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return `${date.getDate().toString().padStart(2, '0')}/${(date.getMonth() + 1).toString().padStart(2, '0')}/${date.getFullYear()}`;
  };

  return (
    <div className="mypets-container">
      <Header propsLinkHome="/home" propsLinkProfile="/perfil" />
      <img src={petPhoto || profilePlaceholder} alt={petName} className="pet-photo-my-pet" style={{ marginTop: '20px' }} />
      <h1 className="mypets-title" style={{ marginTop: '10px' }}>{petName}</h1> {/* Nome do pet abaixo da foto */}
      <button className="button add-pet" onClick={() => alert('Adicionar vacina')}>➕ Adicionar vacina</button>
      <h2 className="mypets-header">Vacinas:</h2>
      <div className="pets-list">
        {vaccines.map((vaccine) => (
          <div key={vaccine.id} className="pet-card">
            <div>
              <div className="pet-name-my-pets" style={{ fontWeight: 'normal', fontSize: '1em' }}>{vaccine.name}</div> {/* Menos boldness */}
              <div className="pet-name-my-pets" style={{ fontWeight: 'normal', fontSize: '0.8em' }}>{formatDate(vaccine.date)}</div> {/* Menos boldness */}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default CartaoDeVacinacao;
