import React, { useState } from 'react';
import './login.css'
import { PostLogin } from './services/UserLogin';
import { useNavigate } from 'react-router';

export const Login = () => {
    const [cpf, setCpf] = useState('');
    const [senha, setSenha] = useState('');
    const [mostrarSenha, setMostrarSenha] = useState(false);

    const navegar = useNavigate();
    
    const handleLogin = async (e: React.SubmitEvent) => {
        e.preventDefault();

        const bodyUser = {cpf, senha}
        await PostLogin(bodyUser, navegar)
    };

    return (
        <div className="container_tela_login">
            <div className="form_login">
                
                <div className="login_header">
                    <h2>🐾 <span>PetLove</span> Admin</h2>
                    <p>Painel Administrativo</p>
                </div>

                <form onSubmit={handleLogin}>
                    <div className="input_group">
                        <label htmlFor="cpf">CPF</label>
                        <input
                            type="text"
                            id="cpf"
                            placeholder="000.000.000-00"
                            value={cpf}
                            onChange={(e) => setCpf(e.target.value)}
                            required
                        />
                    </div>

                    <div className="input_group">
                        <label htmlFor="senha">Senha</label>
                        <div className="input_senha_wrapper">
                            <input
                                type={mostrarSenha ? "text" : "password"}
                                id="senha"
                                placeholder="••••••••"
                                value={senha}
                                onChange={(e) => setSenha(e.target.value)}
                                required
                            />
                            <button 
                                type="button" 
                                className="btn_mostrar_senha"
                                onClick={() => setMostrarSenha(!mostrarSenha)}
                                title={mostrarSenha ? "Ocultar senha" : "Mostrar senha"}
                            >
                                {mostrarSenha ? "👁️" : "👁️‍🗨️"}
                            </button>
                        </div>
                    </div>
                    <button type="submit" className="btn_entrar">
                        Entrar
                    </button>
                </form>

                <div className="login_footer">
                    <p>Faça login com suas credenciais de funcionário</p>
                </div>

            </div>
        </div>
    );
};