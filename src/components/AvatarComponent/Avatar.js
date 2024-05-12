import { Link } from 'react-router-dom';
import './Avatar.css'; 
import avatar from '../../pages/assets/images/default-avatar.jpg';

function Avatar() {
    return (
        <div className="avatar-link">
            <Link to="/perfil">
            <img src={avatar} alt="Foto de perfil" className="avatar"/>
            </Link>
            Perfil
        </div>
    );
}

export default Avatar;