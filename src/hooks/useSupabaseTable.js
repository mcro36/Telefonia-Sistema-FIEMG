import { useCallback, useMemo } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '../lib/supabase';
import { convertToCamel, convertToSnake, toSnake } from '../lib/utils';

/**
 * Hook customizado para gerenciar leitura, criação, atualização e exclusão
 * de dados em uma tabela do Supabase com conversão automática camelCase e cache via React Query.
 */
export function useSupabaseTable({ tableName, selectQuery = '*', order = null }) {
    const queryClient = useQueryClient();

    // Serializar a chave de ordem para evitar re-fetches infinitos se a prop order mudar de referência
    const orderKey = order ? `${order.column}_${order.ascending}` : 'none';
    const queryKey = useMemo(() => [tableName, selectQuery, orderKey], [tableName, selectQuery, orderKey]);

    const { data = [], isLoading, refetch } = useQuery({
        queryKey,
        queryFn: async () => {
            let query = supabase.from(tableName).select(selectQuery);

            if (order) {
                // Converte o nome da coluna para snake_case para o banco (ex: unidadeId -> unidade_id)
                query = query.order(toSnake(order.column), { ascending: order.ascending !== false });
            }

            const { data: result, error } = await query;
            if (error) throw error;
            return result ? convertToCamel(result) : [];
        }
    });

    const setData = useCallback((updater) => {
        // Mock setData function for optimistic updates implemented by existing views
        queryClient.setQueryData(queryKey, updater);
    }, [queryClient, queryKey]);

    const saveMutation = useMutation({
        mutationFn: async (recordData) => {
            const isArray = Array.isArray(recordData);
            const recordsToProcess = isArray ? recordData : [recordData];

            const snakeRecords = recordsToProcess.map(record => {
                const cleanData = {};
                Object.keys(record).forEach(key => {
                    const value = record[key];
                    // Clean external relations
                    if (key === 'unidades' || key === 'linhas' || (value !== null && typeof value === 'object')) {
                        return;
                    }
                    // Clean aggregates and injected frontend states
                    if (['tipoPlano', 'linhasAtivas', 'ramaisAtivas', 'ramaisAtivos', 'totalRamais', 'microsipUser', 'microsipPass', 'redirecionamentoEnabled', 'salto1', 'salto2', 'salto3', 'grupoCapturaEnabled', 'grupoCaptura'].includes(key)) {
                        return;
                    }
                    if (typeof value === 'string' && value.trim() === '' && (key.endsWith('Id') || ['ddr', 'ura'].includes(key))) {
                        cleanData[key] = null;
                    } else {
                        cleanData[key] = value;
                    }
                });
                return convertToSnake(cleanData);
            });

            if (!isArray && snakeRecords[0].id && typeof snakeRecords[0].id === 'string' && !snakeRecords[0].id.includes('.')) {
                // UPDATE (Single)
                const { error } = await supabase
                    .from(tableName)
                    .update(snakeRecords[0])
                    .eq('id', snakeRecords[0].id);
                if (error) throw error;
            } else {
                // INSERT (Single or Multiple)
                // Remove IDs temporários antes de inserir
                const insertData = snakeRecords.map(({ id, ...rest }) => rest);
                const { error } = await supabase
                    .from(tableName)
                    .insert(insertData);
                if (error) throw error;
            }
            return true;
        },
        onSuccess: () => {
            // Invalidate all queries that belong to this table
            queryClient.invalidateQueries({ queryKey: [tableName] });
        },
        onError: (error) => {
            console.group(`[useSupabaseTable] Erro Crítico ao salvar ${tableName}`);
            console.error("Detalhes do erro:", error);
            console.groupEnd();

            const isPermissionError = error.code === '42501' || error.status === 403;
            const message = isPermissionError
                ? "Erro de Permissão: Você precisa estar logado com um perfil de 'Administrador' para realizar esta alteração."
                : (error.message || 'Verifique sua conexão ou o formato dos dados.');

            alert(`Falha ao salvar no banco de dados:\n${message}`);
        }
    });

    const deleteMutation = useMutation({
        mutationFn: async (id) => {
            const { error } = await supabase.from(tableName).delete().eq('id', id);
            if (error) throw error;
            return id;
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: [tableName] });
        }
    });


    const saveRecord = async (recordData) => {
        try {
            await saveMutation.mutateAsync(recordData);
            return { success: true };
        } catch (error) {
            return { success: false, error };
        }
    };

    const deleteRecord = async (id) => {
        try {
            await deleteMutation.mutateAsync(id);
            return { success: true };
        } catch (error) {
            console.error(`Error deleting ${tableName}:`, error);
            return { success: false, error };
        }
    };

    return { data, isLoading, fetchData: refetch, saveRecord, deleteRecord, setData };
}
