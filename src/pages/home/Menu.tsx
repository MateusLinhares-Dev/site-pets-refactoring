import React from 'react';
import { Link, useLocation, useNavigate } from 'react-router';
import './Menu.css';

export const Menu = () => {
    const location = useLocation();
    const navigate = useNavigate();

    const handleLogout = () => {
        // Remove a autenticação e desloga o usuário
        localStorage.removeItem('usuarioLogado');
        navigate('/');
    };

    return (
        <nav className="menu_container">
            <div className="menu_logo">
                <h2>🐾 <span>PetLove</span> Admin</h2>
            </div>

            <ul className="menu_links">
                <li>
                    <Link 
                        to="/pets" 
                        className={`menu_link_item ${location.pathname === '/pets' ? 'ativo' : ''}`}
                    >
                        Pets
                    </Link>
                </li>
                <li>
                    <Link 
                        to="/cadastro-pet" 
                        className={`menu_link_item ${location.pathname === '/cadastro-pet' ? 'ativo' : ''}`}
                    >
                        Novo
                    </Link>
                </li>
                <li>
                    <Link 
                        to="/dashboard" 
                        className={`menu_link_item ${location.pathname === '/dashboard' ? 'ativo' : ''}`}
                    >
                        Dashboard
                    </Link>
                </li>
                <li>
                    <button onClick={handleLogout} className="menu_btn_sair">
                        Sair
                    </button>
                </li>
            </ul>
        </nav>
    );
};