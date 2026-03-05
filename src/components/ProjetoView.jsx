import React, { useState, useEffect } from 'react';
import { Plus, Pencil, Trash2, ChevronRight, ChevronDown, Loader2, Check, X, MessageSquarePlus } from 'lucide-react';
import { CadastroProjetoView } from './CadastroProjetoView.jsx';
import { PageHeader } from './ui/PageLayout.jsx';
import { ProtectedRoute } from './ui/ProtectedRoute.jsx';
import { jsPDF } from 'jspdf';
import autoTable from 'jspdf-autotable';
import { useSupabaseTable } from '../hooks/useSupabaseTable.js';
import { supabase } from '../lib/supabase.js';
import { convertToCamel } from '../lib/utils.js';
import { useAuth } from '../contexts/AuthContext.jsx';

export function ProjetoView({ setPageTitle }) {
    const { hasRole } = useAuth();
    const [expandedRows, setExpandedRows] = useState([]);
    const [viewMode, setViewMode] = useState('list'); // 'list' | 'create'

    const { data: projetos, isLoading, fetchData, deleteRecord } = useSupabaseTable({
        tableName: 'projetos',
        selectQuery: 'id, nome, descricao, unidade_id, progresso, data_inicio, deadline, chamado, status, created_at, unidades(nome)',
        order: { column: 'created_at', ascending: false }
    });

    // Sub-itens expandidos: cache local
    const [projetoItensMap, setProjetoItensMap] = useState({});

    // Edit mode
    const [editingProjetoId, setEditingProjetoId] = useState(null);
    const [editedItems, setEditedItems] = useState({}); // { itemId: { statusItem, observacao } }
    const [editedProjectStatus, setEditedProjectStatus] = useState({});
    const [editingObsId, setEditingObsId] = useState(null); // item id currently editing observation
    const [tempObs, setTempObs] = useState('');

    useEffect(() => {
        if (setPageTitle) {
            setPageTitle(viewMode === 'create' ? 'Cadastro de Novo Projeto' : 'Gerenciamento de Projetos');
        }
    }, [viewMode, setPageTitle]);

    const toggleRow = async (id) => {
        if (expandedRows.includes(id)) {
            setExpandedRows(prev => prev.filter(rowId => rowId !== id));
        } else {
            setExpandedRows(prev => [...prev, id]);
            // Carregar itens do projeto se ainda não carregados
            if (!projetoItensMap[id]) {
                const { data, error } = await supabase
                    .from('projeto_itens')
                    .select('id, item_tipo, item_id, item_label, status_item, observacao')
                    .eq('projeto_id', id);
                if (!error) {
                    setProjetoItensMap(prev => ({ ...prev, [id]: convertToCamel(data) || [] }));
                } else {
                    console.error(`Erro ao buscar itens do projeto ${id}:`, error);
                }
            }
        }
    };

    const isExpanded = (id) => expandedRows.includes(id);

    const handleEdit = async (id, e) => {
        e.stopPropagation();
        // Ensure row is expanded and items loaded
        if (!expandedRows.includes(id)) {
            await toggleRow(id);
        }
        // Initialize edited items from current data
        const items = projetoItensMap[id] || [];
        const edits = {};
        items.forEach(item => {
            edits[item.id] = { statusItem: item.statusItem || 'Agendado', observacao: item.observacao || '' };
        });
        setEditedItems(edits);
        setEditedProjectStatus({ [id]: projetos.find(p => p.id === id)?.status || 'Em Andamento' });
        setEditingProjetoId(id);
    };

    const handleSaveEdits = async (projetoId) => {
        try {
            const items = projetoItensMap[projetoId] || [];
            const updates = items.map(item => {
                const edited = editedItems[item.id];
                if (!edited) return null;
                return supabase
                    .from('projeto_itens')
                    .update({ status_item: edited.statusItem, observacao: edited.observacao })
                    .eq('id', item.id);
            }).filter(Boolean);

            await Promise.all(updates);

            // Calcular novo progresso
            const totalItems = items.length;
            const completedItems = items.filter(item => {
                const edited = editedItems[item.id];
                const status = edited ? edited.statusItem : item.statusItem;
                return status === 'Concluído';
            }).length;
            const newProgress = totalItems > 0 ? Math.round((completedItems / totalItems) * 100) : 0;
            const newProjectStatus = newProgress === 100 ? 'Concluído' : 'Em Andamento';

            // Atualizar projeto no banco (usando snake_case para chamada direta)
            await supabase
                .from('projetos')
                .update({ progresso: newProgress, status: newProjectStatus })
                .eq('id', projetoId);

            // Update local cache
            setProjetoItensMap(prev => ({
                ...prev,
                [projetoId]: items.map(item => ({
                    ...item,
                    statusItem: editedItems[item.id]?.statusItem || item.statusItem,
                    observacao: editedItems[item.id]?.observacao || item.observacao
                }))
            }));

            // Refresh projetos list to show new progress/status
            fetchData();

            setEditingProjetoId(null);
            setEditedItems({});
            setEditedProjectStatus({});
            setEditingObsId(null);
        } catch (err) {
            console.error('Erro ao salvar edições:', err);
            alert('Erro ao salvar: ' + (err.message || ''));
        }
    };

    const handleCancelEdit = () => {
        setEditingProjetoId(null);
        setEditedItems({});
        setEditedProjectStatus({});
        setEditingObsId(null);
    };

    const handleDeleteItem = async (projetoId, itemId) => {
        if (!window.confirm('Deseja remover este item do projeto?')) return;
        try {
            await supabase.from('projeto_itens').delete().eq('id', itemId);
            setProjetoItensMap(prev => ({
                ...prev,
                [projetoId]: (prev[projetoId] || []).filter(i => i.id !== itemId)
            }));
            const { [itemId]: _, ...rest } = editedItems;
            setEditedItems(rest);
        } catch (err) {
            console.error('Erro ao excluir item:', err);
        }
    };

    const handleDelete = async (id, e) => {
        e.stopPropagation();
        if (window.confirm("Atenção: Tem certeza que deseja excluir este projeto e todos os seus itens?")) {
            await deleteRecord(id);
        }
    };

    const handleApprove = async (id, e) => {
        e.stopPropagation();
        if (!window.confirm("Deseja aprovar esta solicitação e iniciar o projeto?")) return;
        try {
            await supabase.from('projetos').update({ status: 'Em Andamento' }).eq('id', id);
            fetchData();
        } catch (err) {
            alert('Erro ao aprovar: ' + err.message);
        }
    };

    const handleReject = async (id, e) => {
        e.stopPropagation();
        if (!window.confirm("Deseja rejeitar e cancelar esta solicitação?")) return;
        try {
            await supabase.from('projetos').update({ status: 'Cancelado' }).eq('id', id);
            fetchData();
        } catch (err) {
            alert('Erro ao rejeitar: ' + err.message);
        }
    };

    if (viewMode === 'create') {
        return <CadastroProjetoView onCancel={() => { setViewMode('list'); fetchData(); }} />;
    }

    const totalAtivos = projetos.filter(p => p.status === 'Em Andamento').length;
    const totalAtraso = projetos.filter(p => {
        if (!p.deadline) return false;
        return new Date(p.deadline) < new Date() && p.status !== 'Concluído';
    }).length;
    const totalConcluidos = projetos.filter(p => p.status === 'Concluído').length;
    const totalPendentes = projetos.filter(p => p.status === 'Pendente' || p.status === 'Aguardando').length;

    const formatDate = (dateStr) => {
        if (!dateStr) return '—';
        const d = new Date(dateStr);
        return d.toLocaleDateString('pt-BR');
    };

    const getStatusBadgeClasses = (status) => {
        switch (status) {
            case 'Em Andamento':
                return 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400';
            case 'Concluído':
                return 'bg-emerald-100 text-emerald-800 dark:bg-emerald-900/30 dark:text-emerald-400';
            case 'Pendente':
            case 'Aguardando':
                return 'bg-amber-100 text-amber-800 dark:bg-amber-700/30 dark:text-amber-300 border border-amber-200 dark:border-amber-700/50';
            case 'Cancelado':
                return 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400 border border-red-200 dark:border-red-900/50';
            default:
                return 'bg-slate-100 text-slate-800 dark:bg-slate-800 dark:text-slate-400';
        }
    };

    const getItemStatusBadge = (status) => {
        switch (status) {
            case 'Concluído':
                return 'bg-emerald-100/50 text-emerald-700 dark:bg-emerald-500/10 dark:text-emerald-400';
            case 'Em andamento':
                return 'bg-amber-100/50 text-amber-700 dark:bg-amber-500/10 dark:text-amber-400';
            case 'Problema':
                return 'bg-red-100/50 text-red-700 dark:bg-red-500/10 dark:text-red-400';
            default:
                return 'bg-blue-100/50 text-blue-700 dark:bg-blue-500/10 dark:text-blue-400';
        }
    };

    const handleExport = () => {
        const doc = new jsPDF();
        doc.setFontSize(16);
        doc.text('Relatório de Projetos', 14, 15);
        doc.setFontSize(9);
        doc.setTextColor(120);
        doc.text(`Gerado em ${new Date().toLocaleDateString('pt-BR')} — ${projetos.length} projeto(s)`, 14, 22);

        let startY = 30;

        projetos.forEach((p, index) => {
            autoTable(doc, {
                startY: startY,
                head: index === 0 ? [['Projeto', 'Progresso', 'Início', 'Prazo', 'Status']] : [],
                body: [
                    [
                        { content: `${p.nome}\n${p.descricao || ''}`, styles: { fontStyle: 'bold' } },
                        { content: `${p.progresso || 0}%`, styles: { fontStyle: 'bold', halign: 'center' } },
                        { content: formatDate(p.dataInicio), styles: { halign: 'center' } },
                        { content: formatDate(p.deadline), styles: { halign: 'center' } },
                        { content: p.status || 'Em Andamento', styles: { halign: 'center' } }
                    ]
                ],
                theme: 'plain',
                styles: { fontSize: 9, cellPadding: 4 },
                headStyles: { fillColor: [30, 41, 59], textColor: 255, fontSize: 8 },
                columnStyles: {
                    0: { cellWidth: 70 },
                    1: { cellWidth: 25 },
                    2: { cellWidth: 30 },
                    3: { cellWidth: 30 },
                    4: { cellWidth: 35 }
                },
            });

            startY = doc.lastAutoTable.finalY + 2;

            const itens = projetoItensMap[p.id] || [];
            if (itens.length > 0) {
                autoTable(doc, {
                    startY: startY,
                    head: [['Item', 'Tipo', 'Status', 'Obs.']],
                    body: itens.map(item => [item.itemLabel || '—', item.itemTipo, item.statusItem || 'Agendado', item.observacao || '']),
                    theme: 'plain',
                    styles: { fontSize: 8, cellPadding: 3, textColor: [100, 116, 139] },
                    headStyles: { textColor: [71, 85, 105], fontStyle: 'bold', fontSize: 7 },
                    margin: { left: 24, right: 14 },
                });
                startY = doc.lastAutoTable.finalY + 6;
            } else {
                startY += 6;
            }

            if (startY > doc.internal.pageSize.height - 30 && index < projetos.length - 1) {
                doc.addPage();
                startY = 20;
            }
        });

        doc.save('projetos_export.pdf');
    };

    return (
        <div className="flex flex-col h-full animate-in slide-in-from-bottom-4 duration-500 overflow-hidden">
            <div className="flex-1 overflow-y-auto p-4 md:p-8">
                <div className="mb-8 pl-1 pr-1">
                    <PageHeader
                        searchPlaceholder="Pesquisar por nome, linha ou unidade..."
                        onSearch={(e) => { }}
                        onExport={handleExport}
                        primaryAction={{
                            label: 'Novo Projeto',
                            icon: <Plus className="w-4 h-4" />,
                            onClick: () => setViewMode('create')
                        }}
                    />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 mb-8">
                    <div className="p-4 rounded-xl bg-white dark:bg-[#1c222d] border border-slate-200 dark:border-slate-800">
                        <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Ativos</p>
                        <p className="text-2xl font-bold mt-1 text-slate-900 dark:text-slate-100">{totalAtivos}</p>
                    </div>
                    <div className="p-4 rounded-xl bg-white dark:bg-[#1c222d] border border-slate-200 dark:border-slate-800">
                        <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Em Atraso</p>
                        <p className="text-2xl font-bold mt-1 text-red-500 dark:text-red-400">{totalAtraso}</p>
                    </div>
                    <div className="p-4 rounded-xl bg-white dark:bg-[#1c222d] border border-slate-200 dark:border-slate-800">
                        <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Concluídos</p>
                        <p className="text-2xl font-bold mt-1 text-emerald-500 dark:text-emerald-400">{totalConcluidos}</p>
                    </div>
                    <div className="p-4 rounded-xl bg-white dark:bg-[#1c222d] border border-slate-200 dark:border-slate-800">
                        <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Pendente de aprovação</p>
                        <p className="text-2xl font-bold mt-1 text-amber-500 dark:text-amber-400">{totalPendentes}</p>
                    </div>
                </div>

                <div className="rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-[#1c222d] overflow-hidden shadow-sm">
                    {isLoading ? (
                        <div className="flex items-center justify-center py-16">
                            <Loader2 className="w-8 h-8 text-blue-500 animate-spin" />
                        </div>
                    ) : projetos.length === 0 ? (
                        <div className="text-center py-16 text-slate-500 dark:text-slate-400">
                            <p className="text-lg font-semibold">Nenhum projeto cadastrado</p>
                            <p className="text-sm mt-1">Clique em "Novo Projeto" para começar.</p>
                        </div>
                    ) : (
                        <div className="overflow-x-auto">
                            <table className="w-full text-left border-separate border-spacing-0">
                                <thead>
                                    <tr className="bg-slate-50 dark:bg-slate-800/50 border-b border-slate-200 dark:border-slate-800">
                                        <th className="px-6 py-4 text-xs font-semibold text-slate-500 uppercase tracking-wider border-b border-slate-200 dark:border-slate-800">Projeto</th>
                                        <th className="px-6 py-4 text-center text-xs font-semibold text-slate-500 uppercase tracking-wider border-b border-slate-200 dark:border-slate-800">Progresso</th>
                                        <th className="px-6 py-4 text-center text-xs font-semibold text-slate-500 uppercase tracking-wider border-b border-slate-200 dark:border-slate-800">Início</th>
                                        <th className="px-6 py-4 text-center text-xs font-semibold text-slate-500 uppercase tracking-wider border-b border-slate-200 dark:border-slate-800">Prazo</th>
                                        <th className="px-6 py-4 text-center text-xs font-semibold text-slate-500 uppercase tracking-wider border-b border-slate-200 dark:border-slate-800">Status</th>
                                        <th className="px-6 py-4 text-xs font-semibold text-slate-500 uppercase tracking-wider border-b border-slate-200 dark:border-slate-800 text-right">Ações</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-slate-200 dark:divide-slate-800/50">
                                    {projetos.map(projeto => (
                                        <React.Fragment key={projeto.id}>
                                            <tr
                                                className="hover:bg-slate-50 dark:hover:bg-slate-800/30 transition-colors cursor-pointer group"
                                                onClick={() => toggleRow(projeto.id)}
                                            >
                                                <td className="px-6 py-5">
                                                    <div className="flex items-center gap-3">
                                                        {isExpanded(projeto.id) ? (
                                                            <ChevronDown className="w-5 h-5 text-blue-600 dark:text-blue-500 shrink-0" />
                                                        ) : (
                                                            <ChevronRight className="w-5 h-5 text-slate-400 shrink-0" />
                                                        )}
                                                        <div className="flex flex-col">
                                                            <span className="text-sm font-bold text-slate-900 dark:text-slate-100">{projeto.nome}</span>
                                                            <span className="text-xs text-blue-600 dark:text-blue-400 font-medium">{projeto.unidades?.nome || 'Sem Unidade Atribuída'}</span>
                                                        </div>
                                                    </div>
                                                </td>
                                                <td className="px-6 py-5">
                                                    <div className="flex flex-col gap-1.5 min-w-[120px] mx-auto">
                                                        <div className="flex items-center justify-between text-[11px] font-bold dark:text-slate-300">
                                                            <span>{projeto.progresso || 0}%</span>
                                                        </div>
                                                        <div className="h-1.5 w-full bg-slate-200 dark:bg-slate-700 rounded-full overflow-hidden">
                                                            <div
                                                                className={`h-full rounded-full ${(projeto.progresso || 0) >= 100 ? 'bg-emerald-500' : 'bg-blue-600'}`}
                                                                style={{ width: `${projeto.progresso || 0}%` }}
                                                            ></div>
                                                        </div>
                                                    </div>
                                                </td>
                                                <td className="px-6 py-5 text-center text-sm text-slate-600 dark:text-slate-400">{formatDate(projeto.dataInicio)}</td>
                                                <td className="px-6 py-5 text-center text-sm text-slate-600 dark:text-slate-400 font-medium">{formatDate(projeto.deadline)}</td>
                                                <td className="px-6 py-5 text-center">
                                                    <div className="flex items-center justify-center gap-2">
                                                        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusBadgeClasses(projeto.status)}`}>
                                                            {projeto.status || 'Em Andamento'}
                                                        </span>
                                                        {editingProjetoId === projeto.id && (
                                                            <button
                                                                onClick={(e) => { e.stopPropagation(); setViewMode('create'); }}
                                                                className="p-1 rounded-md text-slate-400 hover:text-blue-600 hover:bg-blue-50 dark:hover:bg-blue-500/10 transition-colors"
                                                                title="Editar Projeto"
                                                            >
                                                                <Pencil className="w-4 h-4" />
                                                            </button>
                                                        )}
                                                    </div>
                                                </td>
                                                <td className="px-6 py-5 text-right" onClick={(e) => e.stopPropagation()}>
                                                    <div className="flex items-center justify-end gap-2">
                                                        {editingProjetoId === projeto.id ? (
                                                            <>
                                                                <button onClick={() => handleSaveEdits(projeto.id)} className="flex items-center gap-1.5 px-3 py-1.5 rounded-md text-white bg-[#00875a] hover:bg-[#00744d] transition-colors" title="Salvar">
                                                                    <Check className="w-4 h-4" /> <span className="text-sm font-medium leading-none mt-0.5">Salvar</span>
                                                                </button>
                                                                <button onClick={handleCancelEdit} className="flex items-center gap-1.5 px-3 py-1.5 rounded-md text-white bg-[#344054] hover:bg-[#202939] transition-colors" title="Cancelar">
                                                                    <X className="w-4 h-4" /> <span className="text-sm font-medium leading-none mt-0.5">Cancelar</span>
                                                                </button>
                                                            </>
                                                        ) : (
                                                            <>
                                                                {hasRole('Administrador') && (projeto.status === 'Pendente' || projeto.status === 'Aguardando') && (
                                                                    <>
                                                                        <button onClick={(e) => handleApprove(projeto.id, e)} className="p-1.5 rounded-md text-slate-400 hover:text-emerald-600 hover:bg-emerald-50 dark:hover:bg-emerald-500/10 transition-colors" title="Aprovar Solicitação">
                                                                            <Check className="w-5 h-5" />
                                                                        </button>
                                                                        <button onClick={(e) => handleReject(projeto.id, e)} className="p-1.5 rounded-md text-slate-400 hover:text-amber-600 hover:bg-amber-50 dark:hover:bg-amber-500/10 transition-colors" title="Rejeitar/Cancelar">
                                                                            <X className="w-5 h-5" />
                                                                        </button>
                                                                    </>
                                                                )}
                                                                <ProtectedRoute>
                                                                    <button onClick={(e) => handleEdit(projeto.id, e)} className="p-1.5 rounded-md text-slate-400 hover:text-blue-600 hover:bg-blue-50 dark:hover:bg-blue-500/10 transition-colors" title="Editar">
                                                                        <Pencil className="w-5 h-5" />
                                                                    </button>
                                                                </ProtectedRoute>
                                                                <ProtectedRoute>
                                                                    <button onClick={(e) => handleDelete(projeto.id, e)} className="p-1.5 rounded-md text-slate-400 hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-500/10 transition-colors" title="Excluir">
                                                                        <Trash2 className="w-5 h-5" />
                                                                    </button>
                                                                </ProtectedRoute>
                                                            </>
                                                        )}
                                                    </div>
                                                </td>
                                            </tr>

                                            {/* Expanded Content */}
                                            {isExpanded(projeto.id) && (
                                                <tr className="bg-slate-50/50 dark:bg-black/20">
                                                    <td className="px-0 py-0" colSpan="6">
                                                        <div className="overflow-hidden animate-in slide-in-from-top-2 duration-200">
                                                            <div className="px-12 py-4 border-l-4 border-blue-600">
                                                                {!projetoItensMap[projeto.id] ? (
                                                                    <div className="flex items-center gap-2 py-2">
                                                                        <Loader2 className="w-4 h-4 text-blue-500 animate-spin" />
                                                                        <span className="text-xs text-slate-500">Carregando itens...</span>
                                                                    </div>
                                                                ) : projetoItensMap[projeto.id].length === 0 ? (
                                                                    <div className="text-[11px] font-bold text-slate-400 uppercase tracking-widest">Nenhum item adicionado</div>
                                                                ) : (
                                                                    <>
                                                                        <div className="flex items-center justify-between mb-3">
                                                                            <div className="text-[11px] font-bold text-slate-400 uppercase tracking-widest">Itens do Projeto</div>
                                                                        </div>
                                                                        <table className="w-full text-sm">
                                                                            <thead className="text-slate-500 dark:text-slate-400 border-b border-slate-200 dark:border-slate-700/50">
                                                                                <tr>
                                                                                    <th className="py-2 font-medium text-left">Item</th>
                                                                                    <th className="py-2 font-medium text-left">Tipo</th>
                                                                                    <th className="py-2 font-medium text-left">Status</th>
                                                                                    <th className="py-2 font-medium text-left">Observação</th>
                                                                                    {editingProjetoId === projeto.id && (
                                                                                        <th className="py-2 font-medium text-right">Ações</th>
                                                                                    )}
                                                                                </tr>
                                                                            </thead>
                                                                            <tbody className="divide-y divide-slate-200/50 dark:divide-slate-800/30">
                                                                                {projetoItensMap[projeto.id].map(item => (
                                                                                    <tr key={item.id}>
                                                                                        <td className="py-3 font-semibold text-slate-700 dark:text-slate-200">{item.itemLabel || '—'}</td>
                                                                                        <td className="py-3 text-slate-500 dark:text-slate-400 capitalize">{item.itemTipo}</td>
                                                                                        <td className="py-3">
                                                                                            {editingProjetoId === projeto.id ? (
                                                                                                <select
                                                                                                    className="bg-white dark:bg-[#111621] border border-slate-200 dark:border-slate-700 rounded-lg px-2 py-1.5 text-xs focus:ring-2 focus:ring-blue-500 outline-none cursor-pointer text-slate-700 dark:text-slate-200"
                                                                                                    value={editedItems[item.id]?.statusItem || item.statusItem || 'Agendado'}
                                                                                                    onChange={(e) => setEditedItems(prev => ({ ...prev, [item.id]: { ...prev[item.id], statusItem: e.target.value } }))}
                                                                                                >
                                                                                                    <option value="Agendado">Agendado</option>
                                                                                                    <option value="Validado">Validado</option>
                                                                                                    <option value="Em andamento">Em andamento</option>
                                                                                                    <option value="Concluído">Concluído</option>
                                                                                                    <option value="Problema">Problema</option>
                                                                                                </select>
                                                                                            ) : (
                                                                                                <span className={`inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full text-[10px] font-bold ${getItemStatusBadge(item.statusItem)}`}>
                                                                                                    <span className="w-1.5 h-1.5 rounded-full bg-current"></span>
                                                                                                    {item.statusItem || 'Agendado'}
                                                                                                </span>
                                                                                            )}
                                                                                        </td>
                                                                                        <td className="py-3">
                                                                                            {editingProjetoId === projeto.id ? (
                                                                                                editingObsId === item.id ? (
                                                                                                    <div className="flex items-center gap-2">
                                                                                                        <input
                                                                                                            className="flex-1 bg-white dark:bg-[#111621] border border-slate-200 dark:border-slate-700 rounded-lg px-2 py-1.5 text-xs outline-none focus:ring-2 focus:ring-blue-500 text-slate-700 dark:text-slate-200"
                                                                                                            value={tempObs}
                                                                                                            onChange={(e) => setTempObs(e.target.value)}
                                                                                                            placeholder="Digite a observação..."
                                                                                                            autoFocus
                                                                                                        />
                                                                                                        <button onClick={() => { setEditedItems(prev => ({ ...prev, [item.id]: { ...prev[item.id], observacao: tempObs } })); setEditingObsId(null); }} className="p-1 text-emerald-600 hover:bg-emerald-50 dark:hover:bg-emerald-900/20 rounded transition-colors" title="Confirmar">
                                                                                                            <Check className="w-4 h-4" />
                                                                                                        </button>
                                                                                                        <button onClick={() => setEditingObsId(null)} className="p-1 text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 rounded transition-colors" title="Cancelar">
                                                                                                            <X className="w-4 h-4" />
                                                                                                        </button>
                                                                                                    </div>
                                                                                                ) : (
                                                                                                    <button
                                                                                                        onClick={() => { setTempObs(editedItems[item.id]?.observacao || item.observacao || ''); setEditingObsId(item.id); }}
                                                                                                        className="flex items-center gap-1.5 text-xs text-slate-500 hover:text-blue-600 transition-colors"
                                                                                                        title="Editar observação"
                                                                                                    >
                                                                                                        <MessageSquarePlus className="w-3.5 h-3.5" />
                                                                                                        <span className="truncate max-w-[150px]">{editedItems[item.id]?.observacao || item.observacao || 'Adicionar...'}</span>
                                                                                                    </button>
                                                                                                )
                                                                                            ) : (
                                                                                                <span className="text-slate-400 truncate max-w-[200px] block">{item.observacao || '—'}</span>
                                                                                            )}
                                                                                        </td>
                                                                                        {editingProjetoId === projeto.id && (
                                                                                            <td className="py-3 text-right">
                                                                                                <div className="flex items-center justify-end gap-1">
                                                                                                    <button
                                                                                                        onClick={() => handleDeleteItem(projeto.id, item.id)}
                                                                                                        className="p-1.5 rounded-md text-slate-400 hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-500/10 transition-colors"
                                                                                                        title="Remover item"
                                                                                                    >
                                                                                                        <Trash2 className="w-4 h-4" />
                                                                                                    </button>
                                                                                                </div>
                                                                                            </td>
                                                                                        )}
                                                                                    </tr>
                                                                                ))}
                                                                            </tbody>
                                                                        </table>
                                                                    </>
                                                                )}
                                                            </div>
                                                        </div>
                                                    </td>
                                                </tr>
                                            )}
                                        </React.Fragment>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
