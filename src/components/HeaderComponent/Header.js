import './Header.css'; 
import logo from '../../pages/assets/images/logo.png';
import Avatar from '../../components/AvatarComponent/Avatar';
import { Link } from 'react-router-dom';

function Header() {
    return (
      <div className="header">
        <Link to="/home">
          <img src={logo} alt="ByteVet Logo" className="header-logo" />
        </Link>
        <h1 className="header-title">ByteVet</h1>
        <Avatar />
      </div>
    );
}

export default Header;