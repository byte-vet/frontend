import React, { useState } from 'react';
import './RegisterPet.css';
import logo from './assets/images/logo.png';

function RegisterPet() {
  const [pet, setPet] = useState({
    name: '',
    age: ''
  });

  const handleChange = (event) => {
    const { name, value } = event.target;
    setPet(prevPet => ({
      ...prevPet,
      [name]: value
    }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    // aqui a chamada para o backend para registrar o pet
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
