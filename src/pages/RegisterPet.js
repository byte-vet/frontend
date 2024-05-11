import React, { useState } from 'react';
import './RegisterPet.css';
import logo from './assets/images/logo.png';
import { useNavigate } from 'react-router-dom';

function RegisterPet() {
  const navigate = useNavigate();
  const [pet, setPet] = useState({
    name: '',
    age: '',
    type: '',
    weight: '',
    race: '',
  });

  const handleChange = (event) => {
    const { name, value } = event.target;
    if ((name === 'age' || name === 'weight') && (value < 0 || isNaN(Number(value)))) {
    }
    setPet(prevPet => ({
      ...prevPet,
      [name]: value
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const token = localStorage.getItem('token');
    const userId = localStorage.getItem('userId');

    if (!token) {
      alert('Você precisa estar logado para cadastrar um pet.');
      return;
    }

    const endpoint = `https://backend-ks2k.onrender.com/users/${userId}/pets`;

    const petData = {
      usuario: userId,
      nome: pet.name,
      especie: pet.type.toLowerCase(),
      raca: pet.race.toLowerCase(),
      idade: Number(pet.age),
      peso: Number(pet.weight)
    };

    try {
      const response = await fetch(endpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify(petData)
      });

      const responseData = await response.json();

      if (response.ok) {
        console.log('Pet cadastrado com sucesso!', responseData);
        navigate('/mypets');
      } else {
        console.error('Erro ao cadastrar pet:', responseData.message);
        alert(`Erro ao cadastrar pet: ${responseData.message}`);
      }
    } catch (error) {
      console.error('Erro na requisição:', error);
      alert('Erro na requisição de cadastro do pet.');
    }
  };

  return (
    <div className="register-pet-container">
      <img src={logo} alt="ByteVet Logo" className="register-pet-logo" />
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
        <label className="register-pet-label">
          Raça:
          <input
            className="register-pet-input"
            type="text"
            name="race"
            value={pet.race}
            onChange={handleChange}
            required
          />
        </label>
        <label className="register-pet-label">
          Peso (em kg):
          <input
            className="register-pet-input"
            type="number"
            name="weight"
            value={pet.weight}
            onChange={handleChange}
            required
          />
        </label>
        <label className="register-pet-label">
          Tipo de Pet:
          <input
            className="register-pet-input"
            type="text"
            name="type"
            value={pet.type}
            onChange={handleChange}
            required
          />
        </label>
        <button className="button add">Adicionar foto</button>
        <button type="submit" className="button register">Cadastrar</button>
      </form>
    </div>
  );
}

export default RegisterPet;
