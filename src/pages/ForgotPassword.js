import './ForgotPassword.css';
import logo from '../pages/assets/images/logo.png';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function ForgotPassword() {
  const [email, setEmail] = useState('');
  let navigate = useNavigate();
  const handleSendEmailForgotPassword = async (e) => {
    e.preventDefault();

    const response = await fetch('https://backend-ks2k.onrender.com/auth/requestResetPassword', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email }),
    });

    const data = await response.json();

    if (response.ok) {
      alert('Email enviado com sucesso!');
      navigate('/login');
    } else {
      console.error('Erro ao enviar email:', data.message);
    }
  };
  return (
    <div className="pw-background">
      <div className="pw-container">
        <button className="pw-back-button" onClick={() => window.location.href = '/login'}> Voltar </button>
        <div className="pw-logo">
          <img src={logo} alt="ByteVet" />
        </div>
        
        <h1 className="pw-title">ByteVet</h1>
     
        <h1 className="pw-title">Recuperação de senha</h1>
        <p className="pw-frase">Vamos te ajudar! Digite abaixo o e-mail da sua conta cadastrada.</p>
        <form className="pw-form" onSubmit={handleSendEmailForgotPassword}>
          <div className="input-wrapper">
            <input
              type="email"
              placeholder="Email"
              className="input-field"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              style={{ color: '#000' }}
            />
          </div>
          <button type="submit" className="pw-button">Enviar</button>
          </form>
      </div>
    </div>
  );
}

export default ForgotPassword;