import './Header.css'; 
import logo from '../../pages/assets/images/logo.png';
import Avatar from '../../components/AvatarComponent/Avatar';

function Header() {
    return (
      <div className="header">
        <img src={logo} alt="ByteVet Logo" className="header-logo" />
        <h1 className="header-title">ByteVet</h1>
        <Avatar />
      </div>
    );
}

export default Header;