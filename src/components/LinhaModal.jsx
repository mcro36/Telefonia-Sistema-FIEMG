import React, { useState, useEffect } from 'react';
import { Phone, Signal, Building } from 'lucide-react';
import { ModalWrapper, ModalFooter } from './ui/ModalWrapper.jsx';
import { FormField, FormInput, FormSelect, FormSearchableSelect } from './ui/FormField.jsx';
import { useDependencies } from '../hooks/useDependencies.js';

export function LinhaModal({ isOpen, onClose, onSave, linhaToEdit, unitId, draftMode, initialData, onDraftSubmit }) {
    const [formData, setFormData] = useState({
        numero: '',
        operadora: '',
        unidadeId: '',
        tipoPlano: 'Fixo',
        status: 'Ativa'
    });

    const [errors, setErrors] = useState({ numero: false, operadora: false, unidadeId: false });

    const { dependencies, isLoading } = useDependencies([
        { tableName: 'unidades', columns: 'id, nome', order: { column: 'nome' } }
    ], isOpen);

    const unidades = dependencies.unidades || [];

    useEffect(() => {
        if (isOpen) {
            setErrors({ numero: false, operadora: false, unidadeId: false });
            if (linhaToEdit) {
                let mappedType = linhaToEdit.tipoPlano;
                if (!['Fixo', 'Móvel'].includes(mappedType)) mappedType = 'Fixo';

                setFormData({
                    ...linhaToEdit,
                    tipoPlano: mappedType
                });
            } else if (draftMode && initialData) {
                let mappedType = initialData.tipoPlano;
                if (!['Fixo', 'Móvel'].includes(mappedType)) mappedType = 'Fixo';
                setFormData({
                    ...initialData,
                    tipoPlano: mappedType
                });
            } else {
                setFormData({
                    numero: '',
                    operadora: '',
                    unidadeId: unitId || '',
                    tipoPlano: 'Fixo',
                    status: 'Ativa'
                });
            }
        }
    }, [isOpen, linhaToEdit, initialData, draftMode, unitId]);

    function formatPhone(value, type) {
        const digits = value.replace(/\D/g, '');
        if (!digits) return '';

        const maxLen = type === 'Fixo' ? 10 : 11;
        const bounded = digits.slice(0, maxLen);

        let formatted = '(';
        if (bounded.length > 2) {
            formatted += bounded.substring(0, 2) + ') ';
            if (type === 'Fixo') {
                if (bounded.length > 6) {
                    formatted += bounded.substring(2, 6) + '-' + bounded.substring(6, 10);
                } else {
                    formatted += bounded.substring(2);
                }
            } else {
                if (bounded.length > 7) {
                    formatted += bounded.substring(2, 7) + '-' + bounded.substring(7, 11);
                } else {
                    formatted += bounded.substring(2);
                }
            }
        } else {
            formatted += bounded;
        }

        if (formatted.length === 1 && formatted === '(') return '';
        return formatted;
    }

    function handleNumberChange(e) {
        const raw = e.target.value;
        const formatted = formatPhone(raw, formData.tipoPlano);
        setFormData({ ...formData, numero: formatted });
    }

    function handleTypeChange(novoTipo) {
        const formatted = formatPhone(formData.numero, novoTipo);
        setFormData({ ...formData, tipoPlano: novoTipo, numero: formatted });
    }

    function handleLocalSave() {
        const newErrors = { numero: false, operadora: false, unidadeId: false };
        let hasError = false;

        const digitCount = formData.numero.replace(/\D/g, '').length;
        if (formData.tipoPlano === 'Fixo' && digitCount !== 10) {
            newErrors.numero = true;
            hasError = true;
        } else if (formData.tipoPlano === 'Móvel' && digitCount !== 11) {
            newErrors.numero = true;
            hasError = true;
        }

        if (!formData.operadora || formData.operadora.trim() === '') {
            newErrors.operadora = true;
            hasError = true;
        }

        setErrors(newErrors);

        if (hasError) return;

        if (draftMode && onDraftSubmit) {
            onDraftSubmit(formData);
        } else if (onSave) {
            onSave(formData);
        }
    }

    return (
        <ModalWrapper
            isOpen={isOpen}
            onClose={onClose}
            title={linhaToEdit ? 'Editar Linha' : 'Cadastrar Nova Linha'}
            subtitle={linhaToEdit ? 'Atualize as informações desta linha.' : 'Adicione um novo número de telefone ao sistema corporativo.'}
            icon="settings_phone"
            maxWidth="max-w-[640px]"
            footer={
                <ModalFooter
                    onClose={onClose}
                    onSave={handleLocalSave}
                    saveText={linhaToEdit ? 'Atualizar Linha' : 'Salvar Linha'}
                />
            }
        >
            <div className="space-y-6">
                <FormField label="Tipo de Plano" required>
                    <div className="flex gap-4 pt-1">
                        {['Fixo', 'Móvel'].map(tipo => (
                            <label key={tipo} className="inline-flex items-center cursor-pointer group">
                                <input
                                    checked={formData.tipoPlano === tipo}
                                    onChange={() => handleTypeChange(tipo)}
                                    className="w-4 h-4 text-blue-600 bg-slate-100 border-slate-300 dark:bg-[#111318] dark:border-slate-800 focus:ring-blue-500 focus:ring-2"
                                    name="planType"
                                    type="radio"
                                />
                                <span className="ml-2 text-sm text-slate-600 dark:text-slate-400 group-hover:text-slate-900 dark:group-hover:text-slate-200 transition-colors">{tipo}</span>
                            </label>
                        ))}
                    </div>
                </FormField>

                <FormField label="Número" required>
                    <FormInput
                        icon={<Phone className="w-5 h-5" />}
                        placeholder={formData.tipoPlano === 'Fixo' ? "(00) 0000-0000" : "(00) 00000-0000"}
                        type="tel"
                        value={formData.numero}
                        onChange={handleNumberChange}
                        error={errors.numero}
                    />
                </FormField>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <FormField label="Operadora" required>
                        <FormSearchableSelect
                            id="operadora-list"
                            icon={<Signal className="w-5 h-5" />}
                            placeholder="Ex: Vivo"
                            value={formData.operadora}
                            onChange={(val) => setFormData({ ...formData, operadora: val })}
                            error={errors.operadora}
                            options={[
                                { value: 'Vivo', label: 'Vivo' },
                                { value: 'Claro', label: 'Claro' },
                                { value: 'TIM', label: 'TIM' },
                                { value: 'Oi', label: 'Oi' },
                                { value: 'Algar', label: 'Algar' },
                                { value: 'Método', label: 'Método' }
                            ]}
                        />
                    </FormField>

                    <FormField label="Unidade">
                        <FormSelect
                            icon={<Building className="w-5 h-5" />}
                            defaultOption={isLoading ? "Carregando..." : "Selecione a unidade"}
                            value={formData.unidadeId}
                            onChange={(e) => setFormData({ ...formData, unidadeId: e.target.value })}
                            options={unidades.map(u => ({ value: u.id, label: u.nome }))}
                        />
                    </FormField>
                </div>
            </div>
        </ModalWrapper>
    );
}
