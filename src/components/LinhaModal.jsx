import React, { useState, useEffect } from 'react';
import { X, Phone, Signal, Building, Check } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { supabase } from '../lib/supabase.js';

export function LinhaModal({ isOpen, onClose, onSave, linhaToEdit }) {
    const [formData, setFormData] = useState({
        numero: '',
        operadora: '',
        unidadeId: '',
        tipoPlano: 'Corporativo',
        status: 'Ativa'
    });

    const [unidades, setUnidades] = useState([]);
    const [errors, setErrors] = useState({ numero: false, unidadeId: false });

    // Fetch units to populate the dropdown
    useEffect(() => {
        async function fetchUnidades() {
            try {
                const { data, error } = await supabase.from('unidades').select('id, nome').order('nome');
                if (data) setUnidades(data);
                // Fallback for demo mode
                if (!data || data.length === 0) {
                    setUnidades([
                        { id: '1', nome: 'Vila Leopoldina' },
                        { id: '2', nome: 'Maracanã' },
                        { id: '3', nome: 'Paulista' },
                        { id: '4', nome: 'Amoreiras' },
                        { id: '5', nome: 'Horto' },
                    ]);
                }
            } catch (err) {
                setUnidades([
                    { id: '1', nome: 'Vila Leopoldina' },
                    { id: '2', nome: 'Maracanã' },
                    { id: '3', nome: 'Paulista' }
                ]);
            }
        }
        if (isOpen) {
            fetchUnidades();
        }
    }, [isOpen]);

    useEffect(() => {
        if (isOpen) {
            setErrors({ numero: false, unidadeId: false });
            if (linhaToEdit) {
                setFormData(linhaToEdit);
            } else {
                setFormData({
                    numero: '',
                    operadora: '',
                    unidadeId: '',
                    tipoPlano: 'Corporativo',
                    status: 'Ativa'
                });
            }
        }
    }, [isOpen, linhaToEdit]);

    function handleLocalSave() {
        const newErrors = { numero: false, unidadeId: false };
        let hasError = false;

        if (!formData.numero || formData.numero.trim() === '') {
            newErrors.numero = true;
            hasError = true;
        }

        if (!formData.unidadeId || formData.unidadeId === '') {
            newErrors.unidadeId = true;
            hasError = true;
        }

        setErrors(newErrors);

        if (hasError) {
            return;
        }

        onSave(formData);
    }

    if (!isOpen) return null;

    return (
        <AnimatePresence>
            <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    onClick={onClose}
                    className="fixed inset-0 bg-black/60 backdrop-blur-sm"
                />

                <motion.div
                    initial={{ opacity: 0, scale: 0.95, y: 20 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.95, y: 20 }}
                    className="relative w-full max-w-[640px] bg-white dark:bg-[#1c1f26] rounded-xl shadow-2xl border border-slate-200 dark:border-slate-800 flex flex-col overflow-hidden transition-colors"
                >
                    {/* Header */}
                    <div className="px-6 py-5 border-b border-slate-200 dark:border-slate-800 flex justify-between items-center bg-slate-50 dark:bg-[#1c1f26] backdrop-blur-sm transition-colors">
                        <div>
                            <h2 className="text-slate-900 dark:text-white text-xl font-bold leading-tight tracking-tight">
                                {linhaToEdit ? 'Editar Linha' : 'Cadastrar Nova Linha'}
                            </h2>
                            <p className="text-slate-500 dark:text-slate-400 text-sm mt-1">
                                {linhaToEdit ? 'Atualize as informações desta linha.' : 'Adicione um novo número de telefone ao sistema corporativo.'}
                            </p>
                        </div>
                        <button onClick={onClose} className="text-slate-400 hover:text-slate-600 dark:hover:text-slate-300 transition-colors">
                            <X className="w-6 h-6" />
                        </button>
                    </div>

                    {/* Form Content */}
                    <div className="p-6 space-y-6 bg-white dark:bg-[#1c1f26] transition-colors">
                        {/* Field: Linha */}
                        <div className="space-y-2">
                            <label className="block text-sm font-medium text-slate-700 dark:text-slate-300">
                                Número da Linha <span className="text-red-500">*</span>
                            </label>
                            <div className="relative group">
                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400 group-focus-within:text-blue-500 transition-colors">
                                    <Phone className="w-5 h-5" />
                                </div>
                                <input
                                    className={`w-full bg-slate-50 dark:bg-[#111318] border text-slate-900 dark:text-white rounded-lg pl-10 pr-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500 transition-all placeholder:text-slate-400 dark:placeholder:text-slate-500 shadow-sm dark:shadow-none ${errors.numero ? 'border-red-500 focus:ring-red-500/50 focus:border-red-500' : 'border-slate-300 dark:border-slate-800'}`}
                                    placeholder="(00) 00000-0000"
                                    type="tel"
                                    value={formData.numero}
                                    onChange={(e) => setFormData({ ...formData, numero: e.target.value })}
                                />
                            </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            {/* Field: Operadora */}
                            <div className="space-y-2">
                                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300">
                                    Operadora
                                </label>
                                <div className="relative group">
                                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400 group-focus-within:text-blue-500 transition-colors">
                                        <Signal className="w-5 h-5" />
                                    </div>
                                    <input
                                        className="w-full bg-slate-50 dark:bg-[#111318] border border-slate-300 dark:border-slate-800 text-slate-900 dark:text-white rounded-lg pl-10 pr-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500 transition-all placeholder:text-slate-400 dark:placeholder:text-slate-500 shadow-sm dark:shadow-none"
                                        list="operadoras"
                                        placeholder="Ex: Vivo"
                                        type="text"
                                        value={formData.operadora}
                                        onChange={(e) => setFormData({ ...formData, operadora: e.target.value })}
                                    />
                                    <datalist id="operadoras">
                                        <option value="Vivo"></option>
                                        <option value="Claro"></option>
                                        <option value="TIM"></option>
                                        <option value="Oi"></option>
                                        <option value="Algar"></option>
                                    </datalist>
                                </div>
                            </div>

                            {/* Field: Unidade */}
                            <div className="space-y-2">
                                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300">
                                    Unidade <span className="text-red-500">*</span>
                                </label>
                                <div className="relative">
                                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
                                        <Building className="w-5 h-5" />
                                    </div>
                                    <select
                                        className={`w-full appearance-none bg-slate-50 dark:bg-[#111318] border text-slate-900 dark:text-white rounded-lg pl-10 pr-10 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500 transition-all cursor-pointer shadow-sm dark:shadow-none ${errors.unidadeId ? 'border-red-500 focus:ring-red-500/50 focus:border-red-500' : 'border-slate-300 dark:border-slate-800'}`}
                                        value={formData.unidadeId}
                                        onChange={(e) => setFormData({ ...formData, unidadeId: e.target.value })}
                                    >
                                        <option disabled value="">Selecione a unidade</option>
                                        {unidades.map(u => (
                                            <option key={u.id} value={u.id}>{u.nome}</option>
                                        ))}
                                    </select>
                                    <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none text-slate-400">
                                        <ChevronDownIcon className="w-5 h-5" />
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Field: Tipo de Linha */}
                        <div className="space-y-2">
                            <label className="block text-sm font-medium text-slate-700 dark:text-slate-300">
                                Tipo de Plano
                            </label>
                            <div className="flex gap-4 pt-1">
                                {['Corporativo', 'Flex', 'Pré-pago'].map(tipo => (
                                    <label key={tipo} className="inline-flex items-center cursor-pointer group">
                                        <input
                                            checked={formData.tipoPlano === tipo}
                                            onChange={() => setFormData({ ...formData, tipoPlano: tipo })}
                                            className="w-4 h-4 text-blue-600 bg-slate-100 border-slate-300 dark:bg-[#111318] dark:border-slate-800 focus:ring-blue-500 focus:ring-2"
                                            name="planType"
                                            type="radio"
                                        />
                                        <span className="ml-2 text-sm text-slate-600 dark:text-slate-400 group-hover:text-slate-900 dark:group-hover:text-slate-200 transition-colors">{tipo}</span>
                                    </label>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Actions */}
                    <div className="px-6 py-4 bg-slate-50 dark:bg-[#151923] border-t border-slate-200 dark:border-slate-800 flex justify-end gap-3 transition-colors">
                        <button
                            onClick={onClose}
                            className="px-5 py-2.5 rounded-lg text-sm font-medium text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-white/5 transition-colors focus:outline-none focus:ring-2 focus:ring-slate-400 dark:focus:ring-slate-600"
                        >
                            Cancelar
                        </button>
                        <button
                            onClick={handleLocalSave}
                            className="flex items-center gap-2 px-5 py-2.5 rounded-lg text-sm font-bold text-white bg-blue-600 hover:bg-blue-700 active:bg-blue-800 transition-colors shadow-lg shadow-blue-600/20 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-600 dark:focus:ring-offset-[#1c1f26]"
                        >
                            <Check className="w-5 h-5" />
                            {linhaToEdit ? 'Atualizar Linha' : 'Salvar Linha'}
                        </button>
                    </div>
                </motion.div>
            </div>
        </AnimatePresence>
    );
}

function ChevronDownIcon(props) {
    return (
        <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="m6 9 6 6 6-6" />
        </svg>
    )
}
