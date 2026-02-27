import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Search, UserPlus, Edit2, Trash2, ChevronLeft, ChevronRight } from 'lucide-react';

export function GerenciamentoContaModal({ isOpen, onClose }) {
    const [isAddUserModalOpen, setIsAddUserModalOpen] = useState(false);

    if (!isOpen) return null;

    return (
        <AnimatePresence>
            <div className="fixed inset-0 bg-[#0a0c10]/80 backdrop-blur-sm z-50 flex flex-col pt-16 sm:pt-20 px-4 pb-4">
                <motion.div
                    initial={{ opacity: 0, y: 20, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 20, scale: 0.95 }}
                    transition={{ duration: 0.2 }}
                    className="bg-white dark:bg-[#111621] w-full max-w-6xl mx-auto rounded-xl shadow-2xl border border-slate-200 dark:border-slate-800 flex flex-col flex-1 overflow-hidden pointer-events-auto"
                >
                    {/* Header do Modal */}
                    <div className="flex items-center justify-between px-8 py-5 border-b border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-[#0a0c10]">
                        <div className="flex items-center gap-4 text-blue-600">
                            <div className="w-10 h-10 flex items-center justify-center rounded-lg bg-blue-100 dark:bg-blue-600/20">
                                <span className="material-symbols-outlined text-2xl">settings_phone</span>
                            </div>
                            <h2 className="text-xl font-bold text-slate-900 dark:text-white">Sistema FIEMG - Controle de Acesso</h2>
                        </div>
                        <button
                            onClick={onClose}
                            className="p-2 text-slate-500 hover:bg-slate-200 dark:hover:bg-slate-800 rounded-lg hover:text-slate-900 dark:hover:text-white transition-colors"
                        >
                            <X className="w-5 h-5" />
                        </button>
                    </div>

                    {/* Conteúdo Principal */}
                    <div className="flex-1 overflow-y-auto p-8 custom-scrollbar">
                        <div className="flex flex-col gap-8 max-w-[1200px] mx-auto w-full">

                            <div className="flex flex-wrap justify-between items-end gap-4">
                                <div className="flex min-w-72 flex-col gap-2">
                                    <h1 className="text-slate-900 dark:text-slate-100 text-3xl sm:text-4xl font-black leading-tight tracking-[-0.033em]">
                                        Gerenciamento de Usuários
                                    </h1>
                                    <p className="text-slate-500 dark:text-slate-400 text-base font-normal leading-normal">
                                        Gerencie as permissões e contas do sistema de ramais e linhas FIEMG.
                                    </p>
                                </div>
                                <div className="flex items-center gap-4">
                                    <label className="flex flex-col min-w-40 h-11 max-w-64">
                                        <div className="flex w-full flex-1 items-stretch rounded-lg h-full border border-slate-200 dark:border-slate-800 focus-within:ring-2 ring-blue-500/50">
                                            <div className="text-slate-500 flex border-none bg-slate-100 dark:bg-[#0a0c10] items-center justify-center pl-4 rounded-l-lg">
                                                <Search className="w-4 h-4" />
                                            </div>
                                            <input
                                                className="w-full flex-1 bg-slate-100 dark:bg-[#0a0c10] text-slate-900 dark:text-slate-100 focus:outline-0 border-none px-3 rounded-r-lg placeholder:text-slate-500 text-sm"
                                                placeholder="Buscar usuários..."
                                            />
                                        </div>
                                    </label>
                                    <button
                                        onClick={() => setIsAddUserModalOpen(true)}
                                        className="h-11 flex items-center justify-center gap-2 rounded-lg px-6 bg-blue-600 hover:bg-blue-700 text-white text-sm font-bold transition-all shadow-lg shadow-blue-600/20 whitespace-nowrap"
                                    >
                                        <UserPlus className="w-5 h-5" />
                                        <span>Adicionar Novo</span>
                                    </button>
                                </div>
                            </div>

                            <div className="bg-white dark:bg-[#1c1f26] rounded-xl border border-slate-200 dark:border-slate-800 overflow-hidden shadow-sm">
                                <div className="overflow-x-auto">
                                    <table className="w-full text-left border-collapse">
                                        <thead>
                                            <tr className="bg-slate-50 dark:bg-[#0a0c10] border-b border-slate-200 dark:border-slate-800">
                                                <th className="px-6 py-4 text-slate-900 dark:text-slate-100 text-sm font-semibold uppercase tracking-wider">Nome</th>
                                                <th className="px-6 py-4 text-slate-900 dark:text-slate-100 text-sm font-semibold uppercase tracking-wider">E-mail</th>
                                                <th className="px-6 py-4 text-slate-900 dark:text-slate-100 text-sm font-semibold uppercase tracking-wider">Perfil</th>
                                                <th className="px-6 py-4 text-slate-900 dark:text-slate-100 text-sm font-semibold uppercase tracking-wider text-center">Status</th>
                                                <th className="px-6 py-4 text-slate-500 dark:text-slate-400 text-sm font-semibold uppercase tracking-wider text-right">Ações</th>
                                            </tr>
                                        </thead>
                                        <tbody className="divide-y divide-slate-100 dark:divide-slate-800/60">
                                            <tr className="hover:bg-slate-50/50 dark:hover:bg-slate-800/30 transition-colors group">
                                                <td className="px-6 py-4">
                                                    <div className="flex items-center gap-3">
                                                        <div className="w-8 h-8 rounded-full bg-blue-100 dark:bg-blue-600/20 flex items-center justify-center text-blue-600 dark:text-blue-500 font-bold text-sm">JS</div>
                                                        <span className="text-slate-900 dark:text-slate-100 text-sm font-medium">João Silva</span>
                                                    </div>
                                                </td>
                                                <td className="px-6 py-4 text-slate-500 dark:text-slate-400 text-sm">joao.silva@fiemg.com.br</td>
                                                <td className="px-6 py-4">
                                                    <span className="px-3 py-1 rounded-full text-xs font-bold bg-blue-100 dark:bg-blue-600/20 text-blue-600 dark:text-blue-400 border border-blue-200 dark:border-blue-500/30">Administrador</span>
                                                </td>
                                                <td className="px-6 py-4">
                                                    <div className="flex justify-center">
                                                        <label className="relative inline-flex items-center cursor-pointer">
                                                            <input type="checkbox" className="sr-only peer" defaultChecked />
                                                            <div className="w-11 h-6 bg-slate-200 dark:bg-slate-700 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                                                        </label>
                                                    </div>
                                                </td>
                                                <td className="px-6 py-4">
                                                    <div className="flex justify-end gap-3 opacity-0 group-hover:opacity-100 transition-opacity">
                                                        <button className="text-slate-400 hover:text-blue-500 transition-colors p-1" title="Editar">
                                                            <Edit2 className="w-4 h-4" />
                                                        </button>
                                                        <button className="text-slate-400 hover:text-red-500 transition-colors p-1" title="Excluir">
                                                            <Trash2 className="w-4 h-4" />
                                                        </button>
                                                    </div>
                                                </td>
                                            </tr>
                                            <tr className="hover:bg-slate-50/50 dark:hover:bg-slate-800/30 transition-colors group">
                                                <td className="px-6 py-4">
                                                    <div className="flex items-center gap-3">
                                                        <div className="w-8 h-8 rounded-full bg-slate-200 dark:bg-slate-800 flex items-center justify-center text-slate-500 font-bold text-sm">MS</div>
                                                        <span className="text-slate-900 dark:text-slate-100 text-sm font-medium">Maria Souza</span>
                                                    </div>
                                                </td>
                                                <td className="px-6 py-4 text-slate-500 dark:text-slate-400 text-sm">maria.souza@fiemg.com.br</td>
                                                <td className="px-6 py-4">
                                                    <span className="px-3 py-1 rounded-full text-xs font-bold bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 border border-slate-200 dark:border-slate-700">Viewer</span>
                                                </td>
                                                <td className="px-6 py-4">
                                                    <div className="flex justify-center">
                                                        <label className="relative inline-flex items-center cursor-pointer">
                                                            <input type="checkbox" className="sr-only peer" defaultChecked />
                                                            <div className="w-11 h-6 bg-slate-200 dark:bg-slate-700 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                                                        </label>
                                                    </div>
                                                </td>
                                                <td className="px-6 py-4">
                                                    <div className="flex justify-end gap-3 opacity-0 group-hover:opacity-100 transition-opacity">
                                                        <button className="text-slate-400 hover:text-blue-500 transition-colors p-1" title="Editar">
                                                            <Edit2 className="w-4 h-4" />
                                                        </button>
                                                        <button className="text-slate-400 hover:text-red-500 transition-colors p-1" title="Excluir">
                                                            <Trash2 className="w-4 h-4" />
                                                        </button>
                                                    </div>
                                                </td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </div>

                                <div className="flex items-center justify-between p-6 border-t border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-[#0a0c10]">
                                    <p className="text-sm text-slate-500 dark:text-slate-400 font-medium">Mostrando <span className="text-slate-900 dark:text-slate-100">1-2</span> de <span className="text-slate-900 dark:text-slate-100">2</span> usuários</p>
                                    <div className="flex items-center gap-2">
                                        <button className="flex w-9 h-9 items-center justify-center rounded-lg border border-slate-200 dark:border-slate-700 hover:bg-white dark:hover:bg-slate-800 transition-colors disabled:opacity-50" disabled>
                                            <ChevronLeft className="w-4 h-4" />
                                        </button>
                                        <button className="flex w-9 h-9 items-center justify-center rounded-lg bg-blue-600 text-white font-bold text-sm">1</button>
                                        <button className="flex w-9 h-9 items-center justify-center rounded-lg border border-slate-200 dark:border-slate-700 hover:bg-white dark:hover:bg-slate-800 text-slate-600 dark:text-slate-400 text-sm transition-colors">
                                            <ChevronRight className="w-4 h-4" />
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </motion.div>

                {/* Sub-Modal para Adicionar Usuário */}
                <AnimatePresence>
                    {isAddUserModalOpen && (
                        <div className="fixed inset-0 bg-[#0a0c10]/80 backdrop-blur-sm z-[60] flex items-center justify-center p-4">
                            <motion.div
                                initial={{ opacity: 0, scale: 0.95 }}
                                animate={{ opacity: 1, scale: 1 }}
                                exit={{ opacity: 0, scale: 0.95 }}
                                className="bg-white dark:bg-[#111621] w-full max-w-lg rounded-xl shadow-2xl border border-slate-200 dark:border-slate-800 overflow-hidden"
                            >
                                <div className="px-6 py-4 border-b border-slate-200 dark:border-slate-800 flex justify-between items-center bg-slate-50 dark:bg-[#0a0c10]">
                                    <h3 className="text-lg font-bold text-slate-900 dark:text-white">Novo Usuário</h3>
                                    <button
                                        onClick={() => setIsAddUserModalOpen(false)}
                                        className="text-slate-500 hover:text-slate-900 dark:hover:text-white transition-colors"
                                    >
                                        <X className="w-5 h-5" />
                                    </button>
                                </div>
                                <div className="p-6 flex flex-col gap-4">
                                    <div className="flex flex-col gap-1.5">
                                        <label className="text-sm font-semibold text-slate-700 dark:text-slate-300">Nome Completo</label>
                                        <input type="text" className="w-full bg-slate-50 dark:bg-[#1c1f26] border border-slate-200 dark:border-slate-800 rounded-lg px-4 py-2.5 text-slate-900 dark:text-white focus:ring-2 focus:ring-blue-500 outline-none transition-all placeholder:text-slate-500 text-sm" placeholder="Ex: Rodrigo Mota" />
                                    </div>
                                    <div className="flex flex-col gap-1.5">
                                        <label className="text-sm font-semibold text-slate-700 dark:text-slate-300">E-mail Corporativo</label>
                                        <input type="email" className="w-full bg-slate-50 dark:bg-[#1c1f26] border border-slate-200 dark:border-slate-800 rounded-lg px-4 py-2.5 text-slate-900 dark:text-white focus:ring-2 focus:ring-blue-500 outline-none transition-all placeholder:text-slate-500 text-sm" placeholder="usuario@fiemg.com.br" />
                                    </div>
                                    <div className="flex flex-col gap-1.5">
                                        <label className="text-sm font-semibold text-slate-700 dark:text-slate-300">Perfil de Acesso</label>
                                        <select className="w-full bg-slate-50 dark:bg-[#1c1f26] border border-slate-200 dark:border-slate-800 rounded-lg px-4 py-2.5 text-slate-900 dark:text-white focus:ring-2 focus:ring-blue-500 outline-none transition-all text-sm">
                                            <option>Viewer</option>
                                            <option>Administrador</option>
                                        </select>
                                    </div>
                                </div>
                                <div className="px-6 py-4 border-t border-slate-200 dark:border-slate-800 flex justify-end gap-3 bg-slate-50 dark:bg-[#0a0c10]">
                                    <button
                                        onClick={() => setIsAddUserModalOpen(false)}
                                        className="px-4 py-2 text-sm font-medium text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white transition-colors"
                                    >
                                        Cancelar
                                    </button>
                                    <button className="px-6 py-2 text-sm font-bold bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-all shadow-sm">
                                        Criar Conta
                                    </button>
                                </div>
                            </motion.div>
                        </div>
                    )}
                </AnimatePresence>

            </div>
        </AnimatePresence>
    );
}
