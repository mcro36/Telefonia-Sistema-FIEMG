import React from 'react';
import {
    LayoutDashboard,
    Building2,
    Phone,
    ListOrdered,
    Bot,
    History,
    BarChart3,
    LogOut,
    ChevronRight
} from 'lucide-react';
import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';
import { supabase } from '../lib/supabase.js';

function cn(...inputs) {
    return twMerge(clsx(inputs));
}

const menuItems = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { id: 'units', label: 'Unidades', icon: Building2 },
    { id: 'lines', label: 'Linhas', icon: ListOrdered },
    { id: 'extensions', label: 'Ramais', icon: Phone },
    { id: 'ura', label: 'URA', icon: Bot },
    { id: 'history', label: 'Histórico', icon: History },
    { id: 'charts', label: 'Gráficos', icon: BarChart3 },
];

export function Sidebar({ activeTab, setActiveTab }) {
    return (
        <aside className="w-64 bg-white dark:bg-[#111621] border-r border-slate-200 dark:border-slate-800 flex flex-col h-screen shrink-0 transition-colors duration-300">
            <div className="p-6 flex items-center gap-3">
                <div className="bg-blue-600/10 dark:bg-blue-600/20 p-2 rounded-lg text-blue-600 dark:text-blue-500">
                    <Phone className="w-8 h-8" />
                </div>
                <div>
                    <h1 className="text-slate-900 dark:text-white text-base font-bold leading-tight">Telefonia Sistema FIEMG</h1>
                    <p className="text-slate-500 dark:text-slate-400 text-xs">Admin Console</p>
                </div>
            </div>

            <nav className="flex-1 px-4 py-4 space-y-1 overflow-y-auto">
                {menuItems.map((item) => {
                    const Icon = item.icon;
                    const isActive = activeTab === item.id;
                    return (
                        <button
                            key={item.id}
                            onClick={() => setActiveTab(item.id)}
                            className={cn(
                                "w-full flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all duration-200 group",
                                isActive
                                    ? "bg-blue-600 text-white shadow-lg shadow-blue-600/20"
                                    : "text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 hover:text-blue-600 dark:hover:text-blue-400"
                            )}
                        >
                            <Icon className="w-5 h-5" />
                            <span className="text-sm font-medium">{item.label}</span>
                            {isActive && <ChevronRight className="ml-auto w-4 h-4 opacity-50" />}
                        </button>
                    );
                })}
            </nav>

            <div className="p-4 border-t border-slate-200 dark:border-slate-800">
                <button
                    onClick={() => supabase.auth.signOut()}
                    className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-slate-600 dark:text-slate-400 hover:bg-red-50 dark:hover:bg-red-500/10 hover:text-red-500 dark:hover:text-red-400 transition-all duration-200 group"
                >
                    <LogOut className="w-5 h-5 group-hover:scale-110 transition-transform" />
                    <span className="text-sm font-medium">Sair do Sistema</span>
                </button>
            </div>
        </aside>
    );
}
