import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Lock, Key, Loader2 } from 'lucide-react';
import { supabase } from '../lib/supabase.js';

export function TrocaSenhaModal({ isOpen, onClose }) {
    const [currentPassword, setCurrentPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError(null);

        if (newPassword !== confirmPassword) {
            return setError('A nova senha e a confirmação não coincidem.');
        }

        if (newPassword.length < 6) {
            return setError('A nova senha deve ter pelo menos 6 caracteres.');
        }

        setIsLoading(true);

        try {
            // Primeiro validamos se a senha atual está correta tentando relogar
            const { data: { session } } = await supabase.auth.getSession();
            const userEmail = session?.user?.email;

            if (!userEmail) throw new Error('Sessão expirada. Faça login novamente.');

            const checkPasswordResponse = await supabase.auth.signInWithPassword({
                email: userEmail,
                password: currentPassword
            });

            if (checkPasswordResponse.error) {
                throw new Error('A senha atual está incorreta.');
            }

            // Agora sim atualizamos a senha
            const { error: updateError } = await supabase.auth.updateUser({
                password: newPassword
            });

            if (updateError) {
                throw new Error('Falha ao atualizar a senha: ' + updateError.message);
            }

            alert('Senha atualizada com sucesso!');
            onClose();
            setCurrentPassword('');
            setNewPassword('');
            setConfirmPassword('');
        } catch (err) {
            setError(err.message);
        } finally {
            setIsLoading(false);
        }
    };

    if (!isOpen) return null;

    return (
        <AnimatePresence>
            <div className="fixed inset-0 bg-[#0a0c10]/80 backdrop-blur-sm z-[99999] flex items-center justify-center p-4">
                <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    className="bg-white dark:bg-[#111621] w-full max-w-md rounded-xl shadow-2xl border border-slate-200 dark:border-slate-800 overflow-hidden"
                >
                    <div className="px-6 py-4 border-b border-slate-200 dark:border-slate-800 flex justify-between items-center bg-slate-50 dark:bg-[#0a0c10]">
                        <h3 className="text-lg font-bold text-slate-900 dark:text-white flex items-center gap-2">
                            <Key className="w-5 h-5 text-blue-500" />
                            Trocar Senha
                        </h3>
                        <button onClick={onClose} className="text-slate-500 hover:text-slate-900 dark:hover:text-white transition-colors">
                            <X className="w-5 h-5" />
                        </button>
                    </div>

                    <form onSubmit={handleSubmit} className="p-6 flex flex-col gap-4">
                        {error && (
                            <div className="p-3 bg-red-100 dark:bg-red-500/10 text-red-600 dark:text-red-400 border border-red-200 dark:border-red-500/20 text-sm rounded-lg">
                                {error}
                            </div>
                        )}
                        <div className="flex flex-col gap-1.5">
                            <label className="text-sm font-semibold text-slate-700 dark:text-slate-300">Senha Atual</label>
                            <input
                                type="password"
                                value={currentPassword}
                                onChange={e => setCurrentPassword(e.target.value)}
                                className="w-full bg-slate-50 dark:bg-[#1c1f26] border border-slate-200 dark:border-slate-800 rounded-lg px-4 py-2.5 text-slate-900 dark:text-white focus:ring-2 focus:ring-blue-500 outline-none transition-all placeholder:text-slate-500 text-sm"
                                placeholder="Digite sua senha atual"
                                required
                            />
                        </div>
                        <div className="flex flex-col gap-1.5 mt-2">
                            <label className="text-sm font-semibold text-slate-700 dark:text-slate-300">Nova Senha</label>
                            <input
                                type="password"
                                value={newPassword}
                                onChange={e => setNewPassword(e.target.value)}
                                className="w-full bg-slate-50 dark:bg-[#1c1f26] border border-slate-200 dark:border-slate-800 rounded-lg px-4 py-2.5 text-slate-900 dark:text-white focus:ring-2 focus:ring-blue-500 outline-none transition-all placeholder:text-slate-500 text-sm"
                                placeholder="Pelo menos 6 caracteres"
                                minLength="6"
                                required
                            />
                        </div>
                        <div className="flex flex-col gap-1.5">
                            <label className="text-sm font-semibold text-slate-700 dark:text-slate-300">Confirmar Nova Senha</label>
                            <input
                                type="password"
                                value={confirmPassword}
                                onChange={e => setConfirmPassword(e.target.value)}
                                className="w-full bg-slate-50 dark:bg-[#1c1f26] border border-slate-200 dark:border-slate-800 rounded-lg px-4 py-2.5 text-slate-900 dark:text-white focus:ring-2 focus:ring-blue-500 outline-none transition-all placeholder:text-slate-500 text-sm"
                                placeholder="Repita a nova senha"
                                required
                            />
                        </div>

                        <div className="mt-4 pt-4 border-t border-slate-200 dark:border-slate-800 flex justify-end gap-3">
                            <button
                                type="button"
                                onClick={onClose}
                                className="px-4 py-2 text-sm font-medium text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white transition-colors"
                            >
                                Cancelar
                            </button>
                            <button
                                type="submit"
                                disabled={isLoading}
                                className="px-6 py-2 text-sm flex items-center gap-2 font-bold bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-all shadow-sm disabled:opacity-50"
                            >
                                {isLoading ? <Loader2 className="w-4 h-4 animate-spin" /> : null}
                                {isLoading ? 'Atualizando...' : 'Confirmar Troca'}
                            </button>
                        </div>
                    </form>
                </motion.div>
            </div>
        </AnimatePresence>
    );
}
