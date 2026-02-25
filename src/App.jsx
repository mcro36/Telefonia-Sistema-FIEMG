import React, { useState } from 'react';
import { Sidebar } from './components/Sidebar.jsx';
import { DashboardView } from './components/DashboardView.jsx';
import { UnidadeView } from './components/UnidadeView.jsx';
import { LinesView } from './components/LinhasView.jsx';
import { ExtensionsView } from './components/RamaisView.jsx';
import { Bell, Search, Plus, PhoneCall, ListOrdered, Bot, Moon, Sun } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { supabase } from './lib/supabase.js';
import { useEffect } from 'react';
import { useTheme } from './hooks/useTheme.js';

export default function App() {
    const [activeTab, setActiveTab] = useState('dashboard');
    const [session, setSession] = useState(null);
    const [loading, setLoading] = useState(true);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [authError, setAuthError] = useState(null);
    const [isLoggingIn, setIsLoggingIn] = useState(false);
    const { theme, toggleTheme } = useTheme();

    useEffect(() => {
        // Obter sessão inicial
        supabase.auth.getSession().then(({ data: { session } }) => {
            setSession(session);
            setLoading(false);
        });

        // Ouvir mudanças na autenticação
        const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
            setSession(session);
        });

        return () => subscription.unsubscribe();
    }, []);

    const handleLogin = async (e) => {
        e.preventDefault();
        setIsLoggingIn(true);
        setAuthError(null);

        const { error } = await supabase.auth.signInWithPassword({
            email,
            password,
        });

        if (error) {
            setAuthError(error.message);
        }
        setIsLoggingIn(false);
    };

    if (loading) {
        return (
            <div className="min-h-screen bg-[#0a0c10] flex items-center justify-center">
                <div className="w-8 h-8 border-4 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
            </div>
        );
    }

    if (!session) {
        return (
            <div className="min-h-screen bg-slate-50 dark:bg-[#0a0c10] flex items-center justify-center p-4 transition-colors duration-300">
                <button
                    onClick={toggleTheme}
                    className="absolute top-6 right-6 p-3 rounded-full bg-white dark:bg-[#1c1f26] border border-slate-200 dark:border-slate-800 text-slate-500 dark:text-slate-400 hover:text-blue-500 dark:hover:text-blue-500 shadow-lg hover:shadow-xl transition-all"
                    title={`Mudar para modo ${theme === 'dark' ? 'claro' : 'escuro'}`}
                >
                    {theme === 'dark' ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
                </button>

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="w-full max-w-md bg-white dark:bg-[#1c1f26] border border-slate-200 dark:border-slate-800 rounded-2xl p-8 shadow-2xl transition-colors duration-300"
                >
                    <div className="flex justify-center mb-10">
                        <img
                            src="https://www.fiemg.com.br/wp-content/uploads/2023/02/Ativo-1-1.png"
                            alt="Logo FIEMG"
                            className="h-[68px] w-auto object-contain dark:brightness-0 dark:invert transition-all"
                        />
                    </div>
                    <h2 className="text-2xl font-bold text-slate-800 dark:text-white text-center mb-8 transition-colors duration-300">Inventário de Telefonia</h2>

                    <form className="space-y-4" onSubmit={handleLogin}>
                        <div className="space-y-1.5">
                            <label className="text-sm font-medium text-slate-600 dark:text-slate-300 transition-colors duration-300">Usuário</label>
                            <input
                                type="email"
                                required
                                className="w-full bg-slate-50 dark:bg-[#111621] border border-slate-200 dark:border-slate-800 rounded-lg px-4 py-3 text-slate-900 dark:text-white focus:ring-2 focus:ring-blue-500 outline-none transition-all"
                                placeholder="Digite seu e-mail"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            />
                        </div>
                        <div className="space-y-1.5">
                            <label className="text-sm font-medium text-slate-600 dark:text-slate-300 transition-colors duration-300">Senha</label>
                            <input
                                type="password"
                                required
                                className="w-full bg-slate-50 dark:bg-[#111621] border border-slate-200 dark:border-slate-800 rounded-lg px-4 py-3 text-slate-900 dark:text-white focus:ring-2 focus:ring-blue-500 outline-none transition-all"
                                placeholder="Digite sua senha"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            />
                        </div>

                        {authError && (
                            <p className="text-red-500 text-xs font-medium animate-in fade-in slide-in-from-top-1">
                                {authError === 'Invalid login credentials' ? 'E-mail ou senha incorretos' : authError}
                            </p>
                        )}

                        <button
                            disabled={isLoggingIn}
                            className="w-full bg-blue-600 hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed text-white font-bold py-3 rounded-lg shadow-lg shadow-blue-600/20 transition-all mt-4 flex items-center justify-center gap-2"
                        >
                            {isLoggingIn ? (
                                <>
                                    <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                                    Entrando...
                                </>
                            ) : 'Entrar'}
                        </button>
                    </form>

                    <div className="mt-8 flex justify-center gap-4 text-xs font-bold text-slate-500 uppercase tracking-widest">
                        <span>SESI</span>
                        <span>SENAI</span>
                        <span>CIEMG</span>
                        <span>IEL</span>
                    </div>
                </motion.div>
            </div>
        );
    }

    return (
        <div className="flex h-screen bg-slate-50 dark:bg-[#0a0c10] text-slate-900 dark:text-slate-100 overflow-hidden font-sans transition-colors duration-300">
            <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} />

            <main className="flex-1 flex flex-col h-screen overflow-hidden relative">
                {/* Header */}
                <header className="h-16 flex items-center justify-between px-8 bg-white dark:bg-[#0a0c10] border-b border-slate-200 dark:border-slate-800 shrink-0 z-10 transition-colors duration-300">
                    <div className="flex items-center gap-4">
                        <h2 className="text-xl font-semibold text-slate-900 dark:text-white tracking-tight">
                            {activeTab === 'dashboard' ? 'Dashboard Geral' :
                                activeTab === 'units' ? 'Gerenciamento de Unidades' :
                                    activeTab === 'lines' ? 'Gerenciamento de Linhas' :
                                        activeTab === 'extensions' ? 'Gerenciamento de Ramais' :
                                            activeTab === 'ura' ? 'Gerenciamento de URA' :
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
                        <div className="flex items-center gap-3">
                            <div className="text-right hidden sm:block">
                                <p className="text-sm font-medium text-slate-900 dark:text-white leading-none">{session.user.email.split('@')[0]}</p>
                                <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">Usuário Autenticado</p>
                            </div>
                            <div className="w-8 h-8 rounded-full bg-blue-100 dark:bg-blue-600/20 flex items-center justify-center text-blue-600 dark:text-blue-500 font-bold text-xs uppercase">
                                {session.user.email[0]}
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
