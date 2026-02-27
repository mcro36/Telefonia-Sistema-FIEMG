import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X } from 'lucide-react';

export function ModalWrapper({ isOpen, onClose, title, subtitle, icon, children, footer, maxWidth = 'max-w-4xl' }) {
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
                    className={`relative w-full ${maxWidth} bg-white dark:bg-[#1c1f26] rounded-xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh] border border-slate-200 dark:border-slate-800 transition-colors bg-white dark:bg-surface-dark`}
                >
                    {/* Header */}
                    <div className="px-6 py-5 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between sticky top-0 bg-slate-50 dark:bg-[#1c1f26] backdrop-blur z-10 transition-colors">
                        <div className="flex items-center gap-3">
                            {icon && (
                                <div className="bg-blue-50 dark:bg-blue-500/10 p-2 rounded-lg text-blue-600 dark:text-blue-400">
                                    <span className="material-symbols-outlined">{icon}</span>
                                </div>
                            )}
                            <div>
                                <h2 className="text-xl font-bold text-slate-900 dark:text-white leading-tight">
                                    {title}
                                </h2>
                                {subtitle && (
                                    <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
                                        {subtitle}
                                    </p>
                                )}
                            </div>
                        </div>
                        <button onClick={onClose} className="text-slate-400 hover:text-slate-600 dark:hover:text-white transition-colors">
                            <X className="w-6 h-6" />
                        </button>
                    </div>

                    {/* Content */}
                    <div className="flex-1 overflow-y-auto p-6 md:p-8 custom-scrollbar bg-white dark:bg-[#1c1f26] transition-colors">
                        {children}
                    </div>

                    {/* Footer */}
                    {footer && (
                        <div className="px-6 py-4 bg-slate-50 dark:bg-[#151a25] border-t border-slate-200 dark:border-slate-800 flex justify-end gap-3 sticky bottom-0 z-10 transition-colors">
                            {footer}
                        </div>
                    )}
                </motion.div>
            </div>
        </AnimatePresence>
    );
}

export function ModalFooter({ onClose, onSave, saveText = 'Salvar', disabled = false }) {
    return (
        <>
            <button
                onClick={onClose}
                className="px-5 py-2.5 rounded-lg text-sm font-medium text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-white/5 transition-colors focus:outline-none focus:ring-2 focus:ring-slate-400 dark:focus:ring-slate-600"
            >
                Cancelar
            </button>
            <button
                onClick={onSave}
                disabled={disabled}
                className="flex items-center gap-2 px-5 py-2.5 rounded-lg text-sm font-bold text-white bg-blue-600 hover:bg-blue-700 active:bg-blue-800 disabled:opacity-50 transition-colors shadow-lg shadow-blue-600/20 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-600 dark:focus:ring-offset-[#1c1f26]"
            >
                <span className="material-symbols-outlined text-[18px]">check</span>
                {saveText}
            </button>
        </>
    );
}
