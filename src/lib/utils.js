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

/**
 * Formata o label de um recurso PABX concatenando Unidade, Bloco, Porta e Tecnologia.
 */
export const formatResourceLabel = (recurso) => {
    if (!recurso) return '';
    const bloco = recurso.bloco?.toString() || '';
    const porta = recurso.porta || '';
    const tecnologia = (recurso.tecnologiaPadrao || recurso.tecnologia_padrao || 'Analogico').toUpperCase();

    let prefix = '';

    if (['1', '2', '3', '4', '5'].includes(bloco)) {
        prefix = 'AF_';
    } else if (['J', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V'].includes(bloco.toUpperCase())) {
        prefix = 'RBA_';
    } else if (recurso.unidades?.nome) {
        if (recurso.unidades.nome.includes('Albano Franco')) prefix = 'AF_';
        else if (recurso.unidades.nome.includes('Robson Braga')) prefix = 'RBA_';
    }

    return `${prefix}B${bloco}_P${porta}_${tecnologia}`;
};
