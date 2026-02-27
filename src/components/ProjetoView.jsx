import React, { useState, useEffect } from 'react';
import { Plus, Pencil, Trash2, ChevronRight, ChevronDown } from 'lucide-react';
import { CadastroProjetoView } from './CadastroProjetoView.jsx';
import { PageHeader } from './ui/PageLayout.jsx';
import { ProtectedRoute } from './ui/ProtectedRoute.jsx';
import { jsPDF } from 'jspdf';
import autoTable from 'jspdf-autotable';

export function ProjetoView({ setPageTitle }) {
    const [expandedRows, setExpandedRows] = useState([]);
    const [viewMode, setViewMode] = useState('list'); // 'list' | 'create'

    useEffect(() => {
        if (setPageTitle) {
            setPageTitle(viewMode === 'create' ? 'Cadastro de Novo Projeto' : 'Gerenciamento de Projetos');
        }
    }, [viewMode, setPageTitle]);

    const toggleRow = (id) => {
        setExpandedRows(prev =>
            prev.includes(id) ? prev.filter(rowId => rowId !== id) : [...prev, id]
        );
    };

    const isExpanded = (id) => expandedRows.includes(id);

    const handleEdit = (id, e) => {
        e.stopPropagation();
        setViewMode('create');
    };

    const handleDelete = (id, e) => {
        e.stopPropagation();
        if (window.confirm("Atenção: Tem certeza que deseja excluir este projeto?")) {
            // Lógica futura de deleção
        }
    };

    if (viewMode === 'create') {
        return <CadastroProjetoView onCancel={() => setViewMode('list')} />;
    }

    const handleExport = () => {
        const doc = new jsPDF();

        doc.setFontSize(16);
        doc.text('Relatório Completo de Projetos', 14, 15);

        const projectData = [
            {
                projeto: 'Expansão Ramais BH - Unidade CIM',
                desc: 'Infraestrutura física',
                progresso: '75%',
                inicio: '01/10/2023',
                deadline: '15/12/2023',
                status: 'Em Andamento',
                itens: [
                    { item: 'Ramal 2005', tipo: 'SIP', status: 'Ativo/Concluído', local: 'Bloco A - Andar 2' },
                    { item: 'Ramal 2006', tipo: 'PABX', status: 'Em migração', local: 'Bloco B - Recepção' },
                    { item: 'Linha 3215-4400', tipo: 'Linha Digital', status: 'Pendente', local: 'Entrada Geral' },
                    { item: 'URA Suporte TI', tipo: 'URA', status: 'Ativo/Concluído', local: 'Data Center' }
                ]
            },
            {
                projeto: 'Upgrade Enlaces Ponto a Ponto OI',
                desc: 'Upgrade de tecnologia',
                progresso: '40%',
                inicio: '15/09/2023',
                deadline: '20/01/2024',
                status: 'Aguardando',
                itens: [
                    { item: 'Linha Principal OI', tipo: 'E1', status: 'Pendente Instalação', local: 'Roteador Borda' }
                ]
            },
            {
                projeto: 'Implantação URA Unificada SENAI',
                desc: 'Melhoria de atendimento',
                progresso: '100%',
                inicio: '01/08/2023',
                deadline: '30/09/2023',
                status: 'Concluído',
                itens: [
                    { item: 'URA SENAI Central', tipo: 'URA', status: 'Ativo/Concluído', local: 'Central Pabx' },
                    { item: 'URA RH', tipo: 'URA', status: 'Ativo/Concluído', local: 'Recursos Humanos' }
                ]
            }
        ];

        let startY = 25;

        projectData.forEach((p, index) => {
            // Tabela principal (Projeto)
            autoTable(doc, {
                startY: startY,
                head: index === 0 ? [['Projeto', 'Progresso', 'Início', 'Deadline', 'Status']] : [],
                body: [
                    [
                        { content: `${p.projeto}\n${p.desc}`, styles: { fontStyle: 'bold' } },
                        { content: p.progresso, styles: { fontStyle: 'bold', halign: 'center' } },
                        { content: p.inicio, styles: { halign: 'center' } },
                        { content: p.deadline, styles: { halign: 'center' } },
                        { content: p.status, styles: { halign: 'center' } }
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
                didDrawCell: (data) => {
                    // Simular a linha azul decorativa que o menu carrega enquanto expandido
                    if (data.row.index === 0 && data.column.index === 0 && data.cell.section === 'body') {
                        doc.setDrawColor(37, 99, 235); // blue-600
                        doc.setLineWidth(1.5);
                        doc.line(data.cell.x + 2, data.cell.y + 2, data.cell.x + 2, data.cell.y + data.cell.height - 2);
                    }
                }
            });

            startY = doc.lastAutoTable.finalY + 2;

            // Subtabela (Itens expandidos)
            if (p.itens && p.itens.length > 0) {
                autoTable(doc, {
                    startY: startY,
                    head: [['ITENS DO PROJETO', 'Tipo', 'Status Individual', 'Localização']],
                    body: p.itens.map(item => [item.item, item.tipo, item.status, item.local]),
                    theme: 'plain',
                    styles: { fontSize: 8, cellPadding: 3, textColor: [100, 116, 139] },
                    headStyles: { textColor: [71, 85, 105], fontStyle: 'bold', fontSize: 7, cellPadding: { top: 4, bottom: 4, left: 3, right: 3 } },
                    margin: { left: 24, right: 14 }, // Indentação simulando UI
                    didDrawCell: (data) => {
                        // Linha decorativa da subtabela
                        if (data.column.index === 0 && data.cell.section === 'body') {
                            doc.setDrawColor(37, 99, 235);
                            doc.setLineWidth(1.5);
                            doc.line(16, data.cell.y, 16, data.cell.y + data.cell.height);
                        } else if (data.column.index === 0 && data.cell.section === 'head') {
                            doc.setDrawColor(37, 99, 235);
                            doc.setLineWidth(1.5);
                            doc.line(16, data.cell.y, 16, data.cell.y + data.cell.height);
                        }
                    }
                });
                startY = doc.lastAutoTable.finalY + 6;
            } else {
                startY += 6;
            }

            if (startY > doc.internal.pageSize.height - 30 && index < projectData.length - 1) {
                doc.addPage();
                startY = 20;
            }
        });

        doc.save('projetos_expandidos_export.pdf');
    };

    return (
        <div className="flex flex-col h-full animate-in slide-in-from-bottom-4 duration-500 overflow-hidden">
            <div className="flex-1 overflow-y-auto p-4 md:p-8">
                <div className="mb-8 pl-1 pr-1">
                    <PageHeader
                        searchPlaceholder="Pesquisar por nome, linha ou unidade..."
                        onSearch={(e) => { }} // Lógica futura de busca
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
                        <p className="text-2xl font-bold mt-1 text-slate-900 dark:text-slate-100">12</p>
                    </div>
                    <div className="p-4 rounded-xl bg-white dark:bg-[#1c222d] border border-slate-200 dark:border-slate-800">
                        <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Em Atraso</p>
                        <p className="text-2xl font-bold mt-1 text-red-500 dark:text-red-400">2</p>
                    </div>
                    <div className="p-4 rounded-xl bg-white dark:bg-[#1c222d] border border-slate-200 dark:border-slate-800">
                        <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Concluídos</p>
                        <p className="text-2xl font-bold mt-1 text-emerald-500 dark:text-emerald-400">48</p>
                    </div>
                    <div className="p-4 rounded-xl bg-white dark:bg-[#1c222d] border border-slate-200 dark:border-slate-800">
                        <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Total Ramais</p>
                        <p className="text-2xl font-bold mt-1 text-blue-600 dark:text-blue-500">1,240</p>
                    </div>
                </div>

                <div className="rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-[#1c222d] overflow-hidden shadow-sm">
                    <div className="overflow-x-auto">
                        <table className="w-full text-left border-separate border-spacing-0">
                            <thead>
                                <tr className="bg-slate-50 dark:bg-slate-800/50 border-b border-slate-200 dark:border-slate-800">
                                    <th className="px-6 py-4 text-xs font-semibold text-slate-500 uppercase tracking-wider border-b border-slate-200 dark:border-slate-800">Projeto</th>
                                    <th className="px-6 py-4 text-center text-xs font-semibold text-slate-500 uppercase tracking-wider border-b border-slate-200 dark:border-slate-800">Progresso</th>
                                    <th className="px-6 py-4 text-center text-xs font-semibold text-slate-500 uppercase tracking-wider border-b border-slate-200 dark:border-slate-800">Início</th>
                                    <th className="px-6 py-4 text-center text-xs font-semibold text-slate-500 uppercase tracking-wider border-b border-slate-200 dark:border-slate-800">Deadline</th>
                                    <th className="px-6 py-4 text-center text-xs font-semibold text-slate-500 uppercase tracking-wider border-b border-slate-200 dark:border-slate-800">Status</th>
                                    <th className="px-6 py-4 text-xs font-semibold text-slate-500 uppercase tracking-wider border-b border-slate-200 dark:border-slate-800 text-right">Ações</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-slate-200 dark:divide-slate-800/50">
                                {/* Row 1 */}
                                <tr
                                    className="hover:bg-slate-50 dark:hover:bg-slate-800/30 transition-colors cursor-pointer group"
                                    onClick={() => toggleRow(1)}
                                >
                                    <td className="px-6 py-5">
                                        <div className="flex items-center gap-3">
                                            {isExpanded(1) ? (
                                                <ChevronDown className="w-5 h-5 text-blue-600 dark:text-blue-500 shrink-0" />
                                            ) : (
                                                <ChevronRight className="w-5 h-5 text-slate-400 shrink-0" />
                                            )}
                                            <div className="flex flex-col">
                                                <span className="text-sm font-bold text-slate-900 dark:text-slate-100">Expansão Ramais BH - Unidade CIM</span>
                                                <span className="text-xs text-slate-500">Infraestrutura física</span>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="px-6 py-5">
                                        <div className="flex flex-col gap-1.5 min-w-[120px] mx-auto">
                                            <div className="flex items-center justify-between text-[11px] font-bold dark:text-slate-300">
                                                <span>75%</span>
                                            </div>
                                            <div className="h-1.5 w-full bg-slate-200 dark:bg-slate-700 rounded-full overflow-hidden">
                                                <div className="h-full bg-blue-600 rounded-full" style={{ width: '75%' }}></div>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="px-6 py-5 text-center text-sm text-slate-600 dark:text-slate-400">01/10/2023</td>
                                    <td className="px-6 py-5 text-center text-sm text-slate-600 dark:text-slate-400 font-medium">15/12/2023</td>
                                    <td className="px-6 py-5 text-center">
                                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-400">
                                            Em Andamento
                                        </span>
                                    </td>
                                    <td className="px-6 py-5 text-right" onClick={(e) => e.stopPropagation()}>
                                        <div className="flex items-center justify-end gap-2">
                                            <ProtectedRoute>
                                                <button onClick={(e) => handleEdit(1, e)} className="p-1.5 rounded-md text-slate-400 hover:text-blue-600 hover:bg-blue-50 dark:hover:bg-blue-500/10 transition-colors" title="Editar">
                                                    <Pencil className="w-5 h-5" />
                                                </button>
                                            </ProtectedRoute>
                                            <ProtectedRoute>
                                                <button onClick={(e) => handleDelete(1, e)} className="p-1.5 rounded-md text-slate-400 hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-500/10 transition-colors" title="Excluir">
                                                    <Trash2 className="w-5 h-5" />
                                                </button>
                                            </ProtectedRoute>
                                        </div>
                                    </td>
                                </tr>

                                {/* Expanded Content 1 */}
                                {isExpanded(1) && (
                                    <tr className="bg-slate-50/50 dark:bg-black/20">
                                        <td className="px-0 py-0" colSpan="6">
                                            <div className="overflow-hidden animate-in slide-in-from-top-2 duration-200">
                                                <div className="px-12 py-4 border-l-4 border-blue-600">
                                                    <div className="text-[11px] font-bold text-slate-400 uppercase tracking-widest mb-3">Itens do Projeto</div>
                                                    <table className="w-full text-sm">
                                                        <thead className="text-slate-500 dark:text-slate-400 border-b border-slate-200 dark:border-slate-700/50">
                                                            <tr>
                                                                <th className="py-2 font-medium text-left">Item</th>
                                                                <th className="py-2 font-medium text-left">Tipo</th>
                                                                <th className="py-2 font-medium text-left">Status Individual</th>
                                                                <th className="py-2 font-medium text-right">Localização</th>
                                                            </tr>
                                                        </thead>
                                                        <tbody className="divide-y divide-slate-200/50 dark:divide-slate-800/30">
                                                            <tr>
                                                                <td className="py-3 font-semibold text-slate-700 dark:text-slate-200">Ramal 2005</td>
                                                                <td className="py-3 text-slate-500 dark:text-slate-400">SIP</td>
                                                                <td className="py-3">
                                                                    <span className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-100/50 text-emerald-700 dark:bg-emerald-500/10 dark:text-emerald-400">
                                                                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
                                                                        Ativo/Concluído
                                                                    </span>
                                                                </td>
                                                                <td className="py-3 text-right text-slate-400">Bloco A - Andar 2</td>
                                                            </tr>
                                                            <tr>
                                                                <td className="py-3 font-semibold text-slate-700 dark:text-slate-200">Ramal 2006</td>
                                                                <td className="py-3 text-slate-500 dark:text-slate-400">PABX</td>
                                                                <td className="py-3">
                                                                    <span className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full text-[10px] font-bold bg-amber-100/50 text-amber-700 dark:bg-amber-500/10 dark:text-amber-400">
                                                                        <span className="w-1.5 h-1.5 rounded-full bg-amber-500"></span>
                                                                        Em migração
                                                                    </span>
                                                                </td>
                                                                <td className="py-3 text-right text-slate-400">Bloco B - Recepção</td>
                                                            </tr>
                                                            <tr>
                                                                <td className="py-3 font-semibold text-slate-700 dark:text-slate-200">Linha 3215-4400</td>
                                                                <td className="py-3 text-slate-500 dark:text-slate-400">Linha Digital</td>
                                                                <td className="py-3">
                                                                    <span className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full text-[10px] font-bold bg-blue-100/50 text-blue-700 dark:bg-blue-500/10 dark:text-blue-400">
                                                                        <span className="w-1.5 h-1.5 rounded-full bg-blue-500"></span>
                                                                        Pendente
                                                                    </span>
                                                                </td>
                                                                <td className="py-3 text-right text-slate-400">Entrada Geral</td>
                                                            </tr>
                                                            <tr>
                                                                <td className="py-3 font-semibold text-slate-700 dark:text-slate-200">URA Suporte TI</td>
                                                                <td className="py-3 text-slate-500 dark:text-slate-400">URA</td>
                                                                <td className="py-3">
                                                                    <span className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-100/50 text-emerald-700 dark:bg-emerald-500/10 dark:text-emerald-400">
                                                                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
                                                                        Ativo/Concluído
                                                                    </span>
                                                                </td>
                                                                <td className="py-3 text-right text-slate-400">Data Center</td>
                                                            </tr>
                                                        </tbody>
                                                    </table>
                                                </div>
                                            </div>
                                        </td>
                                    </tr>
                                )}

                                {/* Row 2 */}
                                <tr
                                    className="hover:bg-slate-50 dark:hover:bg-slate-800/30 transition-colors cursor-pointer"
                                    onClick={() => toggleRow(2)}
                                >
                                    <td className="px-6 py-5">
                                        <div className="flex items-center gap-3">
                                            {isExpanded(2) ? (
                                                <ChevronDown className="w-5 h-5 text-blue-600 dark:text-blue-500 shrink-0" />
                                            ) : (
                                                <ChevronRight className="w-5 h-5 text-slate-400 shrink-0" />
                                            )}
                                            <div className="flex flex-col">
                                                <span className="text-sm font-bold text-slate-900 dark:text-slate-100">Migração VoIP Regional Norte</span>
                                                <span className="text-xs text-slate-500">Upgrade de tecnologia</span>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="px-6 py-5">
                                        <div className="flex flex-col gap-1.5 min-w-[120px] mx-auto">
                                            <div className="flex items-center justify-between text-[11px] font-bold dark:text-slate-300">
                                                <span>40%</span>
                                            </div>
                                            <div className="h-1.5 w-full bg-slate-200 dark:bg-slate-700 rounded-full overflow-hidden">
                                                <div className="h-full bg-blue-600 rounded-full" style={{ width: '40%' }}></div>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="px-6 py-5 text-center text-sm text-slate-600 dark:text-slate-400">15/09/2023</td>
                                    <td className="px-6 py-5 text-center text-sm text-slate-600 dark:text-slate-400 font-medium">20/01/2024</td>
                                    <td className="px-6 py-5 text-center">
                                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-slate-100 text-slate-800 dark:bg-slate-700 dark:text-slate-300">
                                            Aguardando
                                        </span>
                                    </td>
                                    <td className="px-6 py-5 text-right" onClick={(e) => e.stopPropagation()}>
                                        <div className="flex items-center justify-end gap-2">
                                            <ProtectedRoute>
                                                <button onClick={(e) => handleEdit(2, e)} className="p-1.5 rounded-md text-slate-400 hover:text-blue-600 hover:bg-blue-50 dark:hover:bg-blue-500/10 transition-colors" title="Editar">
                                                    <Pencil className="w-5 h-5" />
                                                </button>
                                            </ProtectedRoute>
                                            <ProtectedRoute>
                                                <button onClick={(e) => handleDelete(2, e)} className="p-1.5 rounded-md text-slate-400 hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-500/10 transition-colors" title="Excluir">
                                                    <Trash2 className="w-5 h-5" />
                                                </button>
                                            </ProtectedRoute>
                                        </div>
                                    </td>
                                </tr>

                                {/* Expanded Content 2 */}
                                {isExpanded(2) && (
                                    <tr className="bg-slate-50/50 dark:bg-black/20">
                                        <td className="px-0 py-0" colSpan="6">
                                            <div className="overflow-hidden animate-in slide-in-from-top-2 duration-200">
                                                <div className="px-12 py-4 border-l-4 border-blue-600">
                                                    <div className="text-[11px] font-bold text-slate-400 uppercase tracking-widest mb-3">Nenhum item adicionado</div>
                                                </div>
                                            </div>
                                        </td>
                                    </tr>
                                )}

                                {/* Row 3 */}
                                <tr
                                    className="hover:bg-slate-50 dark:hover:bg-slate-800/30 transition-colors cursor-pointer"
                                    onClick={() => toggleRow(3)}
                                >
                                    <td className="px-6 py-5">
                                        <div className="flex items-center gap-3">
                                            {isExpanded(3) ? (
                                                <ChevronDown className="w-5 h-5 text-blue-600 dark:text-blue-500 shrink-0" />
                                            ) : (
                                                <ChevronRight className="w-5 h-5 text-slate-400 shrink-0" />
                                            )}
                                            <div className="flex flex-col">
                                                <span className="text-sm font-bold text-slate-900 dark:text-slate-100">Manutenção Linhas FIEMG Sede</span>
                                                <span className="text-xs text-slate-500">Reparo preventivo</span>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="px-6 py-5">
                                        <div className="flex flex-col gap-1.5 min-w-[120px] mx-auto">
                                            <div className="flex items-center justify-between text-[11px] font-bold dark:text-slate-300">
                                                <span>100%</span>
                                            </div>
                                            <div className="h-1.5 w-full bg-slate-200 dark:bg-slate-700 rounded-full overflow-hidden">
                                                <div className="h-full bg-emerald-500 rounded-full" style={{ width: '100%' }}></div>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="px-6 py-5 text-center text-sm text-slate-600 dark:text-slate-400">01/08/2023</td>
                                    <td className="px-6 py-5 text-center text-sm text-slate-600 dark:text-slate-400 font-medium">30/09/2023</td>
                                    <td className="px-6 py-5 text-center">
                                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-emerald-100 text-emerald-800 dark:bg-emerald-900/30 dark:text-emerald-400">
                                            Concluído
                                        </span>
                                    </td>
                                    <td className="px-6 py-5 text-right" onClick={(e) => e.stopPropagation()}>
                                        <div className="flex items-center justify-end gap-2">
                                            <ProtectedRoute>
                                                <button onClick={(e) => handleEdit(3, e)} className="p-1.5 rounded-md text-slate-400 hover:text-blue-600 hover:bg-blue-50 dark:hover:bg-blue-500/10 transition-colors" title="Editar">
                                                    <Pencil className="w-5 h-5" />
                                                </button>
                                            </ProtectedRoute>
                                            <ProtectedRoute>
                                                <button onClick={(e) => handleDelete(3, e)} className="p-1.5 rounded-md text-slate-400 hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-500/10 transition-colors" title="Excluir">
                                                    <Trash2 className="w-5 h-5" />
                                                </button>
                                            </ProtectedRoute>
                                        </div>
                                    </td>
                                </tr>
                                {/* Expanded Content 3 */}
                                {isExpanded(3) && (
                                    <tr className="bg-slate-50/50 dark:bg-black/20">
                                        <td className="px-0 py-0" colSpan="6">
                                            <div className="overflow-hidden animate-in slide-in-from-top-2 duration-200">
                                                <div className="px-12 py-4 border-l-4 border-blue-600">
                                                    <div className="text-[11px] font-bold text-slate-400 uppercase tracking-widest mb-3">Nenhum item adicionado</div>
                                                </div>
                                            </div>
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    );
}
