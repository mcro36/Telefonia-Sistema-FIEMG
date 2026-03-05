import React, { useState, useEffect } from 'react';
import { ModalWrapper, ModalFooter } from './ui/ModalWrapper.jsx';
import { FormField, FormInput, FormSearchableSelect } from './ui/FormField.jsx';
import { useDependencies } from '../hooks/useDependencies.js';

export function RamalModalSIP({ isOpen, onClose, onSave, ramalToEdit, unitId, draftMode, initialData, onDraftSubmit }) {
    const [formData, setFormData] = useState({
        nome: '',
        numero: '',
        status: 'Ativo',
        microsipUser: '',
        microsipPass: '',
        unidadeId: '',
        setor: '',
        ddr: '',
        observacao: '',
        redirecionamentoEnabled: false,
        salto1: '',
        salto2: '',
        salto3: '',
        grupoCapturaEnabled: false,
        grupoCaptura: ''
    });

    const [errors, setErrors] = useState({ nome: false, numero: false, faixaDe: false, faixaAte: false });
    const [showPassword, setShowPassword] = useState(false);

    // States do lote (faixa)
    const [isFaixa, setIsFaixa] = useState(false);
    const [faixaDe, setFaixaDe] = useState('');
    const [faixaAte, setFaixaAte] = useState('');

    // Fetch dependencies
    const { dependencies, isLoading } = useDependencies([
        { tableName: 'unidades', columns: 'id, nome, faixa_ramais', order: { column: 'nome' } },
        { tableName: 'linhas', columns: 'id, numero', order: { column: 'numero' } },
        { tableName: 'ramais', columns: 'id, numero' }
    ], isOpen);

    const unidades = dependencies.unidades || [];
    const linhas = dependencies.linhas || [];
    const ramaisExistentes = dependencies.ramais || [];

    useEffect(() => {
        if (isOpen) {
            if (ramalToEdit) {
                setFormData({
                    ...ramalToEdit,
                    redirecionamentoEnabled: !!ramalToEdit.redirecionamentoEnabled,
                    grupoCapturaEnabled: !!ramalToEdit.grupoCapturaEnabled
                });
            } else if (draftMode && initialData) {
                setFormData({
                    ...initialData,
                    redirecionamentoEnabled: !!initialData.redirecionamentoEnabled,
                    grupoCapturaEnabled: !!initialData.grupoCapturaEnabled
                });
            } else {
                setFormData({
                    nome: '',
                    numero: '',
                    status: 'Ativo',
                    microsipUser: '',
                    microsipPass: '',
                    unidadeId: unitId || '',
                    setor: '',
                    ddr: '',
                    observacao: '',
                    redirecionamentoEnabled: false,
                    salto1: '',
                    salto2: '',
                    salto3: '',
                    grupoCapturaEnabled: false,
                    grupoCaptura: ''
                });
            }
        }
    }, [isOpen, ramalToEdit, initialData, draftMode, unitId]);

    function handleLocalSave() {
        const newErrors = { nome: false, numero: false, faixaDe: false, faixaAte: false };
        let hasError = false;

        if (!formData.nome || formData.nome.trim() === '') {
            newErrors.nome = true;
            hasError = true;
        }

        if (isFaixa) {
            if (!faixaDe || faixaDe.trim() === '') { newErrors.faixaDe = true; hasError = true; }
            if (!faixaAte || faixaAte.trim() === '') { newErrors.faixaAte = true; hasError = true; }
            if (hasError) { setErrors(newErrors); return; }

            if (!/^\d{4}$/.test(faixaDe) || !/^\d{4}$/.test(faixaAte)) {
                alert('Os ramais da faixa devem conter exatamente 4 dígitos numéricos.');
                setErrors({ ...newErrors, faixaDe: true, faixaAte: true });
                return;
            }

            const start = parseInt(faixaDe, 10);
            const end = parseInt(faixaAte, 10);

            if (start > end) {
                alert('O valor inicial da faixa ("De") não pode ser maior que o final ("Até").');
                setErrors({ ...newErrors, faixaDe: true });
                return;
            }

            if (end - start > 100) {
                alert('Por favor, limite a criação para no máximo 100 ramais por vez por questões de performance e segurança.');
                return;
            }

            // VALIDAÇÃO: Existência no Banco
            const conflicts = [];
            for (let i = start; i <= end; i++) {
                const strNum = String(i).padStart(4, '0');
                if (ramaisExistentes.some(r => r.numero === strNum)) {
                    conflicts.push(strNum);
                }
            }

            if (conflicts.length > 0) {
                alert(`Os seguintes ramais já estão cadastrados no sistema e não podem ser criados:\n${conflicts.join(', ')}`);
                setErrors({ ...newErrors, faixaDe: true, faixaAte: true });
                return;
            }

            // VALIDAÇÃO: Limites da unidade
            if (formData.unidadeId) {
                const unidadeSelecionada = unidades.find(u => u.id === formData.unidadeId);
                if (unidadeSelecionada && unidadeSelecionada.faixaRamais) {
                    const [inicioStr, fimStr] = unidadeSelecionada.faixaRamais.split(' - ');
                    const limitStart = parseInt(inicioStr, 10);
                    const limitEnd = parseInt(fimStr, 10);

                    if (!isNaN(limitStart) && !isNaN(limitEnd)) {
                        if (start < limitStart || end > limitEnd) {
                            alert(`A faixa solicitada (${start} até ${end}) excede a "Faixa de Ramais" permitida na unidade ${unidadeSelecionada.nome} (${unidadeSelecionada.faixaRamais}).`);
                            setErrors({ ...newErrors, faixaDe: true, faixaAte: true });
                            return;
                        }
                    }
                }
            }

            // Constroi o Payload em Lote (Array)
            const payloadArray = [];
            for (let i = start; i <= end; i++) {
                payloadArray.push({
                    ...formData,
                    numero: String(i).padStart(4, '0'),
                    tipo: 'SIP'
                });
            }

            if (draftMode && onDraftSubmit) {
                onDraftSubmit(payloadArray);
            } else if (onSave) {
                onSave(payloadArray);
            }

        } else {
            if (!formData.numero || formData.numero.trim() === '') {
                newErrors.numero = true;
                hasError = true;
            }

            setErrors(newErrors);
            if (hasError) return;

            // VALIDAÇÃO 1: Deve ser composto por exatamente 4 dígitos numéricos
            if (!/^\d{4}$/.test(formData.numero)) {
                alert('O ramal deve conter exatamente 4 dígitos numéricos (ex: 2001).');
                setErrors({ ...newErrors, numero: true });
                return;
            }

            // VALIDAÇÃO 2: Verificar duplicidade do número do ramal (ignorando a si mesmo se for edição)
            const currentId = ramalToEdit ? ramalToEdit.id : undefined;
            const ramalExists = ramaisExistentes.some(r => r.numero === formData.numero && r.id !== currentId);

            if (ramalExists) {
                alert(`O ramal ${formData.numero} já está cadastrado no sistema! Por favor, escolha outro número.`);
                setErrors({ ...newErrors, numero: true });
                return;
            }

            // VALIDAÇÃO 3: Verificar se o ramal pertence à faixa de ramais da Unidade escolhida
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

            if (draftMode && onDraftSubmit) {
                onDraftSubmit({ ...formData, tipo: 'SIP' });
            } else if (onSave) {
                onSave({ ...formData, tipo: 'SIP' });
            }
        }
    }

    return (
        <ModalWrapper
            isOpen={isOpen}
            onClose={onClose}
            title={ramalToEdit ? 'Editar Ramal SIP' : 'Cadastrar Novo Ramal SIP'}
            subtitle={ramalToEdit ? 'Atualize as credenciais do MicroSIP e roteamento da rede.' : 'Adicione um novo ramal SIP para uso via softphone ou telefone IP.'}
            icon="computer"
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
                {/* Identificação Group */}
                <div className="space-y-6">
                    <div className="flex items-center gap-2 mb-4">
                        <span className="material-symbols-outlined text-indigo-500 text-[20px]">badge</span>
                        <h3 className="text-sm font-semibold text-slate-900 dark:text-slate-100 uppercase tracking-wider">Identificação</h3>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <FormField label="Nome do ramal" required>
                            <FormInput
                                placeholder="Ex: João Silva (Financeiro)"
                                value={formData.nome}
                                onChange={(e) => setFormData({ ...formData, nome: e.target.value })}
                                error={errors.nome}
                            />
                        </FormField>

                        <div className="flex gap-4">
                            <div className="flex-1 space-y-2">
                                <div className="flex items-center justify-between">
                                    <label className="text-sm font-semibold text-slate-700 dark:text-slate-300">
                                        Ramal <span className="text-red-500 ml-1">*</span>
                                    </label>
                                    {!ramalToEdit && !initialData && (
                                        <label className="inline-flex items-center cursor-pointer text-xs group">
                                            <input
                                                type="checkbox"
                                                checked={isFaixa}
                                                onChange={(e) => setIsFaixa(e.target.checked)}
                                                className="mr-1.5 rounded border-slate-300 text-blue-600 focus:ring-blue-500 bg-white"
                                            />
                                            <span className="text-slate-500 font-medium group-hover:text-blue-600 transition-colors">Criar faixa de ramais</span>
                                        </label>
                                    )}
                                </div>

                                {!isFaixa ? (
                                    <FormInput
                                        placeholder="Ex: 2001"
                                        value={formData.numero}
                                        onChange={(e) => setFormData({ ...formData, numero: e.target.value })}
                                        error={errors.numero}
                                        disabled={isFaixa}
                                    />
                                ) : (
                                    <div className="flex items-center gap-2 animate-in fade-in slide-in-from-top-1">
                                        <FormInput
                                            placeholder="De (Ex: 2001)"
                                            value={faixaDe}
                                            onChange={(e) => setFaixaDe(e.target.value)}
                                            error={errors.faixaDe}
                                        />
                                        <span className="text-slate-500 text-sm font-medium">até</span>
                                        <FormInput
                                            placeholder="Até (Ex: 2005)"
                                            value={faixaAte}
                                            onChange={(e) => setFaixaAte(e.target.value)}
                                            error={errors.faixaAte}
                                        />
                                    </div>
                                )}
                            </div>

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
                                    <div className="relative w-11 h-6 bg-slate-200 peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-blue-500/50 rounded-full peer dark:bg-slate-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-slate-600 peer-checked:bg-blue-600"></div>
                                    <span className="ms-3 text-sm font-medium text-slate-700 dark:text-slate-300">Sim</span>
                                </label>
                            </div>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <FormField label="Unidade">
                            <FormSearchableSelect
                                id="unidades-sip"
                                icon="domain"
                                placeholder={isLoading ? "Carregando..." : "Selecione a unidade"}
                                value={formData.unidadeId}
                                onChange={(val) => setFormData({ ...formData, unidadeId: val })}
                                options={unidades.map(u => ({ value: u.id, label: u.nome }))}
                            />
                        </FormField>

                        <FormField label="Setor">
                            <FormInput
                                icon="groups"
                                placeholder="Ex: Financeiro"
                                value={formData.setor}
                                onChange={(e) => setFormData({ ...formData, setor: e.target.value })}
                            />
                        </FormField>
                    </div>
                </div>

                <div className="h-px bg-slate-200 dark:bg-slate-800"></div>

                {/* Credenciais MicroSIP Group */}
                <div className="space-y-6">
                    <div className="flex items-center gap-2 mb-4">
                        <span className="material-symbols-outlined text-indigo-500 text-[20px]">vpn_key</span>
                        <h3 className="text-sm font-semibold text-slate-900 dark:text-slate-100 uppercase tracking-wider">Credenciais MicroSIP</h3>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 p-5 bg-blue-50/30 dark:bg-blue-500/5 border border-blue-100 dark:border-blue-500/10 rounded-xl">
                        <FormField label="Usuário">
                            <FormInput
                                icon="person"
                                placeholder="Número ficticio"
                                value={formData.microsipUser}
                                onChange={(e) => setFormData({ ...formData, microsipUser: e.target.value })}
                            />
                        </FormField>

                        <FormField label="Senha">
                            <FormInput
                                icon="lock"
                                type={showPassword ? 'text' : 'password'}
                                placeholder="••••••••"
                                value={formData.microsipPass}
                                onChange={(e) => setFormData({ ...formData, microsipPass: e.target.value })}
                                rightElement={
                                    <button
                                        type="button"
                                        onClick={() => setShowPassword(!showPassword)}
                                        className="text-slate-400 hover:text-blue-500 transition-colors p-1"
                                    >
                                        <span className="material-symbols-outlined text-[20px]">
                                            {showPassword ? 'visibility_off' : 'visibility'}
                                        </span>
                                    </button>
                                }
                            />
                        </FormField>
                    </div>
                </div>

                <div className="h-px bg-slate-200 dark:bg-slate-800"></div>

                {/* Roteamento Group */}
                <div className="space-y-6">
                    <div className="flex items-center gap-2 mb-4">
                        <span className="material-symbols-outlined text-indigo-500 text-[20px]">alt_route</span>
                        <h3 className="text-sm font-semibold text-slate-900 dark:text-slate-100 uppercase tracking-wider">Configuração & Roteamento</h3>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <FormField label="Número principal">
                            <FormSearchableSelect
                                id="linhas-sip"
                                icon="call"
                                placeholder={isLoading ? "Carregando..." : "Vincular número"}
                                value={formData.ddr}
                                onChange={(val) => setFormData({ ...formData, ddr: val })}
                                options={linhas.map(l => ({ value: l.id, label: l.numero }))}
                            />
                        </FormField>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-4">
                            <label className="inline-flex items-center cursor-pointer group">
                                <input
                                    type="checkbox"
                                    className="sr-only peer"
                                    checked={formData.redirecionamentoEnabled}
                                    onChange={(e) => setFormData({ ...formData, redirecionamentoEnabled: e.target.checked })}
                                />
                                <div className="w-5 h-5 border-2 border-slate-300 dark:border-slate-700 rounded transition-all peer-checked:bg-blue-600 peer-checked:border-blue-600 flex items-center justify-center">
                                    <span className="material-symbols-outlined text-white text-[16px] scale-0 peer-checked:scale-100 transition-transform">check</span>
                                </div>
                                <span className="ms-3 text-sm font-medium text-slate-700 dark:text-slate-300">
                                    Redirecionamento em caso de ocupado/não atende
                                </span>
                            </label>

                            {formData.redirecionamentoEnabled && (
                                <div className="space-y-3 pl-8 animate-in slide-in-from-left-2 duration-200">
                                    <FormInput
                                        placeholder="Salto 1"
                                        value={formData.salto1 || ''}
                                        onChange={(e) => setFormData({ ...formData, salto1: e.target.value })}
                                    />
                                    <FormInput
                                        placeholder="Salto 2"
                                        value={formData.salto2 || ''}
                                        onChange={(e) => setFormData({ ...formData, salto2: e.target.value })}
                                    />
                                    <FormInput
                                        placeholder="Salto 3"
                                        value={formData.salto3 || ''}
                                        onChange={(e) => setFormData({ ...formData, salto3: e.target.value })}
                                    />
                                </div>
                            )}
                        </div>

                        <div className="space-y-4">
                            <label className="inline-flex items-center cursor-pointer group">
                                <input
                                    type="checkbox"
                                    className="sr-only peer"
                                    checked={formData.grupoCapturaEnabled}
                                    onChange={(e) => setFormData({ ...formData, grupoCapturaEnabled: e.target.checked })}
                                />
                                <div className="w-5 h-5 border-2 border-slate-300 dark:border-slate-700 rounded transition-all peer-checked:bg-blue-600 peer-checked:border-blue-600 flex items-center justify-center">
                                    <span className="material-symbols-outlined text-white text-[16px] scale-0 peer-checked:scale-100 transition-transform">check</span>
                                </div>
                                <span className="ms-3 text-sm font-medium text-slate-700 dark:text-slate-300">
                                    Grupo de captura
                                </span>
                            </label>

                            {formData.grupoCapturaEnabled && (
                                <div className="pl-8 animate-in slide-in-from-left-2 duration-200">
                                    <FormInput
                                        placeholder="Nome ou número do grupo"
                                        value={formData.grupoCaptura || ''}
                                        onChange={(e) => setFormData({ ...formData, grupoCaptura: e.target.value })}
                                    />
                                </div>
                            )}
                        </div>
                    </div>
                </div>

                <FormField label="Observação">
                    <textarea
                        className="block w-full rounded-lg border border-slate-300 dark:border-slate-800 bg-slate-50 dark:bg-[#111318] text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500/50 focus:border-indigo-500 sm:text-sm min-h-[100px] p-4 resize-y transition-all shadow-sm dark:shadow-none placeholder:text-slate-400 dark:placeholder:text-slate-500"
                        placeholder="Informações adicionais sobre este ramal..."
                        value={formData.observacao}
                        onChange={(e) => setFormData({ ...formData, observacao: e.target.value })}
                    />
                </FormField>
            </div>
        </ModalWrapper>
    );
}
