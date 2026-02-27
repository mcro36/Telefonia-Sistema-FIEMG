-- =====================================================================
-- SCRIPT DE ATUALIZAÇÃO DA TABELA RAMAIS (CAMPO PEN)
-- Execute este script no SQL Editor do seu Supabase
-- =====================================================================

ALTER TABLE public.ramais
ADD COLUMN IF NOT EXISTS "pen" TEXT;
