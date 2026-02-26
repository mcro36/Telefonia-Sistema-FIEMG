import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';

export function RamalModalSIP({ isOpen, onClose, onSave, ramalToEdit }) {
    const [formData, setFormData] = useState({
        nome: '',
        numero: '',
        status: 'Ativo',
        microsipUser: '',
        microsipPass: '',
        unidadeId: '',
        setor: '',
        ddr: '',
        ura: '',
        observacao: ''
    });

    // Reset or populate state when modal opens
    React.useEffect(() => {
        if (isOpen) {
            if (ramalToEdit) {
                setFormData(ramalToEdit);
            } else {
                setFormData({
                    nome: '',
                    numero: '',
                    status: 'Ativo',
                    microsipUser: '',
                    microsipPass: '',
                    unidadeId: '',
                    setor: '',
                    ddr: '',
                    ura: '',
                    observacao: ''
                });
            }
        }
    }, [isOpen, ramalToEdit]);

    function handleLocalSave(e) {
        e.preventDefault();
        // Minimal validation
        if (!formData.nome || !formData.numero) {
            alert("Nome e Ramal são obrigatórios.");
            return;
        }

        onSave({
            ...formData,
            tipo: 'SIP' // Distinguish from PABX
        });
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
                    className="relative w-full max-w-[800px] bg-white dark:bg-surface-dark rounded-xl shadow-2xl border border-slate-200 dark:border-border-dark flex flex-col max-h-[90vh] overflow-hidden"
                >
                    <div className="px-6 py-5 border-b border-slate-200 dark:border-border-dark flex items-center justify-between bg-white dark:bg-surface-dark sticky top-0 z-10 transition-colors">
                        <h2 className="text-slate-900 dark:text-slate-100 text-xl font-bold leading-tight">
                            {ramalToEdit ? 'Editar Ramal SIP' : 'Cadastrar Novo Ramal SIP'}
                        </h2>
                        <button onClick={onClose} className="text-slate-500 hover:text-slate-700 dark:text-slate-400 dark:hover:text-slate-200 transition-colors">
                            <span className="material-symbols-outlined">close</span>
                        </button>
                    </div>

                    <div className="p-6 overflow-y-auto custom-scrollbar flex-1 bg-background-light dark:bg-[#111621] transition-colors">
                        <form className="space-y-6" onSubmit={handleLocalSave}>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div className="space-y-2">
                                    <label className="block text-sm font-medium text-slate-700 dark:text-slate-300">
                                        Nome do ramal <span className="text-red-500">*</span>
                                    </label>
                                    <div className="relative">
                                        <input
                                            className="block w-full rounded-lg border border-slate-300 dark:border-border-dark bg-slate-50 dark:bg-[#111621] text-slate-900 dark:text-white focus:border-primary focus:ring-primary sm:text-sm h-11 pl-4"
                                            placeholder="Ex: Recepção"
                                            type="text"
                                            value={formData.nome}
                                            onChange={(e) => setFormData({ ...formData, nome: e.target.value })}
                                        />
                                    </div>
                                </div>

                                <div className="flex gap-4">
                                    <div className="space-y-2 flex-1">
                                        <label className="block text-sm font-medium text-slate-700 dark:text-slate-300">
                                            Ramal <span className="text-red-500">*</span>
                                        </label>
                                        <input
                                            className="block w-full rounded-lg border border-slate-300 dark:border-border-dark bg-slate-50 dark:bg-[#111621] text-slate-900 dark:text-white focus:border-primary focus:ring-primary sm:text-sm h-11 pl-4"
                                            placeholder="Ex: 101"
                                            type="number"
                                            value={formData.numero}
                                            onChange={(e) => setFormData({ ...formData, numero: e.target.value })}
                                        />
                                    </div>

                                    <div className="space-y-2 flex flex-col justify-end pb-1.5">
                                        <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                                            Habilitado
                                        </label>
                                        <label className="inline-flex items-center cursor-pointer">
                                            <input
                                                checked={formData.status === 'Ativo'}
                                                onChange={(e) => setFormData({ ...formData, status: e.target.checked ? 'Ativo' : 'Inativo' })}
                                                className="sr-only peer"
                                                type="checkbox"
                                            />
                                            <div className="relative w-11 h-6 bg-slate-200 peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-primary/50 dark:peer-focus:ring-primary/30 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-primary"></div>
                                            <span className="ms-3 text-sm font-medium text-slate-700 dark:text-slate-300">Sim</span>
                                        </label>
                                    </div>
                                </div>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div className="space-y-2">
                                    <label className="block text-sm font-medium text-slate-700 dark:text-slate-300">
                                        MicroSIP
                                    </label>
                                    <div className="relative">
                                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
                                            <span className="material-symbols-outlined text-[20px]">account_circle</span>
                                        </div>
                                        <input
                                            className="block w-full rounded-lg border border-slate-300 dark:border-border-dark bg-slate-50 dark:bg-[#111621] text-slate-900 dark:text-white focus:border-primary focus:ring-primary sm:text-sm h-11 pl-10"
                                            placeholder="Usuário MicroSIP"
                                            type="text"
                                            value={formData.microsipUser}
                                            onChange={(e) => setFormData({ ...formData, microsipUser: e.target.value })}
                                        />
                                    </div>
                                </div>

                                <div className="space-y-2">
                                    <label className="block text-sm font-medium text-slate-700 dark:text-slate-300">
                                        Senha
                                    </label>
                                    <div className="relative">
                                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
                                            <span className="material-symbols-outlined text-[20px]">lock</span>
                                        </div>
                                        <input
                                            className="block w-full rounded-lg border border-slate-300 dark:border-border-dark bg-slate-50 dark:bg-[#111621] text-slate-900 dark:text-white focus:border-primary focus:ring-primary sm:text-sm h-11 pl-10 pr-10"
                                            placeholder="••••••••"
                                            type="password"
                                            value={formData.microsipPass}
                                            onChange={(e) => setFormData({ ...formData, microsipPass: e.target.value })}
                                        />
                                        <button className="absolute inset-y-0 right-0 pr-3 flex items-center text-slate-400 hover:text-slate-600 dark:hover:text-slate-200" type="button">
                                            <span className="material-symbols-outlined text-[20px]">visibility_off</span>
                                        </button>
                                    </div>
                                </div>
                            </div>

                            <div className="h-px bg-slate-200 dark:bg-border-dark my-2"></div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div className="space-y-2">
                                    <label className="block text-sm font-medium text-slate-700 dark:text-slate-300">
                                        Unidade
                                    </label>
                                    <div className="relative">
                                        <select
                                            className="block w-full rounded-lg border border-slate-300 dark:border-border-dark bg-slate-50 dark:bg-[#111621] text-slate-900 dark:text-white focus:border-primary focus:ring-primary sm:text-sm h-11 pl-4 pr-10 appearance-none"
                                            value={formData.unidadeId}
                                            onChange={(e) => setFormData({ ...formData, unidadeId: e.target.value })}
                                        >
                                            <option disabled value="">Selecione a unidade</option>
                                            <option value="hq">Matriz - São Paulo</option>
                                            <option value="bh">Filial - Belo Horizonte</option>
                                            <option value="rj">Filial - Rio de Janeiro</option>
                                        </select>
                                        <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-3 text-slate-500">
                                            <span className="material-symbols-outlined">expand_more</span>
                                        </div>
                                    </div>
                                </div>

                                <div className="space-y-2">
                                    <label className="block text-sm font-medium text-slate-700 dark:text-slate-300">
                                        Setor
                                    </label>
                                    <input
                                        className="block w-full rounded-lg border border-slate-300 dark:border-border-dark bg-slate-50 dark:bg-[#111621] text-slate-900 dark:text-white focus:border-primary focus:ring-primary sm:text-sm h-11 pl-4"
                                        placeholder="Ex: Comercial"
                                        type="text"
                                        value={formData.setor}
                                        onChange={(e) => setFormData({ ...formData, setor: e.target.value })}
                                    />
                                </div>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div className="space-y-2">
                                    <label className="block text-sm font-medium text-slate-700 dark:text-slate-300">
                                        Número Principal (DDR)
                                    </label>
                                    <div className="relative">
                                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
                                            <span className="material-symbols-outlined text-[20px]">call</span>
                                        </div>
                                        <select
                                            className="block w-full rounded-lg border border-slate-300 dark:border-border-dark bg-slate-50 dark:bg-[#111621] text-slate-900 dark:text-white focus:border-primary focus:ring-primary sm:text-sm h-11 pl-10 pr-10 appearance-none"
                                            value={formData.ddr}
                                            onChange={(e) => setFormData({ ...formData, ddr: e.target.value })}
                                        >
                                            <option disabled value="">Vincular número</option>
                                            <option value="1">(11) 3040-5000</option>
                                            <option value="2">(11) 3040-5001</option>
                                            <option value="3">(11) 3040-5002</option>
                                        </select>
                                        <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-3 text-slate-500">
                                            <span className="material-symbols-outlined">expand_more</span>
                                        </div>
                                    </div>
                                </div>

                                <div className="space-y-2">
                                    <label className="block text-sm font-medium text-slate-700 dark:text-slate-300">
                                        URA
                                    </label>
                                    <div className="relative">
                                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
                                            <span className="material-symbols-outlined text-[20px]">alt_route</span>
                                        </div>
                                        <select
                                            className="block w-full rounded-lg border border-slate-300 dark:border-border-dark bg-slate-50 dark:bg-[#111621] text-slate-900 dark:text-white focus:border-primary focus:ring-primary sm:text-sm h-11 pl-10 pr-10 appearance-none"
                                            value={formData.ura}
                                            onChange={(e) => setFormData({ ...formData, ura: e.target.value })}
                                        >
                                            <option disabled value="">Selecione a URA</option>
                                            <option value="main">Atendimento Principal</option>
                                            <option value="suporte">Suporte Técnico</option>
                                            <option value="vendas">Comercial</option>
                                        </select>
                                        <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-3 text-slate-500">
                                            <span className="material-symbols-outlined">expand_more</span>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="space-y-2 pb-6">
                                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300">
                                    Observações
                                </label>
                                <textarea
                                    className="block w-full rounded-lg border border-slate-300 dark:border-border-dark bg-slate-50 dark:bg-[#111621] text-slate-900 dark:text-white focus:border-primary focus:ring-primary sm:text-sm min-h-[100px] p-3 resize-y"
                                    placeholder="Informações adicionais sobre este ramal..."
                                    value={formData.observacao}
                                    onChange={(e) => setFormData({ ...formData, observacao: e.target.value })}
                                />
                            </div>
                        </form>
                    </div>

                    <div className="px-6 py-4 bg-slate-50 dark:bg-[#111621]/50 border-t border-slate-200 dark:border-border-dark flex items-center justify-end gap-3 sticky bottom-0 z-10 transition-colors">
                        <button
                            onClick={onClose}
                            className="px-4 py-2 text-sm font-medium text-slate-700 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white transition-colors bg-white dark:bg-surface-dark border border-slate-300 dark:border-border-dark rounded-lg hover:bg-slate-50 dark:hover:bg-slate-800"
                            type="button"
                        >
                            Cancelar
                        </button>
                        <button
                            onClick={handleLocalSave}
                            className="inline-flex items-center gap-2 px-5 py-2.5 text-sm font-medium text-white bg-primary rounded-lg hover:bg-primary-dark focus:ring-4 focus:ring-blue-300 dark:focus:ring-blue-900 transition-all shadow-lg shadow-primary/30"
                            type="button"
                        >
                            <span className="material-symbols-outlined text-[18px]">save</span>
                            {ramalToEdit ? 'Atualizar Ramal' : 'Salvar Ramal'}
                        </button>
                    </div>
                </motion.div>
            </div>
        </AnimatePresence>
    );
}
