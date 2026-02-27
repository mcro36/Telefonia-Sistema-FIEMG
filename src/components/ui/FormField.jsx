import React from 'react';

export function FormField({ label, required, children, className }) {
    return (
        <div className={`space-y-2 ${className || ''}`}>
            {label && (
                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300">
                    {label} {required && <span className="text-red-500">*</span>}
                </label>
            )}
            {children}
        </div>
    );
}

export function FormInput({ icon, rightElement, error, className, ...props }) {
    return (
        <div className="relative group">
            {icon && (
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400 group-focus-within:text-blue-500 transition-colors">
                    {typeof icon === 'string' ? (
                        <span className="material-symbols-outlined text-[20px]">{icon}</span>
                    ) : (
                        icon
                    )}
                </div>
            )}
            <input
                className={`block w-full rounded-lg border bg-slate-50 dark:bg-[#111318] text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500 sm:text-sm h-11 transition-all placeholder:text-slate-400 dark:placeholder:text-slate-500 shadow-sm dark:shadow-none ${icon ? 'pl-10' : 'pl-4'} ${rightElement ? 'pr-12' : 'pr-4'} ${error ? 'border-red-500 focus:border-red-500 focus:ring-red-500/50' : 'border-slate-300 dark:border-slate-800'
                    } ${className || ''}`}
                {...props}
            />
            {rightElement && (
                <div className="absolute inset-y-0 right-0 pr-3 flex items-center">
                    {rightElement}
                </div>
            )}
        </div>
    );
}

export function FormSelect({ icon, error, className, options = [], defaultOption, ...props }) {
    return (
        <div className="relative group">
            {icon && (
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400 group-focus-within:text-blue-500 transition-colors">
                    {typeof icon === 'string' ? (
                        <span className="material-symbols-outlined text-[20px]">{icon}</span>
                    ) : (
                        icon
                    )}
                </div>
            )}
            <select
                className={`block w-full appearance-none rounded-lg border bg-slate-50 dark:bg-[#111318] text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500 sm:text-sm h-11 transition-all cursor-pointer shadow-sm dark:shadow-none ${icon ? 'pl-10' : 'pl-4'} pr-10 ${error ? 'border-red-500 focus:border-red-500 focus:ring-red-500/50' : 'border-slate-300 dark:border-slate-800'
                    } ${className || ''}`}
                {...props}
            >
                {defaultOption && <option disabled value="">{defaultOption}</option>}
                {options.map((opt, i) => (
                    <option key={i} value={opt.value}>{opt.label}</option>
                ))}
            </select>
            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3 text-slate-500">
                <span className="material-symbols-outlined">expand_more</span>
            </div>
        </div>
    );
}

export function FormSearchableSelect({ icon, error, className, id, options = [], placeholder, value, onChange, ...props }) {
    const listId = `${id}-list`;
    const displayValue = options.find(o => String(o.value) === String(value))?.label || value || '';

    return (
        <div className="relative group">
            {icon && (
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400 group-focus-within:text-blue-500 transition-colors">
                    {typeof icon === 'string' ? (
                        <span className="material-symbols-outlined text-[20px]">{icon}</span>
                    ) : (
                        icon
                    )}
                </div>
            )}
            <input
                id={id}
                className={`block w-full rounded-lg border bg-slate-50 dark:bg-[#111318] text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500 sm:text-sm h-11 transition-all placeholder:text-slate-400 dark:placeholder:text-slate-500 shadow-sm dark:shadow-none ${icon ? 'pl-10' : 'pl-4'} pr-10 ${error ? 'border-red-500 focus:border-red-500 focus:ring-red-500/50' : 'border-slate-300 dark:border-slate-800'
                    } ${className || ''}`}
                list={listId}
                placeholder={placeholder}
                value={displayValue}
                onChange={(e) => {
                    const selected = options.find(o => o.label === e.target.value);
                    onChange(selected ? selected.value : e.target.value);
                }}
                {...props}
            />
            <datalist id={listId}>
                {options.map((opt, i) => (
                    <option key={i} value={opt.label} />
                ))}
            </datalist>
            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3 text-slate-500">
                <span className="material-symbols-outlined">search</span>
            </div>
        </div>
    );
}
