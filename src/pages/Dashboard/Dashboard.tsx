import { useState, useEffect } from 'react';
import { 
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  LineChart, Line, Legend
} from 'recharts';
import { Menu } from '../home/Menu';
import './Dashboard.css';

interface Pet {
    id: number;
    nome: string;
    tipo: string;
}

export const Dashboard = () => {
    const [pets, setPets] = useState<Pet[]>([]);
    const [custoRacaoDia, setCustoRacaoDia] = useState<number>(10);
    const [diasAdocaoMaisRapida, setDiasAdocaoMaisRapida] = useState<number>(7);

    useEffect(() => {
        const carregarDados = async () => {
            try {
                const url = "http://localhost:3000/api/admin/pets"; 
                const response = await fetch(url);
                if (response.ok) {
                    const data = await response.json();
                    setPets(data.pets || []);
                } else {
                    setPets([{ id: 1, nome: "Thor", tipo: "Cachorro" }, { id: 2, nome: "Mia", tipo: "Gato" }]);
                }
            } catch (error) {
                console.error(error);
            }
        };
        carregarDados();
    }, []);

    const totalPets = pets.length;
    const custoMensalSemSistema = totalPets * custoRacaoDia * 30;
    const economiaGerada = totalPets * custoRacaoDia * diasAdocaoMaisRapida;
    const custoMensalComSistema = custoMensalSemSistema - economiaGerada;

    const dadosComparativos = [
        { nome: 'Sem o Sistema', valor: custoMensalSemSistema },
        { nome: 'Com o Sistema', valor: custoMensalComSistema }
    ];

    const projecaoAcumulada = Array.from({ length: 6 }, (_, i) => ({
        mes: `${i + 1}º Mês`,
        poupado: economiaGerada * (i + 1)
    }));

    return (
        <div className="dash_page_bg">
            <Menu />
            <main className="dash_container">
                <div className="dash_header">
                    <h1>Calculadora de Eficiência Financeira</h1>
                    <p>Compare os custos de manutenção dos pets com e sem o uso da plataforma</p>
                </div>

                <div className="kpi_grid">
                    <div className="kpi_card">
                        <h3>Gastos Atuais (Mês)</h3>
                        <p className="kpi_value">R$ {custoMensalSemSistema.toFixed(2)}</p>
                    </div>
                    <div className="kpi_card">
                        <h3>Economia Gerada</h3>
                        <p className="kpi_value destaque">R$ {economiaGerada.toFixed(2)}</p>
                    </div>
                    <div className="kpi_card">
                        <h3>Novo Custo Mensal</h3>
                        <p className="kpi_value">R$ {custoMensalComSistema.toFixed(2)}</p>
                    </div>
                </div>

                <div className="simulador_container_novo">
                    <div className="controles_simulacao">
                        <h3>Ajustar Variáveis de Custo</h3>
                        
                        <div className="input_box">
                            <label>Custo diário por Pet (R$)</label>
                            <input type="number" value={custoRacaoDia} onChange={(e) => setCustoRacaoDia(Number(e.target.value))} />
                        </div>

                        <div className="input_box">
                            <label>Dias ganhos com a agilidade do sistema</label>
                            <input type="range" min="1" max="25" value={diasAdocaoMaisRapida} onChange={(e) => setDiasAdocaoMaisRapida(Number(e.target.value))} />
                            <span>Aceleração de {diasAdocaoMaisRapida} dias</span>
                        </div>

                        <div className="total_save_box">
                            <span>Dinheiro que sobra no mês:</span>
                            <strong>R$ {economiaGerada.toFixed(2)}</strong>
                        </div>
                    </div>

                    <div className="graficos_simulacao">
                        <div className="chart_item">
                            <h4>Redução de Gastos Operacionais</h4>
                            <ResponsiveContainer width="100%" height={250}>
                                <BarChart data={dadosComparativos}>
                                    <CartesianGrid strokeDasharray="3 3" vertical={false} />
                                    <XAxis dataKey="nome" />
                                    <YAxis />
                                    <Tooltip formatter={(value) => `R$ ${value}`} />
                                    <Bar dataKey="valor" fill="#5dc0bb" radius={[5, 5, 0, 0]} name="Custo de Manutenção" />
                                </BarChart>
                            </ResponsiveContainer>
                        </div>

                        <div className="chart_item">
                            <h4>Economia Acumulada no Semestre</h4>
                            <ResponsiveContainer width="100%" height={250}>
                                <LineChart data={projecaoAcumulada}>
                                    <CartesianGrid strokeDasharray="3 3" />
                                    <XAxis dataKey="mes" />
                                    <YAxis />
                                    <Tooltip formatter={(value) => `R$ ${value}`} />
                                    <Legend />
                                    <Line type="monotone" dataKey="poupado" stroke="#f26f97" strokeWidth={4} name="Total Economizado (R$)" dot={{ r: 6 }} />
                                </LineChart>
                            </ResponsiveContainer>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
};