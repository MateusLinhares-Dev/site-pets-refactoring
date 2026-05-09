import { useState, useEffect } from 'react';
import { 
  PieChart, Pie, Cell, 
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer 
} from 'recharts';
import './Dashboard.css';
import { Menu } from '../home/Menu';

interface Pet {
    id: number;
    nome: string;
    tipo: string;
    solicitacoes: any[];
}

export const Dashboard = () => {
    const [pets, setPets] = useState<Pet[]>([]);

    useEffect(() => {
        const carregarDados = async () => {
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
                        solicitacoes: listaDeAdocoes.filter((adocao: any) => adocao.idPet === pet.id)
                    }));

                    setPets(petsFormatados);
                } else {
                    setPets([
                        { id: 1, nome: "Thor", tipo: "Cachorro", solicitacoes: [1, 2] },
                        { id: 2, nome: "Mia", tipo: "Gato", solicitacoes: [1] },
                        { id: 3, nome: "Rex", tipo: "Cachorro", solicitacoes: [1, 2, 3] },
                        { id: 4, nome: "Luna", tipo: "Gato", solicitacoes: [] },
                    ]);
                }
            } catch (error) {
                console.error("Erro ao carregar dados pro Dashboard", error);
            }
        };

        carregarDados();
    }, []);


    const totalPets = pets.length;
    const totalAdocoes = pets.reduce((acc, pet) => acc + pet.solicitacoes.length, 0);
    const mediaAdocoes = totalPets > 0 ? (totalAdocoes / totalPets).toFixed(1) : "0";

    const qtdCachorros = pets.filter(p => p.tipo.toLowerCase().includes('cachorro') || p.tipo.toLowerCase().includes('cão')).length;
    const qtdGatos = pets.filter(p => p.tipo.toLowerCase().includes('gato')).length;
    
    const dadosEspecie = [
        { name: 'Cachorros', value: qtdCachorros },
        { name: 'Gatos', value: qtdGatos }
    ];
    const CORES_ESPECIE = ['#5dc0bb', '#f26f97'];

    const dadosTopPets = [...pets]
        .sort((a, b) => b.solicitacoes.length - a.solicitacoes.length)
        .slice(0, 5)
        .map(pet => ({
            nome: pet.nome,
            Solicitações: pet.solicitacoes.length
        }));

    return (
        <div className="dash_page_bg">
            <Menu />
            
            <main className="dash_container">
                <div className="dash_header">
                    <h1>Visão Geral</h1>
                    <p>Acompanhe os indicadores de adoção da PetLove</p>
                </div>

                <div className="kpi_grid">
                    <div className="kpi_card">
                        <h3>Total de Pets</h3>
                        <p className="kpi_value">{totalPets}</p>
                    </div>
                    <div className="kpi_card">
                        <h3>Solicitações Recebidas</h3>
                        <p className="kpi_value destaque">{totalAdocoes}</p>
                    </div>
                    <div className="kpi_card">
                        <h3>Média por Pet</h3>
                        <p className="kpi_value">{mediaAdocoes}</p>
                    </div>
                </div>

                <div className="charts_grid">
                    
                    <div className="chart_card">
                        <h3>Distribuição por Espécie</h3>
                        <div className="chart_wrapper">
                            <ResponsiveContainer width="100%" height="100%">
                                <PieChart>
                                    <Pie
                                        data={dadosEspecie}
                                        innerRadius={60}
                                        outerRadius={80}
                                        paddingAngle={5}
                                        dataKey="value"
                                    >
                                        {dadosEspecie.map((entry, index) => (
                                            <Cell key={`cell-${index}`} fill={CORES_ESPECIE[index % CORES_ESPECIE.length]} />
                                        ))}
                                    </Pie>
                                    <Tooltip />
                                    <Legend />
                                </PieChart>
                            </ResponsiveContainer>
                        </div>
                    </div>

                    <div className="chart_card">
                        <h3>Top 5 Pets Mais Desejados</h3>
                        <div className="chart_wrapper">
                            <ResponsiveContainer width="100%" height="100%">
                                <BarChart data={dadosTopPets}>
                                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#eee" />
                                    <XAxis dataKey="nome" tick={{ fill: '#666' }} axisLine={false} tickLine={false} />
                                    <YAxis allowDecimals={false} tick={{ fill: '#666' }} axisLine={false} tickLine={false} />
                                    <Tooltip 
                                        cursor={{ fill: 'rgba(93, 192, 187, 0.1)' }}
                                        contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }}
                                    />
                                    <Bar dataKey="Solicitações" fill="#f26f97" radius={[4, 4, 0, 0]} />
                                </BarChart>
                            </ResponsiveContainer>
                        </div>
                    </div>

                </div>
            </main>
        </div>
    );
};