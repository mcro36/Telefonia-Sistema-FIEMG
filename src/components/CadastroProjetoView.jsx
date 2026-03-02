import React, { useState, useEffect } from 'react';
import { ChevronDown, Ticket, Package, MessageSquarePlus, CheckCircle, Search, Loader2, Building2, Plus, AlertCircle } from 'lucide-react';
import { useSupabaseTable } from '../hooks/useSupabaseTable.js';
import { supabase } from '../lib/supabase.js';
import { convertToCamel } from '../lib/utils.js';
import { FormSearchableSelect } from './ui/FormField.jsx';
import { RamalModalSIP } from './RamalModalSIP.jsx';
import { LinhaModal } from './LinhaModal.jsx';
import { UraModal } from './UraModal.jsx';

export function CadastroProjetoView({ onCancel }) {
    const { data: units, isLoading: isUnitsLoading } = useSupabaseTable({
        tableName: 'unidades',
        selectQuery: 'id, nome',
        order: { column: 'nome', ascending: true }
    });

    const [selectedUnit, setSelectedUnit] = useState(null);

    // Campos do formulário
    const [projectName, setProjectName] = useState('');
    const [projectDesc, setProjectDesc] = useState('');
    const [dataInicio, setDataInicio] = useState('');
    const [deadline, setDeadline] = useState('');
    const [chamado, setChamado] = useState('');
    const [isSaving, setIsSaving] = useState(false);

    const [unitItems, setUnitItems] = useState({ ramais: [], linhas: [], uras: [] });
    const [isLoadingItems, setIsLoadingItems] = useState(false);

    const [selectedItemIds, setSelectedItemIds] = useState(new Set());
    const [activeDraftModal, setActiveDraftModal] = useState(null);
    const [filterType, setFilterType] = useState('todos'); // 'todos', 'ramal', 'linha', 'ura'

    const handleAddDraftItem = (itemData, type) => {
        const tempId = `temp_${Date.now()}`;
        const finalItem = { ...itemData, id: tempId, isDraft: true };

        let newItems = { ...unitItems };
        let itemIdString = '';

        if (type === 'ramal') {
            newItems.ramais = [...newItems.ramais, finalItem];
            itemIdString = `ramal_${tempId}`;
        } else if (type === 'linha') {
            newItems.linhas = [...newItems.linhas, finalItem];
            itemIdString = `linha_${tempId}`;
        } else if (type === 'ura') {
            newItems.uras = [...newItems.uras, finalItem];
            itemIdString = `ura_${tempId}`;
        }

        setUnitItems(newItems);

        const newSelectedIds = new Set(selectedItemIds);
        newSelectedIds.add(itemIdString);
        setSelectedItemIds(newSelectedIds);

        setActiveDraftModal(null);
    };

    useEffect(() => {
        if (!selectedUnit) {
            setUnitItems({ ramais: [], linhas: [], uras: [] });
            return;
        }

        async function fetchUnitItems() {
            setIsLoadingItems(true);
            try {
                const [ramaisRes, linhasRes, urasRes] = await Promise.all([
                    supabase.from('ramais').select('id, numero, setor, tipo_ramal').eq('unidade_id', selectedUnit.id).eq('status', 'Ativo'),
                    supabase.from('linhas').select('id, numero, operadora').eq('unidade_id', selectedUnit.id).eq('status', 'Ativa'),
                    supabase.from('uras').select('id, nome, descricao').eq('unidade_id', selectedUnit.id)
                ]);

                const ramais = convertToCamel(ramaisRes.data || []);
                const linhas = convertToCamel(linhasRes.data || []);
                const uras = convertToCamel(urasRes.data || []);

                setUnitItems({
                    ramais,
                    linhas,
                    uras
                });

                const allIds = new Set([
                    ...ramais.map(r => `ramal_${r.id}`),
                    ...linhas.map(l => `linha_${l.id}`),
                    ...uras.map(u => `ura_${u.id}`)
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

    const handleCreateProject = async () => {
        if (!projectName.trim()) {
            alert('Por favor, preencha o nome do projeto.');
            return;
        }
        if (!selectedUnit) {
            alert('Por favor, selecione uma unidade.');
            return;
        }

        setIsSaving(true);
        try {
            // 1. Criar o projeto
            const { data: projetoData, error: projetoError } = await supabase
                .from('projetos')
                .insert([{
                    nome: projectName.trim(),
                    descricao: projectDesc.trim() || null,
                    unidade_id: selectedUnit.id,
                    data_inicio: dataInicio || null,
                    deadline: deadline || null,
                    chamado: chamado.trim() || null,
                    progresso: 0,
                    status: 'Em Andamento'
                }])
                .select('id')
                .single();

            if (projetoError) throw projetoError;

            // 2. Criar os itens selecionados
            const itensToInsert = [];
            selectedItemIds.forEach(itemIdStr => {
                const [tipo, rawId] = itemIdStr.split('_');
                const isDraft = String(rawId).startsWith('temp_');
                let label = '';

                if (tipo === 'ramal') {
                    const r = unitItems.ramais.find(x => String(x.id) === rawId);
                    label = r ? `Ramal ${r.numero}` : `Ramal (${rawId})`;
                } else if (tipo === 'linha') {
                    const l = unitItems.linhas.find(x => String(x.id) === rawId);
                    label = l ? `Linha ${l.numero}` : `Linha (${rawId})`;
                } else if (tipo === 'ura') {
                    const u = unitItems.uras.find(x => String(x.id) === rawId);
                    label = u ? `URA ${u.nome}` : `URA (${rawId})`;
                }

                itensToInsert.push({
                    projeto_id: projetoData.id,
                    item_tipo: tipo,
                    item_id: isDraft ? null : rawId,
                    item_label: label,
                    status_item: 'Agendado'
                });
            });

            if (itensToInsert.length > 0) {
                const { error: itensError } = await supabase
                    .from('projeto_itens')
                    .insert(itensToInsert);
                if (itensError) throw itensError;
            }

            alert('Projeto criado com sucesso!');
            onCancel();
        } catch (err) {
            console.error('Erro ao criar projeto:', err);
            alert('Erro ao criar projeto: ' + (err.message || 'Verifique sua conexão.'));
        } finally {
            setIsSaving(false);
        }
    };

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
                                    value={projectName}
                                    onChange={(e) => setProjectName(e.target.value)}
                                />
                            </div>

                            <div className="space-y-2">
                                <label className="text-sm font-semibold text-slate-700 dark:text-slate-300">Unidade Alvo</label>
                                <FormSearchableSelect
                                    id="unidade-projeto-select"
                                    icon={<Building2 className="w-5 h-5" />}
                                    placeholder={isUnitsLoading ? "Carregando unidades..." : "Selecione ou busque uma unidade..."}
                                    value={selectedUnit ? selectedUnit.id : ''}
                                    onChange={(val) => setSelectedUnit(units.find(u => String(u.id) === String(val)))}
                                    options={(units || []).map(u => ({ value: u.id, label: u.nome }))}
                                />
                            </div>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 h-fit">
                            <div className="space-y-2">
                                <label className="text-sm font-semibold text-slate-700 dark:text-slate-300">Data de Início</label>
                                <input
                                    className="w-full bg-white dark:bg-[#111621] border border-slate-200 dark:border-slate-800 rounded-lg h-12 px-4 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-slate-900 dark:text-white outline-none transition-all"
                                    type="date"
                                    value={dataInicio}
                                    onChange={(e) => setDataInicio(e.target.value)}
                                    style={{ colorScheme: 'dark' }}
                                />
                            </div>
                            <div className="space-y-2">
                                <label className="text-sm font-semibold text-slate-700 dark:text-slate-300">Deadline</label>
                                <input
                                    className="w-full bg-white dark:bg-[#111621] border border-slate-200 dark:border-slate-800 rounded-lg h-12 px-4 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-slate-900 dark:text-white outline-none transition-all"
                                    type="date"
                                    value={deadline}
                                    onChange={(e) => setDeadline(e.target.value)}
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
                                        value={chamado}
                                        onChange={(e) => setChamado(e.target.value)}
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
                                    <div className="flex gap-2 relative group hidden sm:flex">
                                        <button className="flex items-center gap-2 px-3 py-1.5 bg-white dark:bg-[#111621] border border-slate-200 dark:border-slate-700 rounded-md text-sm font-medium text-slate-700 dark:text-slate-300 hover:text-blue-600 hover:border-blue-200 dark:hover:text-blue-400 transition-colors">
                                            <Plus className="w-4 h-4" /> Incluir
                                        </button>
                                        <div className="absolute right-0 top-full w-48 bg-white dark:bg-[#1c222d] border border-slate-200 dark:border-slate-800 rounded-lg shadow-xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all z-20 overflow-hidden">
                                            <button onClick={() => setActiveDraftModal('ramal')} className="w-full text-left px-4 py-3 text-sm text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-[#151a23] transition-colors border-b border-slate-100 dark:border-slate-800/60">
                                                Novo ramal
                                            </button>
                                            <button onClick={() => setActiveDraftModal('linha')} className="w-full text-left px-4 py-3 text-sm text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-[#151a23] transition-colors border-b border-slate-100 dark:border-slate-800/60">
                                                Nova linha
                                            </button>
                                            <button onClick={() => setActiveDraftModal('ura')} className="w-full text-left px-4 py-3 text-sm text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-[#151a23] transition-colors">
                                                Nova URA
                                            </button>
                                        </div>
                                    </div>
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

                            {/* Filtros */}
                            <div className="px-6 py-2 border-b border-slate-200 dark:border-slate-800 flex items-center gap-2 flex-wrap">
                                {['todos', 'ramal', 'linha', 'ura'].map(f => (
                                    <button
                                        key={f}
                                        onClick={() => setFilterType(f)}
                                        className={`px-3 py-1 rounded-full text-xs font-semibold transition-all ${filterType === f
                                            ? 'bg-blue-600 text-white shadow-sm'
                                            : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:bg-slate-200 dark:hover:bg-slate-700'
                                            }`}
                                    >
                                        {f === 'todos' ? `Todos (${totalItems})` : f === 'ramal' ? `Ramais (${unitItems.ramais.length})` : f === 'linha' ? `Linhas (${unitItems.linhas.length})` : `URAs (${unitItems.uras.length})`}
                                    </button>
                                ))}
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
                                        {(filterType === 'todos' || filterType === 'ramal') && unitItems.ramais.map(ramal => (
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
                                                            {ramal.isDraft && <span className="text-[10px] ml-1 uppercase font-bold tracking-wider px-1.5 py-0.5 rounded bg-amber-100 text-amber-700 dark:bg-amber-900/40 dark:text-amber-400 border border-amber-200 dark:border-amber-800/50">RASCUNHO</span>}
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
                                        {(filterType === 'todos' || filterType === 'linha') && unitItems.linhas.map(linha => (
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
                                                            {linha.isDraft && <span className="text-[10px] ml-1 uppercase font-bold tracking-wider px-1.5 py-0.5 rounded bg-amber-100 text-amber-700 dark:bg-amber-900/40 dark:text-amber-400 border border-amber-200 dark:border-amber-800/50">RASCUNHO</span>}
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
                                        {(filterType === 'todos' || filterType === 'ura') && unitItems.uras.map(ura => (
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
                                                            {ura.isDraft && <span className="text-[10px] ml-1 uppercase font-bold tracking-wider px-1.5 py-0.5 rounded bg-amber-100 text-amber-700 dark:bg-amber-900/40 dark:text-amber-400 border border-amber-200 dark:border-amber-800/50">RASCUNHO</span>}
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
                        <button
                            onClick={handleCreateProject}
                            disabled={isSaving}
                            className="px-8 py-3 rounded-lg font-bold bg-blue-600 text-white hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed shadow-lg shadow-blue-600/20 flex items-center gap-2 transition-all active:scale-95"
                        >
                            {isSaving ? (
                                <>
                                    <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                                    Salvando...
                                </>
                            ) : (
                                <>
                                    <CheckCircle className="w-5 h-5" />
                                    Criar Projeto
                                </>
                            )}
                        </button>
                    </div>

                </div>

                {activeDraftModal === 'ramal' && (
                    <RamalModalSIP
                        isOpen={true}
                        onClose={() => setActiveDraftModal(null)}
                        unitId={selectedUnit?.id}
                        draftMode={true}
                        onDraftSubmit={(data) => handleAddDraftItem(data, 'ramal')}
                    />
                )}
                {activeDraftModal === 'linha' && (
                    <LinhaModal
                        isOpen={true}
                        onClose={() => setActiveDraftModal(null)}
                        unitId={selectedUnit?.id}
                        draftMode={true}
                        onDraftSubmit={(data) => handleAddDraftItem(data, 'linha')}
                    />
                )}
                {activeDraftModal === 'ura' && (
                    <UraModal
                        isOpen={true}
                        onClose={() => setActiveDraftModal(null)}
                        unitId={selectedUnit?.id}
                        draftMode={true}
                        onDraftSubmit={(data) => handleAddDraftItem(data, 'ura')}
                    />
                )}
            </div>
        </div>
    );
}
