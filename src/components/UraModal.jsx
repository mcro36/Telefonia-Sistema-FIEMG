import React, { useState, useEffect } from 'react';
import { ModalWrapper, ModalFooter } from './ui/ModalWrapper.jsx';
import { FormField, FormInput, FormSearchableSelect } from './ui/FormField.jsx';
import { useDependencies } from '../hooks/useDependencies.js';

export function UraModal({ isOpen, onClose, onSave, uraToEdit }) {
    const [formData, setFormData] = useState({
        nome: '',
        linhaId: '',
        unidadeId: '',
        mensagemPrincipal: '',
        opcoes: [], // Array of { key, label, destination, type }
        status: 'Ativa'
    });

    const [errors, setErrors] = useState({ nome: false, linhaId: false });

    const { dependencies, isLoading } = useDependencies([
        { tableName: 'linhas', columns: 'id, numero', order: { column: 'numero' } },
        { tableName: 'unidades', columns: 'id, nome', order: { column: 'nome' } }
    ], isOpen);

    const linhas = dependencies.linhas || [];
    const unidades = dependencies.unidades || [];

    useEffect(() => {
        if (isOpen) {
            setErrors({ nome: false, linha_id: false });

            if (uraToEdit) {
                setFormData({
                    ...uraToEdit,
                    opcoes: Array.isArray(uraToEdit.opcoes) ? uraToEdit.opcoes : []
                });
            } else {
                setFormData({
                    nome: '',
                    linhaId: '',
                    unidadeId: '',
                    mensagemPrincipal: '',
                    opcoes: [],
                    status: 'Ativa'
                });
            }
        }
    }, [isOpen, uraToEdit]);

    function handleLocalSave() {
        const newErrors = { nome: false, linhaId: false };
        let hasError = false;

        if (!formData.nome || formData.nome.trim() === '') {
            newErrors.nome = true;
            hasError = true;
        }

        setErrors(newErrors);

        if (hasError) return;

        // Clean up empty options
        const cleanedData = {
            ...formData,
            opcoes: formData.opcoes.filter(opt => opt.label.trim() !== '' || opt.destination.trim() !== '')
        };

        onSave(cleanedData);
    }

    function addOption() {
        setFormData(prev => ({
            ...prev,
            opcoes: [
                ...prev.opcoes,
                { key: String(prev.opcoes.length + 1), label: '', destination: '', type: 'grp' }
            ]
        }));
    }

    function updateOption(index, field, value) {
        const newOptions = [...formData.opcoes];
        newOptions[index] = { ...newOptions[index], [field]: value };
        setFormData({ ...formData, opcoes: newOptions });
    }

    function removeOption(index) {
        const newOptions = formData.opcoes.filter((_, i) => i !== index);
        const reindexed = newOptions.map((opt, i) => ({ ...opt, key: String(i + 1) }));
        setFormData({ ...formData, opcoes: reindexed });
    }

    return (
        <ModalWrapper
            isOpen={isOpen}
            onClose={onClose}
            title={uraToEdit ? 'Editar URA' : 'Cadastrar Nova URA'}
            subtitle="Configure o fluxo de atendimento automático"
            icon="call_split"
            maxWidth="max-w-4xl"
            footer={
                <ModalFooter
                    onClose={onClose}
                    onSave={handleLocalSave}
                    saveText={uraToEdit ? 'Atualizar URA' : 'Salvar URA'}
                />
            }
        >
            <div className="space-y-8">
                {/* Basic Info */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <FormField label="Nome da URA" required>
                        <FormInput
                            icon="badge"
                            placeholder="Ex: Atendimento Comercial"
                            value={formData.nome}
                            onChange={(e) => setFormData({ ...formData, nome: e.target.value })}
                            error={errors.nome}
                        />
                    </FormField>

                    <FormField label="Selecione a Linha">
                        <FormSearchableSelect
                            id="ura-linhas"
                            icon="dialpad"
                            placeholder={isLoading ? "Carregando..." : "Selecione a linha associada"}
                            value={formData.linhaId}
                            onChange={(val) => setFormData({ ...formData, linhaId: val })}
                            options={linhas.map(l => ({ value: l.id, label: l.numero }))}
                        />
                    </FormField>

                    <FormField label="Unidade (Opcional)">
                        <FormSearchableSelect
                            id="ura-unidades"
                            icon="domain"
                            placeholder={isLoading ? "Carregando..." : "Geral / Matriz"}
                            value={formData.unidadeId}
                            onChange={(val) => setFormData({ ...formData, unidadeId: val })}
                            options={unidades.map(u => ({ value: u.id, label: u.nome }))}
                        />
                    </FormField>

                    <FormField label="Mensagem principal da URA" className="col-span-1 md:col-span-2 mt-2">
                        <div className="relative">
                            <textarea
                                value={formData.mensagemPrincipal || ''}
                                onChange={(e) => setFormData({ ...formData, mensagemPrincipal: e.target.value })}
                                className="block w-full rounded-lg border border-slate-300 dark:border-slate-800 bg-slate-50 dark:bg-[#111318] text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500 sm:text-sm min-h-[120px] p-4 resize-y transition-all shadow-sm dark:shadow-none placeholder:text-slate-400 dark:placeholder:text-slate-500"
                                placeholder="Digite a mensagem que o usuário ouvirá ao ligar..."
                            />
                            <div className="absolute bottom-3 right-3 flex gap-2">
                                <button type="button" className="p-1.5 text-slate-400 hover:text-blue-600 transition-colors rounded hover:bg-slate-200 dark:hover:bg-slate-800" title="Ouvir prévia">
                                    <span className="material-symbols-outlined text-[20px]">volume_up</span>
                                </button>
                            </div>
                        </div>
                    </FormField>
                </div>

                <div className="h-px bg-slate-200 dark:bg-slate-800 w-full"></div>

                {/* Options Builder */}
                <div className="space-y-4">
                    <div className="flex items-center justify-between">
                        <h3 className="text-lg font-bold text-slate-900 dark:text-white flex items-center gap-2">
                            <span className="material-symbols-outlined text-blue-600">alt_route</span>
                            Opções da URA
                        </h3>
                        <button
                            type="button"
                            onClick={addOption}
                            className="inline-flex items-center gap-2 px-3 py-1.5 text-sm font-medium text-blue-600 hover:text-white border border-blue-600/30 hover:bg-blue-600 rounded-lg transition-all">
                            <span className="material-symbols-outlined text-[18px]">add</span>
                            Adicionar Opção
                        </button>
                    </div>

                    <div className="bg-slate-50 dark:bg-[#151a25] rounded-xl border border-slate-200 dark:border-slate-800 p-2 min-h-[100px] flex flex-col gap-1">
                        {formData.opcoes.length === 0 ? (
                            <div className="text-center py-6 text-slate-500 dark:text-slate-400 text-sm">
                                Nenhuma opção de direcionamento configurada. Clique em Adicionar Opção.
                            </div>
                        ) : (
                            formData.opcoes.map((opcao, index) => (
                                <div key={index} className="grid grid-cols-12 gap-3 p-3 items-end group hover:bg-white dark:hover:bg-[#1c212c] rounded-lg transition-colors border border-transparent hover:border-slate-200 dark:hover:border-slate-700">
                                    <div className="col-span-1 flex justify-center pb-3">
                                        <div className="w-8 h-8 rounded-full bg-slate-200 dark:bg-slate-700 flex items-center justify-center font-bold text-slate-600 dark:text-slate-300">
                                            {opcao.key}
                                        </div>
                                    </div>
                                    <div className="col-span-11 md:col-span-5">
                                        <label className="block text-xs font-medium text-slate-500 dark:text-slate-400 mb-1.5">Rótulo da Opção</label>
                                        <input
                                            value={opcao.label}
                                            onChange={(e) => updateOption(index, 'label', e.target.value)}
                                            className="w-full px-3 py-2 bg-white dark:bg-[#111318] border border-slate-300 dark:border-slate-700 rounded-lg focus:ring-1 focus:ring-blue-500 focus:border-blue-500 outline-none text-sm text-slate-900 dark:text-white transition-all shadow-sm dark:shadow-none"
                                            type="text"
                                            placeholder="Ex: Falar com Suporte"
                                        />
                                    </div>
                                    <div className="col-span-11 md:col-span-5 md:col-start-7">
                                        <label className="block text-xs font-medium text-slate-500 dark:text-slate-400 mb-1.5">Destino (Ramal/Grupo)</label>
                                        <input
                                            value={opcao.destination}
                                            onChange={(e) => updateOption(index, 'destination', e.target.value)}
                                            className="w-full px-3 py-2 bg-white dark:bg-[#111318] border border-slate-300 dark:border-slate-700 rounded-lg focus:ring-1 focus:ring-blue-500 focus:border-blue-500 outline-none text-sm text-slate-900 dark:text-white transition-all shadow-sm dark:shadow-none"
                                            type="text"
                                            placeholder="Ex: 1001"
                                        />
                                    </div>
                                    <div className="col-span-1 flex justify-center pb-2">
                                        <button
                                            type="button"
                                            onClick={() => removeOption(index)}
                                            className="text-slate-400 hover:text-red-500 transition-colors p-1">
                                            <span className="material-symbols-outlined text-[20px]">delete</span>
                                        </button>
                                    </div>
                                </div>
                            ))
                        )}
                    </div>
                </div>
            </div>
        </ModalWrapper>
    );
}
