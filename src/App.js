import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './pages/Login';
import Register from './pages/Register';
import Home from './pages/Home';
import MyPets from './pages/MyPets';
import RegisterPet from './pages/RegisterPet';
import MyPet from './pages/MyPet';
import Veterinario from './pages/Veterinario'

function App() {

  const userToken = 'token_do_usuario_aqui';

  return (
    <Router>
      <Routes>
        <Route path="/login" element={<MyPet />} />
        <Route path="/" element={<MyPet />} />
        <Route path="/register-pet" element={<RegisterPet />} />
        <Route path="/home" element={<Home />} />
        <Route path="/mypets" element={<MyPets />} />
        <Route path="/add-pet" element={<RegisterPet/>}/>
        <Route path="/mypet" element={<MyPet/>}/>
        <Route path="/mypet/:petId" element={<MyPet token={userToken} />} />
        {/* outras rotas aqui abaixo*/}
      </Routes>
    </Router>
  );
}

export default App;
