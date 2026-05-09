import React, { useState } from 'react';
import { useNavigate } from 'react-router';
import Swal from 'sweetalert2';
import './CadastroPet.css';
import { Menu } from '../home/Menu';

export const CadastroPet = () => {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);

    const [formData, setFormData] = useState({
        nome: '',
        tipo: '',
        raca: '',
        idade: '',
        sexo: '',
        porte: '',
        cor: '',
        imagem: '',
        descricao: ''
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);

        try {
            const url = 'http://localhost:3000/api/pets'; 

            const response = await fetch(url, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData)
            });

            if (!response.ok) {
                throw new Error('Falha ao cadastrar pet');
            }

            await Swal.fire({
                icon: 'success',
                title: 'Pet Cadastrado!',
                text: `${formData.nome} foi salvo com sucesso.`,
                confirmButtonColor: '#5dc0bb'
            });

            navigate('/pets');

        } catch (error) {
            console.error(error);
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'Ocorreu um erro ao salvar o pet. Tente novamente!',
                confirmButtonColor: '#f26f97'
            });
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="cadastro_page_bg">
            <Menu />
            
            <main className="cadastro_container">
                <div className="cadastro_header">
                    <h1>Cadastro de Pet</h1>
                    <button className="btn_voltar" onClick={() => navigate('/pets')}>
                        ← Voltar
                    </button>
                </div>

                <div className="cadastro_card">
                    <fieldset className="form_fieldset">
                        <legend>Informações Gerais do Pet</legend>

                        <div className="image_preview_container">
                            <div className="image_preview_circle">
                                {formData.imagem ? (
                                    <img src={formData.imagem} alt="Preview do Pet" onError={(e) => e.currentTarget.style.display = 'none'}/>
                                ) : (
                                    <span>Sem Imagem</span>
                                )}
                            </div>
                        </div>

                        <form onSubmit={handleSubmit} className="form_grid">
                            
                            <div className="input_group">
                                <label>Nome do Pet *</label>
                                <input type="text" name="nome" placeholder="Ex: Thor" value={formData.nome} onChange={handleChange} required />
                            </div>

                            <div className="input_group">
                                <label>Tipo *</label>
                                <select name="tipo" value={formData.tipo} onChange={handleChange} required>
                                    <option value="" disabled>Selecione</option>
                                    <option value="Cachorro">Cachorro</option>
                                    <option value="Gato">Gato</option>
                                </select>
                            </div>

                            <div className="input_group">
                                <label>Raça *</label>
                                <input type="text" name="raca" placeholder="Ex: Labrador" value={formData.raca} onChange={handleChange} required />
                            </div>

                            <div className="input_group">
                                <label>Idade *</label>
                                <input type="text" name="idade" placeholder="Ex: 3 anos" value={formData.idade} onChange={handleChange} required />
                            </div>

                            <div className="input_group">
                                <label>Sexo *</label>
                                <select name="sexo" value={formData.sexo} onChange={handleChange} required>
                                    <option value="" disabled>Selecione</option>
                                    <option value="Macho">Macho</option>
                                    <option value="Fêmea">Fêmea</option>
                                </select>
                            </div>

                            <div className="input_group">
                                <label>Porte *</label>
                                <select name="porte" value={formData.porte} onChange={handleChange} required>
                                    <option value="" disabled>Selecione</option>
                                    <option value="Pequeno">Pequeno</option>
                                    <option value="Médio">Médio</option>
                                    <option value="Grande">Grande</option>
                                </select>
                            </div>

                            <div className="input_group">
                                <label>Cor *</label>
                                <input type="text" name="cor" placeholder="Ex: Dourado, Preto e Branco" value={formData.cor} onChange={handleChange} required />
                            </div>

                            <div className="input_group">
                                <label>URL da Imagem *</label>
                                <input type="url" name="imagem" placeholder="https://exemplo.com/foto.jpg" value={formData.imagem} onChange={handleChange} required />
                            </div>

                            <div className="input_group full_width">
                                <label>Descrição *</label>
                                <textarea name="descricao" rows={4} placeholder="Descreva o pet, sua personalidade e características..." value={formData.descricao} onChange={handleChange} required />
                            </div>

                            <div className="form_actions full_width">
                                <button type="submit" className="btn_salvar" disabled={loading}>
                                    {loading ? 'Salvando...' : 'Salvar Pet'}
                                </button>
                            </div>

                        </form>
                    </fieldset>
                </div>
            </main>
        </div>
    );
};