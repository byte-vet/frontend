import React, { useState } from 'react';
import './RegisterPet.css';
import logo from './assets/images/logo.png';

function RegisterPet() {
  const [pet, setPet] = useState({
    name: '',
    age: '',
    type: '', // Add state for pet type
  });

  const [showDropdown, setShowDropdown] = useState(false); // State for dropdown visibility
  const petTypes = ['Cachorro', 'Gato', 'Peixe', 'Pássaro', 'Coelho', 'Roedor', 'Réptil', 'Outro']; // Array of pet types

  const handleChange = (event) => {
    const { name, value } = event.target;
    setPet(prevPet => ({
      ...prevPet,
      [name]: value
    }));
  };

  const handlePetTypeClick = (type) => {
    setPet(prevPet => ({
      ...prevPet,
      type,
    }));
    setShowDropdown(false); // Hide dropdown on selection
  };

  const toggleDropdown = () => {
    setShowDropdown(!showDropdown); // Toggle dropdown visibility
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    // Here the call to the backend for registering the pet
    console.log(pet);
  };

  return (
    <div className="register-pet-container">
      <img src={logo} alt="ByteVet Logo" className="mypets-logo" />
      <h1 className="mypets-title">ByteVet</h1>
      <h1 className="register-pet-title">Cadastrar Pet</h1>
      <form onSubmit={handleSubmit} className="register-pet-form">
        <label className="register-pet-label">
          Nome:
          <input
            className="register-pet-input"
            type="text"
            name="name"
            value={pet.name}
            onChange={handleChange}
            required
          />
        </label>
        <label className="register-pet-label">
          Idade:
          <input
            className="register-pet-input"
            type="number"
            name="age"
            value={pet.age}
            onChange={handleChange}
            required
          />
        </label>
        <form onSubmit={handleSubmit} className="register-pet-form">
        <div className="register-pet-select-wrapper">
          <label className="register-pet-label">
            Tipo de Pet:
            <select
              className="register-pet-select"
              name="type"
              value={pet.type}
              onChange={handleChange}
              required
            >
              <option value="">Selecione o tipo de pet</option>
              <option value="dog">Cachorro</option>
              <option value="cat">Gato</option>
              <option value="fish">Peixe</option>
              <option value="bird">Pássaro</option>
              <option value="rodent">Roedor</option>
              <option value="reptile">Réptil</option>
              <option value="other">Outro</option>
            </select>
          </label>
        </div>
  </form>
        <button className="button add">
          Adicionar consulta
        </button>
        <button className="button add">
          Adicionar Cartão de vacina
        </button>
        <button className="button add">
          Adicionar foto
        </button>
        <button type="submit" className="button register">
          Cadastrar
        </button>
      </form>
    </div>
  );
}

export default RegisterPet;
