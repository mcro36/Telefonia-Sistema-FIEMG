import React, { useState, useEffect } from 'react';
import { Search, Filter, Download, Plus, MoreVertical, Loader2 } from 'lucide-react';
import { UnitModal } from './UnitModal.jsx';
import { supabase } from '../lib/supabase.js';

const entityColors = {
    SESI: 'bg-blue-500/10 text-blue-400',
    SENAI: 'bg-red-500/10 text-red-400',
    FIESP: 'bg-purple-500/10 text-purple-400',
    CIEMG: 'bg-emerald-500/10 text-emerald-400',
    IEL: 'bg-amber-500/10 text-amber-400',
};

export function UnidadeView() {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [units, setUnits] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        fetchUnits();
    }, []);

    async function fetchUnits() {
        setIsLoading(true);
        try {
            const { data, error } = await supabase
                .from('unidades')
                .select('*')
                .order('nome');

            if (error) throw error;
            if (data) setUnits(data);
        } catch (error) {
            console.error('Error fetching units:', error);
            // Fallback to mock data for demo if Supabase is not configured
            setUnits([
                { id: '1', nome: 'Vila Leopoldina', entidade: 'SESI', cidade: 'São Paulo', endereco: 'Rua X', faixaRamais: '2000 - 2500', ramaisAtivos: 450, linhasAtivas: 12, unidadeIntegrada: false },
                { id: '2', nome: 'Maracanã', entidade: 'SENAI', cidade: 'Rio de Janeiro', endereco: 'Av Y', faixaRamais: '3000 - 3500', ramaisAtivos: 320, linhasAtivas: 8, unidadeIntegrada: false },
                { id: '3', nome: 'Paulista', entidade: 'FIESP', cidade: 'São Paulo', endereco: 'Av Paulista', faixaRamais: '1000 - 1999', ramaisAtivos: 850, linhasAtivas: 24, unidadeIntegrada: false },
                { id: '4', nome: 'Amoreiras', entidade: 'SESI', cidade: 'Campinas', endereco: 'Rua Z', faixaRamais: '4000 - 4200', ramaisAtivos: 180, linhasAtivas: 5, unidadeIntegrada: false },
                { id: '5', nome: 'Horto', entidade: 'SENAI', cidade: 'Belo Horizonte', endereco: 'Rua H', faixaRamais: '5000 - 5500', ramaisAtivos: 400, linhasAtivas: 10, unidadeIntegrada: false },
            ]);
        } finally {
            setIsLoading(false);
        }
    }

    async function handleSaveUnit(unitData) {
        try {
            const { error } = await supabase
                .from('unidades')
                .insert([unitData]);

            if (error) throw error;
            fetchUnits();
            setIsModalOpen(false);
        } catch (error) {
            console.error('Error saving unit:', error);
            // For demo, just close and add to local state
            const newUnit = { ...unitData, id: Math.random().toString() };
            setUnits([...units, newUnit]);
            setIsModalOpen(false);
        }
    }

    return (
        <div className="space-y-6 animate-in slide-in-from-bottom-4 duration-500">
            <header className="flex items-center justify-between">
                <h2 className="text-2xl font-bold text-white tracking-tight">Gerenciamento de Unidades</h2>
                <button
                    onClick={() => setIsModalOpen(true)}
                    className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm font-medium flex items-center gap-2 shadow-lg shadow-blue-600/20 transition-all"
                >
                    <Plus className="w-4 h-4" />
                    Nova Unidade
                </button>
            </header>

            <div className="flex flex-col sm:flex-row gap-4 justify-between items-center bg-[#1c1f26] p-4 rounded-xl border border-slate-800">
                <div className="relative w-full sm:w-96 group">
                    <Search className="absolute inset-y-0 left-3 top-1/2 -translate-y-1/2 text-slate-500 group-focus-within:text-blue-500 transition-colors w-4 h-4" />
                    <input
                        className="block w-full pl-10 pr-3 py-2.5 border border-slate-800 rounded-lg bg-[#111621] text-white placeholder:text-slate-500 focus:ring-2 focus:ring-blue-500 sm:text-sm transition-all"
                        placeholder="Buscar por unidade, cidade ou entidade..."
                        type="text"
                    />
                </div>
                <div className="flex gap-3 w-full sm:w-auto">
                    <button className="flex items-center gap-2 px-4 py-2.5 border border-slate-800 rounded-lg text-sm font-medium text-slate-300 hover:bg-slate-800 transition-colors">
                        <Filter className="w-4 h-4" />
                        Filtros
                    </button>
                    <button className="flex items-center gap-2 px-4 py-2.5 border border-slate-800 rounded-lg text-sm font-medium text-slate-300 hover:bg-slate-800 transition-colors">
                        <Download className="w-4 h-4" />
                        Exportar
                    </button>
                </div>
            </div>

            <div className="bg-[#1c1f26] rounded-xl border border-slate-800 shadow-sm overflow-hidden min-h-[400px] flex flex-col">
                {isLoading ? (
                    <div className="flex-1 flex flex-col items-center justify-center text-slate-500 gap-3">
                        <Loader2 className="w-8 h-8 animate-spin text-blue-500" />
                        <p className="text-sm">Carregando unidades...</p>
                    </div>
                ) : (
                    <div className="overflow-x-auto flex-1">
                        <table className="min-w-full divide-y divide-slate-800">
                            <thead className="bg-[#111621]">
                                <tr>
                                    <th className="px-6 py-4 text-left text-xs font-semibold text-slate-400 uppercase tracking-wider">Entidade</th>
                                    <th className="px-6 py-4 text-left text-xs font-semibold text-slate-400 uppercase tracking-wider">Cidade</th>
                                    <th className="px-6 py-4 text-left text-xs font-semibold text-slate-400 uppercase tracking-wider">Nome da Unidade</th>
                                    <th className="px-6 py-4 text-left text-xs font-semibold text-slate-400 uppercase tracking-wider">Faixa de Ramais</th>
                                    <th className="px-6 py-4 text-left text-xs font-semibold text-slate-400 uppercase tracking-wider">Ramais Ativos</th>
                                    <th className="px-6 py-4 text-left text-xs font-semibold text-slate-400 uppercase tracking-wider">Linhas Ativas</th>
                                    <th className="relative px-6 py-4"></th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-slate-800">
                                {units.map((unit) => (
                                    <tr key={unit.id} className="hover:bg-slate-800/50 transition-colors group">
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${entityColors[unit.entidade] || 'bg-slate-500/10 text-slate-400'}`}>
                                                {unit.entidade}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-400">
                                            {unit.cidade}
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <div className="text-sm font-medium text-white">{unit.nome}</div>
                                            <div className="text-xs text-slate-500">{unit.unidadeIntegrada ? 'Unidade Integrada' : ''}</div>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm font-mono text-slate-400">
                                            {unit.faixaRamais}
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-400">
                                            <div className="flex items-center gap-2">
                                                <div className="w-16 h-1.5 bg-slate-800 rounded-full overflow-hidden">
                                                    <div
                                                        className="h-full bg-emerald-500"
                                                        style={{ width: `${Math.min(((unit.ramaisAtivos || 0) / 1000) * 100, 100)}%` }}
                                                    />
                                                </div>
                                                <span>{unit.ramaisAtivos || 0}</span>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-400">
                                            {unit.linhasAtivas || 0}
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                            <button className="text-slate-500 hover:text-blue-500 transition-colors p-2 rounded-full hover:bg-slate-800">
                                                <MoreVertical className="w-4 h-4" />
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                )}
                <div className="px-6 py-4 border-t border-slate-800 flex items-center justify-between mt-auto">
                    <div className="text-sm text-slate-400">
                        Mostrando <span className="font-medium text-white">1</span> a <span className="font-medium text-white">{units.length}</span> de <span className="font-medium text-white">{units.length}</span> resultados
                    </div>
                    <div className="flex items-center gap-2">
                        <button className="p-2 rounded-lg border border-slate-800 text-slate-500 hover:bg-slate-800 disabled:opacity-50 transition-colors">
                            Anterior
                        </button>
                        <button className="w-8 h-8 flex items-center justify-center rounded-lg bg-blue-600 text-white text-sm font-medium">1</button>
                        <button className="p-2 rounded-lg border border-slate-800 text-slate-500 hover:bg-slate-800 transition-colors">
                            Próximo
                        </button>
                    </div>
                </div>
            </div>

            <UnitModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                onSave={handleSaveUnit}
            />
        </div>
    );
}
