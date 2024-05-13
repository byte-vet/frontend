import React, { useState } from 'react';
import './RegisterPet.css';  // Reutilizando os estilos de RegisterPet
import Header from '../components/HeaderComponent/Header';
import { useNavigate } from 'react-router-dom';

function RegisterVacina() {
  const [vaccine, setVaccine] = useState({
    nomeDaVacina: '',
    dataDeAplicacao: ''
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleChange = (event) => {
    const { name, value } = event.target;
    setVaccine(prevVaccine => ({
      ...prevVaccine,
      [name]: value
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const token = localStorage.getItem('token');
    const userId = localStorage.getItem('userId');
    const petId = localStorage.getItem('petId');

    if (!token || !petId) {
      setError('Você precisa estar logado e selecionar um pet.');
      return;
    }

    setLoading(true);
    const endpoint = `https://backend-ks2k.onrender.com/users/${userId}/pets/${petId}/vacinas`;

    try {
      const response = await fetch(endpoint, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          nomeDaVacina: vaccine.nomeDaVacina,
          dataDeAplicacao: vaccine.dataDeAplicacao
        })
      });

      if (response.ok) {
        navigate('/cartaovacinacao'); // Ajuste para o caminho correto
      } else {
        throw new Error('Falha ao registrar vacina');
      }
    } catch (error) {
      console.error('Erro ao registrar vacina:', error);
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="body-pet">
      <Header propsLinkHome="/home" propsLinkProfile="/perfil" />
      <div className="register-pet-container">
        <h1 className="register-pet-title">Registrar vacina</h1>
        {error && <p className="error">{error}</p>}
        <form onSubmit={handleSubmit} className="register-pet-form">
          <label className="register-pet-label" htmlFor="nomeDaVacina">Nome da vacina:</label>
          <input className="register-pet-input" type="text" id="nomeDaVacina" name="nomeDaVacina" value={vaccine.nomeDaVacina} onChange={handleChange} required />

          <label className="register-pet-label" htmlFor="dataDeAplicacao">Data de aplicação:</label>
          <input className="register-pet-input" type="date" id="dataDeAplicacao" name="dataDeAplicacao" value={vaccine.dataDeAplicacao} onChange={handleChange} required />

          <div className="register-pet-buttons">
            <button type="submit" className="button register" disabled={loading}>Registrar Vacina</button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default RegisterVacina;
