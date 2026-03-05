import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { ModalWrapper, ModalFooter } from './ui/ModalWrapper.jsx';
import { FormField, FormInput, FormSelect } from './ui/FormField.jsx';

export function UnidadeModal({ isOpen, onClose, onSave, unitToEdit, units = [] }) {
    const [formData, setFormData] = useState({
        nome: '',
        entidade: 'SESI',
        cidade: '',
        endereco: '',
        unidadeIntegrada: false,
        unidadePaiId: '',
        uo: '',
        centroCusto: '',
        contrato: '',
        faixaRamais: '0000 - 9999'
    });

    const [faixaStart, setFaixaStart] = useState('');
    const [faixaEnd, setFaixaEnd] = useState('');
    const [errors, setErrors] = useState({ nome: false, uo: false, faixaStart: false, faixaEnd: false });

    useEffect(() => {
        if (isOpen) {
            setErrors({ nome: false, uo: false, faixaStart: false, faixaEnd: false });
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
                    unidadePaiId: '',
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

    function handleParentChange(parentId) {
        setFormData(prev => ({ ...prev, unidadePaiId: parentId }));

        if (parentId) {
            const parentUnit = units.find(u => u.id === parentId);
            if (parentUnit && parentUnit.faixaRamais) {
                // Tenta dividir por ' - ' ou apenas '-'
                const parts = parentUnit.faixaRamais.includes(' - ')
                    ? parentUnit.faixaRamais.split(' - ')
                    : parentUnit.faixaRamais.split('-');

                if (parts.length === 2) {
                    setFaixaStart(parts[0].trim());
                    setFaixaEnd(parts[1].trim());
                }
            }
        }
    }

    function handleToggleIntegrated(checked) {
        setFormData(prev => ({
            ...prev,
            unidadeIntegrada: checked,
            unidadePaiId: checked ? prev.unidadePaiId : ''
        }));
    }

    const parentUnitsOptions = units
        .filter(u => !unitToEdit || u.id !== unitToEdit.id)
        .map(u => ({ value: u.id, label: u.nome }));

    function handleLocalSave() {
        const newErrors = { nome: false, uo: false, faixaStart: false, faixaEnd: false };
        let hasError = false;

        if (!formData.nome || formData.nome.trim() === '') {
            newErrors.nome = true;
            hasError = true;
        }

        if (!formData.uo || formData.uo.trim() === '') {
            newErrors.uo = true;
            hasError = true;
        }

        const startLength = faixaStart.trim().length;
        const endLength = faixaEnd.trim().length;

        if (startLength !== 4) {
            newErrors.faixaStart = true;
            hasError = true;
        }

        if (endLength !== 4) {
            newErrors.faixaEnd = true;
            hasError = true;
        }

        setErrors(newErrors);

        if (hasError) {
            setGlobalError('Por favor, preencha todos os campos obrigatórios corretamente.');
            return;
        }

        const compiledFaixa = `${faixaStart.trim()} - ${faixaEnd.trim()}`;
        const finalData = { ...formData, faixaRamais: compiledFaixa };
        onSave(finalData);
    }

    const [globalError, setGlobalError] = useState('');

    return (
        <ModalWrapper
            isOpen={isOpen}
            onClose={onClose}
            title={unitToEdit ? 'Editar Unidade' : 'Cadastrar Nova Unidade'}
            subtitle={unitToEdit ? 'Atualize os dados da unidade abaixo.' : 'Preencha os dados abaixo para adicionar uma nova unidade à base.'}
            icon="business"
            maxWidth="max-w-4xl"
            footer={
                <ModalFooter
                    onClose={onClose}
                    onSave={handleLocalSave}
                    saveText={unitToEdit ? 'Atualizar Unidade' : 'Salvar Unidade'}
                />
            }
        >
            {globalError && (
                <div className="mb-6 p-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-900/50 rounded-lg flex items-center gap-3 text-red-700 dark:text-red-400 animate-in fade-in slide-in-from-top-2">
                    <span className="material-symbols-outlined">error</span>
                    <span className="text-sm font-medium">{globalError}</span>
                </div>
            )}

            <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
                <div className="col-span-1 md:col-span-12">
                    <h3 className="text-sm font-semibold uppercase tracking-wider text-slate-500 mb-2 flex items-center gap-2">
                        <span className="material-symbols-outlined text-[18px]">domain</span>
                        Dados Gerais
                    </h3>
                </div>

                <FormField label="Nome da unidade" required className="col-span-1 md:col-span-8">
                    <FormInput
                        placeholder="CTTI - Centro de Treinamento..."
                        value={formData.nome}
                        onChange={e => setFormData({ ...formData, nome: e.target.value })}
                        error={errors.nome}
                    />
                </FormField>

                <FormField label="Entidade" className="col-span-1 md:col-span-4">
                    <FormSelect
                        value={formData.entidade}
                        onChange={e => setFormData({ ...formData, entidade: e.target.value })}
                        options={[
                            { value: 'SESI', label: 'SESI' },
                            { value: 'SENAI', label: 'SENAI' },
                            { value: 'FIEMG', label: 'FIEMG' },
                            { value: 'CIEMG', label: 'CIEMG' },
                            { value: 'IEL', label: 'IEL' },
                        ]}
                    />
                </FormField>

                <FormField label="Endereço Completo" className="col-span-1 md:col-span-8">
                    <FormInput
                        placeholder="Rua, Número, Bairro"
                        value={formData.endereco}
                        onChange={e => setFormData({ ...formData, endereco: e.target.value })}
                    />
                </FormField>

                <FormField label="Cidade" className="col-span-1 md:col-span-4">
                    <FormInput
                        placeholder="Ex: BELO HORIZONTE"
                        value={formData.cidade}
                        onChange={e => setFormData({ ...formData, cidade: e.target.value.toUpperCase() })}
                    />
                </FormField>

                <div className="col-span-1 md:col-span-12 py-2">
                    <label className="inline-flex items-center gap-3 cursor-pointer group">
                        <input
                            type="checkbox"
                            className="peer h-5 w-5 rounded border-slate-200 dark:border-slate-800 bg-transparent text-blue-600 focus:ring-blue-500 transition-colors"
                            checked={formData.unidadeIntegrada}
                            onChange={e => handleToggleIntegrated(e.target.checked)}
                        />
                        <span className="text-sm font-medium text-slate-700 dark:text-slate-300 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                            Esta é uma Unidade Integrada?
                        </span>
                    </label>
                </div>

                {formData.unidadeIntegrada && (
                    <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        className="col-span-1 md:col-span-12 bg-blue-50 dark:bg-blue-600/5 border border-blue-200 dark:border-blue-600/20 rounded-lg p-4 transition-colors"
                    >
                        <FormField label="Unidade Principal Responsável">
                            <FormSelect
                                value={formData.unidadePaiId}
                                onChange={e => handleParentChange(e.target.value)}
                                options={[
                                    { value: '', label: 'Selecione a unidade principal...' },
                                    ...parentUnitsOptions
                                ]}
                            />
                        </FormField>
                        <p className="text-xs text-blue-600 dark:text-blue-400 mt-2 flex items-center gap-1.5 font-medium">
                            <span className="material-symbols-outlined text-[16px]">info</span>
                            Ao selecionar a unidade pai, a faixa de ramais será copiada. Alterações futuras no pai atualizarão esta unidade automaticamente.
                        </p>
                    </motion.div>
                )}

                <div className="col-span-1 md:col-span-12 mt-4">
                    <h3 className="text-sm font-semibold uppercase tracking-wider text-slate-500 mb-2 flex items-center gap-2">
                        <span className="material-symbols-outlined text-[18px]">folder_managed</span>
                        Administrativo
                    </h3>
                </div>

                <FormField label="UO (Unidade Organizacional)" required className="col-span-1 md:col-span-4">
                    <FormInput
                        placeholder="Ex: 1020"
                        value={formData.uo}
                        onChange={e => setFormData({ ...formData, uo: e.target.value })}
                        error={errors.uo}
                    />
                </FormField>

                <FormField label="Central de Custo" className="col-span-1 md:col-span-4">
                    <FormInput
                        placeholder="Ex: CC-2024"
                        value={formData.centroCusto}
                        onChange={e => setFormData({ ...formData, centroCusto: e.target.value })}
                    />
                </FormField>

                <FormField label="Contrato de telefonia" className="col-span-1 md:col-span-4">
                    <FormInput
                        placeholder="Nº do Contrato"
                        value={formData.contrato}
                        onChange={e => setFormData({ ...formData, contrato: e.target.value })}
                    />
                </FormField>

                <FormField label="Faixa de Ramais" required className="col-span-1 md:col-span-12">
                    <div className="flex flex-col md:flex-row gap-4 items-center">
                        <div className="relative flex-1 w-full">
                            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500 dark:text-slate-600 text-[10px] font-bold z-10">DE</span>
                            <FormInput
                                className="pl-10"
                                placeholder="Ex: 2000"
                                maxLength={4}
                                value={faixaStart}
                                onChange={(e) => setFaixaStart(e.target.value.replace(/\D/g, ''))}
                                error={errors.faixaStart}
                                disabled={!!formData.unidadePaiId}
                                title={formData.unidadePaiId ? "Faixa herdada da unidade principal" : ""}
                            />
                        </div>
                        <span className="material-symbols-outlined text-slate-400 hidden md:block">arrow_right_alt</span>
                        <div className="relative flex-1 w-full">
                            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500 dark:text-slate-600 text-[10px] font-bold z-10">ATÉ</span>
                            <FormInput
                                className="pl-10"
                                placeholder="Ex: 2049"
                                maxLength={4}
                                value={faixaEnd}
                                onChange={(e) => setFaixaEnd(e.target.value.replace(/\D/g, ''))}
                                error={errors.faixaEnd}
                                disabled={!!formData.unidadePaiId}
                                title={formData.unidadePaiId ? "Faixa herdada da unidade principal" : ""}
                            />
                        </div>
                    </div>
                </FormField>
            </div>
        </ModalWrapper>
    );
}
