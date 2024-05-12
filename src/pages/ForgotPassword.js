import './ForgotPassword.css';
import logo from '../pages/assets/images/logo.png';
import { useState } from 'react';

function ForgotPassword() {
  const [email, setEmail] = useState('');
  const handleSendEmailForgotPassword = async (email) => {
    const response = await fetch('https://backend-ks2k.onrender.com/auth/requestResetPassword', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email }),
    });

    const data = await response.json();
    console.log(response.json());

    if (response.ok) {
      console.log('Email enviado com sucesso!');
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
        <form className="pw-form" onSubmit={(e) => {
        e.preventDefault();
        handleSendEmailForgotPassword(email);
        }}>
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