import './ForgotPassword.css';
import logo from '../pages/assets/images/logo.png';
import { useState } from 'react';
import { redirect } from 'react-router-dom';


function EmailVerification() {
    
    const handleEmailVerification = async (e) => {
        e.preventDefault();
        const urlParams = new URLSearchParams(window.location.search);
        const id = urlParams.get('id');
        const token = urlParams.get('token');

        const response = await fetch(`https://backend-ks2k.onrender.com/auth/verifyEmail?token=${token}&id=${id}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            }
        });


        if (response.ok) {
            alert("Email verificado com sucesso. Redirecionando para a página de login.");
            window.location.href = '/login';
        } else {
            alert("Não foi possível verificar o email. Tente novamente mais tarde.");
            window.location.href = '/';
        }
    }
    return (
        <div className="pw-background">
          <div className="pw-container">
            <button className="pw-back-button" onClick={() => window.location.href = '/login'}> Voltar </button>
            <div className="pw-logo">
              <img src={logo} alt="ByteVet" />
            </div>
            
            <h1 className="pw-title">ByteVet</h1>
         
            <h1 className="pw-title">Confirmação de email</h1>
            <p className="pw-frase">Clique no botão abaixo para confirmar seu email:</p>
            <form className="pw-form" onSubmit={handleEmailVerification}>
              <div className="input-wrapper">
                <button type="submit" className="pw-button">Confirmar</button>
              </div>
            </form>
        </div>
        </div>
      );
}

export default EmailVerification;