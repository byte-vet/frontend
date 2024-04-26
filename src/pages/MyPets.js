import React, { useState, useEffect } from 'react';
import './MyPets.css';
import logo from './assets/images/logo.png';
import profilePlaceholder from './assets/images/profile_placeholder.jpeg';
import { useNavigate } from 'react-router-dom';

function MyPets() {
  let navigate = useNavigate();
  const [petAdded, setPetAdded] = useState(false);
  const [pets, setPets] = useState([
    { id: 1, name: 'Café', photo: profilePlaceholder },
    { id: 2, name: 'Ranziza', photo: profilePlaceholder }
    // outros pets...
  ]);

  /*useEffect(() => {
    const fetchPets = async () => {
    // função para lidar com o clique no pet
    const userId = localStorage.getItem('userId');
    const token = localStorage.getItem('token'); 

    if (!token || !userId) {
      alert('Você precisa estar logado.');
      navigate('/login'); // Redirecionar para a página de login se não estiver logado
      return;
    }

      try {
        const response = await fetch(`http://localhost:3000/users/${userId}/pets`, { // Atualize esta URL para seu endpoint correto
          headers: {
            'Authorization': `Bearer ${token}`,
          },
      });

      if (!response.ok) {
        throw new Error('Problema ao buscar pets');
      }

      const data = await response.json();
        setPets(data); // Atualize o estado com os pets recebidos
      } catch (error) {
        console.error('Erro ao buscar pets:', error);
        // Aqui você pode configurar alguma mensagem de erro para a UI
      }
    };

    fetchPets();
    setPetAdded(false);
  }, [navigate, petAdded]);*/

  const handleAddPet = () => {
    navigate('/add-pet', { state: { onPetAdded: () => setPetAdded(true) } });
  };

  const [searchTerm, setSearchTerm] = useState('');

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleSearch = () => {
     console.log('Função de busca acionada com:', searchTerm);
      // incluir chamada para o backend
  };

  const handlePetClick = (petId) => {
    // You can add logic here, for example, navigating to a pet detail page
    navigate(`/mypet/${petId}`);
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
      {pets.map((pet) => (
        <button key={pet.id} className="pet-button" onClick={() => handlePetClick(pet.id)}>
          <img src={pet.photo} alt={pet.name} className="pet-photo" />
          {pet.name}
        </button>
      ))}
    </div>
  );
}

export default MyPets;
