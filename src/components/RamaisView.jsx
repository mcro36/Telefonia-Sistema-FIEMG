import React, { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase.js';
import { RamalModalPABX } from './RamalModalPABX.jsx';
import { RamalModalSIP } from './RamalModalSIP.jsx';

export function ExtensionsView() {
    const [extensions, setExtensions] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [isPABXModalOpen, setIsPABXModalOpen] = useState(false);
    const [isSIPModalOpen, setIsSIPModalOpen] = useState(false);
    const [ramalToEdit, setRamalToEdit] = useState(null);

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
                { id: '1', nome: 'Ana Silva', numero: '2001', unidadeId: '1', setor: 'Financeiro', tipo: 'SIP', status: 'Ativo' },
                { id: '2', nome: 'Carlos Souza', numero: '2002', unidadeId: '1', setor: 'TI', tipo: 'PABX', status: 'Ativo' },
                { id: '3', nome: 'Recepção', numero: '1000', unidadeId: '2', setor: 'Administrativo', tipo: 'SIP', status: 'Ativo' },
                { id: '4', nome: 'Sala de Reunião 1', numero: '1005', unidadeId: '4', setor: 'Operações', tipo: 'PABX', status: 'Inativo' },
                { id: '5', nome: 'João Pereira', numero: '2003', unidadeId: '5', setor: 'Vendas', tipo: 'SIP', status: 'Ativo' },
            ]);
        } finally {
            setIsLoading(false);
        }
    }

    async function handleSaveRamal(ramalData) {
        try {
            if (ramalData.id) {
                const { error } = await supabase
                    .from('ramais')
                    .update(ramalData)
                    .eq('id', ramalData.id);
                if (error) throw error;
            } else {
                const { error } = await supabase
                    .from('ramais')
                    .insert([ramalData]);
                if (error) throw error;
            }

            fetchExtensions();
            setIsPABXModalOpen(false);
            setIsSIPModalOpen(false);
            setRamalToEdit(null);
        } catch (error) {
            console.error('Error saving ramal:', error);
            if (ramalData.id) {
                setExtensions(extensions.map(r => r.id === ramalData.id ? ramalData : r));
            } else {
                const newRamal = { ...ramalData, id: Math.random().toString() };
                setExtensions([...extensions, newRamal]);
            }
            setIsPABXModalOpen(false);
            setIsSIPModalOpen(false);
            setRamalToEdit(null);
        }
    }

    async function handleDeleteRamal(id) {
        if (!window.confirm("Atenção: Tem certeza que deseja excluir este ramal?")) {
            return;
        }
        try {
            const { error } = await supabase
                .from('ramais')
                .delete()
                .eq('id', id);

            if (error) throw error;
            fetchExtensions();
        } catch (error) {
            console.error('Error deleting ramal:', error);
            setExtensions(extensions.filter(r => r.id !== id));
        }
    }

    function handleOpenNewPABX() {
        setRamalToEdit(null);
        setIsPABXModalOpen(true);
    }

    function handleOpenNewSIP() {
        setRamalToEdit(null);
        setIsSIPModalOpen(true);
    }

    function handleOpenEdit(ext) {
        setRamalToEdit(ext);
        if (ext.tipo === 'PABX' || ext.tipo === 'Digital' || ext.tipo === 'Analógico') {
            setIsPABXModalOpen(true);
        } else {
            setIsSIPModalOpen(true);
        }
    }

    // Helper for initials
    function getInitials(name) {
        if (!name) return 'RM';
        const parts = name.split(' ');
        if (parts.length >= 2) return `${parts[0][0]}${parts[1][0]}`.toUpperCase();
        return name.substring(0, 2).toUpperCase();
    }

    return (
        <div className="flex-1 flex flex-col overflow-hidden bg-background-light dark:bg-[#0f1115] animate-in slide-in-from-bottom-4 duration-500 rounded-xl">
            <header className="px-8 py-6 flex flex-col md:flex-row md:items-center justify-between gap-4 bg-surface-light dark:bg-[#111318] border-b border-border-light dark:border-border-dark shrink-0">
                <div>
                    <h1 className="text-2xl md:text-3xl font-black tracking-tight text-text-main-light dark:text-white">Gerenciamento de Ramais</h1>
                    <p className="text-sm text-text-muted-light dark:text-text-muted-dark mt-1">Visualize e gerencie todos os ramais telefônicos cadastrados na base de conhecimento.</p>
                </div>
                <div className="flex flex-col sm:flex-row gap-3">
                    <button
                        onClick={handleOpenNewSIP}
                        className="flex items-center justify-center gap-2 bg-primary hover:bg-primary-dark text-white px-5 py-2.5 rounded-lg shadow-lg shadow-primary/20 transition-all active:scale-95 font-medium text-sm whitespace-nowrap">
                        <span className="material-symbols-outlined text-[20px]">add_circle</span>
                        Novo ramal SIP
                    </button>
                    <button
                        onClick={handleOpenNewPABX}
                        className="flex items-center justify-center gap-2 bg-primary hover:bg-primary-dark text-white px-5 py-2.5 rounded-lg shadow-lg shadow-primary/20 transition-all active:scale-95 font-medium text-sm whitespace-nowrap">
                        <span className="material-symbols-outlined text-[20px]">add_circle</span>
                        Novo ramal PABX
                    </button>
                </div>
            </header>

            <div className="flex-1 overflow-y-auto p-4 md:p-8">
                <div className="max-w-[1200px] mx-auto flex flex-col gap-6">
                    {/* Toolbar */}
                    <div className="flex flex-col sm:flex-row gap-4 justify-between items-center bg-surface-light dark:bg-[#181b21] p-4 rounded-xl border border-border-light dark:border-border-dark shadow-sm">
                        <div className="relative w-full sm:max-w-md">
                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                <span className="material-symbols-outlined text-text-muted-light dark:text-text-muted-dark">search</span>
                            </div>
                            <input
                                className="block w-full pl-10 pr-3 py-2.5 border border-border-light dark:border-border-dark rounded-lg leading-5 bg-background-light dark:bg-[#111318] text-text-main-light dark:text-white placeholder-text-muted-light dark:placeholder-text-muted-dark focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary sm:text-sm transition duration-150 ease-in-out"
                                placeholder="Buscar por nome, número ou setor..."
                                type="text"
                            />
                        </div>
                        <div className="flex gap-2 w-full sm:w-auto">
                            <button className="flex-1 sm:flex-none flex items-center justify-center gap-2 px-4 py-2.5 bg-background-light dark:bg-[#111318] border border-border-light dark:border-border-dark rounded-lg text-text-muted-light dark:text-text-muted-dark hover:text-primary dark:hover:text-primary hover:border-primary dark:hover:border-primary transition-colors text-sm font-medium">
                                <span className="material-symbols-outlined text-[20px]">filter_list</span>
                                Filtros
                            </button>
                            <button className="flex-1 sm:flex-none flex items-center justify-center gap-2 px-4 py-2.5 bg-background-light dark:bg-[#111318] border border-border-light dark:border-border-dark rounded-lg text-text-muted-light dark:text-text-muted-dark hover:text-primary dark:hover:text-primary hover:border-primary dark:hover:border-primary transition-colors text-sm font-medium">
                                <span className="material-symbols-outlined text-[20px]">download</span>
                                Exportar
                            </button>
                        </div>
                    </div>

                    {/* Table */}
                    <div className="bg-surface-light dark:bg-[#181b21] rounded-xl border border-border-light dark:border-border-dark shadow-sm overflow-hidden">
                        {isLoading ? (
                            <div className="flex-1 flex flex-col items-center justify-center py-20 text-slate-500 gap-3">
                                <span className="material-symbols-outlined animate-spin shadow-sm text-3xl text-primary">progress_activity</span>
                                <p className="text-sm">Carregando ramais...</p>
                            </div>
                        ) : (
                            <>
                                <div className="overflow-x-auto">
                                    <table className="min-w-full divide-y divide-border-light dark:divide-border-dark">
                                        <thead className="bg-slate-50 dark:bg-[#1c1f26]">
                                            <tr>
                                                <th className="px-6 py-4 text-left text-xs font-semibold text-text-muted-light dark:text-text-muted-dark uppercase tracking-wider">Nome / Descrição</th>
                                                <th className="px-6 py-4 text-left text-xs font-semibold text-text-muted-light dark:text-text-muted-dark uppercase tracking-wider">Ramal</th>
                                                <th className="px-6 py-4 text-left text-xs font-semibold text-text-muted-light dark:text-text-muted-dark uppercase tracking-wider">Status</th>
                                                <th className="px-6 py-4 text-left text-xs font-semibold text-text-muted-light dark:text-text-muted-dark uppercase tracking-wider">Unidade</th>
                                                <th className="px-6 py-4 text-left text-xs font-semibold text-text-muted-light dark:text-text-muted-dark uppercase tracking-wider">Setor</th>
                                                <th className="px-6 py-4 text-right text-xs font-semibold text-text-muted-light dark:text-text-muted-dark uppercase tracking-wider">Ações</th>
                                            </tr>
                                        </thead>
                                        <tbody className="divide-y divide-border-light dark:divide-border-dark bg-surface-light dark:bg-[#181b21]">
                                            {extensions.map((ext) => (
                                                <tr key={ext.id} className="hover:bg-slate-50 dark:hover:bg-[#1f232b] transition-colors group">
                                                    <td className="px-6 py-4 whitespace-nowrap">
                                                        <div className="flex items-center">
                                                            <div className={`flex-shrink-0 h-10 w-10 rounded-full flex items-center justify-center font-bold text-sm ${ext.tipo === 'SIP' ? 'bg-indigo-100 dark:bg-indigo-900/30 text-indigo-600 dark:text-indigo-400' : 'bg-primary/10 text-primary'
                                                                }`}>
                                                                {ext.nome?.toLowerCase().includes('recepção') ? (
                                                                    <span className="material-symbols-outlined text-[20px]">concierge</span>
                                                                ) : ext.nome?.toLowerCase().includes('sala') ? (
                                                                    <span className="material-symbols-outlined text-[20px]">meeting_room</span>
                                                                ) : (
                                                                    getInitials(ext.nome)
                                                                )}
                                                            </div>
                                                            <div className="ml-4">
                                                                <div className="text-sm font-medium text-text-main-light dark:text-white">{ext.nome || 'Ramal Padrão'}</div>
                                                                <div className="text-xs text-text-muted-light dark:text-text-muted-dark">{ext.tipo || 'SIP'}</div>
                                                            </div>
                                                        </div>
                                                    </td>
                                                    <td className="px-6 py-4 whitespace-nowrap">
                                                        <div className="text-sm text-text-main-light dark:text-text-main-dark font-mono bg-slate-100 dark:bg-[#2a2f38] px-2 py-1 rounded inline-block">{ext.numero}</div>
                                                    </td>
                                                    <td className="px-6 py-4 whitespace-nowrap">
                                                        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${ext.status === 'Ativo' ? 'bg-emerald-100 text-emerald-800 dark:bg-emerald-900/30 dark:text-emerald-400' : 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400'}`}>
                                                            <span className={`w-1.5 h-1.5 rounded-full mr-1.5 ${ext.status === 'Ativo' ? 'bg-emerald-500' : 'bg-red-500'}`}></span>
                                                            {ext.status}
                                                        </span>
                                                    </td>
                                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-text-muted-light dark:text-text-muted-dark">
                                                        {ext.unidadeId === '1' ? 'Matriz' : `Filial #${ext.unidadeId}`}
                                                    </td>
                                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-text-muted-light dark:text-text-muted-dark">
                                                        {ext.setor || 'Geral'}
                                                    </td>
                                                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                                        <div className="flex items-center justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                                            <button
                                                                onClick={() => handleOpenEdit(ext)}
                                                                className="text-text-muted-light dark:text-text-muted-dark hover:text-primary dark:hover:text-primary p-1 rounded-md hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors">
                                                                <span className="material-symbols-outlined text-[20px]">edit</span>
                                                            </button>
                                                            <button
                                                                onClick={() => handleDeleteRamal(ext.id)}
                                                                className="text-text-muted-light dark:text-text-muted-dark hover:text-red-500 dark:hover:text-red-400 p-1 rounded-md hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors">
                                                                <span className="material-symbols-outlined text-[20px]">delete</span>
                                                            </button>
                                                        </div>
                                                    </td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                                <div className="bg-surface-light dark:bg-[#181b21] px-6 py-4 border-t border-border-light dark:border-border-dark flex items-center justify-between">
                                    <div className="hidden sm:flex-1 sm:flex sm:items-center sm:justify-between">
                                        <div>
                                            <p className="text-sm text-text-muted-light dark:text-text-muted-dark">
                                                Mostrando <span className="font-medium text-text-main-light dark:text-white">1</span> a <span className="font-medium text-text-main-light dark:text-white">{extensions.length}</span> de <span className="font-medium text-text-main-light dark:text-white">{extensions.length}</span> resultados
                                            </p>
                                        </div>
                                        <div>
                                            <nav aria-label="Pagination" className="relative z-0 inline-flex rounded-md shadow-sm -space-x-px">
                                                <button disabled className="relative inline-flex items-center px-2 py-2 rounded-l-md border border-border-light dark:border-border-dark bg-background-light dark:bg-[#111318] text-sm font-medium text-text-muted-light dark:text-text-muted-dark hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors">
                                                    <span className="sr-only">Anterior</span>
                                                    <span className="material-symbols-outlined text-[20px]">chevron_left</span>
                                                </button>
                                                <button aria-current="page" className="z-10 bg-primary/10 border-primary text-primary relative inline-flex items-center px-4 py-2 border text-sm font-medium"> 1 </button>
                                                <button disabled className="relative inline-flex items-center px-2 py-2 rounded-r-md border border-border-light dark:border-border-dark bg-background-light dark:bg-[#111318] text-sm font-medium text-text-muted-light dark:text-text-muted-dark hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors">
                                                    <span className="sr-only">Próximo</span>
                                                    <span className="material-symbols-outlined text-[20px]">chevron_right</span>
                                                </button>
                                            </nav>
                                        </div>
                                    </div>
                                </div>
                            </>
                        )}
                    </div>
                </div>
            </div>

            <RamalModalPABX
                isOpen={isPABXModalOpen}
                onClose={() => {
                    setIsPABXModalOpen(false);
                    setRamalToEdit(null);
                }}
                onSave={handleSaveRamal}
                ramalToEdit={ramalToEdit}
            />

            <RamalModalSIP
                isOpen={isSIPModalOpen}
                onClose={() => {
                    setIsSIPModalOpen(false);
                    setRamalToEdit(null);
                }}
                onSave={handleSaveRamal}
                ramalToEdit={ramalToEdit}
            />
        </div>
    );
}
