import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import avatar from '../pages/assets/images/default-avatar.jpg';
import './Profile.css';

function ProfileVet() {
    const [user, setUser] = useState(null);
    const navigate = useNavigate();

    const [fullName, setFullName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    const backHome = () => {
        navigate('/home-vet');
    }

    const logout = () => {
        localStorage.removeItem('tokenVet');
        localStorage.removeItem('vetId');
        navigate('/');
    }

    const handleUpdateUser = async (e) => {
        e.preventDefault();

        if (password !== confirmPassword) {
            alert("As senhas não coincidem.");
            return;
        }

        const tokenVet = localStorage.getItem('tokenVet');
        const vetId = localStorage.getItem('vetId');
        if (!tokenVet) {
            alert('Você precisa estar logado para acessar essa página.');
            navigate('/login-vet');
            return;
        }

        const endpoint = `https://backend-ks2k.onrender.com/vet/${vetId}`;
        try {
            const response = await fetch(endpoint, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${tokenVet}`
                },
                // enviar apenas os dados que nao estiverem vazios
                body: JSON.stringify({
                    fullName: fullName || undefined,
                    email: email || undefined,
                    password: password || undefined,
                    confirmPassword: confirmPassword || undefined,
                }),
            });

            const data = await response.json();

            if (response.ok) {
                alert('Dados atualizados!');
                window.location.reload(true);
            } else {
                alert(`Erro no registro: ${data.message}`);
            }
        } catch (error) {
            alert('Ocorreu um erro ao fazer a requisição de atualização de dados.');
        }
    }


    useEffect(() => {
        const fetchUser = async () => {
            const tokenVet = localStorage.getItem('tokenVet');
            const vetId = localStorage.getItem('vetId');
            if (!tokenVet) {
                alert('Você precisa estar logado para acessar essa página.');
                navigate('/');
                return;
            }

            const endpoint = `https://backend-ks2k.onrender.com/vet/${vetId}`;
            try {
                const response = await fetch(endpoint, {
                    headers: { 'Authorization': `Bearer ${tokenVet}` },
                });
                if (response.ok) {
                    const data = await response.json();
                    setUser(data);
                } else {
                    throw new Error('Falha ao buscar detalhes do usuário');
                }
            } catch (error) {
                console.error('Erro ao buscar detalhes do usuário:', error);
                alert('Erro ao buscar detalhes do usuário');
            }
        };

        fetchUser();
    }, [navigate]);

    return (
        <div className="profile-card">
            <div className="profile-header">
                <div className="buttons-profile-header">
                <button className="back-to-home" onClick={backHome}> Voltar </button>
                <button className="logout" onClick={logout}> Sair </button>
                </div>
                <div className="info-header">
                    <img src={avatar} alt="Avatar" className="profile-avatar" />
                    <p className="fullname">{user?.fullName}</p>
                </div>
            </div>
            <h1 className="title-info">Informações da conta</h1>
            <form className="profile-info" onSubmit={handleUpdateUser}>
                <div className="fullname-info">
                    <p>Nome completo</p>
                    <input type="text" placeholder={user?.fullName} onChange={e => setFullName(e.target.value)} />
                </div>
                <div className="email-info">
                    <p>Email</p>
                    <input type="email" placeholder={user?.email} onChange={e => setEmail(e.target.value)} />
                </div>
                <div className="change-pw">
                    <p>Alterar senha</p>
                    <input type="password" placeholder="Nova senha" onChange={e => setPassword(e.target.value)} />
                    <input type="password" placeholder="Confirme a nova senha" onChange={e => setConfirmPassword(e.target.value)} />
                </div>
                <button type="submit" className="save-changes" >Salvar alterações</button>
            </form>
        </div>
    );
}

export default ProfileVet;