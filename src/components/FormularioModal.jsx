import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Search, ChevronDown, Package, Plus, Ticket, PhoneCall, ListOrdered, Bot, AlertCircle, Trash2, Edit } from 'lucide-react';
import { useSupabaseTable } from '../hooks/useSupabaseTable.js';
import { supabase } from '../lib/supabase.js';
import { useAuth } from '../contexts/AuthContext.jsx';
import { FormSearchableSelect } from './ui/FormField.jsx';
import { RamalModalSIP } from './RamalModalSIP.jsx';
import { LinhaModal } from './LinhaModal.jsx';
import { UraModal } from './UraModal.jsx';

export function FormularioModal({ isOpen, onClose }) {
    const { user } = useAuth();
    const [email, setEmail] = useState('');
    const [emailError, setEmailError] = useState('');
    const [selectedUnit, setSelectedUnit] = useState(null);

    const [unitItems, setUnitItems] = useState({ ramais: [], linhas: [], uras: [] });
    const [isLoadingItems, setIsLoadingItems] = useState(false);

    // Lista final de requisições:
    const [solicitacaoItems, setSolicitacaoItems] = useState([]);
    const [isSubmitting, setIsSubmitting] = useState(false);

    const [activeDraftModal, setActiveDraftModal] = useState(null); // 'ramal', 'linha', 'ura', 'problema'
    const [editingIndex, setEditingIndex] = useState(null);
    const [inventoryItemToEdit, setInventoryItemToEdit] = useState(null);
    const [problemaText, setProblemaText] = useState('');

    // Painel Inventário: States de interações
    const [ramalSearch, setRamalSearch] = useState('');
    const [isRamalSearchOpen, setIsRamalSearchOpen] = useState(false);
    const [linhaSearch, setLinhaSearch] = useState('');
    const [isLinhaSearchOpen, setIsLinhaSearchOpen] = useState(false);
    const [checkedInventory, setCheckedInventory] = useState({});

    const toggleCheck = (type, id) => {
        const key = `${type}_${id}`;
        setCheckedInventory(prev => ({ ...prev, [key]: !prev[key] }));
    };

    const { data: units = [], isLoading: isUnitsLoading } = useSupabaseTable({
        tableName: 'unidades',
        selectQuery: 'id, nome',
        order: { column: 'nome', ascending: true }
    });

    useEffect(() => {
        if (user?.email) {
            setEmail(user.email);
        }
    }, [user]);

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
            } catch (error) {
                console.error("Erro ao buscar itens da unidade:", error);
            } finally {
                setIsLoadingItems(false);
            }
        }

        fetchUnitItems();
    }, [selectedUnit]);

    const handleEmailChange = (e) => {
        setEmail(e.target.value);
        if (emailError) setEmailError('');
    };

    const handleAddDraftItem = (itemData, type, intent = 'novo', isEditing = false, editIndex = null) => {
        if (Array.isArray(itemData)) {
            const newItems = itemData.map(data => ({ type, intent, data }));
            setSolicitacaoItems([...solicitacaoItems, ...newItems]);
        } else {
            const newItem = { type, intent, data: itemData };
            if (isEditing && editIndex !== null) {
                const updated = [...solicitacaoItems];
                updated[editIndex] = newItem;
                setSolicitacaoItems(updated);
            } else {
                setSolicitacaoItems([...solicitacaoItems, newItem]);
            }
        }
        setActiveDraftModal(null);
        setEditingIndex(null);
        setInventoryItemToEdit(null);
        setProblemaText('');
    };

    const handleRemoveItem = (index) => {
        setSolicitacaoItems(solicitacaoItems.filter((_, i) => i !== index));
    };

    const handleEditItem = (index) => {
        setEditingIndex(index);
        setInventoryItemToEdit(null);
        const item = solicitacaoItems[index];
        if (item.type === 'problema') {
            setProblemaText(item.data.descricao);
        }
        setActiveDraftModal(item.type);
    };

    const handleEditInventoryItem = (type, item) => {
        setInventoryItemToEdit(item);
        setActiveDraftModal(type);
        toggleCheck(type, item.id);
    };

    const handleDeleteInventoryItem = (type, item) => {
        handleAddDraftItem(item, type, 'exclusao');
        toggleCheck(type, item.id);
    };

    const handleProblemaSubmit = () => {
        if (!problemaText.trim()) return;
        handleAddDraftItem({ descricao: problemaText }, 'problema', 'problema', editingIndex !== null, editingIndex);
    };

    const handleSubmit = async () => {
        if (!email.trim() || !email.includes('@fiemg.com.br')) {
            // Se o email da sessao logada não for @fiemg
            setEmailError('O e-mail deve pertencer ao domínio @fiemg.com.br');
            return;
        }
        if (!selectedUnit) {
            alert('Por favor, selecione uma unidade.');
            return;
        }
        if (solicitacaoItems.length === 0) {
            alert('Por favor, inclua ao menos um item ou problema na solicitação.');
            return;
        }

        setIsSubmitting(true);
        // Chamada à RPC com os dados agrupados
        try {
            const payload = {
                v_email: email,
                v_unidade_id: selectedUnit.id,
                v_unidade_nome: selectedUnit.nome,
                v_itens: solicitacaoItems
            };

            const { error } = await supabase.rpc('submit_public_project_request', payload);

            if (error) {
                throw error;
            }

            alert('Solicitação enviada com sucesso! Ela foi registrada como um Projeto Pendente para revisão da equipe telefonia.');
            onClose();
            // Reset form
            setEmail('');
            setSelectedUnit(null);
            setSolicitacaoItems([]);
        } catch (error) {
            console.error(error);
            alert('Erro ao enviar solicitação: ' + error.message);
        } finally {
            setIsSubmitting(false);
        }
    };

    if (!isOpen) return null;

    return (
        <AnimatePresence>
            <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    onClick={onClose}
                    className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm"
                />

                <motion.div
                    initial={{ opacity: 0, scale: 0.95, y: 20 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.95, y: 20 }}
                    className="relative w-full max-w-[1024px] bg-white dark:bg-[#151a23] rounded-2xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh]"
                >
                    {/* Header */}
                    <div className="flex items-center justify-between p-6 border-b border-slate-100 dark:border-slate-800/60 transition-colors">
                        <div>
                            <h2 className="text-xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
                                <Ticket className="w-6 h-6 text-blue-600 dark:text-blue-500" />
                                Solicitação de Serviço de Telefonia
                            </h2>
                            <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">Preencha os dados abaixo para enviar uma requisição à equipe de TI.</p>
                        </div>
                        <button
                            onClick={onClose}
                            className="p-2 text-slate-400 hover:text-slate-600 dark:hover:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-full transition-colors"
                        >
                            <X className="w-5 h-5" />
                        </button>
                    </div>

                    {/* Content */}
                    <div className="flex-1 overflow-y-auto p-6 md:p-8 custom-scrollbar space-y-8">
                        {/* Seção 1: Identificação do Solicitante (Apenas Unidade agora) */}
                        <div className="space-y-4">
                            <label className="text-sm font-semibold text-slate-700 dark:text-slate-300 mb-2 block">
                                Qual a unidade de destino desta solicitação?
                                <span className="text-red-500 ml-1">*</span>
                            </label>

                            <FormSearchableSelect
                                id="unidades-solicitacao"
                                icon="domain"
                                placeholder={isUnitsLoading ? "Carregando unidades..." : "Digite para buscar a unidade ou clique na seta..."}
                                value={selectedUnit ? selectedUnit.id : ''}
                                onChange={(val) => {
                                    const unit = units.find(u => u.id === val);
                                    setSelectedUnit(unit || null);
                                }}
                                options={(units || []).map(u => ({ value: u.id, label: u.nome }))}
                            />
                        </div>

                        {/* Seção 2: Contexto da Unidade (O que já tem lá) */}
                        {selectedUnit && (
                            <div className="bg-slate-50 dark:bg-[#1c222d] border border-slate-200 dark:border-slate-800 rounded-xl overflow-hidden shadow-sm animate-in fade-in">
                                <div className="px-6 py-4 border-b border-slate-200 dark:border-slate-800 bg-white/50 dark:bg-slate-800/20 flex items-center gap-2">
                                    <Package className="w-5 h-5 text-blue-600 dark:text-blue-500" />
                                    <h3 className="text-sm font-bold text-slate-900 dark:text-white">Inventário Atual na Unidade</h3>
                                </div>
                                <div className="p-6">
                                    {isLoadingItems ? (
                                        <div className="flex items-center justify-center p-4">
                                            <div className="w-6 h-6 border-2 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
                                        </div>
                                    ) : (
                                        <div className="grid lg:grid-cols-3 gap-6">
                                            {/* Coluna Ramais */}
                                            <div className="bg-white dark:bg-[#151a23] p-4 rounded-xl border border-slate-200 dark:border-slate-800/60 shadow-sm flex flex-col">
                                                <div className="flex items-center justify-between mb-4 h-8 shrink-0">
                                                    {!isRamalSearchOpen ? (
                                                        <div className="flex items-center gap-2">
                                                            <div className="w-8 h-8 rounded-lg bg-blue-100 dark:bg-blue-500/20 flex items-center justify-center">
                                                                <PhoneCall className="w-4 h-4 text-blue-600 dark:text-blue-400" />
                                                            </div>
                                                            <h4 className="font-semibold text-slate-900 dark:text-white text-sm">Ramais Atuais ({unitItems.ramais.length})</h4>
                                                        </div>
                                                    ) : (
                                                        <div className="flex-1 flex items-center gap-2 pr-2 animate-in slide-in-from-right-2">
                                                            <Search className="w-4 h-4 text-slate-400 shrink-0" />
                                                            <input
                                                                type="text"
                                                                autoFocus
                                                                placeholder="Buscar ramal..."
                                                                className="w-full bg-slate-50 dark:bg-[#111621] border border-slate-200 dark:border-slate-800 rounded px-2 py-1.5 text-xs outline-none text-slate-900 dark:text-white"
                                                                value={ramalSearch}
                                                                onChange={e => setRamalSearch(e.target.value)}
                                                            />
                                                        </div>
                                                    )}
                                                    <button onClick={() => { setIsRamalSearchOpen(!isRamalSearchOpen); setRamalSearch(''); }} className="p-1 hover:bg-slate-100 dark:hover:bg-slate-800/50 rounded transition-colors">
                                                        {isRamalSearchOpen ? <X className="w-4 h-4 text-slate-500" /> : <Search className="w-4 h-4 text-slate-500" />}
                                                    </button>
                                                </div>
                                                <ul className="space-y-2 max-h-40 overflow-y-auto custom-scrollbar pr-2 flex-1">
                                                    {unitItems.ramais.filter(r => (r.numero || '').toLowerCase().includes(ramalSearch.toLowerCase())).map(r => {
                                                        const isChecked = checkedInventory[`ramal_${r.id}`];
                                                        return (
                                                            <li key={r.id} className="text-xs text-slate-600 dark:text-slate-400 flex justify-between items-center bg-slate-50 dark:bg-[#1c222d] border border-slate-200 dark:border-slate-800 p-2 rounded-lg">
                                                                <div className="flex items-center gap-2 min-w-0">
                                                                    <input type="checkbox" checked={isChecked || false} onChange={() => toggleCheck('ramal', r.id)} className="rounded border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-blue-600 focus:ring-blue-500 cursor-pointer w-3.5 h-3.5" />
                                                                    <span className="font-medium text-slate-900 dark:text-slate-300 truncate">{r.numero}</span>
                                                                </div>
                                                                {!isChecked ? (
                                                                    <span className="text-slate-500 truncate ml-2 text-right">{r.setor}</span>
                                                                ) : (
                                                                    <div className="flex items-center gap-1 animate-in fade-in ml-2">
                                                                        <button onClick={() => handleEditInventoryItem('ramal', r)} className="p-1 text-blue-600 hover:bg-blue-50 dark:text-blue-400 dark:hover:bg-blue-500/10 rounded transition-colors" title="Editar este ramal">
                                                                            <Edit className="w-3.5 h-3.5" />
                                                                        </button>
                                                                        <button onClick={() => handleDeleteInventoryItem('ramal', r)} className="p-1 text-red-600 hover:bg-red-50 dark:text-red-400 dark:hover:bg-red-500/10 rounded transition-colors" title="Excluir este ramal">
                                                                            <Trash2 className="w-3.5 h-3.5" />
                                                                        </button>
                                                                    </div>
                                                                )}
                                                            </li>
                                                        );
                                                    })}
                                                    {unitItems.ramais.length === 0 && <li className="text-xs text-slate-400 p-2 text-center border border-dashed border-slate-200 dark:border-slate-800 rounded-lg">Nenhum ramal</li>}
                                                </ul>
                                            </div>

                                            {/* Coluna Linhas */}
                                            <div className="bg-white dark:bg-[#151a23] p-4 rounded-xl border border-slate-200 dark:border-slate-800/60 shadow-sm flex flex-col">
                                                <div className="flex items-center justify-between mb-4 h-8 shrink-0">
                                                    {!isLinhaSearchOpen ? (
                                                        <div className="flex items-center gap-2">
                                                            <div className="w-8 h-8 rounded-lg bg-emerald-100 dark:bg-emerald-500/20 flex items-center justify-center">
                                                                <ListOrdered className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
                                                            </div>
                                                            <h4 className="font-semibold text-slate-900 dark:text-white text-sm">Linhas Atuais ({unitItems.linhas.length})</h4>
                                                        </div>
                                                    ) : (
                                                        <div className="flex-1 flex items-center gap-2 pr-2 animate-in slide-in-from-right-2">
                                                            <Search className="w-4 h-4 text-slate-400 shrink-0" />
                                                            <input
                                                                type="text"
                                                                autoFocus
                                                                placeholder="Buscar linha..."
                                                                className="w-full bg-emerald-50/50 dark:bg-[#111621] border border-emerald-100 dark:border-slate-800 rounded px-2 py-1.5 text-xs outline-none text-slate-900 dark:text-white"
                                                                value={linhaSearch}
                                                                onChange={e => setLinhaSearch(e.target.value)}
                                                            />
                                                        </div>
                                                    )}
                                                    <button onClick={() => { setIsLinhaSearchOpen(!isLinhaSearchOpen); setLinhaSearch(''); }} className="p-1 hover:bg-emerald-50 dark:hover:bg-slate-800/50 rounded transition-colors text-slate-500 hover:text-emerald-600">
                                                        {isLinhaSearchOpen ? <X className="w-4 h-4" /> : <Search className="w-4 h-4" />}
                                                    </button>
                                                </div>
                                                <ul className="space-y-2 max-h-40 overflow-y-auto custom-scrollbar pr-2 flex-1">
                                                    {unitItems.linhas.filter(l => (l.numero || '').toLowerCase().includes(linhaSearch.toLowerCase())).map(l => {
                                                        const isChecked = checkedInventory[`linha_${l.id}`];
                                                        return (
                                                            <li key={l.id} className="text-xs text-slate-600 dark:text-slate-400 flex justify-between items-center bg-emerald-50/50 dark:bg-[#1c222d] border border-emerald-100 dark:border-slate-800 p-2 rounded-lg">
                                                                <div className="flex items-center gap-2 min-w-0">
                                                                    <input type="checkbox" checked={isChecked || false} onChange={() => toggleCheck('linha', l.id)} className="rounded border-emerald-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-emerald-600 focus:ring-emerald-500 cursor-pointer w-3.5 h-3.5" />
                                                                    <span className="font-medium text-emerald-900 dark:text-slate-300 truncate">{l.numero}</span>
                                                                </div>
                                                                {!isChecked ? (
                                                                    <span className="text-slate-500 truncate ml-2 text-right">{l.operadora}</span>
                                                                ) : (
                                                                    <div className="flex items-center gap-1 animate-in fade-in ml-2">
                                                                        <button onClick={() => handleEditInventoryItem('linha', l)} className="p-1 text-emerald-600 hover:bg-emerald-100 dark:text-emerald-400 dark:hover:bg-emerald-500/10 rounded transition-colors" title="Editar esta linha">
                                                                            <Edit className="w-3.5 h-3.5" />
                                                                        </button>
                                                                        <button onClick={() => handleDeleteInventoryItem('linha', l)} className="p-1 text-red-600 hover:bg-red-50 dark:text-red-400 dark:hover:bg-red-500/10 rounded transition-colors" title="Excluir esta linha">
                                                                            <Trash2 className="w-3.5 h-3.5" />
                                                                        </button>
                                                                    </div>
                                                                )}
                                                            </li>
                                                        );
                                                    })}
                                                    {unitItems.linhas.length === 0 && <li className="text-xs text-slate-400 p-2 text-center border border-dashed border-emerald-200 dark:border-slate-800 rounded-lg">Nenhuma linha</li>}
                                                </ul>
                                            </div>

                                            {/* Coluna URAs */}
                                            <div className="bg-white dark:bg-[#151a23] p-4 rounded-xl border border-slate-200 dark:border-slate-800/60 shadow-sm flex flex-col">
                                                <div className="flex items-center gap-2 mb-4 h-8 shrink-0">
                                                    <div className="w-8 h-8 rounded-lg bg-purple-100 dark:bg-purple-500/20 flex items-center justify-center">
                                                        <Bot className="w-4 h-4 text-purple-600 dark:text-purple-400" />
                                                    </div>
                                                    <h4 className="font-semibold text-slate-900 dark:text-white text-sm">URAs Atuais ({unitItems.uras.length})</h4>
                                                </div>
                                                <ul className="space-y-2 max-h-40 overflow-y-auto custom-scrollbar pr-2 flex-1">
                                                    {unitItems.uras.map(u => {
                                                        const isChecked = checkedInventory[`ura_${u.id}`];
                                                        return (
                                                            <li key={u.id} className="text-xs text-slate-600 dark:text-slate-400 flex justify-between items-center bg-purple-50/50 dark:bg-[#1c222d] border border-purple-100 dark:border-slate-800 p-2 rounded-lg">
                                                                <div className="flex items-center gap-2 min-w-0">
                                                                    <input type="checkbox" checked={isChecked || false} onChange={() => toggleCheck('ura', u.id)} className="rounded border-purple-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-purple-600 focus:ring-purple-500 cursor-pointer w-3.5 h-3.5" />
                                                                    <span className="font-medium text-purple-900 dark:text-slate-300 truncate">{u.nome}</span>
                                                                </div>
                                                                {isChecked && (
                                                                    <div className="flex items-center gap-1 animate-in fade-in ml-2">
                                                                        <button onClick={() => handleEditInventoryItem('ura', u)} className="p-1 text-purple-600 hover:bg-purple-100 dark:text-purple-400 dark:hover:bg-purple-500/10 rounded transition-colors" title="Editar esta URA">
                                                                            <Edit className="w-3.5 h-3.5" />
                                                                        </button>
                                                                        <button onClick={() => handleDeleteInventoryItem('ura', u)} className="p-1 text-red-600 hover:bg-red-50 dark:text-red-400 dark:hover:bg-red-500/10 rounded transition-colors" title="Excluir esta URA">
                                                                            <Trash2 className="w-3.5 h-3.5" />
                                                                        </button>
                                                                    </div>
                                                                )}
                                                            </li>
                                                        );
                                                    })}
                                                    {unitItems.uras.length === 0 && <li className="text-xs text-slate-400 p-2 text-center border border-dashed border-purple-200 dark:border-slate-800 rounded-lg">Nenhuma URA</li>}
                                                </ul>
                                            </div>
                                        </div>
                                    )}
                                </div>
                            </div>
                        )}

                        {/* Seção 3: Itens Solicitados */}
                        <div className="space-y-4">
                            <div className="flex items-center justify-between">
                                <h3 className="text-lg font-bold text-slate-900 dark:text-white flex items-center gap-2">
                                    <AlertCircle className="w-5 h-5 text-amber-500" />
                                    Itens Solicitados
                                </h3>
                                {/* Menu "Incluir" */}
                                <div className="flex gap-2 relative group">
                                    <button className="flex items-center gap-2 px-4 py-2 bg-slate-100 dark:bg-[#1c222d] border border-slate-200 dark:border-slate-800 rounded-lg text-sm font-medium text-slate-700 dark:text-slate-300 hover:text-blue-600 hover:border-blue-200 dark:hover:text-blue-400 transition-colors">
                                        <Plus className="w-4 h-4" /> Incluir
                                    </button>

                                    <div className="absolute right-0 top-full mt-2 w-48 bg-white dark:bg-[#1c222d] border border-slate-200 dark:border-slate-800 rounded-lg shadow-xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all z-20 overflow-hidden">
                                        <button onClick={() => setActiveDraftModal('ramal')} className="w-full text-left px-4 py-3 text-sm text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-[#151a23] transition-colors border-b border-slate-100 dark:border-slate-800/60">
                                            Solicitar novo ramal
                                        </button>
                                        <button onClick={() => setActiveDraftModal('linha')} className="w-full text-left px-4 py-3 text-sm text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-[#151a23] transition-colors border-b border-slate-100 dark:border-slate-800/60">
                                            Solicitar nova linha
                                        </button>
                                        <button onClick={() => setActiveDraftModal('ura')} className="w-full text-left px-4 py-3 text-sm text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-[#151a23] transition-colors border-b border-slate-100 dark:border-slate-800/60">
                                            Solicitar nova URA
                                        </button>
                                        <button onClick={() => setActiveDraftModal('problema')} className="w-full text-left px-4 py-3 text-sm text-amber-600 dark:text-amber-400 hover:bg-amber-50 dark:hover:bg-amber-500/10 transition-colors font-medium">
                                            Informar problema
                                        </button>
                                    </div>
                                </div>
                            </div>

                            {/* Tabela/Lista de Solicitados */}
                            <div className="bg-white dark:bg-[#1c222d] border border-slate-200 dark:border-slate-800 rounded-xl overflow-hidden shadow-sm">
                                {solicitacaoItems.length === 0 ? (
                                    <div className="p-8 text-center text-slate-500 dark:text-slate-400 text-sm">
                                        Nenhum item adicionado à solicitação ainda.<br />Use o menu "Incluir" para adicionar.
                                    </div>
                                ) : (
                                    <table className="w-full text-left border-collapse">
                                        <thead>
                                            <tr className="bg-slate-50 dark:bg-slate-800/40 border-b border-slate-200 dark:border-slate-800">
                                                <th className="px-6 py-3 text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider">Ação</th>
                                                <th className="px-6 py-3 text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider">Item</th>
                                                <th className="px-6 py-3 text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider">Descrição / Resumo</th>
                                                <th className="px-6 py-3 text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider text-right">Opções</th>
                                            </tr>
                                        </thead>
                                        <tbody className="divide-y divide-slate-100 dark:divide-slate-800/60">
                                            {solicitacaoItems.map((item, idx) => (
                                                <tr key={idx} className="hover:bg-slate-50/50 dark:hover:bg-[#151a23] transition-colors">
                                                    <td className="px-6 py-4">
                                                        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium capitalize 
                                                            ${item.intent === 'novo' ? 'bg-blue-100 text-blue-700 dark:bg-blue-500/20 dark:text-blue-400' :
                                                                item.intent === 'edicao' ? 'bg-amber-100 text-amber-700 dark:bg-amber-500/20 dark:text-amber-400' :
                                                                    item.intent === 'exclusao' ? 'bg-red-100 text-red-700 dark:bg-red-500/20 dark:text-red-400' :
                                                                        'bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-300'
                                                            }`}>
                                                            {item.intent === 'novo' ? 'Novo' : item.intent === 'edicao' ? 'Edição' : item.intent === 'exclusao' ? 'Exclusão' : 'Problema'}
                                                        </span>
                                                    </td>
                                                    <td className="px-6 py-4 text-sm font-medium text-slate-700 dark:text-slate-300 capitalize">
                                                        {item.type}
                                                    </td>
                                                    <td className="px-6 py-4 text-sm text-slate-700 dark:text-slate-300 truncate max-w-xs">
                                                        {item.type === 'problema' ? item.data.descricao :
                                                            item.type === 'ramal' ? (item.data.numero ? `Ramal ${item.data.numero}` : 'Novo Ramal') :
                                                                item.type === 'linha' ? (item.data.numero ? `Linha ${item.data.numero}` : 'Nova Linha') :
                                                                    (item.data.nome ? `URA ${item.data.nome}` : 'Nova URA')}
                                                    </td>
                                                    <td className="px-6 py-4 text-right flex justify-end gap-2">
                                                        {item.intent !== 'exclusao' && (
                                                            <button
                                                                onClick={() => handleEditItem(idx)}
                                                                className="p-1.5 text-blue-600 dark:text-blue-500 hover:bg-blue-50 dark:hover:bg-blue-500/10 rounded-lg transition-colors"
                                                                title="Editar Solicitação"
                                                            >
                                                                <Edit className="w-4 h-4" />
                                                            </button>
                                                        )}
                                                        <button
                                                            onClick={() => handleRemoveItem(idx)}
                                                            className="p-1.5 text-red-600 dark:text-red-500 hover:bg-red-50 dark:hover:bg-red-500/10 rounded-lg transition-colors"
                                                            title="Remover da lista"
                                                        >
                                                            <Trash2 className="w-4 h-4" />
                                                        </button>
                                                    </td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                )}
                            </div>
                        </div>
                    </div>

                    {/* Footer / Submit */}
                    <div className="p-6 border-t border-slate-100 dark:border-slate-800/60 bg-slate-50 dark:bg-[#111621] mt-auto">
                        <div className="flex justify-end gap-3">
                            <button
                                onClick={onClose}
                                className="px-6 py-2.5 rounded-xl text-sm font-semibold text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-800 transition-colors"
                            >
                                Cancelar
                            </button>
                            <button
                                onClick={handleSubmit}
                                disabled={isSubmitting || solicitacaoItems.length === 0}
                                className="px-6 py-2.5 rounded-xl text-sm font-semibold text-white bg-blue-600 hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed shadow-lg shadow-blue-500/20 hover:shadow-blue-500/30 transition-all flex items-center gap-2"
                            >
                                {isSubmitting ? (
                                    <>
                                        <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                                        Enviando...
                                    </>
                                ) : (
                                    'Enviar Solicitação'
                                )}
                            </button>
                        </div>
                    </div>

                    {/* RENDERING SUB-MODALS */}
                    {activeDraftModal === 'ramal' && (
                        <RamalModalSIP
                            isOpen={true}
                            onClose={() => { setActiveDraftModal(null); setEditingIndex(null); setInventoryItemToEdit(null); }}
                            unitId={selectedUnit?.id}
                            draftMode={true}
                            initialData={inventoryItemToEdit || (editingIndex !== null ? solicitacaoItems[editingIndex].data : null)}
                            onDraftSubmit={(data) => handleAddDraftItem(data, 'ramal', inventoryItemToEdit ? 'edicao' : 'novo', editingIndex !== null, editingIndex)}
                        />
                    )}

                    {activeDraftModal === 'linha' && (
                        <LinhaModal
                            isOpen={true}
                            onClose={() => { setActiveDraftModal(null); setEditingIndex(null); setInventoryItemToEdit(null); }}
                            unitId={selectedUnit?.id}
                            draftMode={true}
                            initialData={inventoryItemToEdit || (editingIndex !== null ? solicitacaoItems[editingIndex].data : null)}
                            onDraftSubmit={(data) => handleAddDraftItem(data, 'linha', inventoryItemToEdit ? 'edicao' : 'novo', editingIndex !== null, editingIndex)}
                        />
                    )}

                    {activeDraftModal === 'ura' && (
                        <UraModal
                            isOpen={true}
                            onClose={() => { setActiveDraftModal(null); setEditingIndex(null); setInventoryItemToEdit(null); }}
                            unitId={selectedUnit?.id}
                            draftMode={true}
                            initialData={inventoryItemToEdit || (editingIndex !== null ? solicitacaoItems[editingIndex].data : null)}
                            onDraftSubmit={(data) => handleAddDraftItem(data, 'ura', inventoryItemToEdit ? 'edicao' : 'novo', editingIndex !== null, editingIndex)}
                        />
                    )}

                    {activeDraftModal === 'problema' && (
                        <div className="fixed inset-0 z-[60] flex items-center justify-center p-4">
                            <div className="absolute inset-0 bg-slate-900/60" onClick={() => setActiveDraftModal(null)}></div>
                            <div className="relative w-full max-w-md bg-white dark:bg-[#1c222d] border border-slate-200 dark:border-slate-800 rounded-xl p-6 shadow-2xl">
                                <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-4 flex gap-2">
                                    <AlertCircle className="w-5 h-5 text-amber-500" />
                                    Informar Problema
                                </h3>
                                <textarea
                                    className="w-full h-32 bg-slate-50 dark:bg-[#111621] border border-slate-200 dark:border-slate-800 rounded-lg p-3 text-slate-900 dark:text-white outline-none focus:ring-2 focus:ring-blue-500 resize-none drop-shadow-sm mb-4 text-sm"
                                    placeholder="Descreva o problema com o máximo de detalhes..."
                                    value={problemaText}
                                    onChange={(e) => setProblemaText(e.target.value)}
                                ></textarea>
                                <div className="flex justify-end gap-2">
                                    <button onClick={() => { setActiveDraftModal(null); setEditingIndex(null); }} className="px-4 py-2 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg text-sm font-medium text-slate-700 dark:text-slate-300">Cancelar</button>
                                    <button onClick={handleProblemaSubmit} className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-sm font-semibold shadow-md">Salvar</button>
                                </div>
                            </div>
                        </div>
                    )}
                </motion.div>
            </div>
        </AnimatePresence>
    );
}
