import React from 'react';
import { Search, Filter, Download, Loader2 } from 'lucide-react';
import { ProtectedRoute } from './ProtectedRoute.jsx';

export function PageHeader({ searchPlaceholder, onSearch, onExport, primaryAction, extraActions }) {
    return (
        <div className="flex flex-col sm:flex-row gap-4 justify-between items-center bg-white dark:bg-[#1c1f26] p-4 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm transition-colors">
            <div className="relative w-full sm:max-w-md">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <span className="material-symbols-outlined text-text-muted-light dark:text-text-muted-dark">search</span>
                </div>
                <input
                    className="block w-full pl-10 pr-3 py-2.5 border border-slate-200 dark:border-slate-800 rounded-lg bg-slate-50 dark:bg-[#111621] text-slate-900 dark:text-white placeholder:text-slate-500 focus:ring-2 focus:ring-blue-500 sm:text-sm transition-all"
                    placeholder={searchPlaceholder || "Pesquisar..."}
                    type="text"
                    onChange={onSearch}
                />
            </div>
            <div className="flex gap-2 w-full sm:w-auto overflow-x-auto pb-2 sm:pb-0 scrollbar-hide">
                <button className="flex-1 sm:flex-none flex items-center justify-center gap-2 px-4 py-2.5 border border-slate-200 dark:border-slate-800 rounded-lg text-sm font-medium text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors">
                    <Filter className="w-4 h-4" />
                    <span className="hidden sm:inline">Filtros</span>
                </button>
                {onExport && (
                    <button
                        onClick={onExport}
                        className="flex-1 sm:flex-none flex items-center justify-center gap-2 px-4 py-2.5 border border-slate-200 dark:border-slate-800 rounded-lg text-sm font-medium text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors"
                    >
                        <Download className="w-4 h-4" />
                        <span className="hidden sm:inline">Exportar</span>
                    </button>
                )}

                {extraActions}

                {primaryAction && (
                    <ProtectedRoute>
                        <button
                            onClick={primaryAction.onClick}
                            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2.5 rounded-lg text-sm font-medium flex items-center gap-2 shadow-sm transition-all shrink-0"
                        >
                            {primaryAction.icon}
                            {primaryAction.label}
                        </button>
                    </ProtectedRoute>
                )}
            </div>
        </div>
    );
}

export function ContentContainer({ isLoading, loadingMessage = "Carregando...", children, pagination }) {
    return (
        <div className="bg-white dark:bg-[#1c1f26] rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm overflow-hidden flex flex-col min-h-[400px] transition-colors">
            {isLoading ? (
                <div className="flex-1 flex flex-col items-center justify-center gap-3 py-20">
                    <Loader2 className="w-10 h-10 text-blue-500 animate-spin" />
                </div>
            ) : (
                <>
                    <div className="overflow-x-auto">
                        {children}
                    </div>
                    {pagination && (
                        <div className="px-6 py-4 border-t border-slate-200 dark:border-slate-800 flex items-center justify-between mt-auto bg-slate-50 dark:bg-transparent transition-colors">
                            <div className="text-sm text-slate-500 dark:text-slate-400">
                                Mostrando <span className="font-medium text-slate-900 dark:text-white">1</span> a <span className="font-medium text-slate-900 dark:text-white">{pagination.total}</span> de <span className="font-medium text-slate-900 dark:text-white">{pagination.total}</span> resultados
                            </div>
                            <div className="flex items-center gap-2">
                                <button className="p-2 rounded-lg border border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 disabled:opacity-50 transition-colors">
                                    <span className="sr-only">Anterior</span>
                                    <span className="material-symbols-outlined text-[20px]">chevron_left</span>
                                </button>
                                <button className="w-8 h-8 flex items-center justify-center rounded-lg bg-blue-600 text-white text-sm font-medium shadow-sm">1</button>
                                <button className="p-2 rounded-lg border border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors">
                                    <span className="sr-only">Próximo</span>
                                    <span className="material-symbols-outlined text-[20px]">chevron_right</span>
                                </button>
                            </div>
                        </div>
                    )}
                </>
            )}
        </div>
    );
}
