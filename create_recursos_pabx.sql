-- =====================================================================
-- SCRIPT DE CRIAÇÃO DA TABELA DE RECURSOS PABX
-- Execute este script no SQL Editor do seu Supabase
-- =====================================================================

-- 1. Criar a tabela de recursos (portas físicas)
CREATE TABLE IF NOT EXISTS public.recursos_pabx (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    bloco TEXT NOT NULL,
    porta TEXT NOT NULL,
    pen TEXT NOT NULL UNIQUE,
    tecnologia_padrao TEXT DEFAULT 'Analogico', -- Analogico ou Digital
    created_at TIMESTAMPTZ DEFAULT now()
);

-- 2. Adicionar a coluna de vínculo na tabela de ramais
ALTER TABLE public.ramais
ADD COLUMN IF NOT EXISTS "recursoPabxId" UUID REFERENCES public.recursos_pabx(id);

-- 3. Habilitar RLS para a nova tabela
ALTER TABLE public.recursos_pabx ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Permitir leitura para usuários autenticados" 
ON public.recursos_pabx FOR SELECT 
TO authenticated 
USING (true);

CREATE POLICY "Permitir escrita para usuários autenticados" 
ON public.recursos_pabx FOR ALL 
TO authenticated 
USING (true) 
WITH CHECK (true);
