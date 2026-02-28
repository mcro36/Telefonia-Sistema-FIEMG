import React, { useState, useEffect } from 'react';
import { PhoneForwarded, Loader2, PhoneMissed, Phone, AlertCircle, SignalHigh, XCircle } from 'lucide-react';
import { ModalWrapper, ModalFooter } from './ui/ModalWrapper.jsx';
import { FormField, FormSearchableSelect } from './ui/FormField.jsx';
import { useSupabaseTable } from '../hooks/useSupabaseTable.js';

export function TesteLinhaModal({ isOpen, onClose }) {
    const { data: linhas, isLoading: isLoadingLinhas } = useSupabaseTable({
        tableName: 'linhas',
        order: { column: 'numero', ascending: true }
    });

    const [selectedLinha, setSelectedLinha] = useState('');
    const [testStatus, setTestStatus] = useState('idle'); // idle, checking, ringing, answered, failed
    const [testLog, setTestLog] = useState([]);

    useEffect(() => {
        if (isOpen) {
            setSelectedLinha('');
            setTestStatus('idle');
            setTestLog([]);
        }
    }, [isOpen]);

    const addLog = (msg, type = 'info') => {
        setTestLog(prev => [...prev, { time: new Date().toLocaleTimeString(), msg, type }]);
    };

    const handleExecuteTest = async () => {
        if (!selectedLinha) {
            addLog('Selecione uma linha antes de iniciar o teste.', 'error');
            return;
        }

        const linhaObj = linhas.find(l => l.id === selectedLinha);
        if (!linhaObj) return;

        setTestStatus('checking');
        setTestLog([]);
        addLog(`Iniciando teste para o número ${linhaObj.numero}...`, 'info');

        try {
            // NOTE: A porta 3001 será a porta onde vamos subir o nosso microsserviço NodeJS local
            const response = await fetch('http://localhost:3001/api/test-call', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    destino: linhaObj.numero.replace(/\D/g, '') // Envia apenas dígitos
                })
            });

            if (!response.ok) {
                const errData = await response.json();
                throw new Error(errData.error || 'Erro de comunicação com o serviço Sip.');
            }

            // Inicia Long-polling ou EventStream simulado para ler o status da API Node local
            addLog('Comando enviado à Engine SIP. Aguardando status da rede...', 'info');
            setTestStatus('ringing');

            // Aqui faremos polling do Job ID devolvido ou da resposta contínua na v2
            const result = await response.json();

            if (result.status === 'answered') {
                setTestStatus('answered');
                addLog('✅ Chamada completada e atendida com sucesso!', 'success');
                addLog(`Duração (mock): ${result.duration || 0}s`, 'info');
            } else if (result.status === 'failed' || result.status === 'busy') {
                setTestStatus('failed');
                addLog(`❌ Falha na completação. Motivo: ${result.reason || 'Ocupado/Não Atende'}`, 'error');
            }

        } catch (error) {
            setTestStatus('failed');
            addLog(error.message, 'error');
            addLog('Verifique se o Microsserviço Node SIP (na porta 3001) está em execução.', 'error');
        }
    };

    const isTesting = testStatus === 'checking' || testStatus === 'ringing';

    return (
        <ModalWrapper
            isOpen={isOpen}
            onClose={isTesting ? null : onClose}
            title="Testador de Linha de Voz"
            subtitle="Efetue uma chamada real temporária para validar a viabilidade de uma numeração cadastrada."
            icon="network_check"
            maxWidth="max-w-2xl"
            footer={
                <div className="flex items-center justify-between w-full px-6 py-4 bg-slate-50 dark:bg-[#111621] border-t border-slate-200 dark:border-slate-800 rounded-b-xl">
                    <button
                        onClick={onClose}
                        disabled={isTesting}
                        className="px-4 py-2 text-sm font-medium text-slate-600 dark:text-slate-400 bg-white dark:bg-[#1c1f26] border border-slate-300 dark:border-slate-700 rounded-lg hover:bg-slate-50 dark:hover:bg-slate-800 disabled:opacity-50 transition-colors"
                    >
                        Fechar
                    </button>
                    <button
                        onClick={handleExecuteTest}
                        disabled={!selectedLinha || isTesting}
                        className="flex items-center gap-2 px-6 py-2 text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                    >
                        {isTesting ? (
                            <>
                                <Loader2 className="w-4 h-4 animate-spin" />
                                Testando...
                            </>
                        ) : (
                            <>
                                <PhoneForwarded className="w-4 h-4" />
                                Executar Teste
                            </>
                        )}
                    </button>
                </div>
            }
        >
            <div className="space-y-6">

                {/* Alerta de Infra */}
                <div className="flex gap-4 p-4 rounded-xl bg-orange-50 dark:bg-orange-500/10 border border-orange-200 dark:border-orange-500/20">
                    <SignalHigh className="w-6 h-6 shrink-0 text-orange-600 dark:text-orange-400 mt-0.5" />
                    <div className="flex flex-col gap-1">
                        <h4 className="text-sm font-semibold text-orange-800 dark:text-orange-400">Microserviço SIP Requerido</h4>
                        <p className="text-xs text-orange-700/80 dark:text-orange-300/80 leading-relaxed">
                            Este teste depende do `sip-tester-api` rodando em background na porta 3001, logado no SBC da Fiemg. O teste resultará em falha se a api nativa não estiver ativa.
                        </p>
                    </div>
                </div>

                <FormField label="Selecione a linha para testar" required>
                    <FormSearchableSelect
                        id="linha-test-select"
                        icon={<Phone className="w-5 h-5" />}
                        placeholder={isLoadingLinhas ? "Carregando linhas..." : "Digite o número ou encontre a linha na lista..."}
                        value={selectedLinha}
                        onChange={(val) => setSelectedLinha(val)}
                        disabled={isTesting || isLoadingLinhas}
                        options={linhas.map(l => ({
                            value: l.id,
                            label: `${l.numero} - ${l.operadora} (${l.status})`
                        }))}
                    />
                </FormField>

                {/* Console de Log / Status */}
                <div className="flex flex-col gap-2">
                    <label className="text-sm font-semibold text-slate-700 dark:text-slate-300">Status do Teste</label>

                    <div className="flex flex-col h-48 bg-slate-950 rounded-xl border border-slate-800 p-4 font-mono text-xs overflow-y-auto">
                        {!testLog.length ? (
                            <div className="flex items-center justify-center h-full text-slate-600">
                                <span className="opacity-70">Aguardando execução...</span>
                            </div>
                        ) : (
                            <div className="flex flex-col gap-2">
                                {testLog.map((log, idx) => (
                                    <div key={idx} className="flex items-start gap-3">
                                        <span className="text-slate-500 whitespace-nowrap">[{log.time}]</span>
                                        <span className={`
                                            ${log.type === 'info' ? 'text-blue-400' : ''}
                                            ${log.type === 'success' ? 'text-emerald-400 font-bold' : ''}
                                            ${log.type === 'error' ? 'text-red-400 font-bold' : ''}
                                        `}>
                                            {log.msg}
                                        </span>
                                    </div>
                                ))}
                                {isTesting && (
                                    <div className="flex items-center gap-2 text-blue-400/70 mt-2">
                                        <Loader2 className="w-3 h-3 animate-spin" />
                                        <span>Aguardando pacotes SIP...</span>
                                    </div>
                                )}
                            </div>
                        )}
                    </div>
                </div>

            </div>
        </ModalWrapper>
    );
}
