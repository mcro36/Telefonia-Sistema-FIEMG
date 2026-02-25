import React, { useState, useEffect } from 'react';
import { Search, Filter, Download, Plus, Phone, MoreVertical, Loader2, CheckCircle2, XCircle } from 'lucide-react';
import { supabase } from '../lib/supabase.js';

export function ExtensionsView() {
    const [extensions, setExtensions] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        fetchExtensions();
    }, []);

    async function fetchExtensions() {
        setIsLoading(true);
        try {
            const { data, error } = await supabase.from('ramais').select('*');
            if (error) throw error;
            if (data) setExtensions(data);
        } catch (error) {
            console.error('Error fetching extensions:', error);
            setExtensions([
                { id: '1', numero: '2001', unidadeId: '1', tipo: 'SIP', status: 'Ativo' },
                { id: '2', numero: '2002', unidadeId: '1', tipo: 'SIP', status: 'Ativo' },
                { id: '3', numero: '3001', unidadeId: '2', tipo: 'SIP', status: 'Inativo' },
                { id: '4', numero: '4001', unidadeId: '4', tipo: 'Analógico', status: 'Ativo' },
                { id: '5', numero: '5001', unidadeId: '5', tipo: 'Digital', status: 'Ativo' },
            ]);
        } finally {
            setIsLoading(false);
        }
    }

    return (
        <div className="space-y-6 animate-in slide-in-from-bottom-4 duration-500">
            <header className="flex items-center justify-between">
                <div>
                    <h2 className="text-2xl font-bold text-white tracking-tight">Gerenciamento de Ramais</h2>
                    <p className="text-sm text-slate-400 mt-1">Controle de ramais SIP, Analógicos e Digitais por unidade.</p>
                </div>
                <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm font-medium flex items-center gap-2 shadow-lg shadow-blue-600/20 transition-all">
                    <Plus className="w-4 h-4" />
                    Novo Ramal
                </button>
            </header>

            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <div className="md:col-span-2 relative group">
                    <Search className="absolute inset-y-0 left-3 top-1/2 -translate-y-1/2 text-slate-500 group-focus-within:text-blue-500 transition-colors w-4 h-4" />
                    <input
                        className="block w-full pl-10 pr-3 py-2.5 border border-slate-800 rounded-lg bg-[#111621] text-white placeholder:text-slate-500 focus:ring-2 focus:ring-blue-500 sm:text-sm transition-all"
                        placeholder="Buscar ramal..."
                        type="text"
                    />
                </div>
                <select className="px-4 py-2.5 rounded-lg border border-slate-800 bg-[#111621] text-slate-300 focus:ring-2 focus:ring-blue-500 text-sm">
                    <option value="">Todas Unidades</option>
                </select>
                <select className="px-4 py-2.5 rounded-lg border border-slate-800 bg-[#111621] text-slate-300 focus:ring-2 focus:ring-blue-500 text-sm">
                    <option value="">Todos Tipos</option>
                    <option value="SIP">SIP</option>
                    <option value="Analógico">Analógico</option>
                    <option value="Digital">Digital</option>
                </select>
            </div>

            <div className="bg-[#1c1f26] rounded-xl border border-slate-800 shadow-sm overflow-hidden min-h-[400px] flex flex-col">
                {isLoading ? (
                    <div className="flex-1 flex flex-col items-center justify-center text-slate-500 gap-3">
                        <Loader2 className="w-8 h-8 animate-spin text-blue-500" />
                        <p className="text-sm">Carregando ramais...</p>
                    </div>
                ) : (
                    <div className="overflow-x-auto flex-1">
                        <table className="min-w-full divide-y divide-slate-800">
                            <thead className="bg-[#111621]">
                                <tr>
                                    <th className="px-6 py-4 text-left text-xs font-semibold text-slate-400 uppercase tracking-wider">Ramal</th>
                                    <th className="px-6 py-4 text-left text-xs font-semibold text-slate-400 uppercase tracking-wider">Unidade</th>
                                    <th className="px-6 py-4 text-left text-xs font-semibold text-slate-400 uppercase tracking-wider">Tipo</th>
                                    <th className="px-6 py-4 text-left text-xs font-semibold text-slate-400 uppercase tracking-wider">Status</th>
                                    <th className="relative px-6 py-4"></th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-slate-800">
                                {extensions.map((ext) => (
                                    <tr key={ext.id} className="hover:bg-slate-800/50 transition-colors group">
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <div className="flex items-center gap-3">
                                                <div className="w-8 h-8 rounded-lg bg-blue-600/10 flex items-center justify-center text-blue-500">
                                                    <Phone className="w-4 h-4" />
                                                </div>
                                                <span className="text-sm font-bold text-white tracking-wider">{ext.numero}</span>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-400">
                                            Unidade #{ext.unidadeId}
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium 
                        ${ext.tipo === 'SIP' ? 'bg-blue-500/10 text-blue-400' :
                                                    ext.tipo === 'Analógico' ? 'bg-amber-500/10 text-amber-400' :
                                                        'bg-purple-500/10 text-purple-400'}`}>
                                                {ext.tipo}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <div className="flex items-center gap-2">
                                                {ext.status === 'Ativo' ? (
                                                    <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                                                ) : (
                                                    <XCircle className="w-4 h-4 text-slate-500" />
                                                )}
                                                <span className={`text-sm ${ext.status === 'Ativo' ? 'text-emerald-500 font-medium' : 'text-slate-500'}`}>
                                                    {ext.status}
                                                </span>
                                            </div>
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
                <div className="px-6 py-4 border-t border-slate-800 flex items-center justify-between mt-auto bg-[#111621]">
                    <div className="text-sm text-slate-400">
                        Mostrando <span className="font-medium text-white">1</span> a <span className="font-medium text-white">{extensions.length}</span> de <span className="font-medium text-white">{extensions.length}</span> resultados
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
        </div>
    );
}
