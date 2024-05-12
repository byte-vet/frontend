import './Header.css'; 
import logo from '../../pages/assets/images/logo.png';
import Avatar from '../../components/AvatarComponent/Avatar';
import { Link } from 'react-router-dom';
function Header(props) {
    return (
      <div className="header">
        <Link to={props.propsLinkHome}>
          <img src={logo} alt="ByteVet Logo" className="header-logo" />
        </Link>
        <h1 className="header-title">ByteVet</h1>
          <Avatar link={props.propsLinkProfile} />
      </div>
    );
}

export default Header;