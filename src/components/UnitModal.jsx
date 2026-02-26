import React, { useState, useEffect } from 'react';
import { X, Search } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

export function UnitModal({ isOpen, onClose, onSave, unitToEdit }) {
    const [formData, setFormData] = useState({
        nome: '',
        entidade: 'SESI',
        cidade: '',
        endereco: '',
        unidadeIntegrada: false,
        uo: '',
        centroCusto: '',
        contrato: '',
        faixaRamais: '0000 - 9999'
    });

    const [faixaStart, setFaixaStart] = useState('');
    const [faixaEnd, setFaixaEnd] = useState('');

    useEffect(() => {
        if (isOpen) {
            if (unitToEdit) {
                setFormData(unitToEdit);
                if (unitToEdit.faixaRamais) {
                    const parts = unitToEdit.faixaRamais.split(' - ');
                    if (parts.length === 2) {
                        setFaixaStart(parts[0]);
                        setFaixaEnd(parts[1]);
                    }
                }
            } else {
                setFormData({
                    nome: '',
                    entidade: 'SESI',
                    cidade: '',
                    endereco: '',
                    unidadeIntegrada: false,
                    uo: '',
                    centroCusto: '',
                    contrato: '',
                    faixaRamais: ''
                });
                setFaixaStart('');
                setFaixaEnd('');
            }
        }
    }, [isOpen, unitToEdit]);

    function handleLocalSave() {
        if (!formData.uo || formData.uo.trim() === '') {
            alert('A UO (Unidade Organizacional) é obrigatória.');
            return;
        }

        const startLength = faixaStart.trim().length;
        const endLength = faixaEnd.trim().length;

        if (startLength !== 4 || endLength !== 4) {
            alert('A Faixa de Ramais (DE e ATÉ) deve conter obrigatoriamente 4 dígitos em cada campo (Ex: 0000 e 9999).');
            return;
        }

        const compiledFaixa = `${faixaStart.trim()} - ${faixaEnd.trim()}`;
        const finalData = { ...formData, faixaRamais: compiledFaixa };
        onSave(finalData);
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
                    className="relative w-full max-w-4xl bg-white dark:bg-[#1c1f26] rounded-xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh] border border-slate-200 dark:border-slate-800 transition-colors"
                >
                    {/* Header */}
                    <div className="px-6 py-5 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between bg-slate-50 dark:bg-[#1c1f26] transition-colors">
                        <div>
                            <h2 className="text-xl font-bold text-slate-900 dark:text-white leading-tight">
                                {unitToEdit ? 'Editar Unidade' : 'Cadastrar Nova Unidade'}
                            </h2>
                            <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
                                {unitToEdit ? 'Atualize os dados da unidade abaixo.' : 'Preencha os dados abaixo para adicionar uma nova unidade à base.'}
                            </p>
                        </div>
                        <button onClick={onClose} className="text-slate-400 hover:text-slate-600 dark:hover:text-white transition-colors">
                            <X className="w-6 h-6" />
                        </button>
                    </div>

                    {/* Content */}
                    <div className="overflow-y-auto p-6 md:p-8 custom-scrollbar bg-white dark:bg-[#1c1f26] transition-colors">
                        <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
                            <div className="col-span-1 md:col-span-12">
                                <h3 className="text-sm font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-500 mb-4 flex items-center gap-2">
                                    <BuildingIcon className="w-4 h-4" />
                                    Dados Gerais
                                </h3>
                            </div>

                            <div className="col-span-1 md:col-span-8">
                                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1.5 transition-colors">Nome da unidade</label>
                                <input
                                    className="w-full rounded-lg border border-slate-200 dark:border-slate-800 bg-white dark:bg-[#111318] text-slate-900 dark:text-white focus:border-blue-500 focus:ring-blue-500 h-11 px-4 placeholder:text-slate-400 dark:placeholder:text-slate-600 transition-colors shadow-sm dark:shadow-none"
                                    placeholder="CTTI - Centro de Treinamento da Tecnologia da Informação"
                                    value={formData.nome}
                                    onChange={e => setFormData({ ...formData, nome: e.target.value })}
                                />
                            </div>

                            <div className="col-span-1 md:col-span-4">
                                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1.5 transition-colors">Entidade</label>
                                <select
                                    className="w-full rounded-lg border border-slate-200 dark:border-slate-800 bg-white dark:bg-[#111318] text-slate-900 dark:text-white focus:border-blue-500 focus:ring-blue-500 h-11 px-4 appearance-none transition-colors shadow-sm dark:shadow-none"
                                    value={formData.entidade}
                                    onChange={e => setFormData({ ...formData, entidade: e.target.value })}
                                >
                                    <option value="SESI">SESI</option>
                                    <option value="SENAI">SENAI</option>
                                    <option value="FIEMG">FIEMG</option>
                                    <option value="CIEMG">CIEMG</option>
                                    <option value="IEL">IEL</option>
                                </select>
                            </div>

                            <div className="col-span-1 md:col-span-8">
                                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1.5 transition-colors">Endereço Completo</label>
                                <input
                                    className="w-full rounded-lg border border-slate-200 dark:border-slate-800 bg-white dark:bg-[#111318] text-slate-900 dark:text-white focus:border-blue-500 focus:ring-blue-500 h-11 px-4 placeholder:text-slate-400 dark:placeholder:text-slate-600 transition-colors shadow-sm dark:shadow-none"
                                    placeholder="Rua, Número, Bairro"
                                    value={formData.endereco}
                                    onChange={e => setFormData({ ...formData, endereco: e.target.value })}
                                />
                            </div>

                            <div className="col-span-1 md:col-span-4">
                                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1.5 transition-colors">Cidade</label>
                                <input
                                    className="w-full rounded-lg border border-slate-200 dark:border-slate-800 bg-white dark:bg-[#111318] text-slate-900 dark:text-white focus:border-blue-500 focus:ring-blue-500 h-11 px-4 placeholder:text-slate-400 dark:placeholder:text-slate-600 transition-colors shadow-sm dark:shadow-none"
                                    placeholder="Ex: Belo Horizonte"
                                    value={formData.cidade}
                                    onChange={e => setFormData({ ...formData, cidade: e.target.value })}
                                />
                            </div>

                            <div className="col-span-1 md:col-span-12 py-2">
                                <label className="inline-flex items-center gap-3 cursor-pointer group">
                                    <input
                                        type="checkbox"
                                        className="peer h-5 w-5 rounded border-slate-200 dark:border-slate-800 bg-transparent text-blue-600 focus:ring-blue-500 transition-colors"
                                        checked={formData.unidadeIntegrada}
                                        onChange={e => setFormData({ ...formData, unidadeIntegrada: e.target.checked })}
                                    />
                                    <span className="text-sm font-medium text-slate-700 dark:text-slate-300 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">Esta é uma Unidade Integrada?</span>
                                </label>
                            </div>

                            {formData.unidadeIntegrada && (
                                <motion.div
                                    initial={{ opacity: 0, height: 0 }}
                                    animate={{ opacity: 1, height: 'auto' }}
                                    className="col-span-1 md:col-span-12 bg-blue-50 dark:bg-blue-600/5 border border-blue-200 dark:border-blue-600/20 rounded-lg p-4 transition-colors"
                                >
                                    <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1.5 transition-colors">Vincular a Unidade Principal</label>
                                    <div className="relative">
                                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 w-4 h-4" />
                                        <input className="w-full rounded-lg border border-slate-200 dark:border-slate-800 bg-white dark:bg-[#111318] text-slate-900 dark:text-white focus:border-blue-500 focus:ring-blue-500 h-11 pl-10 pr-4 placeholder:text-slate-400 dark:placeholder:text-slate-600 shadow-sm dark:shadow-none transition-colors" placeholder="Pesquisar unidade principal..." />
                                    </div>
                                    <p className="text-xs text-slate-500 mt-2">Selecione a unidade "pai" à qual esta nova unidade responderá.</p>
                                </motion.div>
                            )}

                            <div className="col-span-1 md:col-span-12 mt-4">
                                <h3 className="text-sm font-semibold uppercase tracking-wider text-slate-500 mb-4 flex items-center gap-2">
                                    <FolderManagedIcon className="w-4 h-4" />
                                    Administrativo
                                </h3>
                            </div>

                            <div className="col-span-1 md:col-span-4">
                                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1.5 transition-colors">UO (Unidade Organizacional)</label>
                                <input
                                    className="w-full rounded-lg border border-slate-200 dark:border-slate-800 bg-white dark:bg-[#111318] text-slate-900 dark:text-white focus:border-blue-500 focus:ring-blue-500 h-11 px-4 placeholder:text-slate-400 dark:placeholder:text-slate-600 shadow-sm dark:shadow-none transition-colors"
                                    placeholder="Ex: 1020"
                                    value={formData.uo}
                                    onChange={e => setFormData({ ...formData, uo: e.target.value })}
                                />
                            </div>

                            <div className="col-span-1 md:col-span-4">
                                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1.5 transition-colors">Central de Custo</label>
                                <input
                                    className="w-full rounded-lg border border-slate-200 dark:border-slate-800 bg-white dark:bg-[#111318] text-slate-900 dark:text-white focus:border-blue-500 focus:ring-blue-500 h-11 px-4 placeholder:text-slate-400 dark:placeholder:text-slate-600 shadow-sm dark:shadow-none transition-colors"
                                    placeholder="Ex: CC-2024"
                                    value={formData.centroCusto}
                                    onChange={e => setFormData({ ...formData, centroCusto: e.target.value })}
                                />
                            </div>

                            <div className="col-span-1 md:col-span-4">
                                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1.5 transition-colors">Contrato de telefonia</label>
                                <input
                                    className="w-full rounded-lg border border-slate-200 dark:border-slate-800 bg-white dark:bg-[#111318] text-slate-900 dark:text-white focus:border-blue-500 focus:ring-blue-500 h-11 px-4 placeholder:text-slate-400 dark:placeholder:text-slate-600 shadow-sm dark:shadow-none transition-colors"
                                    placeholder="Nº do Contrato"
                                    value={formData.contrato}
                                    onChange={e => setFormData({ ...formData, contrato: e.target.value })}
                                />
                            </div>

                            <div className="col-span-1 md:col-span-12">
                                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1.5 transition-colors">Faixa de Ramais (Obrigatório 4 dígitos)</label>
                                <div className="flex flex-col md:flex-row gap-4 items-center">
                                    <div className="relative flex-1 w-full">
                                        <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500 dark:text-slate-600 text-[10px] font-bold">DE</span>
                                        <input
                                            className="w-full rounded-lg border border-slate-200 dark:border-slate-800 bg-white dark:bg-[#111318] text-slate-900 dark:text-white focus:border-blue-500 focus:ring-blue-500 h-11 pl-10 pr-4 placeholder:text-slate-400 dark:placeholder:text-slate-600 shadow-sm dark:shadow-none transition-colors"
                                            placeholder="Ex: 2000"
                                            type="text"
                                            maxLength={4}
                                            value={faixaStart}
                                            onChange={(e) => {
                                                const val = e.target.value.replace(/\D/g, '');
                                                setFaixaStart(val);
                                            }}
                                        />
                                    </div>
                                    <ArrowRightAltIcon className="text-slate-400 dark:text-slate-600 hidden md:block" />
                                    <div className="relative flex-1 w-full">
                                        <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500 dark:text-slate-600 text-[10px] font-bold">ATÉ</span>
                                        <input
                                            className="w-full rounded-lg border border-slate-200 dark:border-slate-800 bg-white dark:bg-[#111318] text-slate-900 dark:text-white focus:border-blue-500 focus:ring-blue-500 h-11 pl-10 pr-4 placeholder:text-slate-400 dark:placeholder:text-slate-600 shadow-sm dark:shadow-none transition-colors"
                                            placeholder="Ex: 2049"
                                            type="text"
                                            maxLength={4}
                                            value={faixaEnd}
                                            onChange={(e) => {
                                                const val = e.target.value.replace(/\D/g, '');
                                                setFaixaEnd(val);
                                            }}
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Footer */}
                    <div className="px-6 py-4 bg-slate-50 dark:bg-[#1c1f26] border-t border-slate-200 dark:border-slate-800 flex justify-end gap-3 rounded-b-xl transition-colors">
                        <button
                            onClick={onClose}
                            className="px-6 py-2.5 rounded-lg border border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-300 font-medium hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors bg-white dark:bg-transparent shadow-sm dark:shadow-none"
                        >
                            Cancelar
                        </button>
                        <button
                            onClick={handleLocalSave}
                            className="px-6 py-2.5 rounded-lg bg-blue-600 hover:bg-blue-700 text-white font-medium shadow-lg shadow-blue-600/20 transition-all"
                        >
                            {unitToEdit ? 'Atualizar Unidade' : 'Salvar Unidade'}
                        </button>
                    </div>
                </motion.div>
            </div>
        </AnimatePresence>
    );
}

function BuildingIcon(props) {
    return <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="16" height="20" x="4" y="2" rx="2" ry="2" /><path d="M9 22v-4h6v4" /><path d="M8 6h.01" /><path d="M16 6h.01" /><path d="M8 10h.01" /><path d="M16 10h.01" /><path d="M8 14h.01" /><path d="M16 14h.01" /></svg>
}

function FolderManagedIcon(props) {
    return <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z" /><path d="M12 11v6" /><path d="M9 14h6" /></svg>
}

function ArrowRightAltIcon(props) {
    return <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14" /><path d="m12 5 7 7-7 7" /></svg>
}
