import React from 'react';
import {
    Building2,
    PhoneCall,
    Cpu,
    TrendingUp,
    Search,
    Download
} from 'lucide-react';
import {
    AreaChart,
    Area,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer
} from 'recharts';
import { useSupabaseTable } from '../hooks/useSupabaseTable';
import { supabase } from '../lib/supabase';
import { convertToCamel } from '../lib/utils';

const data = [
    { name: 'Jan', value: 400 },
    { name: 'Fev', value: 300 },
    { name: 'Mar', value: 600 },
    { name: 'Abr', value: 800 },
    { name: 'Mai', value: 500 },
    { name: 'Jun', value: 900 },
];

export function DashboardView() {
    const [stats, setStats] = React.useState([
        { label: 'Total de Unidades', value: '...', icon: Building2, color: 'text-blue-500', bg: 'bg-blue-500/10' },
        { label: 'Ramais SIP Ativos', value: '...', icon: PhoneCall, color: 'text-emerald-500', bg: 'bg-emerald-500/10' },
        { label: 'Linhas', value: '...', icon: Cpu, color: 'text-purple-500', bg: 'bg-purple-500/10' },
    ]);

    const [regions, setRegions] = React.useState([]);

    React.useEffect(() => {
        async function loadDashboardData() {
            try {
                // 1. Unidades count
                const { count: unidadesCount, error: uErr } = await supabase
                    .from('unidades')
                    .select('*', { count: 'exact', head: true });

                // 2. Ramais SIP ativos count
                const { count: sipCount, error: sErr } = await supabase
                    .from('ramais_sip')
                    .select('*', { count: 'exact', head: true })
                    .eq('status', 'Ativo');

                // 3. Linhas (todas cadastradas)
                const { count: linhasCount, error: lErr } = await supabase
                    .from('linhas')
                    .select('*', { count: 'exact', head: true });

                if (!uErr && !sErr && !lErr) {
                    setStats([
                        { label: 'Total de Unidades', value: unidadesCount?.toString() || '0', icon: Building2, color: 'text-blue-500', bg: 'bg-blue-500/10' },
                        { label: 'Ramais SIP Ativos', value: sipCount?.toString() || '0', icon: PhoneCall, color: 'text-emerald-500', bg: 'bg-emerald-500/10' },
                        { label: 'Linhas', value: linhasCount?.toString() || '0', icon: Cpu, color: 'text-purple-500', bg: 'bg-purple-500/10' },
                    ]);
                }

                // 4. Distribution by city (Simulating Ramais por Região)
                const { data: unitsData } = await supabase.from('unidades').select('id, cidade');
                const { data: sipData, error: sipDataErr } = await supabase.from('ramais_sip').select('unidadeId');
                const { data: pabxData, error: pabxDataErr } = await supabase.from('ramais_pabx').select('unidadeId');

                if (unitsData) {
                    const unitCityMap = {};
                    unitsData.forEach(u => {
                        unitCityMap[u.id] = u.cidade || 'Não informada';
                    });

                    const regionCounts = {};
                    let totalRamais = 0;

                    const processExtensions = (extData) => {
                        if (!extData) return;
                        extData.forEach(e => {
                            // Se a modelagem usa camelCase
                            const uId = e.unidadeId || e.unidade_id;
                            if (uId && unitCityMap[uId]) {
                                const city = unitCityMap[uId];
                                regionCounts[city] = (regionCounts[city] || 0) + 1;
                                totalRamais++;
                            }
                        });
                    };

                    processExtensions(sipData);
                    processExtensions(pabxData);

                    // Ordenar regiões pelas do maior para o menor e injetar total
                    const sortedRegions = Object.keys(regionCounts)
                        .map(city => ({
                            label: city,
                            value: regionCounts[city],
                            total: totalRamais > 0 ? totalRamais : 1 // prevent div zero
                        }))
                        .sort((a, b) => b.value - a.value)
                        .slice(0, 5); // top 5

                    setRegions(sortedRegions);
                }

            } catch (err) {
                console.error("Dashboard dataload err:", err);
            }
        }

        loadDashboardData();
    }, []);

    return (
        <div className="space-y-8 animate-in fade-in duration-500">
            <header className="flex flex-col gap-2 md:flex-row md:items-center md:justify-between">
                <div>
                    <h1 className="text-3xl font-bold tracking-tight text-slate-900 dark:text-white">Visão Geral</h1>
                    <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">Monitoramento em tempo real do sistema de telefonia.</p>
                </div>
                <div className="flex items-center gap-3">
                    <div className="relative">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 dark:text-slate-400 w-4 h-4" />
                        <input
                            className="h-10 rounded-lg border border-slate-200 dark:border-0 bg-white dark:bg-[#1c1f26] pl-10 pr-4 text-sm text-slate-900 dark:text-white ring-1 ring-inset ring-transparent dark:ring-slate-800 placeholder:text-slate-500 dark:placeholder:text-slate-500 focus:ring-2 focus:ring-blue-500 w-64 shadow-sm"
                            placeholder="Buscar ramal ou unidade..."
                            type="text"
                        />
                    </div>
                    <button className="flex h-10 items-center justify-center gap-2 rounded-lg bg-blue-600 px-4 text-sm font-medium text-white hover:bg-blue-700 transition-colors shadow-sm">
                        <Download className="w-4 h-4" />
                        <span>Relatório</span>
                    </button>
                </div>
            </header>

            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {stats.map((stat, i) => (
                    <div key={i} className="bg-white dark:bg-[#1c1f26] p-6 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm flex items-center justify-between hover:border-blue-500/50 dark:hover:border-blue-500/50 transition-colors">
                        <div>
                            <p className="text-sm text-slate-500 dark:text-slate-400 font-medium">{stat.label}</p>
                            <h3 className="text-3xl font-bold text-slate-900 dark:text-white mt-1">{stat.value}</h3>
                        </div>
                        <div className={`w-12 h-12 rounded-full ${stat.bg} ${stat.color} flex items-center justify-center`}>
                            <stat.icon className="w-6 h-6" />
                        </div>
                    </div>
                ))}
            </div>

            <div className="grid gap-6 lg:grid-cols-3">
                <div className="lg:col-span-2 bg-white dark:bg-[#1c1f26] p-6 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm">
                    <div className="flex items-center justify-between mb-6">
                        <div>
                            <h3 className="text-lg font-semibold text-slate-900 dark:text-white">Uso de Ramais SIP por Mês</h3>
                            <p className="text-sm text-slate-500 dark:text-slate-400">Volume de chamadas nos últimos 6 meses</p>
                        </div>
                        <div className="flex items-center gap-2 rounded-full bg-emerald-500/10 px-2.5 py-1 text-xs font-medium text-emerald-400">
                            <TrendingUp className="w-3 h-3" />
                            +5.2%
                        </div>
                    </div>
                    <div className="h-64 w-full">
                        <ResponsiveContainer width="100%" height="100%">
                            <AreaChart data={data}>
                                <defs>
                                    <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
                                        <stop offset="5%" stopColor="#2563eb" stopOpacity={0.3} />
                                        <stop offset="95%" stopColor="#2563eb" stopOpacity={0} />
                                    </linearGradient>
                                </defs>
                                <CartesianGrid strokeDasharray="3 3" stroke="#cbd5e1" className="dark:stroke-[#1e293b]" vertical={false} />
                                <XAxis dataKey="name" stroke="#64748b" fontSize={12} tickLine={false} axisLine={false} />
                                <YAxis stroke="#64748b" fontSize={12} tickLine={false} axisLine={false} />
                                <Tooltip
                                    contentStyle={{ backgroundColor: 'var(--tw-colors-slate-900, #0f172a)', border: 'none', borderRadius: '8px', color: '#fff' }}
                                    itemStyle={{ color: '#fff' }}
                                />
                                <Area type="monotone" dataKey="value" stroke="#2563eb" fillOpacity={1} fill="url(#colorValue)" strokeWidth={3} />
                            </AreaChart>
                        </ResponsiveContainer>
                    </div>
                </div>

                <div className="bg-white dark:bg-[#1c1f26] p-6 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm">
                    <h3 className="text-lg font-semibold text-slate-900 dark:text-white mb-6">Ramais por Região</h3>
                    <div className="space-y-6">
                        {regions.length > 0 ? regions.map((reg, i) => (
                            <div key={i} className="space-y-2">
                                <div className="flex justify-between text-xs text-slate-500 dark:text-slate-400">
                                    <span className="truncate pr-2" title={reg.label}>{reg.label}</span>
                                    <span className="font-medium text-slate-900 dark:text-white">{reg.value}</span>
                                </div>
                                <div className="h-2 w-full bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
                                    <div
                                        className="h-full bg-blue-600 rounded-full transition-all duration-1000"
                                        style={{ width: `${(reg.value / reg.total) * 100}%` }}
                                    />
                                </div>
                            </div>
                        )) : (
                            <div className="text-sm text-slate-500 text-center py-4">Nenhum dado encontrado</div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}
