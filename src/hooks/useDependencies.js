import { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';
import { convertToCamel } from '../lib/utils';

/**
 * Hook customizado para carregar de forma paralela multiplas dependências (ex: unidades, linhas, uras).
 * 
 * @param {Array<{ tableName: string, columns?: string, order?: { column: string, ascending?: boolean } }>} tables 
 * @param {boolean} trigger - Controla se a execução deve ocorrer (ex: quando um modal abrir).
 */
export function useDependencies(tables = [], trigger = true) {
    const [dependencies, setDependencies] = useState({});
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        async function fetchAll() {
            setIsLoading(true);
            try {
                const promises = tables.map(async (table) => {
                    let query = supabase
                        .from(table.tableName)
                        .select(table.columns || 'id, nome');

                    if (table.order) {
                        query = query.order(table.order.column, { ascending: table.order.ascending !== false });
                    }

                    const { data, error } = await query;
                    if (error) throw error;
                    return { key: table.tableName, data: data || [] };
                });

                const results = await Promise.all(promises);
                const depsObj = results.reduce((acc, curr) => {
                    acc[curr.key] = curr.data;
                    return acc;
                }, {});
                setDependencies(depsObj);
            } catch (error) {
                console.error('Error fetching dependencies:', error);
            } finally {
                setIsLoading(false);
            }
        }

        if (trigger && tables.length > 0) {
            fetchAll();
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [JSON.stringify(tables), trigger]);

    return { dependencies, isLoading };
}
