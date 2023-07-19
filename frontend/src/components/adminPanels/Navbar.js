import logo from './images/logo.png';
import './Navbar.css';

function Navbar() {
  return (
    <div className="Navbar">
        <div className="Logo">
            <a href="./adminPanel"><img src={logo} alt="Prospect Now Logo" title="Prospect Now" /></a>
        </div>
        <div className="Header">
            <h1><i class="bi bi-shield-lock-fill"></i> Admin Panel</h1>
        </div>
    </div>
  );
}

export default Navbar;
