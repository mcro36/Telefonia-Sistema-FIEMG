import React from 'react';
import { Bell, Sun, Moon, Key, ShieldCheck, Settings, LogOut } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

export function Header({
    activeTab,
    customTitle,
    toggleTheme,
    theme,
    user,
    hasRole,
    logout,
    isUserMenuOpen,
    setIsUserMenuOpen,
    userMenuRef,
    setIsTrocaSenhaModalOpen,
    setIsGerenciamentoModalOpen
}) {
    return (
        <header className="h-16 flex items-center justify-between px-8 bg-white dark:bg-[#0a0c10] border-b border-slate-200 dark:border-slate-800 shrink-0 z-50 transition-colors duration-300">
            <div className="flex items-center gap-4">
                <h2 className="text-xl font-semibold text-slate-900 dark:text-white tracking-tight">
                    {activeTab === 'dashboard' ? 'Dashboard Geral' :
                        activeTab === 'units' ? 'Gerenciamento de Unidades' :
                            activeTab === 'lines' ? 'Gerenciamento de Linhas' :
                                activeTab === 'extensions' ? 'Gerenciamento de Ramais' :
                                    activeTab === 'ura' ? 'Gerenciamento de URA' :
                                        activeTab === 'projects' ? (customTitle || 'Gerenciamento de Projetos') :
                                            'Console Administrativo'}
                </h2>
            </div>
            <div className="flex items-center gap-4">
                <button
                    onClick={toggleTheme}
                    className="relative p-2 text-slate-500 dark:text-slate-400 hover:text-blue-600 dark:hover:text-blue-500 hover:bg-slate-100 dark:hover:bg-blue-500/10 rounded-full transition-all"
                    title={`Mudar para modo ${theme === 'dark' ? 'claro' : 'escuro'}`}
                >
                    {theme === 'dark' ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
                </button>
                <button className="relative p-2 text-slate-500 dark:text-slate-400 hover:text-blue-600 dark:hover:text-blue-500 hover:bg-slate-100 dark:hover:bg-blue-500/10 rounded-full transition-all">
                    <Bell className="w-5 h-5" />
                    <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full border-2 border-white dark:border-[#0a0c10]"></span>
                </button>
                <div className="h-8 w-px bg-slate-200 dark:bg-slate-800 mx-1"></div>
                <div className="relative" ref={userMenuRef}>
                    <button
                        onClick={(e) => {
                            e.stopPropagation();
                            setIsUserMenuOpen(prev => !prev);
                        }}
                        className="flex items-center gap-3 hover:bg-slate-50 dark:hover:bg-[#111621] p-1.5 rounded-lg transition-colors cursor-pointer"
                    >
                        <div className="text-right hidden sm:block">
                            <p className="text-sm font-medium text-slate-900 dark:text-white leading-none">{user?.name}</p>
                            <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">{hasRole('Administrador') ? 'Administrador' : 'Visualizador'}</p>
                        </div>
                        <div className="w-9 h-9 border border-blue-600/30 rounded-full bg-blue-100 dark:bg-[#151c2e] flex items-center justify-center text-blue-600 dark:text-blue-500 font-bold text-sm uppercase shadow-inner">
                            {user?.avatarInitials}
                        </div>
                    </button>

                    <AnimatePresence>
                        {isUserMenuOpen && (
                            <motion.div
                                initial={{ opacity: 0, y: 10, scale: 0.95 }}
                                animate={{ opacity: 1, y: 0, scale: 1 }}
                                exit={{ opacity: 0, y: 10, scale: 0.95 }}
                                transition={{ duration: 0.15 }}
                                style={{ zIndex: 99999 }}
                                className="absolute right-0 top-14 w-64 bg-white dark:bg-[#151a23] rounded-xl border border-slate-200 dark:border-slate-800 shadow-2xl overflow-hidden origin-top-right flex flex-col pointer-events-auto"
                            >
                                <div className="p-2 flex flex-col gap-0.5 mt-1">
                                    <button
                                        onClick={() => {
                                            setIsUserMenuOpen(false);
                                            setIsTrocaSenhaModalOpen(true);
                                        }}
                                        className="flex items-center gap-3 w-full p-2.5 text-sm font-medium text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white hover:bg-slate-50 dark:hover:bg-slate-800/50 rounded-lg transition-colors text-left"
                                    >
                                        <Key className="w-4 h-4 text-slate-400" />
                                        Trocar Senha
                                    </button>

                                    {hasRole('Administrador') && (
                                        <button
                                            onClick={() => {
                                                setIsUserMenuOpen(false);
                                                setIsGerenciamentoModalOpen(true);
                                            }}
                                            className="flex items-center gap-3 w-full p-2.5 text-sm font-medium text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white hover:bg-slate-50 dark:hover:bg-slate-800/50 rounded-lg transition-colors text-left"
                                        >
                                            <ShieldCheck className="w-4 h-4 text-slate-400" />
                                            Gerenciamento de Contas
                                        </button>
                                    )}

                                    <button className="flex items-center gap-3 w-full p-2.5 text-sm font-medium text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white hover:bg-slate-50 dark:hover:bg-slate-800/50 rounded-lg transition-colors text-left">
                                        <Settings className="w-4 h-4 text-slate-400" />
                                        Configurações
                                    </button>
                                </div>

                                <div className="p-2 border-t border-slate-100 dark:border-slate-800/60">
                                    <button
                                        onClick={logout}
                                        className="flex items-center gap-3 w-full p-2.5 text-sm font-medium text-red-500 hover:bg-red-50 dark:hover:bg-red-500/10 rounded-lg transition-colors text-left"
                                    >
                                        <LogOut className="w-4 h-4" />
                                        Sair do Sistema
                                    </button>
                                </div>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>
            </div>
        </header>
    );
}
