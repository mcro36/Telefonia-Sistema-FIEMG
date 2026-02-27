import { useState, useCallback, useEffect } from 'react';
import { supabase } from '../lib/supabase';
import { convertToCamel, convertToSnake, toSnake } from '../lib/utils';

/**
 * Hook customizado para gerenciar leitura, criação, atualização e exclusão
 * de dados em uma tabela do Supabase com conversão automática camelCase.
 */
export function useSupabaseTable({ tableName, selectQuery = '*', order = null }) {
    const [data, setData] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    const fetchData = useCallback(async () => {
        setIsLoading(true);
        try {
            let query = supabase.from(tableName).select(selectQuery);

            if (order) {
                // Mantém o case original da coluna (ex: unidadeId)
                query = query.order(order.column, { ascending: order.ascending !== false });
            }

            const { data: result, error } = await query;
            if (error) throw error;
            if (result) setData(convertToCamel(result));
        } catch (error) {
            console.error(`Error fetching ${tableName}:`, error);
        } finally {
            setIsLoading(false);
        }
    }, [tableName, selectQuery, order?.column, order?.ascending]);

    useEffect(() => {
        fetchData();
    }, [fetchData]);

    const saveRecord = async (recordData) => {
        try {
            // Sanitizador Automatizado para o Supabase
            const cleanData = {};

            Object.keys(recordData).forEach(key => {
                const value = recordData[key];

                // Ignorar objetos com relacionamentos aninhados ou arrays (joins do supabase)
                // Ex: unidades: { nome: 'SESI' } ou linhas: [...]
                if (key === 'unidades' || key === 'linhas' || (value !== null && typeof value === 'object')) {
                    return;
                }

                // Campos que só existem no frontend e não no DB
                if (key === 'tipoPlano') {
                    return;
                }

                // Converter string vazia para null (crucial para colunas UUID FK)
                if (typeof value === 'string' && value.trim() === '') {
                    cleanData[key] = null;
                } else {
                    cleanData[key] = value;
                }
            });

            if (cleanData.id && typeof cleanData.id === 'string' && !cleanData.id.includes('.')) {
                const { error } = await supabase
                    .from(tableName)
                    .update(cleanData)
                    .eq('id', cleanData.id);
                if (error) throw error;
            } else {
                // Remove o ID temporário/falso se existir antes de inserir
                const { id, ...insertData } = cleanData;
                const { error } = await supabase
                    .from(tableName)
                    .insert([insertData]);
                if (error) throw error;
            }
            await fetchData();
            return { success: true };
        } catch (error) {
            console.error(`Error saving ${tableName}:`, error);
            alert(`Falha ao salvar no banco de dados:\n${error.message || 'Verifique sua conexão ou permissões.'}`);
            return { success: false, error };
        }
    };

    const deleteRecord = async (id) => {
        try {
            const { error } = await supabase.from(tableName).delete().eq('id', id);
            if (error) throw error;
            await fetchData();
            return { success: true };
        } catch (error) {
            console.error(`Error deleting ${tableName}:`, error);
            return { success: false, error };
        }
    };

    return { data, isLoading, fetchData, saveRecord, deleteRecord, setData };
}
