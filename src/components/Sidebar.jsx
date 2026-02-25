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

function cn(...inputs) {
    return twMerge(clsx(inputs));
}

const menuItems = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { id: 'units', label: 'Unidades', icon: Building2 },
    { id: 'extensions', label: 'Ramais', icon: Phone },
    { id: 'lines', label: 'Linhas', icon: ListOrdered },
    { id: 'ura', label: 'URA', icon: Bot },
    { id: 'history', label: 'Histórico', icon: History },
    { id: 'charts', label: 'Gráficos', icon: BarChart3 },
];

export function Sidebar({ activeTab, setActiveTab }) {
    return (
        <aside className="w-64 bg-[#111621] border-r border-slate-800 flex flex-col h-screen shrink-0 transition-colors duration-300">
            <div className="p-6 flex items-center gap-3">
                <div className="bg-blue-600/20 p-2 rounded-lg text-blue-500">
                    <Phone className="w-8 h-8" />
                </div>
                <div>
                    <h1 className="text-white text-base font-bold leading-tight">Telefonia Sistema FIEMG</h1>
                    <p className="text-slate-400 text-xs">Admin Console</p>
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
                                    : "text-slate-400 hover:bg-slate-800 hover:text-blue-400"
                            )}
                        >
                            <Icon className="w-5 h-5" />
                            <span className="text-sm font-medium">{item.label}</span>
                            {isActive && <ChevronRight className="ml-auto w-4 h-4 opacity-50" />}
                        </button>
                    );
                })}
            </nav>

            <div className="p-4 border-t border-slate-800">
                <div className="flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-slate-800 transition-all duration-200 cursor-pointer group">
                    <div className="w-10 h-10 rounded-full bg-slate-700 overflow-hidden">
                        <img
                            src="https://picsum.photos/seed/admin/100/100"
                            alt="Admin"
                            className="w-full h-full object-cover"
                            referrerPolicy="no-referrer"
                        />
                    </div>
                    <div className="flex flex-col flex-1 min-w-0">
                        <span className="text-sm font-medium text-white truncate">Ana Silva</span>
                        <span className="text-xs text-slate-400 truncate">Gerente de TI</span>
                    </div>
                    <LogOut className="w-4 h-4 text-slate-500 group-hover:text-red-400" />
                </div>
            </div>
        </aside>
    );
}
