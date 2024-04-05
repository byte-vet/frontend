import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './pages/Login';
import Register from './pages/Register';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} /> // Rota para Login como página inicial
        <Route path="/register" element={<Register />} />
        {/* Defina outras rotas conforme necessário */}
      </Routes>
    </Router>
  );
}

export default App;
