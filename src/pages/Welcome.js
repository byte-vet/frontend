import { Link } from 'react-router-dom';
import catFamily from '../pages/assets/images/cat family-pana.svg';
import veterinaryDog from '../pages/assets/images/Veterinary-pana.svg';
import './Welcome.css';

function Welcome() {
  return (
    <div className="welcome">
      <img src={veterinaryDog} alt="veterinary dog"  className="welcome-photo-dog"/>
      <div className="welcome-card">
      <h1 className="welcome-title">Conheça a ByteVet!</h1>
      <p className="welcome-frase">Seu pet merece o melhor! Acompanhe a saúde, encontre serviços e conecte-se com veterinários.</p>
      <Link to="/login">
      <button class="button-explore">Explore </button>
      </Link>
      </div>
    </div>
  )
}

export default Welcome;