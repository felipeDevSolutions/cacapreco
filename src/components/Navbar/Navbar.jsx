import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Navbar.css';
import logo from '../../static/logo.png';

function Navbar() {

  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('token'); // Remove o token do localStorage
    navigate('/'); // Redireciona para a página inicial (ou outra página desejada)
  };

  // Verifica se o token existe
  const token = localStorage.getItem('token');


  return (
    <nav className="navbar">
      <div className="navbar-container">
        <Link to="/">
          <img src={logo} alt="Logo" className="navbar-logo" />
        </Link>
        <ul className="nav-menu">
          <li className="nav-item">
            <Link to="/" className="nav-links">Home</Link>
          </li>
          <li className="nav-item">
            <Link to="/sobre-nos" className="nav-links">Sobre Nós</Link>
          </li>
          {token ? ( // Renderiza o botão de logout se o usuário estiver logado
          <li className="nav-item">
            <button onClick={handleLogout} className="nav-links">Logout</button>
          </li>
          ) : ( // Renderiza os botões de cadastro e login se o usuário não estiver logado
            <>
              <li className="nav-item">
                <Link to="/cadastrar" className="nav-links">Cadastrar</Link>
              </li>
              <li className="nav-item">
                <Link to="/login" className="nav-links">Login</Link>
              </li>
            </>
          )}
        </ul>
      </div>
    </nav>
  );
}

export default Navbar;