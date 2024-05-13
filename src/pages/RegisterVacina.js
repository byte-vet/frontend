import React, { useState, useEffect } from 'react';
import './RegisterPet.css';
import { useNavigate } from 'react-router-dom';

function RegisterVacina() {
  const [nomeDaVacina, setNomeDaVacina] = useState('');
  const [dataDeAplicacao, setDataDeAplicacao] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const [petId, setPetId] = useState(localStorage.getItem('petId'));
  const userId = localStorage.getItem('userId');

  console.log(petId)

  useEffect(() => {
    if (!petId) {
      const storedPetId = localStorage.getItem('petId');
      if (storedPetId) {
        setPetId(storedPetId);
      }
    }
  }, [petId]);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    if (name === 'nomeDaVacina') {
      setNomeDaVacina(value);
    } else if (name === 'dataDeAplicacao') {
      setDataDeAplicacao(value);
    }
  };

  const submitVaccine = async (event) => {
    event.preventDefault();
    const token = localStorage.getItem('token');

    if (!nomeDaVacina || !dataDeAplicacao) {
      setError('Please fill in all fields');
      return;
    }

    setLoading(true);
    try {
      const response = await fetch(`https://backend-ks2k.onrender.com/users/${userId}/pets/${petId}/vacinas`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          nomeDaVacina,
          dataDeAplicacao
        })
      });

      if (!response.ok) {
        throw new Error('Failed to register vaccine');
      }

      navigate(`/cartaovacinacao`); // Adjust this path to match your correct route for viewing the vaccination card
    } catch (error) {
      console.error('Error registering vaccine:', error.message);
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  if (!userId || !petId) {
    return <div>Please select a pet and ensure you are logged in.</div>;
  }

  return (
    <div>
      {error && <p className="error">{error}</p>}
      <form onSubmit={submitVaccine}>
        <label className="register-pet-label" htmlFor="nomeDaVacina">Nome da Vacina:</label>
        <input className="register-pet-input" type="text" id="nomeDaVacina" name="nomeDaVacina" value={nomeDaVacina} onChange={handleInputChange} />
        <label className="register-pet-label" htmlFor="dataDeAplicacao">Data de Aplicação:</label>
        <input className="register-pet-input" type="date" id="dataDeAplicacao" name="dataDeAplicacao" value={dataDeAplicacao} onChange={handleInputChange} />
        <button className="button register" type="submit" disabled={loading}>Registrar Vacina</button>
      </form>
    </div>
  );
}

export default RegisterVacina;
