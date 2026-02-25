import React, { useState } from 'react';
import { Sidebar } from './components/Sidebar.jsx';
import { DashboardView } from './components/DashboardView.jsx';
import { UnidadeView } from './components/UnidadeView.jsx';
import { LinesView } from './components/LinhasView.jsx';
import { ExtensionsView } from './components/RamaisView.jsx';
import { Bell, Search, Plus, PhoneCall, ListOrdered, Bot } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

export default function App() {
    const [activeTab, setActiveTab] = useState('dashboard');
    const [isLoggedIn, setIsLoggedIn] = useState(true); // Simulating login for demo

    if (!isLoggedIn) {
        return (
            <div className="min-h-screen bg-[#0a0c10] flex items-center justify-center p-4">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="w-full max-w-md bg-[#1c1f26] border border-slate-800 rounded-2xl p-8 shadow-2xl"
                >
                    <div className="flex justify-center mb-8">
                        <div className="bg-blue-600/20 p-4 rounded-2xl text-blue-500">
                            <Plus className="w-12 h-12 rotate-45" />
                        </div>
                    </div>
                    <h2 className="text-2xl font-bold text-white text-center mb-2">Telefonia do Sistema FIEMG</h2>
                    <p className="text-slate-400 text-center mb-8">Acesse o console administrativo</p>

                    <form className="space-y-4" onSubmit={(e) => { e.preventDefault(); setIsLoggedIn(true); }}>
                        <div className="space-y-1.5">
                            <label className="text-sm font-medium text-slate-300">Usuário/E-mail</label>
                            <input
                                type="text"
                                className="w-full bg-[#111621] border border-slate-800 rounded-lg px-4 py-3 text-white focus:ring-2 focus:ring-blue-500 outline-none transition-all"
                                placeholder="Digite seu usuário ou e-mail"
                            />
                        </div>
                        <div className="space-y-1.5">
                            <label className="text-sm font-medium text-slate-300">Senha</label>
                            <input
                                type="password"
                                className="w-full bg-[#111621] border border-slate-800 rounded-lg px-4 py-3 text-white focus:ring-2 focus:ring-blue-500 outline-none transition-all"
                                placeholder="Digite sua senha"
                            />
                        </div>
                        <button className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 rounded-lg shadow-lg shadow-blue-600/20 transition-all mt-4">
                            Entrar
                        </button>
                    </form>

                    <div className="mt-8 flex justify-center gap-4 text-xs font-bold text-slate-500 uppercase tracking-widest">
                        <span>SESI</span>
                        <span>SENAI</span>
                        <span>FIEMG</span>
                        <span>IEL</span>
                    </div>
                </motion.div>
            </div>
        );
    }

    return (
        <div className="flex h-screen bg-[#0a0c10] text-slate-100 overflow-hidden font-sans">
            <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} />

            <main className="flex-1 flex flex-col h-screen overflow-hidden relative">
                {/* Header */}
                <header className="h-16 flex items-center justify-between px-8 bg-[#0a0c10] border-b border-slate-800 shrink-0 z-10">
                    <div className="flex items-center gap-4">
                        <h2 className="text-xl font-semibold text-white tracking-tight">
                            {activeTab === 'dashboard' ? 'Dashboard Geral' :
                                activeTab === 'units' ? 'Gerenciamento de Unidades' :
                                    activeTab === 'lines' ? 'Gerenciamento de Linhas' :
                                        activeTab === 'extensions' ? 'Gerenciamento de Ramais' :
                                            activeTab === 'ura' ? 'Gerenciamento de URA' :
                                                'Console Administrativo'}
                        </h2>
                    </div>
                    <div className="flex items-center gap-4">
                        <button className="relative p-2 text-slate-400 hover:text-blue-500 hover:bg-blue-500/10 rounded-full transition-all">
                            <Bell className="w-5 h-5" />
                            <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full border-2 border-[#0a0c10]"></span>
                        </button>
                        <div className="h-8 w-px bg-slate-800 mx-2"></div>
                        <div className="flex items-center gap-3">
                            <div className="text-right hidden sm:block">
                                <p className="text-sm font-medium text-white leading-none">Ana Silva</p>
                                <p className="text-xs text-slate-500 mt-1">Gerente de TI</p>
                            </div>
                            <div className="w-8 h-8 rounded-full bg-blue-600/20 flex items-center justify-center text-blue-500 font-bold text-xs">
                                AS
                            </div>
                        </div>
                    </div>
                </header>

                {/* Content Area */}
                <div className="flex-1 overflow-y-auto p-8 custom-scrollbar">
                    <div className="max-w-7xl mx-auto">
                        <AnimatePresence mode="wait">
                            <motion.div
                                key={activeTab}
                                initial={{ opacity: 0, x: 10 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: -10 }}
                                transition={{ duration: 0.2 }}
                            >
                                {activeTab === 'dashboard' && <DashboardView />}
                                {activeTab === 'units' && <UnidadeView />}
                                {activeTab === 'lines' && <LinesView />}
                                {activeTab === 'extensions' && <ExtensionsView />}
                                {activeTab === 'ura' && (
                                    <div className="flex flex-col items-center justify-center h-[60vh] text-slate-500">
                                        <Bot className="w-16 h-16 mb-4 opacity-20" />
                                        <p>Módulo de URA em desenvolvimento...</p>
                                    </div>
                                )}
                            </motion.div>
                        </AnimatePresence>
                    </div>

                    <footer className="mt-12 pt-8 border-t border-slate-800 text-center text-xs text-slate-500 pb-8">
                        <p>© 2024 Gestão Telefônica Enterprise. Todos os direitos reservados.</p>
                    </footer>
                </div>
            </main>
        </div>
    );
}
