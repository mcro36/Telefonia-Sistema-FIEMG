-- =====================================================================
-- SCRIPT DE ATUALIZAÇÃO DA TABELA RAMAIS (CREDENCIAIS MICROSIP)
-- Execute este script no SQL Editor do seu Supabase
-- =====================================================================

-- O erro indicou que 'microsipPass' (e possivelmente 'microsipUser') 
-- não existiam no banco de dados. Este script cria as colunas e 
-- obedece rigorosamente a escrita camelCase usando aspas duplas, 
-- conforme exigido pelo Supabase para compatibilidade com o frontend.

ALTER TABLE public.ramais
ADD COLUMN IF NOT EXISTS "microsipUser" TEXT,
ADD COLUMN IF NOT EXISTS "microsipPass" TEXT;
