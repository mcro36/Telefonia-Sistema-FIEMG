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
        tipoLinha: 'Linha Individual',
        status: 'Ativa'
    });

    const [rangeStart, setRangeStart] = useState('');
    const [rangeEnd, setRangeEnd] = useState('');

    const [errors, setErrors] = useState({ numero: false, operadora: false, unidadeId: false, rangeStart: false, rangeEnd: false });

    const { dependencies, isLoading } = useDependencies([
        { tableName: 'unidades', columns: 'id, nome', order: { column: 'nome' } }
    ], isOpen);

    const unidades = dependencies.unidades || [];

    useEffect(() => {
        if (isOpen) {
            setErrors({ numero: false, operadora: false, unidadeId: false, rangeStart: false, rangeEnd: false });
            setRangeStart('');
            setRangeEnd('');

            if (linhaToEdit) {
                let mappedType = linhaToEdit.tipoPlano;
                if (!['Fixo', 'Móvel'].includes(mappedType)) mappedType = 'Fixo';

                setFormData({
                    ...linhaToEdit,
                    tipoPlano: mappedType,
                    tipoLinha: linhaToEdit.tipoLinha || 'Linha Individual'
                });
            } else if (draftMode && initialData) {
                let mappedType = initialData.tipoPlano;
                if (!['Fixo', 'Móvel'].includes(mappedType)) mappedType = 'Fixo';
                setFormData({
                    ...initialData,
                    tipoPlano: mappedType,
                    tipoLinha: initialData.tipoLinha || 'Linha Individual'
                });
            } else {
                setFormData({
                    numero: '',
                    operadora: '',
                    unidadeId: unitId || '',
                    tipoPlano: 'Fixo',
                    tipoLinha: 'Linha Individual',
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

    function handleRangeChange(field, val) {
        const digits = val.replace(/\D/g, '').slice(0, 10);
        if (field === 'start') setRangeStart(digits);
        else setRangeEnd(digits);
    }

    function handleLocalSave() {
        const newErrors = { numero: false, operadora: false, unidadeId: false, rangeStart: false, rangeEnd: false };
        let hasError = false;

        if (formData.tipoLinha === 'Linha Individual') {
            const digitCount = formData.numero.replace(/\D/g, '').length;
            if (formData.tipoPlano === 'Fixo' && digitCount !== 10) {
                newErrors.numero = true;
                hasError = true;
            } else if (formData.tipoPlano === 'Móvel' && digitCount !== 11) {
                newErrors.numero = true;
                hasError = true;
            }
        } else {
            // Faixa DDR
            if (rangeStart.length !== 10) {
                newErrors.rangeStart = true;
                hasError = true;
            }
            if (rangeEnd.length !== 10) {
                newErrors.rangeEnd = true;
                hasError = true;
            }
            if (!hasError && BigInt(rangeStart) > BigInt(rangeEnd)) {
                alert("O início da faixa não pode ser maior que o fim.");
                hasError = true;
            }
        }

        if (!formData.operadora || formData.operadora.trim() === '') {
            newErrors.operadora = true;
            hasError = true;
        }

        setErrors(newErrors);
        if (hasError) return;

        if (formData.tipoLinha === 'Faixa DDR') {
            const startNum = BigInt(rangeStart);
            const endNum = BigInt(rangeEnd);
            const rangeSize = Number(endNum - startNum);

            if (rangeSize > 100) {
                if (!window.confirm(`Você está prestes a criar ${rangeSize + 1} linhas de uma vez. Deseja continuar?`)) return;
            }

            const records = [];
            for (let i = startNum; i <= endNum; i++) {
                const numStr = i.toString().padStart(10, '0');
                const formatted = formatPhone(numStr, 'Fixo');
                records.push({
                    ...formData,
                    numero: formatted,
                    tipoLinha: 'Faixa DDR'
                });
            }
            onSave(records);
        } else {
            if (draftMode && onDraftSubmit) {
                onDraftSubmit(formData);
            } else if (onSave) {
                onSave(formData);
            }
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
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <FormField label="Tipo de Plano" required>
                        <div className="flex gap-4 pt-1">
                            {['Fixo', 'Móvel'].map(tipo => (
                                <label key={tipo} className="inline-flex items-center cursor-pointer group">
                                    <input
                                        checked={formData.tipoPlano === tipo}
                                        onChange={() => setFormData({ ...formData, tipoPlano: tipo, tipoLinha: 'Linha Individual', numero: '' })}
                                        className="w-4 h-4 text-blue-600 bg-slate-100 border-slate-300 dark:bg-[#111318] dark:border-slate-800 focus:ring-blue-500 focus:ring-2"
                                        name="planType"
                                        type="radio"
                                    />
                                    <span className="ml-2 text-sm text-slate-600 dark:text-slate-400 group-hover:text-slate-900 dark:group-hover:text-slate-200 transition-colors">{tipo}</span>
                                </label>
                            ))}
                        </div>
                    </FormField>

                    {formData.tipoPlano === 'Fixo' && !linhaToEdit && (
                        <FormField label="Modalidade" required>
                            <div className="flex gap-4 pt-1">
                                {['Linha Individual', 'Faixa DDR'].map(mod => (
                                    <label key={mod} className="inline-flex items-center cursor-pointer group">
                                        <input
                                            checked={formData.tipoLinha === mod}
                                            onChange={() => setFormData({ ...formData, tipoLinha: mod })}
                                            className="w-4 h-4 text-blue-600 bg-slate-100 border-slate-300 dark:bg-[#111318] dark:border-slate-800 focus:ring-blue-500 focus:ring-2"
                                            name="lineModality"
                                            type="radio"
                                        />
                                        <span className="ml-2 text-sm text-slate-600 dark:text-slate-400 group-hover:text-slate-900 dark:group-hover:text-slate-200 transition-colors">{mod}</span>
                                    </label>
                                ))}
                            </div>
                        </FormField>
                    )}
                </div>

                {formData.tipoLinha === 'Linha Individual' ? (
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
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 bg-blue-50/50 dark:bg-blue-950/20 p-4 rounded-xl border border-blue-100 dark:border-blue-900/30 animate-in fade-in slide-in-from-top-2">
                        <FormField label="Início da Faixa (10 dígitos)" required>
                            <FormInput
                                placeholder="3132321000"
                                value={rangeStart}
                                onChange={(e) => handleRangeChange('start', e.target.value)}
                                error={errors.rangeStart}
                            />
                        </FormField>
                        <FormField label="Fim da Faixa (10 dígitos)" required>
                            <FormInput
                                placeholder="3132321099"
                                value={rangeEnd}
                                onChange={(e) => handleRangeChange('end', e.target.value)}
                                error={errors.rangeEnd}
                            />
                        </FormField>
                        <p className="col-span-1 md:col-span-2 text-[11px] text-blue-600/70 dark:text-blue-400/70 italic px-1">
                            * Serão criadas linhas individuais para cada número dentro da faixa informada.
                        </p>
                    </div>
                )}

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
