import React, { useState, useEffect, useMemo } from 'react';
import { ModalWrapper, ModalFooter } from './ui/ModalWrapper.jsx';
import { FormField, FormInput, FormSelect, FormSearchableSelect } from './ui/FormField.jsx';
import { useDependencies } from '../hooks/useDependencies.js';
import { formatResourceLabel } from '../lib/utils.js';

export function RamalModalPABX({ isOpen, onClose, onSave, ramalToEdit }) {
    const [formData, setFormData] = useState({
        nome: '',
        numero: '',
        status: 'Ativo',
        unidadeId: '',
        setor: '',
        ddr: '',
        ura: '',
        recursoPabxId: '',
        blocoVp: '',
        parPorta: '',
        pen: '',
        tipoRamal: 'analogico',
        observacao: ''
    });

    const [errors, setErrors] = useState({ nome: false, numero: false, recursoPabxId: false, tipoRamal: false });

    const { dependencies, isLoading } = useDependencies([
        { tableName: 'unidades', columns: 'id, nome, faixa_ramais', order: { column: 'nome' } },
        { tableName: 'linhas', columns: 'id, numero', order: { column: 'numero' } },
        { tableName: 'uras', columns: 'id, nome', order: { column: 'nome' } },
        { tableName: 'recursos_pabx', columns: '*, unidades:unidade_id(nome)' },
        { tableName: 'ramais', columns: 'id, numero, recurso_pabx_id' }
    ], isOpen);

    const unidades = dependencies.unidades || [];
    const linhas = dependencies.linhas || [];
    const uras = dependencies.uras || [];
    const recursos = dependencies.recursos_pabx || [];
    const ramaisExistentes = dependencies.ramais || [];

    useEffect(() => {
        if (isOpen) {
            setErrors({ nome: false, numero: false, recursoPabxId: false, tipoRamal: false });
            if (ramalToEdit) {
                setFormData(ramalToEdit);
            } else {
                setFormData({
                    nome: '',
                    numero: '',
                    status: 'Ativo',
                    unidadeId: '',
                    setor: '',
                    ddr: '',
                    ura: '',
                    recursoPabxId: '',
                    blocoVp: '',
                    parPorta: '',
                    pen: '',
                    tipoRamal: 'analogico',
                    observacao: ''
                });
            }
        }
    }, [isOpen, ramalToEdit]);

    // Opções de recursos filtrando os que já estão em uso (exceto o próprio do ramal em edição)
    const resourceOptions = useMemo(() => {
        const usedResourceIds = ramaisExistentes
            .filter(r => r.id !== (ramalToEdit?.id))
            .map(r => r.recursoPabxId)
            .filter(Boolean);

        return recursos.map(rec => {
            const label = formatResourceLabel(rec);

            return {
                value: rec.id,
                label: label,
                isUsed: usedResourceIds.includes(rec.id)
            };
        }).sort((a, b) => a.label.localeCompare(b.label));
    }, [recursos, ramaisExistentes, ramalToEdit]);

    function handleResourceChange(resourceId) {
        const rec = recursos.find(r => r.id === resourceId);
        if (rec) {
            setFormData({
                ...formData,
                recursoPabxId: resourceId,
                blocoVp: rec.bloco,
                parPorta: rec.porta,
                pen: rec.pen,
                tipoRamal: rec.tecnologiaPadrao?.toLowerCase() === 'digital' ? 'digital' : 'analogico'
            });
        } else {
            setFormData({
                ...formData,
                recursoPabxId: '',
                blocoVp: '',
                parPorta: '',
                pen: ''
            });
        }
    }

    function handleLocalSave() {
        const newErrors = { nome: false, numero: false, recursoPabxId: false, tipoRamal: false };
        let hasError = false;

        if (!formData.nome || formData.nome.trim() === '') {
            newErrors.nome = true;
            hasError = true;
        }

        if (!formData.numero || formData.numero.trim() === '') {
            newErrors.numero = true;
            hasError = true;
        }

        if (!formData.recursoPabxId) {
            newErrors.recursoPabxId = true;
            hasError = true;
        }

        if (!formData.tipoRamal || formData.tipoRamal.trim() === '') {
            newErrors.tipoRamal = true;
            hasError = true;
        }

        setErrors(newErrors);
        if (hasError) return;

        // VALIDAÇÕES DE RAMAL (idêntico ao SIP)

        // 1. Exatamente 4 dígitos numéricos
        if (!/^\d{4}$/.test(formData.numero)) {
            alert('O ramal deve conter exatamente 4 dígitos numéricos (ex: 1020).');
            setErrors({ ...newErrors, numero: true });
            return;
        }

        // 2. Verificar duplicidade
        const currentId = ramalToEdit ? ramalToEdit.id : undefined;
        const ramalExists = ramaisExistentes.some(r => r.numero === formData.numero && r.id !== currentId);

        if (ramalExists) {
            alert(`O ramal ${formData.numero} já está cadastrado no sistema! Por favor, escolha outro número.`);
            setErrors({ ...newErrors, numero: true });
            return;
        }

        // 3. Verificar faixa da unidade
        if (formData.unidadeId) {
            const unidadeSelecionada = unidades.find(u => u.id === formData.unidadeId);
            if (unidadeSelecionada && unidadeSelecionada.faixaRamais) {
                const [inicioStr, fimStr] = unidadeSelecionada.faixaRamais.split(' - ');
                const inicio = parseInt(inicioStr, 10);
                const fim = parseInt(fimStr, 10);
                const numeroRamal = parseInt(formData.numero, 10);

                if (!isNaN(inicio) && !isNaN(fim) && (numeroRamal < inicio || numeroRamal > fim)) {
                    alert(`Não permitido: O ramal ${numeroRamal} está fora da "Faixa de Ramais" permitida na unidade ${unidadeSelecionada.nome} (${unidadeSelecionada.faixaRamais}).`);
                    setErrors({ ...newErrors, numero: true });
                    return;
                }
            }
        }

        onSave({ ...formData, tipo: 'PABX' });
    }

    return (
        <ModalWrapper
            isOpen={isOpen}
            onClose={onClose}
            title={ramalToEdit ? 'Editar Ramal PABX' : 'Cadastrar Novo Ramal PABX'}
            subtitle={ramalToEdit ? 'Atualize os dados técnicos e roteamento.' : 'Adicione um novo ramal analógico ou digital.'}
            icon="add_call"
            maxWidth="max-w-[800px]"
            footer={
                <ModalFooter
                    onClose={onClose}
                    onSave={handleLocalSave}
                    saveText={ramalToEdit ? 'Atualizar Ramal' : 'Salvar Ramal'}
                />
            }
        >
            <div className="space-y-8">
                {/* Identificação */}
                <div className="space-y-6">
                    <div className="flex items-center gap-2 mb-4">
                        <span className="material-symbols-outlined text-blue-600 text-[20px]">badge</span>
                        <h3 className="text-sm font-semibold text-slate-900 dark:text-slate-100 uppercase tracking-wider">Identificação</h3>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <FormField label="Nome do ramal" required>
                            <FormInput
                                placeholder="Ex: Recepção Central"
                                value={formData.nome}
                                onChange={(e) => setFormData({ ...formData, nome: e.target.value })}
                                error={errors.nome}
                            />
                        </FormField>

                        <div className="flex gap-4">
                            <FormField label="Ramal" required className="flex-1">
                                <FormInput
                                    placeholder="Ex: 101"
                                    value={formData.numero}
                                    onChange={(e) => setFormData({ ...formData, numero: e.target.value })}
                                    error={errors.numero}
                                />
                            </FormField>

                            <div className="flex flex-col justify-end pb-2">
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
                                    <div className="relative w-11 h-6 bg-slate-200 peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-blue-600/50 rounded-full peer dark:bg-slate-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-slate-600 peer-checked:bg-blue-600"></div>
                                    <span className="ms-3 text-sm font-medium text-slate-700 dark:text-slate-300">Sim</span>
                                </label>
                            </div>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <FormField label="Unidade">
                            <FormSearchableSelect
                                id="unidades-pabx"
                                icon="domain"
                                placeholder={isLoading ? "Carregando unidades..." : "Selecione a unidade"}
                                value={formData.unidadeId}
                                onChange={(val) => setFormData({ ...formData, unidadeId: val })}
                                options={unidades.map(u => ({ value: u.id, label: u.nome }))}
                            />
                        </FormField>

                        <FormField label="Setor">
                            <FormInput
                                icon="groups"
                                placeholder="Ex: Comercial"
                                value={formData.setor}
                                onChange={(e) => setFormData({ ...formData, setor: e.target.value })}
                            />
                        </FormField>
                    </div>
                </div>

                <div className="h-px bg-slate-200 dark:bg-slate-800"></div>

                {/* Configuração & Roteamento */}
                <div className="space-y-6">
                    <div className="flex items-center gap-2 mb-4">
                        <span className="material-symbols-outlined text-blue-600 text-[20px]">settings_phone</span>
                        <h3 className="text-sm font-semibold text-slate-900 dark:text-slate-100 uppercase tracking-wider">Configuração & Roteamento</h3>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <FormField label="Número Principal (DDR)">
                            <FormSearchableSelect
                                id="linhas-pabx"
                                icon="call"
                                placeholder={isLoading ? "Carregando..." : "Vincular número"}
                                value={formData.ddr}
                                onChange={(val) => setFormData({ ...formData, ddr: val })}
                                options={linhas.map(l => ({ value: l.id, label: l.numero }))}
                            />
                        </FormField>

                        <FormField label="URA">
                            <FormSearchableSelect
                                id="uras-pabx"
                                icon="alt_route"
                                placeholder={isLoading ? "Carregando..." : "Selecione a URA"}
                                value={formData.ura}
                                onChange={(val) => setFormData({ ...formData, ura: val })}
                                options={uras.map(u => ({ value: u.id, label: u.nome }))}
                            />
                        </FormField>
                    </div>
                </div>

                <div className="h-px bg-slate-200 dark:bg-slate-800"></div>

                {/* Dados Técnicos */}
                <div className="space-y-6">
                    <div className="flex items-center gap-2 mb-4">
                        <span className="material-symbols-outlined text-blue-600 text-[20px]">router</span>
                        <h3 className="text-sm font-semibold text-slate-900 dark:text-slate-100 uppercase tracking-wider">Dados Técnicos</h3>
                    </div>

                    <div className="grid grid-cols-1 gap-6">
                        <FormField label="Bloco e porta" required>
                            <FormSearchableSelect
                                id="recursos-pabx"
                                icon="router"
                                placeholder={isLoading ? "Carregando inventário..." : "Selecione a porta (B_P_TECNOLOGIA)"}
                                value={formData.recursoPabxId}
                                onChange={handleResourceChange}
                                options={resourceOptions.map(opt => ({
                                    ...opt,
                                    disabled: opt.isUsed,
                                    label: opt.isUsed ? `${opt.label} (Em uso)` : opt.label
                                }))}
                                error={errors.recursoPabxId}
                            />
                        </FormField>
                    </div>

                    {formData.recursoPabxId && (
                        <div className="bg-blue-50 dark:bg-blue-900/10 border border-blue-100 dark:border-blue-900/30 rounded-lg p-4 grid grid-cols-2 md:grid-cols-4 gap-4 animate-in fade-in slide-in-from-top-2 duration-300">
                            <div>
                                <span className="block text-[10px] uppercase font-bold text-blue-600/70 dark:text-blue-400/70 mb-1">Bloco</span>
                                <span className="text-sm font-semibold text-blue-900 dark:text-blue-100">B{formData.blocoVp}</span>
                            </div>
                            <div>
                                <span className="block text-[10px] uppercase font-bold text-blue-600/70 dark:text-blue-400/70 mb-1">Porta</span>
                                <span className="text-sm font-semibold text-blue-900 dark:text-blue-100">P{formData.parPorta}</span>
                            </div>
                            <div>
                                <span className="block text-[10px] uppercase font-bold text-blue-600/70 dark:text-blue-400/70 mb-1">PEN</span>
                                <span className="text-sm font-semibold text-blue-900 dark:text-blue-100">{formData.pen}</span>
                            </div>
                            <div>
                                <span className="block text-[10px] uppercase font-bold text-blue-600/70 dark:text-blue-400/70 mb-1">Tipo de ramal</span>
                                <span className="text-sm font-semibold text-blue-900 dark:text-blue-100 uppercase">{formData.tipoRamal}</span>
                            </div>
                        </div>
                    )}
                </div>

                <FormField label="Observação">
                    <textarea
                        className="block w-full rounded-lg border border-slate-300 dark:border-slate-800 bg-slate-50 dark:bg-[#111318] text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500 sm:text-sm min-h-[100px] p-4 resize-y transition-all shadow-sm dark:shadow-none placeholder:text-slate-400 dark:placeholder:text-slate-500"
                        placeholder="Informações adicionais sobre este ramal..."
                        value={formData.observacao}
                        onChange={(e) => setFormData({ ...formData, observacao: e.target.value })}
                    />
                </FormField>
            </div>
        </ModalWrapper>
    );
}
