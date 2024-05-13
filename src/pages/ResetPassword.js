import './ForgotPassword.css';
import logo from '../pages/assets/images/logo.png';
import { useState } from 'react';


function ResetPassword() {
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    
    const handleResetPassword = async (e) => {
        e.preventDefault();
        if(password !== confirmPassword){
            alert("As senhas não coincidem");
            return;
        }
        const urlParams = new URLSearchParams(window.location.search);
        const id = urlParams.get('id');
        const token = urlParams.get('token');

        const response = await fetch('https://backend-ks2k.onrender.com/auth/resetPassword', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ id, token, password, confirmPassword }),
        });

        
        
        const data = await response.json();

        if (response.ok) {
            alert("Senha alterada com sucesso!");
            window.location.href = '/login';
        } else {
            console.error('Erro ao alterar senha:', data.message);
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
         
            <h1 className="pw-title">Redefinição de senha</h1>
            <p className="pw-frase">Crie sua nova senha abaixo:</p>
            <form className="pw-form" onSubmit={handleResetPassword}>
              <div className="input-wrapper">
                <input
                  type="senha"
                  placeholder="Digite sua nova senha"
                  className="input-field"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  style={{ color: '#000' }}
                />
              </div>
              <div className="input-wrapper">
                <input
                  type="senha"
                  placeholder="Confirme sua nova senha"
                  className="input-field"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  style={{ color: '#000' }}
                />
                </div>
              <button type="submit" className="pw-button">Enviar</button>
              </form>
          </div>
        </div>
      );
}

export default ResetPassword;