import React, { useState, useMemo } from 'react';
import { Plus, Pencil, Trash2 } from 'lucide-react';
import { LinhaModal } from './LinhaModal.jsx';
import { useSupabaseTable } from '../hooks/useSupabaseTable.js';
import { PageHeader, ContentContainer } from './ui/PageLayout.jsx';
import { ProtectedRoute } from './ui/ProtectedRoute.jsx';
import { exportToPDF } from '../lib/exportUtils.js';

export function LinesView() {
    const { data: lines, isLoading, saveRecord, deleteRecord, setData: setLines } = useSupabaseTable({
        tableName: 'linhas',
        selectQuery: '*, unidades(nome)',
        order: { column: 'numero', ascending: true }
    });

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [linhaToEdit, setLinhaToEdit] = useState(null);
    const [searchTerm, setSearchTerm] = useState('');

    const filteredLines = useMemo(() => {
        if (!searchTerm) return lines;
        const lowerTerm = searchTerm.toLowerCase();
        return lines.filter(line =>
            line.numero?.toLowerCase().includes(lowerTerm) ||
            line.operadora?.toLowerCase().includes(lowerTerm)
        );
    }, [lines, searchTerm]);

    async function handleSaveLinha(linhaData) {
        const result = await saveRecord(linhaData);
        if (result.success) {
            setIsModalOpen(false);
            setLinhaToEdit(null);
        } else {
            console.error('Error saving line:', result.error);
        }
    }

    async function handleDeleteLinha(id) {
        if (!window.confirm("Atenção: Tem certeza que deseja excluir esta linha?")) return;

        const result = await deleteRecord(id);
        if (!result.success) {
            setLines(lines.filter(l => l.id !== id));
        }
    }

    function handleOpenNew() {
        setLinhaToEdit(null);
        setIsModalOpen(true);
    }

    function handleOpenEdit(linha) {
        setLinhaToEdit(linha);
        setIsModalOpen(true);
    }

    const handleExport = () => {
        const head = ['Linha', 'Operadora', 'Status'];
        const body = filteredLines.map(line => [
            line.numero || '-',
            line.unidades?.nome || '-',
            line.operadora || '-',
            line.status || '-'
        ]);
        exportToPDF('Relatório de Linhas', head, body, 'linhas_export.pdf');
    };

    return (
        <div className="flex flex-col gap-6 h-full animate-in slide-in-from-bottom-4 duration-500">
            <PageHeader
                searchPlaceholder="Buscar por número ou operadora..."
                onSearch={(e) => setSearchTerm(e.target.value)}
                onExport={handleExport}
                primaryAction={{
                    label: 'Nova Linha',
                    icon: <Plus className="w-4 h-4" />,
                    onClick: handleOpenNew
                }}
            />

            <ContentContainer
                isLoading={isLoading}
                loadingMessage="Carregando linhas..."
                pagination={{ total: filteredLines.length }}
            >
                <table className="min-w-full divide-y divide-slate-200 dark:divide-slate-800">
                    <thead className="bg-slate-50 dark:bg-[#111621]">
                        <tr>
                            <th className="px-6 py-4 text-left text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider">Linha</th>
                            <th className="px-6 py-4 text-left text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider">Unidade</th>
                            <th className="px-6 py-4 text-left text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider">Operadora</th>
                            <th className="px-6 py-4 text-left text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider">Status</th>
                            <th className="relative px-6 py-4">
                                <span className="sr-only">Ações</span>
                            </th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-200 dark:divide-slate-800 bg-white dark:bg-[#1c1f26]">
                        {filteredLines.map((line) => (
                            <tr key={line.id} className="hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors group">
                                <td className="px-6 py-4 whitespace-nowrap">
                                    <div className="flex items-center">
                                        <div className="flex-shrink-0 h-10 w-10 bg-blue-500/10 rounded-full flex items-center justify-center text-blue-500 font-bold text-sm mr-4 transition-colors">
                                            <span className="material-symbols-outlined text-[20px]">
                                                {line.numero && line.numero.replace(/\D/g, '').length === 11 ? 'smartphone' : 'call'}
                                            </span>
                                        </div>
                                        <span className={`font-medium ${line.status === 'Inativa' ? 'text-slate-400 dark:text-slate-500 line-through' : 'text-slate-900 dark:text-white transition-colors'}`}>
                                            {line.numero}
                                        </span>
                                    </div>
                                </td>
                                <td className="px-6 py-4">
                                    <div className="text-sm text-slate-900 dark:text-slate-200 font-medium">
                                        {line.unidades?.nome || <span className="text-slate-400 italic">Sem Unidade</span>}
                                    </div>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap">
                                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium 
                                                ${line.operadora === 'Vivo' ? 'bg-purple-100 dark:bg-purple-900/30 text-purple-600 dark:text-purple-400' :
                                            line.operadora === 'Claro' ? 'bg-red-100 dark:bg-red-900/30 text-red-600 dark:text-red-400' :
                                                'bg-indigo-100 dark:bg-indigo-900/30 text-indigo-600 dark:text-indigo-400'}`}>
                                        {line.operadora}
                                    </span>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap">
                                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${line.status === 'Ativa' ? 'bg-emerald-100 text-emerald-800 dark:bg-emerald-900/30 dark:text-emerald-400' : 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400'}`}>
                                        <span className={`w-1.5 h-1.5 rounded-full mr-1.5 ${line.status === 'Ativa' ? 'bg-emerald-500' : 'bg-red-500'}`}></span>
                                        {line.status}
                                    </span>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                    <div className="flex items-center justify-end gap-2">
                                        <ProtectedRoute>
                                            <button
                                                onClick={() => handleOpenEdit(line)}
                                                className="p-2 text-slate-400 hover:text-primary dark:hover:text-primary hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg transition-colors"
                                                title="Editar Linha"
                                            >
                                                <Pencil className="w-4 h-4" />
                                            </button>
                                        </ProtectedRoute>
                                        <ProtectedRoute>
                                            <button
                                                onClick={() => handleDeleteLinha(line.id)}
                                                className="p-2 text-slate-400 hover:text-red-600 dark:hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-500/10 rounded-lg transition-colors"
                                                title="Excluir Linha"
                                            >
                                                <Trash2 className="w-4 h-4" />
                                            </button>
                                        </ProtectedRoute>
                                    </div>
                                </td>
                            </tr>
                        ))}
                        {filteredLines.length === 0 && (
                            <tr>
                                <td colSpan="4" className="px-6 py-8 text-center text-sm text-slate-500 dark:text-slate-400">
                                    Nenhuma linha encontrada.
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </ContentContainer>

            <LinhaModal
                isOpen={isModalOpen}
                onClose={() => {
                    setIsModalOpen(false);
                    setLinhaToEdit(null);
                }}
                onSave={handleSaveLinha}
                linhaToEdit={linhaToEdit}
            />
        </div>
    );
}
