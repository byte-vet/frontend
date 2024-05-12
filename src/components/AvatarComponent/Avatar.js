import { Link, useNavigate } from 'react-router-dom';
import './Avatar.css'; 
import avatar from '../../pages/assets/images/default-avatar.jpg';

function Avatar() {
    let navigate = useNavigate();
    const profile = () => {
        navigate('/perfil');
    }
    return (
        <div className="avatar-link">
            <Link to="/perfil">
            <img src={avatar} alt="Foto de perfil" className="avatar"/>
            </Link>
        </div>
    );
}

export default Avatar;