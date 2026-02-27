-- =====================================================================
-- SCRIPT DE ATUALIZAÇÃO DA TABELA RAMAIS
-- Execute este script no SQL Editor do seu Supabase
-- =====================================================================

-- Adicionando as colunas faltantes que o frontend exige para salvar e exibir dados corretamente
ALTER TABLE public.ramais
ADD COLUMN IF NOT EXISTS nome TEXT,
ADD COLUMN IF NOT EXISTS ddr UUID REFERENCES public.linhas(id) ON DELETE SET NULL, -- Vincula a uma linha DDR
ADD COLUMN IF NOT EXISTS ura UUID REFERENCES public.uras(id) ON DELETE SET NULL,   -- Vincula a uma URA
ADD COLUMN IF NOT EXISTS "blocoVp" TEXT,
ADD COLUMN IF NOT EXISTS "parPorta" TEXT,
ADD COLUMN IF NOT EXISTS "tipoRamal" TEXT,
ADD COLUMN IF NOT EXISTS observacao TEXT;

-- Opcional: Para facilitar a busca na tabela ramais por nome
CREATE INDEX IF NOT EXISTS idx_ramais_nome ON public.ramais(nome);
