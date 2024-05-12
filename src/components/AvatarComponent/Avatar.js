import { useNavigate } from 'react-router-dom';
import './Avatar.css'; 
import avatar from '../../pages/assets/images/default-avatar.jpg';

function Avatar() {
    let navigate = useNavigate();
    const profile = () => {
        navigate('/perfil');
    }
    return (
        <div className="avatar-link">
            <a href="/perfil" onClick={profile}>
            <img src={avatar} alt="Foto de perfil" className="avatar"/>
            </a>
        </div>
    );
}

export default Avatar;