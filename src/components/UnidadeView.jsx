import React, { useState, useEffect } from 'react';
import { Search, Filter, Download, Plus, Pencil, Trash2, Loader2 } from 'lucide-react';
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
    const [unitToEdit, setUnitToEdit] = useState(null);

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

    async function handleDeleteUnit(id) {
        if (!window.confirm("Atenção: Tem certeza que deseja excluir esta unidade? Esta ação apagará permanentemente todos os ramais e linhas associadas a ela.")) {
            return;
        }
        try {
            const { error } = await supabase
                .from('unidades')
                .delete()
                .eq('id', id);

            if (error) throw error;
            fetchUnits();
        } catch (error) {
            console.error('Error deleting unit:', error);
            // Fallback for demo mode
            setUnits(units.filter(u => u.id !== id));
        }
    }

    async function handleSaveUnit(unitData) {
        // Validation check for duplicates EXCEPT for 'FIEMG Sede'
        if (unitData.nome !== 'FIEMG Sede') {
            const isDuplicate = units.some((u) =>
                u.id !== unitData.id &&
                u.nome !== 'FIEMG Sede' &&
                ((unitData.uo && u.uo === unitData.uo) ||
                    (unitData.faixaRamais && u.faixaRamais === unitData.faixaRamais))
            );

            if (isDuplicate) {
                alert('Já existe uma unidade cadastrada com esta mesma UO ou Faixa de Ramais!');
                return;
            }
        }

        try {
            if (unitData.id) {
                const { error } = await supabase
                    .from('unidades')
                    .update(unitData)
                    .eq('id', unitData.id);
                if (error) throw error;
            } else {
                const { error } = await supabase
                    .from('unidades')
                    .insert([unitData]);
                if (error) throw error;
            }

            fetchUnits();
            setIsModalOpen(false);
            setUnitToEdit(null);
        } catch (error) {
            console.error('Error saving unit:', error);
            // For demo, just close and add to local state
            if (unitData.id) {
                setUnits(units.map(u => u.id === unitData.id ? unitData : u));
            } else {
                const newUnit = { ...unitData, id: Math.random().toString() };
                setUnits([...units, newUnit]);
            }
            setIsModalOpen(false);
            setUnitToEdit(null);
        }
    }

    function handleOpenNew() {
        setUnitToEdit(null);
        setIsModalOpen(true);
    }

    function handleOpenEdit(unit) {
        setUnitToEdit(unit);
        setIsModalOpen(true);
    }

    return (
        <div className="space-y-6 animate-in slide-in-from-bottom-4 duration-500">
            <div className="flex flex-col sm:flex-row gap-4 justify-between items-center bg-white dark:bg-[#1c1f26] p-4 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm transition-colors">
                <div className="relative w-full sm:w-96 group">
                    <Search className="absolute inset-y-0 left-3 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-blue-500 transition-colors w-4 h-4" />
                    <input
                        className="block w-full pl-10 pr-3 py-2.5 border border-slate-200 dark:border-slate-800 rounded-lg bg-slate-50 dark:bg-[#111621] text-slate-900 dark:text-white placeholder:text-slate-500 focus:ring-2 focus:ring-blue-500 sm:text-sm transition-all"
                        placeholder="Buscar por unidade, cidade ou entidade..."
                        type="text"
                    />
                </div>
                <div className="flex gap-3 w-full sm:w-auto">
                    <button className="flex items-center gap-2 px-4 py-2.5 border border-slate-200 dark:border-slate-800 rounded-lg text-sm font-medium text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors">
                        <Filter className="w-4 h-4" />
                        Filtros
                    </button>
                    <button className="flex items-center gap-2 px-4 py-2.5 border border-slate-200 dark:border-slate-800 rounded-lg text-sm font-medium text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors">
                        <Download className="w-4 h-4" />
                        Exportar
                    </button>
                    <button
                        onClick={handleOpenNew}
                        className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2.5 rounded-lg text-sm font-medium flex items-center gap-2 shadow-sm transition-all shrink-0"
                    >
                        <Plus className="w-4 h-4" />
                        Nova Unidade
                    </button>
                </div>
            </div>

            <div className="bg-white dark:bg-[#1c1f26] rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm min-h-[400px] flex flex-col transition-colors">
                {isLoading ? (
                    <div className="flex-1 flex flex-col items-center justify-center text-slate-500 gap-3">
                        <Loader2 className="w-8 h-8 animate-spin text-blue-500" />
                        <p className="text-sm">Carregando unidades...</p>
                    </div>
                ) : (
                    <div className="overflow-visible flex-1 pb-24 px-1">
                        <table className="min-w-full divide-y divide-slate-200 dark:divide-slate-800">
                            <thead className="bg-slate-50 dark:bg-[#111621]">
                                <tr>
                                    <th className="px-6 py-4 text-center text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider">Entidade</th>
                                    <th className="px-6 py-4 text-center text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider">Cidade</th>
                                    <th className="px-6 py-4 text-center text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider">Nome da Unidade</th>
                                    <th className="px-6 py-4 text-center text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider">Faixa de Ramais</th>
                                    <th className="px-6 py-4 text-center text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider">Ramais Ativos</th>
                                    <th className="px-6 py-4 text-center text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider">Linhas Ativas</th>
                                    <th className="relative px-6 py-4"></th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-slate-200 dark:divide-slate-800">
                                {units.map((unit) => (
                                    <tr key={unit.id} className="hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors group">
                                        <td className="px-6 py-4 whitespace-nowrap text-center">
                                            <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${entityColors[unit.entidade] || 'bg-slate-500/10 text-slate-400'}`}>
                                                {unit.entidade}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-center text-sm text-slate-600 dark:text-slate-400">
                                            {unit.cidade}
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-center">
                                            <div className="text-sm font-medium text-slate-900 dark:text-white">{unit.nome}</div>
                                            <div className="text-xs text-slate-500">{unit.unidadeIntegrada ? 'Unidade Integrada' : ''}</div>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-center text-sm font-mono text-slate-600 dark:text-slate-400">
                                            {unit.faixaRamais}
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-center text-sm text-slate-600 dark:text-slate-400">
                                            {(() => {
                                                let count = 0;
                                                if (unit.faixaRamais) {
                                                    const parts = unit.faixaRamais.split(' - ');
                                                    if (parts.length === 2) {
                                                        const start = parseInt(parts[0], 10);
                                                        const end = parseInt(parts[1], 10);
                                                        if (!isNaN(start) && !isNaN(end) && end >= start) {
                                                            count = (end - start) + 1;
                                                        }
                                                    }
                                                }
                                                return (
                                                    <span>{count}</span>
                                                );
                                            })()}
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-center text-sm text-slate-600 dark:text-slate-400">
                                            {unit.linhasAtivas || 0}
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                            <div className="flex items-center justify-end gap-2">
                                                <button
                                                    onClick={() => handleOpenEdit(unit)}
                                                    className="p-2 text-slate-400 hover:text-blue-600 dark:hover:text-blue-500 hover:bg-blue-50 dark:hover:bg-blue-500/10 rounded-lg transition-colors"
                                                    title="Editar Unidade"
                                                >
                                                    <Pencil className="w-4 h-4" />
                                                </button>
                                                <button
                                                    onClick={() => handleDeleteUnit(unit.id)}
                                                    className="p-2 text-slate-400 hover:text-red-600 dark:hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-500/10 rounded-lg transition-colors"
                                                    title="Excluir Unidade"
                                                >
                                                    <Trash2 className="w-4 h-4" />
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                )}
                <div className="px-6 py-4 border-t border-slate-200 dark:border-slate-800 flex items-center justify-between mt-auto bg-slate-50 dark:bg-transparent">
                    <div className="text-sm text-slate-500 dark:text-slate-400">
                        Mostrando <span className="font-medium text-slate-900 dark:text-white">1</span> a <span className="font-medium text-slate-900 dark:text-white">{units.length}</span> de <span className="font-medium text-slate-900 dark:text-white">{units.length}</span> resultados
                    </div>
                    <div className="flex items-center gap-2">
                        <button className="p-2 rounded-lg border border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 disabled:opacity-50 transition-colors">
                            Anterior
                        </button>
                        <button className="w-8 h-8 flex items-center justify-center rounded-lg bg-blue-600 text-white text-sm font-medium shadow-sm">1</button>
                        <button className="p-2 rounded-lg border border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors">
                            Próximo
                        </button>
                    </div>
                </div>
            </div>

            <UnitModal
                isOpen={isModalOpen}
                onClose={() => {
                    setIsModalOpen(false);
                    setUnitToEdit(null);
                }}
                onSave={handleSaveUnit}
                unitToEdit={unitToEdit}
            />
        </div>
    );
}
