import React, { useState, useEffect } from 'react';
import { Search, Filter, Download, Plus, Smartphone, Edit2, Trash2, Loader2 } from 'lucide-react';
import { supabase } from '../lib/supabase.js';

export function LinesView() {
    const [lines, setLines] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        fetchLines();
    }, []);

    async function fetchLines() {
        setIsLoading(true);
        try {
            const { data, error } = await supabase.from('linhas').select('*');
            if (error) throw error;
            if (data) setLines(data);
        } catch (error) {
            console.error('Error fetching lines:', error);
            setLines([
                { id: '1', numero: '(31) 3333-0001', operadora: 'Vivo', unidadeId: '1', status: 'Ativa' },
                { id: '2', numero: '(31) 3333-0002', operadora: 'Claro', unidadeId: '2', status: 'Ativa' },
                { id: '3', numero: '(31) 3333-0003', operadora: 'Vivo', unidadeId: '1', status: 'Inativa' },
                { id: '4', numero: '(31) 3333-0004', operadora: 'Tim', unidadeId: '4', status: 'Ativa' },
                { id: '5', numero: '(31) 3333-0005', operadora: 'Vivo', unidadeId: '5', status: 'Ativa' },
                { id: '6', numero: '(31) 3333-0006', operadora: 'Oi', unidadeId: '3', status: 'Manutenção' },
            ]);
        } finally {
            setIsLoading(false);
        }
    }

    return (
        <div className="space-y-6 animate-in slide-in-from-bottom-4 duration-500">
            <header className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
                <div>
                    <h1 className="text-3xl font-bold text-white mb-2 tracking-tight">Gerenciamento de Linhas</h1>
                    <p className="text-slate-400">Visualize e gerencie todas as linhas telefônicas cadastradas no sistema.</p>
                </div>
                <button className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-2.5 px-5 rounded-lg shadow-lg shadow-blue-600/20 transition-all flex items-center gap-2">
                    <Plus className="w-4 h-4" />
                    Nova Linha
                </button>
            </header>

            <div className="bg-[#1c1f26] rounded-xl border border-slate-800 p-4 shadow-sm">
                <div className="flex flex-col md:flex-row gap-4">
                    <div className="flex-1 relative">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500 w-4 h-4" />
                        <input
                            className="w-full pl-10 pr-4 py-2.5 rounded-lg border border-slate-800 bg-[#111621] text-white placeholder-slate-500 focus:ring-2 focus:ring-blue-500 transition-all"
                            placeholder="Buscar por número, operadora ou unidade..."
                        />
                    </div>
                    <div className="flex gap-2">
                        <select className="px-4 py-2.5 rounded-lg border border-slate-800 bg-[#111621] text-slate-300 focus:ring-2 focus:ring-blue-500 min-w-[140px]">
                            <option value="">Todas Operadoras</option>
                            <option value="vivo">Vivo</option>
                            <option value="claro">Claro</option>
                        </select>
                        <button className="px-4 py-2.5 rounded-lg border border-slate-800 bg-[#111621] text-slate-300 hover:bg-slate-800 transition-colors flex items-center gap-2">
                            <Filter className="w-4 h-4" />
                            <span>Filtros</span>
                        </button>
                    </div>
                </div>
            </div>

            <div className="bg-[#1c1f26] rounded-xl border border-slate-800 shadow-sm overflow-hidden flex flex-col min-h-[400px]">
                {isLoading ? (
                    <div className="flex-1 flex flex-col items-center justify-center text-slate-500 gap-3">
                        <Loader2 className="w-8 h-8 animate-spin text-blue-500" />
                        <p className="text-sm">Carregando linhas...</p>
                    </div>
                ) : (
                    <div className="overflow-x-auto">
                        <table className="w-full text-left border-collapse">
                            <thead>
                                <tr className="bg-[#111621] border-b border-slate-800">
                                    <th className="px-6 py-4 text-xs font-semibold text-slate-400 uppercase tracking-wider">Linha</th>
                                    <th className="px-6 py-4 text-xs font-semibold text-slate-400 uppercase tracking-wider">Operadora</th>
                                    <th className="px-6 py-4 text-xs font-semibold text-slate-400 uppercase tracking-wider">Status</th>
                                    <th className="px-6 py-4 text-xs font-semibold text-slate-400 uppercase tracking-wider text-right">Ações</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-slate-800">
                                {lines.map((line) => (
                                    <tr key={line.id} className="hover:bg-slate-800/30 transition-colors group">
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <div className="flex items-center">
                                                <div className="h-8 w-8 rounded-full bg-blue-600/10 flex items-center justify-center text-blue-500 mr-3">
                                                    <Smartphone className="w-4 h-4" />
                                                </div>
                                                <span className={`font-medium ${line.status === 'Inativa' ? 'text-slate-500 line-through' : 'text-white'}`}>
                                                    {line.numero}
                                                </span>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium 
                        ${line.operadora === 'Vivo' ? 'bg-purple-500/10 text-purple-400' :
                                                    line.operadora === 'Claro' ? 'bg-red-500/10 text-red-400' :
                                                        'bg-blue-500/10 text-blue-400'}`}>
                                                {line.operadora}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <div className="flex items-center gap-2">
                                                <span className={`h-2 w-2 rounded-full 
                          ${line.status === 'Ativa' ? 'bg-emerald-500' :
                                                        line.status === 'Manutenção' ? 'bg-amber-500' :
                                                            'bg-slate-500'}`} />
                                                <span className="text-sm text-slate-300">{line.status}</span>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                            <button className="text-slate-500 hover:text-blue-500 transition-colors p-1">
                                                <Edit2 className="w-4 h-4" />
                                            </button>
                                            <button className="text-slate-500 hover:text-red-500 transition-colors p-1 ml-2">
                                                <Trash2 className="w-4 h-4" />
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                )}
                <div className="bg-[#111621] px-6 py-4 border-t border-slate-800 flex items-center justify-between mt-auto">
                    <p className="text-sm text-slate-500">
                        Mostrando <span className="font-medium text-white">1</span> a <span className="font-medium text-white">{lines.length}</span> de <span className="font-medium text-white">{lines.length}</span> resultados
                    </p>
                    <div className="flex items-center gap-2">
                        <button className="p-2 rounded-lg border border-slate-800 text-slate-500 hover:bg-slate-800 disabled:opacity-50 transition-colors">
                            Anterior
                        </button>
                        <button className="w-9 h-9 flex items-center justify-center rounded-lg bg-blue-600 text-white text-sm font-medium">1</button>
                        <button className="p-2 rounded-lg border border-slate-800 text-slate-500 hover:bg-slate-800 transition-colors">
                            Próximo
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
