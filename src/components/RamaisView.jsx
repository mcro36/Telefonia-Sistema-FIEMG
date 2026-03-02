import React, { useState, useMemo } from 'react';
import { Plus, Pencil, Trash2 } from 'lucide-react';
import { RamalModalPABX } from './RamalModalPABX.jsx';
import { RamalModalSIP } from './RamalModalSIP.jsx';
import { useSupabaseTable } from '../hooks/useSupabaseTable.js';
import { PageHeader, ContentContainer } from './ui/PageLayout.jsx';
import { ProtectedRoute } from './ui/ProtectedRoute.jsx';
import { exportToPDF } from '../lib/exportUtils.js';

export function ExtensionsView() {
    const { data: extensions, isLoading, saveRecord, deleteRecord, setData: setExtensions } = useSupabaseTable({
        tableName: 'ramais',
        selectQuery: '*, unidades(nome), linhas:ddr(numero), recursos_pabx(tecnologia_padrao)',
        order: { column: 'nome', ascending: true }
    });

    console.log("Ramais carregados:", extensions);

    const [isPABXModalOpen, setIsPABXModalOpen] = useState(false);
    const [isSIPModalOpen, setIsSIPModalOpen] = useState(false);
    const [ramalToEdit, setRamalToEdit] = useState(null);
    const [searchTerm, setSearchTerm] = useState('');

    const filteredExtensions = useMemo(() => {
        if (!searchTerm) return extensions;
        const lowerTerm = searchTerm.toLowerCase();
        return extensions.filter(ext =>
            ext.nome?.toLowerCase().includes(lowerTerm) ||
            ext.numero?.includes(lowerTerm) ||
            ext.setor?.toLowerCase().includes(lowerTerm)
        );
    }, [extensions, searchTerm]);

    async function handleSaveRamal(ramalData) {
        const result = await saveRecord(ramalData);
        if (result.success) {
            setIsPABXModalOpen(false);
            setIsSIPModalOpen(false);
            setRamalToEdit(null);
        } else {
            console.error('Error saving ramal:', result.error);
        }
    }

    async function handleDeleteRamal(id) {
        if (!window.confirm("Atenção: Tem certeza que deseja excluir este ramal?")) return;
        const result = await deleteRecord(id);
        if (!result.success) {
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

    function getInitials(name) {
        if (!name) return 'RM';
        const parts = name.split(' ');
        if (parts.length >= 2) return `${parts[0][0]}${parts[1][0]}`.toUpperCase();
        return name.substring(0, 2).toUpperCase();
    }

    const handleExport = () => {
        const head = ['Nome', 'Ramal', 'Status', 'Tecnologia', 'Número principal', 'Unidade', 'Setor'];
        const body = filteredExtensions.map(ext => [
            ext.nome || 'Ramal Padrão',
            ext.numero || '-',
            ext.status || '-',
            ext.recursoPabxId ? `PABX - ${ext.recursosPabx?.tecnologiaPadrao || ext.tipoRamal || 'Analógico'}` : 'SIP',
            ext.linhas?.numero || '-',
            ext.unidades?.nome || 'Geral',
            ext.setor || '-'
        ]);
        exportToPDF('Relatório de Ramais', head, body, 'ramais_export.pdf');
    };

    return (
        <div className="flex flex-col gap-6 h-full animate-in slide-in-from-bottom-4 duration-500">
            <PageHeader
                searchPlaceholder="Buscar por nome, número ou setor..."
                onSearch={(e) => setSearchTerm(e.target.value)}
                onExport={handleExport}
                primaryAction={{
                    label: 'Novo Ramal PABX',
                    icon: <Plus className="w-4 h-4" />,
                    onClick: handleOpenNewPABX
                }}
                extraActions={
                    <button
                        onClick={handleOpenNewSIP}
                        className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2.5 rounded-lg text-sm font-medium flex items-center justify-center gap-2 shadow-sm transition-all shrink-0"
                    >
                        <Plus className="w-4 h-4" />
                        <span className="hidden sm:inline">Novo Ramal SIP</span>
                        <span className="sm:hidden">SIP</span>
                    </button>
                }
            />

            <ContentContainer
                isLoading={isLoading}
                loadingMessage="Carregando ramais..."
                pagination={{ total: filteredExtensions.length }}
            >
                <table className="min-w-full divide-y divide-slate-200 dark:divide-slate-800">
                    <thead className="bg-slate-50 dark:bg-[#111621]">
                        <tr>
                            <th className="px-6 py-4 text-left text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider">Nome</th>
                            <th className="px-6 py-4 text-center text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider">Ramal</th>
                            <th className="px-6 py-4 text-center text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider">Status</th>
                            <th className="px-6 py-4 text-center text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider">Tecnologia</th>
                            <th className="px-6 py-4 text-center text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider">Número principal</th>
                            <th className="px-6 py-4 text-center text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider">Unidade</th>
                            <th className="px-6 py-4 text-center text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider">Setor</th>
                            <th className="relative px-6 py-4 text-right">
                                <span className="sr-only">Ações</span>
                            </th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-200 dark:divide-slate-800 bg-white dark:bg-[#1c1f26]">
                        {filteredExtensions.map((ext) => (
                            <tr key={ext.id} className="hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors group">
                                <td className="px-6 py-4 whitespace-nowrap">
                                    <div className="text-sm font-medium text-text-main-light dark:text-white">{ext.nome || 'Ramal Padrão'}</div>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-center">
                                    <div className="text-sm text-text-main-light dark:text-text-main-dark font-mono bg-slate-100 dark:bg-[#2a2f38] px-2 py-1 rounded inline-block">{ext.numero}</div>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-center">
                                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${ext.status === 'Ativo' ? 'bg-emerald-100 text-emerald-800 dark:bg-emerald-900/30 dark:text-emerald-400' : 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400'}`}>
                                        <span className={`w-1.5 h-1.5 rounded-full mr-1.5 ${ext.status === 'Ativo' ? 'bg-emerald-500' : 'bg-red-500'}`}></span>
                                        {ext.status}
                                    </span>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-center">
                                    <span className={`text-[10px] px-2 py-0.5 rounded font-bold uppercase tracking-wider ${!ext.recursoPabxId ? 'bg-indigo-50 text-indigo-600 dark:bg-indigo-500/10' : 'bg-slate-100 text-slate-600 dark:bg-slate-800'
                                        }`}>
                                        {ext.recursoPabxId ? (
                                            <>PABX - {ext.recursosPabx?.tecnologiaPadrao || ext.tipoRamal || 'Analógico'}</>
                                        ) : (
                                            'SIP'
                                        )}
                                    </span>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-text-muted-light dark:text-text-muted-dark font-medium text-center">
                                    {ext.linhas?.numero || '-'}
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-600 dark:text-slate-400 text-center">
                                    {ext.unidades?.nome || 'Geral'}
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-500 dark:text-slate-500 italic text-center">
                                    {ext.setor || '-'}
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                    <div className="flex items-center justify-end gap-2">
                                        <ProtectedRoute>
                                            <button
                                                onClick={() => handleOpenEdit(ext)}
                                                className="p-2 text-slate-400 hover:text-primary dark:hover:text-primary hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg transition-colors"
                                                title="Editar Ramal"
                                            >
                                                <Pencil className="w-4 h-4" />
                                            </button>
                                        </ProtectedRoute>
                                        <ProtectedRoute>
                                            <button
                                                onClick={() => handleDeleteRamal(ext.id)}
                                                className="p-2 text-slate-400 hover:text-red-600 dark:hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-500/10 rounded-lg transition-colors"
                                                title="Excluir Ramal"
                                            >
                                                <Trash2 className="w-4 h-4" />
                                            </button>
                                        </ProtectedRoute>
                                    </div>
                                </td>
                            </tr>
                        ))}
                        {filteredExtensions.length === 0 && (
                            <tr>
                                <td colSpan="6" className="px-6 py-8 text-center text-sm text-slate-500 dark:text-slate-400">
                                    Nenhum ramal encontrado.
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </ContentContainer>

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
