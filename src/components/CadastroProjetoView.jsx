import React, { useState, useEffect, useRef } from 'react';
import { ChevronDown, Ticket, Package, MessageSquarePlus, CheckCircle, Search, Loader2 } from 'lucide-react';
import { useSupabaseTable } from '../hooks/useSupabaseTable.js';
import { supabase } from '../lib/supabase.js';

export function CadastroProjetoView({ onCancel }) {
    const { data: units, isLoading: isUnitsLoading } = useSupabaseTable({
        tableName: 'unidades',
        selectQuery: 'id, nome',
        order: { column: 'nome', ascending: true }
    });

    const [selectedUnit, setSelectedUnit] = useState(null);
    const [searchTerm, setSearchTerm] = useState('');
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);

    const [unitItems, setUnitItems] = useState({ ramais: [], linhas: [], uras: [] });
    const [isLoadingItems, setIsLoadingItems] = useState(false);

    const [selectedItemIds, setSelectedItemIds] = useState(new Set());
    const dropdownRef = useRef(null);

    useEffect(() => {
        function handleClickOutside(event) {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setIsDropdownOpen(false);
            }
        }
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    useEffect(() => {
        if (!selectedUnit) {
            setUnitItems({ ramais: [], linhas: [], uras: [] });
            return;
        }

        async function fetchUnitItems() {
            setIsLoadingItems(true);
            try {
                const [ramaisRes, linhasRes, urasRes] = await Promise.all([
                    supabase.from('ramais').select('id, numero, setor, tipo_ramal').eq('unidade_id', selectedUnit.id),
                    supabase.from('linhas').select('id, numero, operadora').eq('unidade_id', selectedUnit.id),
                    supabase.from('uras').select('id, nome, descricao').eq('unidade_id', selectedUnit.id)
                ]);

                setUnitItems({
                    ramais: ramaisRes.data || [],
                    linhas: linhasRes.data || [],
                    uras: urasRes.data || []
                });

                const allIds = new Set([
                    ...(ramaisRes.data || []).map(r => `ramal_${r.id}`),
                    ...(linhasRes.data || []).map(l => `linha_${l.id}`),
                    ...(urasRes.data || []).map(u => `ura_${u.id}`)
                ]);
                setSelectedItemIds(allIds);

            } catch (error) {
                console.error("Erro ao buscar itens da unidade:", error);
            } finally {
                setIsLoadingItems(false);
            }
        }

        fetchUnitItems();
    }, [selectedUnit]);

    const handleToggleItem = (itemId) => {
        const newSelected = new Set(selectedItemIds);
        if (newSelected.has(itemId)) {
            newSelected.delete(itemId);
        } else {
            newSelected.add(itemId);
        }
        setSelectedItemIds(newSelected);
    };

    const handleSelectAll = (e) => {
        if (e.target.checked) {
            const allIds = new Set([
                ...unitItems.ramais.map(r => `ramal_${r.id}`),
                ...unitItems.linhas.map(l => `linha_${l.id}`),
                ...unitItems.uras.map(u => `ura_${u.id}`)
            ]);
            setSelectedItemIds(allIds);
        } else {
            setSelectedItemIds(new Set());
        }
    };

    const totalItems = unitItems.ramais.length + unitItems.linhas.length + unitItems.uras.length;
    const isAllSelected = totalItems > 0 && selectedItemIds.size === totalItems;

    return (
        <div className="flex flex-col h-full animate-in slide-in-from-right duration-300 overflow-hidden">
            <div className="flex-1 overflow-y-auto p-4 md:p-8 custom-scrollbar">
                <div className="max-w-5xl mx-auto space-y-8 pb-12">

                    {/* Formulário Principal */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-4">
                        <div className="space-y-6">
                            <div className="space-y-2">
                                <label className="text-sm font-semibold text-slate-700 dark:text-slate-300">Nome do Projeto</label>
                                <input
                                    className="w-full bg-white dark:bg-[#111621] border border-slate-200 dark:border-slate-800 rounded-lg h-12 px-4 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-slate-500 transition-all outline-none"
                                    placeholder="Ex: Upgrade de Infraestrutura 2024"
                                    type="text"
                                />
                            </div>

                            <div className="space-y-2">
                                <label className="text-sm font-semibold text-slate-700 dark:text-slate-300">Unidade Alvo</label>
                                <div className="relative" ref={dropdownRef}>
                                    <div
                                        onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                                        className="w-full bg-white dark:bg-[#111621] border border-slate-200 dark:border-slate-800 rounded-lg h-12 px-4 flex items-center justify-between cursor-pointer focus-within:ring-2 focus-within:ring-blue-500 focus-within:border-blue-500 transition-all"
                                    >
                                        <span className={selectedUnit ? "text-slate-900 dark:text-white" : "text-slate-400 dark:text-slate-500"}>
                                            {selectedUnit ? selectedUnit.nome : 'Selecione a unidade'}
                                        </span>
                                        <ChevronDown className={`w-5 h-5 text-slate-400 transition-transform ${isDropdownOpen ? 'rotate-180' : ''}`} />
                                    </div>

                                    {isDropdownOpen && (
                                        <div className="absolute z-20 w-full mt-2 bg-white dark:bg-[#111621] border border-slate-200 dark:border-slate-800 rounded-lg shadow-xl overflow-hidden animate-in fade-in slide-in-from-top-2">
                                            <div className="p-2 border-b border-slate-200 dark:border-slate-800 flex items-center gap-2">
                                                <Search className="w-4 h-4 text-slate-400 ml-2 shrink-0" />
                                                <input
                                                    type="text"
                                                    className="w-full bg-transparent border-none focus:ring-0 text-sm dark:text-white outline-none"
                                                    placeholder="Buscar unidade..."
                                                    value={searchTerm}
                                                    onChange={e => setSearchTerm(e.target.value)}
                                                />
                                            </div>
                                            <ul className="max-h-60 overflow-y-auto custom-scrollbar p-1">
                                                {isUnitsLoading ? (
                                                    <li className="p-4 text-center text-slate-500 text-sm">Carregando...</li>
                                                ) : units.filter(u => u.nome.toLowerCase().includes(searchTerm.toLowerCase())).length === 0 ? (
                                                    <li className="p-4 text-center text-slate-500 text-sm">Nenhuma unidade encontrada.</li>
                                                ) : (
                                                    units.filter(u => u.nome.toLowerCase().includes(searchTerm.toLowerCase())).map(u => (
                                                        <li
                                                            key={u.id}
                                                            onClick={() => { setSelectedUnit(u); setIsDropdownOpen(false); setSearchTerm(''); }}
                                                            className={`p-3 text-sm rounded-md cursor-pointer transition-colors ${selectedUnit?.id === u.id ? 'bg-blue-50 dark:bg-blue-500/10 text-blue-600 dark:text-blue-400 font-medium' : 'text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800/50'}`}
                                                        >
                                                            {u.nome}
                                                        </li>
                                                    ))
                                                )}
                                            </ul>
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 h-fit">
                            <div className="space-y-2">
                                <label className="text-sm font-semibold text-slate-700 dark:text-slate-300">Data de Início</label>
                                <input
                                    className="w-full bg-white dark:bg-[#111621] border border-slate-200 dark:border-slate-800 rounded-lg h-12 px-4 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-slate-900 dark:text-white outline-none transition-all"
                                    type="date"
                                    style={{ colorScheme: 'dark' }} // Para forçar calendário com estilo dark se suportado pelo browser
                                />
                            </div>
                            <div className="space-y-2">
                                <label className="text-sm font-semibold text-slate-700 dark:text-slate-300">Deadline</label>
                                <input
                                    className="w-full bg-white dark:bg-[#111621] border border-slate-200 dark:border-slate-800 rounded-lg h-12 px-4 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-slate-900 dark:text-white outline-none transition-all"
                                    type="date"
                                    style={{ colorScheme: 'dark' }}
                                />
                            </div>
                            <div className="space-y-2 sm:col-span-2">
                                <label className="text-sm font-semibold text-slate-700 dark:text-slate-300">Chamado</label>
                                <div className="relative">
                                    <input
                                        className="w-full bg-white dark:bg-[#111621] border border-slate-200 dark:border-slate-800 rounded-lg h-12 pl-4 pr-10 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-slate-500 outline-none transition-all"
                                        placeholder="ID do chamado no Service Desk"
                                        type="text"
                                    />
                                    <Ticket className="absolute right-3 top-3.5 w-5 h-5 text-slate-400 pointer-events-none" />
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Inventário e Itens */}
                    {selectedUnit && (
                        <div className="bg-white dark:bg-[#1c222d] border border-slate-200 dark:border-slate-800 rounded-xl overflow-hidden shadow-sm animate-in fade-in slide-in-from-bottom-4">
                            <div className="px-6 py-4 border-b border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-800/20 flex items-center justify-between">
                                <h3 className="text-sm md:text-lg font-bold text-slate-900 dark:text-white flex items-center gap-2">
                                    <Package className="w-5 h-5 text-blue-600 dark:text-blue-500" />
                                    Itens da Unidade
                                </h3>
                                <div className="flex items-center gap-4">
                                    <div className="flex items-center gap-2 text-xs text-slate-500 dark:text-slate-400">
                                        <input
                                            className="rounded border-slate-300 dark:border-slate-700 bg-white dark:bg-[#111621] cursor-pointer text-blue-600 focus:ring-blue-500"
                                            id="selectAll"
                                            type="checkbox"
                                            checked={isAllSelected}
                                            onChange={handleSelectAll}
                                        />
                                        <label className="cursor-pointer font-medium hover:text-slate-700 dark:hover:text-slate-300" htmlFor="selectAll">Selecionar Todos</label>
                                    </div>
                                </div>
                            </div>

                            <div className="divide-y divide-slate-200 dark:divide-slate-800 max-h-[450px] overflow-y-auto custom-scrollbar relative">
                                {isLoadingItems ? (
                                    <div className="py-12 flex flex-col items-center justify-center gap-4">
                                        <Loader2 className="w-8 h-8 text-blue-500 animate-spin" />
                                        <p className="text-sm text-slate-500 dark:text-slate-400">Buscando itens na base...</p>
                                    </div>
                                ) : (
                                    <>
                                        {totalItems === 0 && (
                                            <div className="py-12 text-center">
                                                <p className="text-slate-500 dark:text-slate-400 text-sm">Nenhum ativo vinculado a esta unidade.</p>
                                            </div>
                                        )}

                                        {/* Ramais */}
                                        {unitItems.ramais.map(ramal => (
                                            <div key={`ramal_${ramal.id}`} className="p-4 flex flex-col md:flex-row md:items-center justify-between gap-4 hover:bg-slate-50 dark:hover:bg-slate-800/30 transition-colors">
                                                <div className="flex items-start md:items-center gap-4">
                                                    <input
                                                        className="mt-1 md:mt-0 w-5 h-5 rounded border-slate-300 dark:border-slate-600 text-blue-600 focus:ring-blue-500 bg-white dark:bg-slate-700 cursor-pointer"
                                                        type="checkbox"
                                                        checked={selectedItemIds.has(`ramal_${ramal.id}`)}
                                                        onChange={() => handleToggleItem(`ramal_${ramal.id}`)}
                                                    />
                                                    <div className="flex flex-col">
                                                        <div className="flex items-center gap-2">
                                                            <span className="text-sm font-bold text-slate-900 dark:text-slate-100">Ramal {ramal.numero}</span>
                                                            <span className="text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded bg-blue-100 text-blue-700 dark:bg-blue-900/40 dark:text-blue-400 border border-blue-200 dark:border-blue-800/50">RAMAL</span>
                                                        </div>
                                                        <span className="text-xs text-slate-500 dark:text-slate-400">{ramal.setor || 'Sem setor associado'}</span>
                                                    </div>
                                                </div>
                                                <div className="flex items-center gap-3 pl-9 md:pl-0">
                                                    <div className="relative w-40">
                                                        <select className="w-full bg-white dark:bg-[#111621] border border-slate-200 dark:border-slate-700 rounded-lg h-10 pl-3 pr-10 py-1 text-xs focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-slate-700 dark:text-slate-200 appearance-none cursor-pointer outline-none">
                                                            <option value="agendado">Agendado</option>
                                                            <option value="validado">Validado</option>
                                                            <option value="andamento">Em andamento</option>
                                                            <option value="concluido">Concluído</option>
                                                            <option value="problema">Problema</option>
                                                        </select>
                                                        <ChevronDown className="absolute right-2 top-2.5 w-4 h-4 text-slate-400 pointer-events-none" />
                                                    </div>
                                                    <button className="size-10 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 flex items-center justify-center text-slate-400 hover:text-blue-600 hover:border-blue-600 transition-all focus:outline-none" title="Adicionar observação">
                                                        <MessageSquarePlus className="w-5 h-5" />
                                                    </button>
                                                </div>
                                            </div>
                                        ))}

                                        {/* Linhas */}
                                        {unitItems.linhas.map(linha => (
                                            <div key={`linha_${linha.id}`} className="p-4 flex flex-col md:flex-row md:items-center justify-between gap-4 hover:bg-slate-50 dark:hover:bg-slate-800/30 transition-colors">
                                                <div className="flex items-start md:items-center gap-4">
                                                    <input
                                                        className="mt-1 md:mt-0 w-5 h-5 rounded border-slate-300 dark:border-slate-600 text-blue-600 focus:ring-blue-500 bg-white dark:bg-slate-700 cursor-pointer"
                                                        type="checkbox"
                                                        checked={selectedItemIds.has(`linha_${linha.id}`)}
                                                        onChange={() => handleToggleItem(`linha_${linha.id}`)}
                                                    />
                                                    <div className="flex flex-col">
                                                        <div className="flex items-center gap-2">
                                                            <span className="text-sm font-bold text-slate-900 dark:text-slate-100">{linha.numero}</span>
                                                            <span className="text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded bg-purple-100 text-purple-700 dark:bg-purple-900/40 dark:text-purple-400 border border-purple-200 dark:border-purple-800/50">LINHA</span>
                                                        </div>
                                                        <span className="text-xs text-slate-500 dark:text-slate-400">{linha.operadora || 'Operadora Padrão'}</span>
                                                    </div>
                                                </div>
                                                <div className="flex items-center gap-3 pl-9 md:pl-0">
                                                    <div className="relative w-40">
                                                        <select className="w-full bg-white dark:bg-[#111621] border border-slate-200 dark:border-slate-700 rounded-lg h-10 pl-3 pr-10 py-1 text-xs focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-slate-700 dark:text-slate-200 appearance-none cursor-pointer outline-none">
                                                            <option value="agendado">Agendado</option>
                                                            <option value="validado">Validado</option>
                                                            <option value="andamento">Em andamento</option>
                                                            <option value="concluido">Concluído</option>
                                                            <option value="problema">Problema</option>
                                                        </select>
                                                        <ChevronDown className="absolute right-2 top-2.5 w-4 h-4 text-slate-400 pointer-events-none" />
                                                    </div>
                                                    <button className="size-10 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 flex items-center justify-center text-slate-400 hover:text-blue-600 hover:border-blue-600 transition-all focus:outline-none" title="Adicionar observação">
                                                        <MessageSquarePlus className="w-5 h-5" />
                                                    </button>
                                                </div>
                                            </div>
                                        ))}

                                        {/* URAs */}
                                        {unitItems.uras.map(ura => (
                                            <div key={`ura_${ura.id}`} className="p-4 flex flex-col md:flex-row md:items-center justify-between gap-4 hover:bg-slate-50 dark:hover:bg-slate-800/30 transition-colors">
                                                <div className="flex items-start md:items-center gap-4">
                                                    <input
                                                        className="mt-1 md:mt-0 w-5 h-5 rounded border-slate-300 dark:border-slate-600 text-blue-600 focus:ring-blue-500 bg-white dark:bg-slate-700 cursor-pointer"
                                                        type="checkbox"
                                                        checked={selectedItemIds.has(`ura_${ura.id}`)}
                                                        onChange={() => handleToggleItem(`ura_${ura.id}`)}
                                                    />
                                                    <div className="flex flex-col">
                                                        <div className="flex items-center gap-2">
                                                            <span className="text-sm font-bold text-slate-900 dark:text-slate-100">{ura.nome}</span>
                                                            <span className="text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded bg-emerald-100 text-emerald-700 dark:bg-emerald-900/40 dark:text-emerald-400 border border-emerald-200 dark:border-emerald-800/50">URA</span>
                                                        </div>
                                                        <span className="text-xs text-slate-500 dark:text-slate-400">{ura.descricao || 'Sem descrição'}</span>
                                                    </div>
                                                </div>
                                                <div className="flex items-center gap-3 pl-9 md:pl-0">
                                                    <div className="relative w-40">
                                                        <select className="w-full bg-white dark:bg-[#111621] border border-slate-200 dark:border-slate-700 rounded-lg h-10 pl-3 pr-10 py-1 text-xs focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-slate-700 dark:text-slate-200 appearance-none cursor-pointer outline-none">
                                                            <option value="agendado">Agendado</option>
                                                            <option value="validado">Validado</option>
                                                            <option value="andamento">Em andamento</option>
                                                            <option value="concluido">Concluído</option>
                                                            <option value="problema">Problema</option>
                                                        </select>
                                                        <ChevronDown className="absolute right-2 top-2.5 w-4 h-4 text-slate-400 pointer-events-none" />
                                                    </div>
                                                    <button className="size-10 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 flex items-center justify-center text-slate-400 hover:text-blue-600 hover:border-blue-600 transition-all focus:outline-none" title="Adicionar observação">
                                                        <MessageSquarePlus className="w-5 h-5" />
                                                    </button>
                                                </div>
                                            </div>
                                        ))}
                                    </>
                                )}
                            </div>
                        </div>
                    )}

                    {/* Actions */}
                    <div className="flex justify-end items-center gap-4 pt-6 mt-4 border-t border-slate-200 dark:border-slate-800">
                        <button
                            onClick={onCancel}
                            className="px-6 py-3 rounded-lg font-bold text-slate-500 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 transition-all"
                        >
                            Cancelar
                        </button>
                        <button className="px-8 py-3 rounded-lg font-bold bg-blue-600 text-white hover:bg-blue-700 shadow-lg shadow-blue-600/20 flex items-center gap-2 transition-all active:scale-95">
                            <CheckCircle className="w-5 h-5" />
                            Criar Projeto
                        </button>
                    </div>

                </div>
            </div>
        </div>
    );
}
