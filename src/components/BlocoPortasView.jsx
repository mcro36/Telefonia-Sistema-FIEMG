import React, { useState, useMemo } from 'react';
import { Router, Search, Download } from 'lucide-react';
import { useSupabaseTable } from '../hooks/useSupabaseTable.js';
import { PageHeader, ContentContainer } from './ui/PageLayout.jsx';
import { exportToPDF } from '../lib/exportUtils.js';

export function BlocoPortasView() {
    const { data: physicalPorts, isLoading } = useSupabaseTable({
        tableName: 'recursos_pabx',
        selectQuery: '*, ramais(numero), unidades:unidade_id(nome)',
        order: { column: 'bloco', ascending: true }
    });

    const [searchTerm, setSearchTerm] = useState('');

    const filteredPorts = useMemo(() => {
        if (!searchTerm) return physicalPorts;
        const lowerTerm = searchTerm.toLowerCase();
        return physicalPorts.filter(port =>
            port.bloco?.toLowerCase().includes(lowerTerm) ||
            port.porta?.toLowerCase().includes(lowerTerm) ||
            port.porta_vp_andar?.toLowerCase().includes(lowerTerm) ||
            (port.unidades?.nome || '').toLowerCase().includes(lowerTerm) ||
            (port.ramais?.[0]?.numero || '').includes(lowerTerm) ||
            (port.tecnologia_padrao || '').toLowerCase().includes(lowerTerm)
        );
    }, [physicalPorts, searchTerm]);

    const handleExport = () => {
        const head = ['Bloco', 'Porta', 'Porta VP/Andar', 'Unidade', 'Tecnologia', 'Status', 'Ramal'];
        const body = filteredPorts.map(port => [
            port.bloco || '-',
            port.porta || '-',
            port.porta_vp_andar || '-',
            port.unidades?.nome || '-',
            port.tecnologia_padrao || '-',
            port.ramais?.length > 0 ? 'Ocupado' : 'Disponível',
            port.ramais?.[0]?.numero || '-'
        ]);
        exportToPDF('Relatório de Portas Físicas', head, body, 'portas_fisicas_export.pdf');
    };

    return (
        <div className="flex flex-col gap-6 h-full animate-in slide-in-from-bottom-4 duration-500">
            <PageHeader
                searchPlaceholder="Buscar por bloco, porta, unidade ou ramal..."
                onSearch={(e) => setSearchTerm(e.target.value)}
                onExport={handleExport}
            />

            <ContentContainer
                isLoading={isLoading}
                loadingMessage="Carregando portas físicas..."
                pagination={{ total: filteredPorts.length }}
            >
                <table className="min-w-full divide-y divide-slate-200 dark:divide-slate-800">
                    <thead className="bg-slate-50 dark:bg-[#111621]">
                        <tr>
                            <th className="px-6 py-4 text-left text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider">Bloco</th>
                            <th className="px-6 py-4 text-center text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider">Porta</th>
                            <th className="px-6 py-4 text-center text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider">Porta VP/Andar</th>
                            <th className="px-6 py-4 text-left text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider">Unidade</th>
                            <th className="px-6 py-4 text-center text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider">Tecnologia</th>
                            <th className="px-6 py-4 text-center text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider">Status</th>
                            <th className="px-6 py-4 text-center text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider">Ramal</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-200 dark:divide-slate-800 bg-white dark:bg-[#1c1f26]">
                        {filteredPorts.map((port) => {
                            const isOccupied = port.ramais?.length > 0;
                            return (
                                <tr key={port.id} className="hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors group">
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <div className="flex items-center">
                                            <div className="flex-shrink-0 h-8 w-8 bg-blue-500/10 rounded flex items-center justify-center text-blue-600 dark:text-blue-500 font-bold text-xs mr-3">
                                                B{port.bloco}
                                            </div>
                                            <span className="text-sm font-medium text-slate-900 dark:text-white">
                                                Bloco {port.bloco}
                                            </span>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-center">
                                        <div className="text-sm text-slate-600 dark:text-slate-300 font-mono">
                                            {port.porta}
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-center">
                                        <div className="text-sm text-slate-600 dark:text-slate-300">
                                            {port.porta_vp_andar || <span className="text-slate-400 italic font-light">Não inf.</span>}
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <div className="text-sm text-slate-600 dark:text-slate-300">
                                            {port.unidades?.nome || <span className="text-slate-400 italic">Não inf.</span>}
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-center">
                                        <div className="text-sm text-slate-600 dark:text-slate-300 uppercase">
                                            {port.tecnologia_padrao || <span className="text-slate-400 italic font-light">Não inf.</span>}
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-center">
                                        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider ${isOccupied
                                            ? 'bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400'
                                            : 'bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400'
                                            }`}>
                                            <span className={`w-1.5 h-1.5 rounded-full mr-1.5 ${isOccupied ? 'bg-amber-500' : 'bg-emerald-500'}`}></span>
                                            {isOccupied ? 'Ocupado' : 'Disponível'}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-center">
                                        {isOccupied ? (
                                            <div className="text-sm font-bold text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-900/20 px-2 py-1 rounded inline-block">
                                                {port.ramais[0].numero}
                                            </div>
                                        ) : (
                                            <span className="text-sm text-slate-400">-</span>
                                        )}
                                    </td>
                                </tr>
                            );
                        })}
                        {filteredPorts.length === 0 && (
                            <tr>
                                <td colSpan="7" className="px-6 py-8 text-center text-sm text-slate-500 dark:text-slate-400">
                                    Nenhuma porta física encontrada.
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </ContentContainer>
        </div>
    );
}
