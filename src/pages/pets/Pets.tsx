import { useState, useEffect } from 'react';
import './Pets.css';
import { Menu } from '../home/Menu';

interface Solicitacao {
    id?: number;
    nome: string;
    telefone: string;
    moradia: string;
    imovel: string;
    pessoas: number;
    data: string;
}

interface Pet {
    id: number;
    nome: string;
    raca: string;
    idade: string;
    tipo: string;
    sexo: string;
    descricao: string;
    fotoUrl: string;
    solicitacoes: Solicitacao[];
}

export const Pets = () => {
    const [pets, setPets] = useState<Pet[]>([]);
    const [busca, setBusca] = useState('');
    const [filtroEspecie, setFiltroEspecie] = useState('Todos');
    
    const [petExpandidoId, setPetExpandidoId] = useState<number | null>(null);

    useEffect(() => {
        const carregarPets = async () => {
            try {
                const url = "http://localhost:3000/api/admin/pets"; 
                const response = await fetch(url);
                
                if (response.ok) {
                    const data = await response.json();
                    
                    const listaDePets = data.pets || [];
                    const listaDeAdocoes = data.adocoes || [];

                    const petsFormatados = listaDePets.map((pet: any) => ({
                        ...pet,
                        tipo: pet.tipo || pet.especie || '', 
                        sexo: pet.sexo || pet.genero || '',
                        fotoUrl: pet.imagem || pet.foto || pet.fotoUrl || '',
                        solicitacoes: listaDeAdocoes
                            .filter((adocao: any) => adocao.idPet === pet.id)
                            .map((adocao: any) => ({
                                ...adocao,
                                moradia: adocao.tipoMoradia || adocao.moradia
                            }))
                    }));

                    setPets(petsFormatados);
                } else {
                    console.error("Erro ao buscar pets da API");

                    setPets([
                        {
                            id: 1,
                            nome: "Thor",
                            raca: "Labrador",
                            idade: "3 anos",
                            tipo: "Cachorro",
                            sexo: "Macho",
                            descricao: "Thor é um cãozinho muito carinhoso e brincalhão! Adora correr no parque.",
                            fotoUrl: "https://placedog.net/500/500?id=1",
                            solicitacoes: [
                                { id: 101, nome: "Maria Silva", telefone: "(85) 98765-4321", moradia: "Casa", imovel: "Próprio", pessoas: 4, data: "14/04/2026" },
                                { id: 102, nome: "João Santos", telefone: "(85) 99123-4567", moradia: "Casa", imovel: "Próprio", pessoas: 3, data: "15/04/2026" }
                            ]
                        }
                    ]);
                }
            } catch (error) {
                console.error("Erro de conexão", error);
            }
        };

        carregarPets();
    }, []);

    const toggleExpandir = (id: number) => {
        if (petExpandidoId === id) {
            setPetExpandidoId(null);
        } else {
            setPetExpandidoId(id);
        }
    };

    const petsFiltrados = pets.filter((pet) => {
        const matchBusca = pet.nome.toLowerCase().includes(busca.toLowerCase());
        
        const tipoPet = (pet.tipo || "").toLowerCase();
        let matchEspecie = true;
        
        if (filtroEspecie === 'Cachorros') {
            matchEspecie = tipoPet.includes('cachorro') || tipoPet.includes('cão');
        } else if (filtroEspecie === 'Gatos') {
            matchEspecie = tipoPet.includes('gato');
        }

        return matchBusca && matchEspecie;
    });

    return (
        <div className="pets_page_bg">
            <Menu />
            
            <main className="pets_container">
                <div className="pets_header">
                    <h1>Pets Cadastrados</h1>
                    <p>Visualize e gerencie todos os pets e suas solicitações de adoção</p>
                </div>

                <div className="pets_actions">
                    <div className="search_box">
                        <span className="search_icon">🔍</span>
                        <input 
                            type="text" 
                            placeholder="Pesquisar por nome..." 
                            value={busca}
                            onChange={(e) => setBusca(e.target.value)}
                        />
                    </div>
                    
                    <div className="filters">
                        <button className={`btn_filter ${filtroEspecie === 'Todos' ? 'active' : ''}`} onClick={() => setFiltroEspecie('Todos')}>Todos</button>
                        <button className={`btn_filter ${filtroEspecie === 'Cachorros' ? 'active' : ''}`} onClick={() => setFiltroEspecie('Cachorros')}>Cachorros</button>
                        <button className={`btn_filter ${filtroEspecie === 'Gatos' ? 'active' : ''}`} onClick={() => setFiltroEspecie('Gatos')}>Gatos</button>
                    </div>
                </div>

                <div className="pets_list">
                    {petsFiltrados.map((pet) => {
                        const isExpandido = petExpandidoId === pet.id;

                        return (
                            <div className={`pet_card ${isExpandido ? 'expandido' : ''}`} key={pet.id}>
                                
                                <div className="pet_card_header" onClick={() => toggleExpandir(pet.id)}>
                                    <div className="pet_info_principal">
                                        <img src={pet.fotoUrl} alt={pet.nome} className="pet_avatar" />
                                        <div className="pet_textos">
                                            <h3>{pet.nome}</h3>
                                            <p>{pet.raca} • {pet.idade} • {pet.tipo} • {pet.sexo}</p>
                                        </div>
                                    </div>

                                    <div className="pet_acoes_header">
                                        <span className="badge_solicitacoes">
                                            {pet.solicitacoes.length} solicitações
                                        </span>
                                        <button className="btn_toggle">
                                            {isExpandido ? '▲' : '▼'}
                                        </button>
                                    </div>
                                </div>

                                {isExpandido && (
                                    <div className="pet_card_body">
                                        <div className="pet_descricao">
                                            <p>{pet.descricao}</p>
                                        </div>

                                        <div className="solicitacoes_section">
                                            <h4>📝 Solicitações de Adoção</h4>
                                            <table className="table_solicitacoes">
                                                <thead>
                                                    <tr>
                                                        <th>Nome</th>
                                                        <th>Telefone</th>
                                                        <th>Moradia</th>
                                                        <th>Imóvel</th>
                                                        <th>Pessoas</th>
                                                        <th>Data</th>
                                                        <th>Ações</th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    {pet.solicitacoes.map((solic, index) => (
                                                        <tr key={solic.id || index}>
                                                            <td>{solic.nome}</td>
                                                            <td>{solic.telefone}</td>
                                                            <td>{solic.moradia}</td>
                                                            <td>{solic.imovel}</td>
                                                            <td>{solic.pessoas}</td>
                                                            <td>{solic.data}</td>
                                                            <td>
                                                                <button className="btn_whatsapp">Falar no WhatsApp</button>
                                                            </td>
                                                        </tr>
                                                    ))}
                                                </tbody>
                                            </table>
                                        </div>
                                    </div>
                                )}
                            </div>
                        )
                    })}
                </div>
            </main>
        </div>
    );
};