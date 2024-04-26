import React, { useState } from 'react';
import './RegisterPet.css';
import logo from './assets/images/logo.png';

function RegisterPet() {
  const [pet, setPet] = useState({
    name: '',
    age: '',
    type: '',
    weight: '',
    race: '',
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

  const handleSubmit = async (event) => {
    event.preventDefault();
    const token = localStorage.getItem('token');

    if (!token) {
      alert('Você precisa estar logado para cadastrar um pet.');
      return;
    }
    // Substitua 'http://localhost:3000/animais' pelo endpoint correto se necessário.
    // Certifique-se de que você tem um token válido se a autenticação for necessária.
    const endpoint = 'http://localhost:3000/animais';
  
    // Construa o objeto com os dados do pet
    const petData = {
      usuario: '1233333', // Substitua pelo ID do usuário logado
      nome: pet.name,
      especie: pet.type, // Certifique-se de que este campo corresponda com o enum do backend
      raca: pet.race.toLowerCase(),
      idade: Number(pet.age),
      peso: Number(pet.weight)
    };
  
    try {
      // Faça a requisição para o backend
      const response = await fetch(endpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer bytevet',
        },
        body: JSON.stringify(petData) // Transforme o objeto petData em uma string JSON
      });
  
      const responseData = await response.json(); // Obtenha a resposta JSON do servidor
  
      if (response.ok) {
        console.log('Pet cadastrado com sucesso!', responseData);
        // Aqui você pode redirecionar o usuário ou atualizar a UI conforme necessário
      } else {
        // Se a resposta não for ok, mostre uma mensagem de erro
        console.error('Erro ao cadastrar pet:', responseData.message);
        alert(`Erro ao cadastrar pet: ${responseData.message}`);
      }
    } catch (error) {
      // Se ocorrer um erro na requisição, mostre-o no console e informe o usuário
      console.error('Erro na requisição:', error);
      alert('Erro na requisição de cadastro do pet.');
    }
  };
  

  return (
    <div className="register-pet-container">
      <img src={logo} alt="ByteVet Logo" className="register-pet-logo" />
      <h1 className="register-pet-title">ByteVet</h1>
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
              <option value="cachorro">Cachorro</option>
              <option value="gato">Gato</option>
              <option value="peixe">Peixe</option>
              <option value="passaro">Pássaro</option>
              <option value="roedor">Roedor</option>
              <option value="reptil">Réptil</option>
              <option value="outro">Outro</option>
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
