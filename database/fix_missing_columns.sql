-- =====================================================================
-- FIX: ADICIONAR COLUNAS FALTANTES NA TABELA RAMAIS
-- Execute este script para resolver o erro 'Could not find the pen column'
-- =====================================================================

-- 1. Adicionar colunas técnicas na tabela ramais (Denormalização para compatibilidade)
ALTER TABLE public.ramais 
ADD COLUMN IF NOT EXISTS pen TEXT,
ADD COLUMN IF NOT EXISTS "blocoVp" TEXT,
ADD COLUMN IF NOT EXISTS "parPorta" TEXT;

-- 2. Garantir que a coluna de vínculo com o inventário existe
ALTER TABLE public.ramais
ADD COLUMN IF NOT EXISTS "recursoPabxId" UUID REFERENCES public.recursos_pabx(id);

-- 3. Recarregar cache do PostgREST (Opcional, mas ajuda se o erro persistir)
-- NOTA: O Supabase geralmente faz isso automaticamente em alguns segundos após o DDL.
NOTIFY pgrst, 'reload schema';
