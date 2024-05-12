import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './pages/Login';
import Register from './pages/Register';
import Home from './pages/Home';
import MyPets from './pages/MyPets';
import RegisterPet from './pages/RegisterPet';
import MyPet from './pages/MyPet';
import Consulta from './pages/Consulta'
import Consultas from './pages/Consultas'

import Profile from './pages/Profile';
import RegisterVet from './pages/RegisterVet';
import LoginVet from './pages/LoginVet';
import HomeVet from './pages/HomeVet';
import RegisterConsulta from './pages/RegisterConsulta';
import Veterinarios from './pages/Veterinarios';


function App() {

  const userToken = 'token_do_usuario_aqui';

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/register-pet" element={<RegisterPet />} />
        <Route path="/home" element={<Home />} />
        <Route path="/home-vet" element={<HomeVet />} />
        <Route path="/mypets" element={<MyPets />} />
        <Route path="/add-pet" element={<RegisterPet/>}/>
        <Route path="/mypet/:petId" element={<MyPet token={userToken} />} />
        <Route path="/consulta" element={<Consulta/>}/>
        <Route path="/consultas" element={<Consultas />} />

        <Route path="/perfil" element={<Profile />} />

        <Route path="/register-vet" element={<RegisterVet />} />
        <Route path="/login-vet" element={<LoginVet />} />
        <Route path="/register-consulta" element={<RegisterConsulta />} />
        <Route path="/veterinarios" element={<Veterinarios />} />

        {/* outras rotas aqui abaixo*/}
      </Routes>
    </Router>
  );
}

export default App;
