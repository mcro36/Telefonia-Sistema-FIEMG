import React, { useState, useMemo } from 'react';
import { Plus, Pencil, Trash2, Building2, MapPin, Hash, Briefcase, Loader2 } from 'lucide-react';
import { UnidadeModal } from './UnidadeModal.jsx';
import { useSupabaseTable } from '../hooks/useSupabaseTable.js';
import { PageHeader, ContentContainer } from './ui/PageLayout.jsx';
import { ProtectedRoute } from './ui/ProtectedRoute.jsx';
import { supabase } from '../lib/supabase';
import { convertToCamel } from '../lib/utils';
import { exportToPDF } from '../lib/exportUtils.js';

export function UnidadeView() {
    const { data: units, isLoading, saveRecord, deleteRecord, setData: setUnits } = useSupabaseTable({
        tableName: 'unidades',
        order: { column: 'nome', ascending: true }
    });

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [unitToEdit, setUnitToEdit] = useState(null);
    const [searchTerm, setSearchTerm] = useState('');

    const filteredUnits = useMemo(() => {
        if (!searchTerm) return units;
        const lowerTerm = searchTerm.toLowerCase();
        return units.filter(unit =>
            unit.nome?.toLowerCase().includes(lowerTerm) ||
            unit.cidade?.toLowerCase().includes(lowerTerm) ||
            unit.entidade?.toLowerCase().includes(lowerTerm) ||
            unit.faixaRamais?.includes(lowerTerm)
        );
    }, [units, searchTerm]);

    const [ramaisPerUnit, setRamaisPerUnit] = useState({});
    const [linhasPerUnit, setLinhasPerUnit] = useState({});

    // Fetch extensions and lines to calculate active usage per unit
    React.useEffect(() => {
        async function fetchCounts() {
            if (!units || units.length === 0) return;
            try {
                const { data: pabxData, error: pabxErr } = await supabase.from('ramais_pabx').select('unidade_id');
                const { data: sipData, error: sipErr } = await supabase.from('ramais_sip').select('unidade_id');
                const { data: linhasData, error: linhasErr } = await supabase.from('linhas').select('unidade_id');

                if (pabxErr) console.warn("Could not fetch PABX extensions for counts", pabxErr);
                if (sipErr) console.warn("Could not fetch SIP extensions for counts", sipErr);
                if (linhasErr) console.warn("Could not fetch lines for counts", linhasErr);

                const countRamais = {};
                const countLinhas = {};

                const processData = (dataArray, targetObj) => {
                    if (!dataArray) return;
                    const camelData = convertToCamel(dataArray);
                    camelData.forEach(item => {
                        if (item.unidadeId) {
                            targetObj[item.unidadeId] = (targetObj[item.unidadeId] || 0) + 1;
                        }
                    });
                };

                processData(pabxData, countRamais);
                processData(sipData, countRamais);
                processData(linhasData, countLinhas);

                setRamaisPerUnit(countRamais);
                setLinhasPerUnit(countLinhas);
            } catch (err) {
                console.error("Error fetching usage counts:", err);
            }
        }

        fetchCounts();
    }, [units]);

    const calculateRangeSize = (rangeString) => {
        if (!rangeString) return 0;
        const parts = rangeString.split('-').map(p => parseInt(p.trim()));
        if (parts.length === 2 && !isNaN(parts[0]) && !isNaN(parts[1])) {
            return parts[1] - parts[0] + 1;
        }
        return 0; // Invalid or missing range
    };

    async function handleSaveUnit(unitData) {
        const result = await saveRecord(unitData);
        if (result.success) {
            setIsModalOpen(false);
            setUnitToEdit(null);
        } else {
            // Fallback for demo
            if (unitData.id) {
                setUnits(units.map(u => u.id === unitData.id ? unitData : u));
            } else {
                setUnits([...units, { ...unitData, id: Math.random().toString() }]);
            }
            setIsModalOpen(false);
            setUnitToEdit(null);
        }
    }

    async function handleDeleteUnit(id) {
        if (!window.confirm("Atenção: Tem certeza que deseja excluir esta unidade?")) return;

        const result = await deleteRecord(id);
        if (!result.success) {
            setUnits(units.filter(u => u.id !== id));
        }
    }

    function handleOpenNew() {
        setUnitToEdit(null);
        setIsModalOpen(true);
    }

    function handleOpenEdit(unit) {
        setUnitToEdit(unit);
        setIsModalOpen(true);
    }

    const getEntityTheme = (entity) => {
        const themes = {
            'FIEMG': 'bg-blue-500/10 text-blue-500 border-blue-500/20',
            'SESI': 'bg-green-500/10 text-green-500 border-green-500/20',
            'SENAI': 'bg-red-500/10 text-red-500 border-red-500/20',
            'IEL': 'bg-orange-500/10 text-orange-500 border-orange-500/20',
            'CIEMG': 'bg-purple-500/10 text-purple-500 border-purple-500/20',
        };
        return themes[entity] || 'bg-slate-500/10 text-slate-500 border-slate-500/20';
    };

    const handleExport = () => {
        const head = ['Entidade', 'Cidade', 'Unidade', 'Faixa de Ramais', 'Ramais Ativos', 'Linhas Ativas'];
        const body = filteredUnits.map(unit => [
            unit.entidade || '-',
            unit.cidade || '-',
            unit.nome || '-',
            unit.faixaRamais || '-',
            ramaisPerUnit[unit.id] || 0,
            linhasPerUnit[unit.id] || 0
        ]);
        exportToPDF('Relatório de Unidades', head, body, 'unidades_export.pdf');
    };

    return (
        <div className="flex flex-col gap-6 h-full animate-in slide-in-from-bottom-4 duration-500">
            <PageHeader
                searchPlaceholder="Pesquisar por nome, cidade ou entidade..."
                onSearch={(e) => setSearchTerm(e.target.value)}
                onExport={handleExport}
                primaryAction={{
                    label: 'Nova Unidade',
                    icon: <Plus className="w-4 h-4" />,
                    onClick: handleOpenNew
                }}
            />

            <ContentContainer
                isLoading={isLoading}
                loadingMessage="Carregando Unidades..."
                pagination={{ total: filteredUnits.length }}
            >
                <table className="min-w-full divide-y divide-slate-200 dark:divide-slate-800">
                    <thead className="bg-slate-50 dark:bg-[#111621]">
                        <tr>
                            <th className="w-[10%] px-6 py-4 text-left text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider">Entidade</th>
                            <th className="w-[15%] px-6 py-4 text-left text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider">Cidade</th>
                            <th className="w-[30%] px-6 py-4 text-left text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider">Unidade</th>
                            <th className="w-[15%] px-6 py-4 text-center text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider">Faixa de Ramais</th>
                            <th className="w-[15%] px-6 py-4 text-center text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider">Ramais Ativos</th>
                            <th className="w-[10%] px-6 py-4 text-center text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider">Linhas Ativas</th>
                            <th className="relative px-6 py-4">
                                <span className="sr-only">Ações</span>
                            </th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-200 dark:divide-slate-800 bg-white dark:bg-[#1c1f26]">
                        {filteredUnits.map((unit) => (
                            <tr key={unit.id} className="hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors group">
                                <td className="px-6 py-4">
                                    <span className={`inline-flex items-center rounded-md border px-2.5 py-1 text-xs font-semibold tracking-wide ${getEntityTheme(unit.entidade)}`}>
                                        {unit.entidade}
                                    </span>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap">
                                    <span className="text-sm font-medium text-slate-500 dark:text-slate-400">
                                        {unit.cidade || '-'}
                                    </span>
                                </td>
                                <td className="px-6 py-4">
                                    <div className="flex flex-col gap-1">
                                        <span className="font-medium text-slate-500 dark:text-slate-400 text-left text-sm whitespace-nowrap">
                                            {unit.nome}
                                        </span>
                                        <div className="flex flex-wrap items-center gap-3 text-xs text-slate-500 dark:text-slate-400">
                                            {unit.centroCusto && (
                                                <div className="flex items-center gap-1.5" title="Centro de Custo">
                                                    <Hash className="w-3.5 h-3.5" />
                                                    CC: {unit.centroCusto}
                                                </div>
                                            )}
                                            {unit.contrato && (
                                                <div className="flex items-center gap-1.5" title="Contrato Associado">
                                                    <Briefcase className="w-3.5 h-3.5" />
                                                    Contrato: {unit.contrato}
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                </td>
                                <td className="px-6 py-4">
                                    <div className="flex flex-col items-center justify-center">
                                        <span className="inline-flex rounded-full bg-slate-100 dark:bg-slate-800 px-3 py-1 text-xs font-medium text-slate-600 dark:text-slate-300 border border-slate-200 dark:border-slate-700">
                                            {unit.faixaRamais || 'Não definida'}
                                        </span>
                                    </div>
                                </td>
                                <td className="px-6 py-4">
                                    <div className="flex items-center justify-center">
                                        <div className="flex items-center justify-center rounded-lg bg-blue-50 dark:bg-blue-500/10 px-3 py-1.5 border border-blue-100 dark:border-blue-500/20">
                                            <span className="text-sm font-semibold text-blue-700 dark:text-blue-400">
                                                {ramaisPerUnit[unit.id] || 0}
                                            </span>
                                            <span className="mx-1.5 text-xs text-blue-400 dark:text-blue-500/70 font-medium">de</span>
                                            <span className="text-sm font-semibold text-blue-700 dark:text-blue-400">
                                                {calculateRangeSize(unit.faixaRamais)}
                                            </span>
                                        </div>
                                    </div>
                                </td>
                                <td className="px-6 py-4">
                                    <div className="flex items-center justify-center">
                                        <div className="flex h-8 w-8 items-center justify-center rounded-full bg-emerald-50 dark:bg-emerald-500/10 text-sm font-semibold text-emerald-600 dark:text-emerald-400 border border-emerald-100 dark:border-emerald-500/10">
                                            {linhasPerUnit[unit.id] || 0}
                                        </div>
                                    </div>
                                </td>
                                <td className="px-6 py-4 text-right">
                                    <div className="flex items-center justify-end gap-2">
                                        <ProtectedRoute>
                                            <button
                                                onClick={() => handleOpenEdit(unit)}
                                                className="p-2 text-slate-400 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-blue-50 dark:hover:bg-blue-500/10 rounded-lg transition-colors"
                                                title="Editar Unidade"
                                            >
                                                <Pencil className="w-4 h-4" />
                                            </button>
                                        </ProtectedRoute>
                                        <ProtectedRoute>
                                            <button
                                                onClick={() => handleDeleteUnit(unit.id)}
                                                className="p-2 text-slate-400 hover:text-red-600 dark:hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-500/10 rounded-lg transition-colors"
                                                title="Excluir Unidade"
                                            >
                                                <Trash2 className="w-4 h-4" />
                                            </button>
                                        </ProtectedRoute>
                                    </div>
                                </td>
                            </tr>
                        ))}
                        {filteredUnits.length === 0 && (
                            <tr>
                                <td colSpan="5" className="px-6 py-8 text-center text-sm text-slate-500 dark:text-slate-400">
                                    Nenhuma unidade encontrada.
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </ContentContainer>

            <UnidadeModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                onSave={handleSaveUnit}
                unitToEdit={unitToEdit}
            />
        </div>
    );
}
