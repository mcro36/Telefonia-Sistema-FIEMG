import React, { useState, useMemo } from 'react';
import { Plus, Pencil, Trash2 } from 'lucide-react';
import { UraModal } from './UraModal.jsx';
import { useSupabaseTable } from '../hooks/useSupabaseTable.js';
import { PageHeader, ContentContainer } from './ui/PageLayout.jsx';
import { ProtectedRoute } from './ui/ProtectedRoute.jsx';
import { exportToPDF } from '../lib/exportUtils.js';

export function UraView() {
    const { data: uras, isLoading, saveRecord, deleteRecord, setData: setUras } = useSupabaseTable({
        tableName: 'uras',
        selectQuery: '*, unidades(nome), linhas(numero)',
        order: { column: 'nome', ascending: true }
    });

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [uraToEdit, setUraToEdit] = useState(null);
    const [searchTerm, setSearchTerm] = useState('');

    const filteredUras = useMemo(() => {
        if (!searchTerm) return uras;
        const lowerTerm = searchTerm.toLowerCase();
        return uras.filter(ura =>
            ura.nome?.toLowerCase().includes(lowerTerm) ||
            ura.linhas?.numero?.includes(lowerTerm) ||
            ura.unidades?.nome?.toLowerCase().includes(lowerTerm)
        );
    }, [uras, searchTerm]);

    async function handleSaveUra(uraData) {
        const result = await saveRecord(uraData);
        if (result.success) {
            setIsModalOpen(false);
            setUraToEdit(null);
        } else {
            console.error('Error saving ura:', result.error);
        }
    }

    async function handleDeleteUra(id) {
        if (!window.confirm("Atenção: Tem certeza que deseja excluir esta URA?")) return;
        const result = await deleteRecord(id);
        if (!result.success) {
            setUras(uras.filter(u => u.id !== id));
        }
    }

    function handleOpenNew() {
        setUraToEdit(null);
        setIsModalOpen(true);
    }

    function handleOpenEdit(ura) {
        setUraToEdit(ura);
        setIsModalOpen(true);
    }

    const getIconTheme = (index) => {
        const themes = [
            'bg-primary/10 text-primary',
            'bg-orange-500/10 text-orange-500',
            'bg-purple-500/10 text-purple-500',
            'bg-blue-500/10 text-blue-500',
            'bg-pink-500/10 text-pink-500',
            'bg-teal-500/10 text-teal-500',
            'bg-indigo-500/10 text-indigo-500',
            'bg-red-500/10 text-red-500',
            'bg-cyan-500/10 text-cyan-500',
            'bg-lime-500/10 text-lime-500'
        ];
        return themes[index % themes.length];
    };

    const getIconName = (index) => {
        const icons = [
            'headset_mic', 'support_agent', 'diversity_3', 'payments',
            'theater_comedy', 'shopping_cart', 'school', 'gavel', 'factory', 'forest'
        ];
        return icons[index % icons.length];
    }

    return (
        <div className="flex flex-col gap-6 h-full animate-in slide-in-from-bottom-4 duration-500">
            <PageHeader
                searchPlaceholder="Pesquisar por nome, linha ou unidade..."
                onSearch={(e) => setSearchTerm(e.target.value)}
                primaryAction={{
                    label: 'Nova URA',
                    icon: <Plus className="w-4 h-4" />,
                    onClick: handleOpenNew
                }}
            />

            <ContentContainer
                isLoading={isLoading}
                loadingMessage="Carregando URAs..."
                pagination={{ total: filteredUras.length }}
            >
                <table className="min-w-full divide-y divide-slate-200 dark:divide-slate-800">
                    <thead className="bg-slate-50 dark:bg-[#111621]">
                        <tr>
                            <th className="px-6 py-4 text-left text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider w-1/3">Nome da URA</th>
                            <th className="px-6 py-4 text-left text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider w-1/3">Linha Associada</th>
                            <th className="px-6 py-4 text-left text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider">Unidade</th>
                            <th className="relative px-6 py-4">
                                <span className="sr-only">Ações</span>
                            </th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-200 dark:divide-slate-800 bg-white dark:bg-[#1c1f26]">
                        {filteredUras.map((ura, index) => (
                            <tr key={ura.id} className="hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors group">
                                <td className="px-6 py-4">
                                    <div className="flex items-center gap-3">
                                        <div className={`flex h-10 w-10 items-center justify-center rounded-lg ${getIconTheme(index)}`}>
                                            <span className="material-symbols-outlined">{getIconName(index)}</span>
                                        </div>
                                        <div>
                                            <div className="font-medium text-text-main-light dark:text-white">{ura.nome}</div>
                                            <div className="text-xs text-text-muted-light dark:text-text-muted-dark">ID: URA-{index.toString().padStart(3, '0')}</div>
                                        </div>
                                    </div>
                                </td>
                                <td className="px-6 py-4">
                                    <div className={`inline-flex items-center gap-2 rounded-full px-2.5 py-0.5 text-xs font-medium 
                                                ${ura.status === 'Ativo' ? 'bg-emerald-50 dark:bg-emerald-500/10 text-emerald-700 dark:text-emerald-400' :
                                            ura.status === 'Inativo' ? 'bg-red-50 dark:bg-red-500/10 text-red-700 dark:text-red-400' :
                                                'bg-amber-50 dark:bg-amber-500/10 text-amber-700 dark:text-amber-400'}`}>
                                        <span className={`h-1.5 w-1.5 rounded-full 
                                                    ${ura.status === 'Ativo' ? 'bg-emerald-500' :
                                                ura.status === 'Inativo' ? 'bg-red-500' :
                                                    'bg-amber-500'}`}></span>
                                        {ura.status}
                                    </div>
                                    <div className="mt-1 text-text-muted-light dark:text-text-muted-dark font-mono text-sm">{ura.linhas?.numero || 'Sem Linha'}</div>
                                </td>
                                <td className="px-6 py-4">
                                    <span className="inline-flex items-center rounded-md bg-slate-100 dark:bg-surface-darker px-2 py-1 text-xs font-medium text-text-muted-light dark:text-text-muted-dark ring-1 ring-inset ring-border-light dark:ring-border-dark">
                                        {ura.unidades?.nome || 'Geral'}
                                    </span>
                                </td>
                                <td className="px-6 py-4 text-right">
                                    <div className="flex items-center justify-end gap-2">
                                        <ProtectedRoute>
                                            <button
                                                onClick={() => handleOpenEdit(ura)}
                                                className="p-2 text-slate-400 hover:text-primary dark:hover:text-primary hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg transition-colors"
                                                title="Editar URA"
                                            >
                                                <Pencil className="w-4 h-4" />
                                            </button>
                                        </ProtectedRoute>
                                        <ProtectedRoute>
                                            <button
                                                onClick={() => handleDeleteUra(ura.id)}
                                                className="p-2 text-slate-400 hover:text-red-600 dark:hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-500/10 rounded-lg transition-colors"
                                                title="Excluir URA"
                                            >
                                                <Trash2 className="w-4 h-4" />
                                            </button>
                                        </ProtectedRoute>
                                    </div>
                                </td>
                            </tr>
                        ))}
                        {filteredUras.length === 0 && (
                            <tr>
                                <td colSpan="4" className="px-6 py-8 text-center text-sm text-slate-500 dark:text-slate-400">
                                    Nenhuma URA encontrada.
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </ContentContainer>

            <UraModal
                isOpen={isModalOpen}
                onClose={() => {
                    setIsModalOpen(false);
                    setUraToEdit(null);
                }}
                onSave={handleSaveUra}
                uraToEdit={uraToEdit}
            />
        </div>
    );
}
