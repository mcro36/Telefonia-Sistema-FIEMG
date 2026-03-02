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
                // Converte o nome da coluna para snake_case para o banco (ex: unidadeId -> unidade_id)
                query = query.order(toSnake(order.column), { ascending: order.ascending !== false });
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

                // Campos que só existem no frontend ou são calculados e não devem ir para o DB
                if (['tipoPlano', 'linhasAtivas', 'ramaisAtivas', 'ramaisAtivos', 'totalRamais'].includes(key)) {
                    return;
                }

                // Converter string vazia para null APENAS para chaves estrangeiras (terminam em Id)
                // Isso evita erros 'not-null' em colunas obrigatórias como 'cidade'
                if (typeof value === 'string' && value.trim() === '' && key.endsWith('Id')) {
                    cleanData[key] = null;
                } else {
                    cleanData[key] = value;
                }
            });

            // Converter chaves de camelCase para snake_case para o banco de dados
            const snakeData = convertToSnake(cleanData);

            if (snakeData.id && typeof snakeData.id === 'string' && !snakeData.id.includes('.')) {
                const { error } = await supabase
                    .from(tableName)
                    .update(snakeData)
                    .eq('id', snakeData.id);
                if (error) throw error;
            } else {
                // Remove o ID temporário/falso se existir antes de inserir
                const { id, ...insertData } = snakeData;
                const { error } = await supabase
                    .from(tableName)
                    .insert([insertData]);
                if (error) throw error;
            }
            await fetchData();
            return { success: true };
        } catch (error) {
            console.error(`Error saving ${tableName}:`, error);
            const isPermissionError = error.code === '42501' || error.status === 403;
            const message = isPermissionError
                ? "Erro de Permissão: Você precisa estar logado com um perfil de 'Administrador' para realizar esta alteração."
                : (error.message || 'Verifique sua conexão ou o formato dos dados.');

            alert(`Falha ao salvar no banco de dados:\n${message}`);
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
