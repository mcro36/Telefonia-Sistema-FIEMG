import { useState, useEffect, useRef } from 'react';
import { Sidebar } from './components/Sidebar.jsx';
import { DashboardView } from './components/DashboardView.jsx';
import { UnidadeView } from './components/UnidadeView.jsx';
import { LinesView } from './components/LinhasView.jsx';
import { ExtensionsView } from './components/RamaisView.jsx';
import { Bell, Search, Plus, PhoneCall, ListOrdered, Bot, Moon, Sun } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { supabase } from './lib/supabase.js';
import { useTheme } from './hooks/useTheme.js';
import { UraView } from './components/UraView.jsx';
import { ProjetoView } from './components/ProjetoView.jsx';
import { GerenciamentoContaModal } from './components/GerenciamentoContaModal.jsx';
import { useAuth } from './contexts/AuthContext.jsx';
import { User, Settings, ShieldCheck, LogOut, ChevronRight } from 'lucide-react';

export default function App() {
    const [activeTab, setActiveTab] = useState('dashboard');
    const [customTitle, setCustomTitle] = useState('');
    const [session, setSession] = useState(null);
    const [loading, setLoading] = useState(true);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [authError, setAuthError] = useState(null);
    const [isLoggingIn, setIsLoggingIn] = useState(false);
    const { theme, toggleTheme } = useTheme();
    const { user: roleUser, hasRole } = useAuth(); // Importa nosso User mockado da regra RBAC
    const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
    const [isGerenciamentoModalOpen, setIsGerenciamentoModalOpen] = useState(false);
    const userMenuRef = useRef(null);

    // Fechar menu de usuário ao clicar fora
    useEffect(() => {
        function handleClickOutside(event) {
            if (userMenuRef.current && !userMenuRef.current.contains(event.target)) {
                setIsUserMenuOpen(false);
            }
        }
        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

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
            <Sidebar
                activeTab={activeTab}
                setActiveTab={setActiveTab}
                onOpenGerenciamento={() => setIsGerenciamentoModalOpen(true)}
            />

            <main className="flex-1 flex flex-col h-screen overflow-hidden relative">
                {/* Header */}
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
                                    console.log('Avatar Clicado! Anterar Menu Para:', !isUserMenuOpen);
                                    setIsUserMenuOpen(prev => !prev);
                                }}
                                className="flex items-center gap-3 hover:bg-slate-50 dark:hover:bg-[#111621] p-1.5 rounded-lg transition-colors cursor-pointer"
                            >
                                <div className="text-right hidden sm:block">
                                    <p className="text-sm font-medium text-slate-900 dark:text-white leading-none">{roleUser?.name || session.user.email.split('@')[0]}</p>
                                    <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">{roleUser?.role || 'Usuário Autenticado'}</p>
                                </div>
                                <div className="w-9 h-9 border border-blue-600/30 rounded-full bg-blue-100 dark:bg-[#151c2e] flex items-center justify-center text-blue-600 dark:text-blue-500 font-bold text-sm uppercase shadow-inner">
                                    {roleUser?.avatarInitials || session.user.email[0]}
                                </div>
                            </button>

                            {/* Dropdown Menu */}
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
                                        <div className="p-4 border-b border-slate-100 dark:border-slate-800/60 bg-slate-50/50 dark:bg-transparent">
                                            <p className="text-[10px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-widest mb-1.5">Conta Logada</p>
                                            <p className="text-sm font-bold text-slate-900 dark:text-white truncate">{roleUser?.name}</p>
                                            <p className="text-xs font-medium text-slate-500 dark:text-slate-400 truncate mt-0.5">{roleUser?.email}</p>
                                        </div>

                                        <div className="p-2 flex flex-col gap-0.5">
                                            <button className="flex items-center gap-3 w-full p-2.5 text-sm font-medium text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white hover:bg-slate-50 dark:hover:bg-slate-800/50 rounded-lg transition-colors text-left">
                                                <User className="w-4 h-4 text-slate-400" />
                                                Meu Perfil
                                            </button>
                                            <button className="flex items-center gap-3 w-full p-2.5 text-sm font-medium text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white hover:bg-slate-50 dark:hover:bg-slate-800/50 rounded-lg transition-colors text-left">
                                                <Settings className="w-4 h-4 text-slate-400" />
                                                Configurações
                                            </button>
                                        </div>

                                        <div className="p-2 border-t border-slate-100 dark:border-slate-800/60">
                                            <button
                                                onClick={async () => { await supabase.auth.signOut(); }}
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

                {/* Content Area */}
                <div className="flex-1 overflow-y-auto px-8 pt-8 pb-0 custom-scrollbar flex flex-col">
                    <div className="flex-1 w-full max-w-7xl mx-auto">
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
                                {activeTab === 'ura' && <UraView />}
                                {activeTab === 'projects' && <ProjetoView setPageTitle={setCustomTitle} />}
                            </motion.div>
                        </AnimatePresence>
                    </div>

                    <footer className="mt-8 pt-4 border-t border-slate-200 dark:border-slate-800 text-center text-xs text-slate-500 pb-0 shrink-0">
                        <p>© 2024 Gestão Telefônica Enterprise. Todos os direitos reservados.</p>
                    </footer>
                </div>
            </main>

            <GerenciamentoContaModal
                isOpen={isGerenciamentoModalOpen}
                onClose={() => setIsGerenciamentoModalOpen(false)}
            />
        </div>
    );
}
