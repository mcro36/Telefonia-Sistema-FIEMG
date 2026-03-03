-- =====================================================================
-- SCRIPT PARA ZERAR DADOS PABX (PROCEDIMENTO DE LIMPEZA)
-- ATENÇÃO: Isso removerá todos os recursos e desvinculará os ramais
-- =====================================================================

-- 1. Desvincular recursos dos ramais existentes (evita erro de chave estrangeira)
UPDATE public.ramais 
SET "recursoPabxId" = NULL;

-- 2. Limpar a tabela de recursos físicos
TRUNCATE TABLE public.recursos_pabx CASCADE;

-- OPCIONAL: Se você quiser zerar TODOS os ramais PABX também,
-- descomente a linha abaixo:
-- DELETE FROM public.ramais WHERE tipo != 'SIP';

-- Reiniciar a sequência de criação (opcional se não usar ID serial)
-- ANALYZE public.recursos_pabx;
