/**
 * Utilitários para conversão de case entre Frontend (camelCase) e DB (snake_case)
 */
export const toCamel = (str) => {
    if (!str) return str;
    return str.replace(/([-_][a-z])/g, group => group.toUpperCase().replace('-', '').replace('_', ''));
};

export const toSnake = (str) => {
    if (!str) return str;
    return str.replace(/[A-Z]/g, letter => `_${letter.toLowerCase()}`);
};

export const convertToCamel = (obj) => {
    if (!obj || typeof obj !== 'object') return obj;
    if (Array.isArray(obj)) return obj.map(v => convertToCamel(v));
    const n = {};
    Object.keys(obj).forEach(k => {
        n[toCamel(k)] = convertToCamel(obj[k]);
    });
    return n;
};

export const convertToSnake = (obj) => {
    if (!obj || typeof obj !== 'object') return obj;
    if (Array.isArray(obj)) return obj.map(v => convertToSnake(v));
    const n = {};
    Object.keys(obj).forEach(k => {
        n[toSnake(k)] = convertToSnake(obj[k]);
    });
    return n;
};
