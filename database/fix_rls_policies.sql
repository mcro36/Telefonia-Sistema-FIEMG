-- =====================================================================
-- SCRIPT DE CORREÇÃO DE SEGURANÇA (RLS POLICIES)
-- Execute este script no SQL Editor do seu Supabase
-- =====================================================================

-- --------------------------------------------------------
-- 1. DROPAR POLÍTICAS ANTIGAS (Inseguras)
-- --------------------------------------------------------
DO $$ 
BEGIN
    -- Unidades
    DROP POLICY IF EXISTS "Permitir Leitura Pública de Unidades" ON public.unidades;
    DROP POLICY IF EXISTS "Permitir Inserção de Unidades" ON public.unidades;
    DROP POLICY IF EXISTS "Permitir Atualização de Unidades" ON public.unidades;
    DROP POLICY IF EXISTS "Permitir Exclusão de Unidades" ON public.unidades;
    
    -- Linhas
    DROP POLICY IF EXISTS "Permitir Leitura Pública de Linhas" ON public.linhas;
    DROP POLICY IF EXISTS "Permitir Inserção de Linhas" ON public.linhas;
    DROP POLICY IF EXISTS "Permitir Atualização de Linhas" ON public.linhas;
    DROP POLICY IF EXISTS "Permitir Exclusão de Linhas" ON public.linhas;

    -- Ramais
    DROP POLICY IF EXISTS "Permitir Leitura Pública de Ramais" ON public.ramais;
    DROP POLICY IF EXISTS "Permitir Inserção de Ramais" ON public.ramais;
    DROP POLICY IF EXISTS "Permitir Atualização de Ramais" ON public.ramais;
    DROP POLICY IF EXISTS "Permitir Exclusão de Ramais" ON public.ramais;

    -- URAs
    DROP POLICY IF EXISTS "Permitir leitura anonima nas uras" ON public.uras;
    DROP POLICY IF EXISTS "Permitir insercao anonima nas uras" ON public.uras;
    DROP POLICY IF EXISTS "Permitir atualizacao anonima nas uras" ON public.uras;
    DROP POLICY IF EXISTS "Permitir exclusao anonima nas uras" ON public.uras;
END $$;

-- --------------------------------------------------------
-- 2. CRIAR NOVAS POLÍTICAS (Seguras para Usuários Logados)
-- --------------------------------------------------------

-- UNIDADES
CREATE POLICY "Leitura Unidades" ON public.unidades FOR SELECT USING (true); -- Leitura pode continuar pública para o dashboard carregar
CREATE POLICY "Insercao Unidades" ON public.unidades FOR INSERT WITH CHECK (auth.role() = 'authenticated');
CREATE POLICY "Atualizacao Unidades" ON public.unidades FOR UPDATE USING (auth.role() = 'authenticated');
CREATE POLICY "Exclusao Unidades" ON public.unidades FOR DELETE USING (auth.role() = 'authenticated');

-- LINHAS
CREATE POLICY "Leitura Linhas" ON public.linhas FOR SELECT USING (true);
CREATE POLICY "Insercao Linhas" ON public.linhas FOR INSERT WITH CHECK (auth.role() = 'authenticated');
CREATE POLICY "Atualizacao Linhas" ON public.linhas FOR UPDATE USING (auth.role() = 'authenticated');
CREATE POLICY "Exclusao Linhas" ON public.linhas FOR DELETE USING (auth.role() = 'authenticated');

-- RAMAIS
CREATE POLICY "Leitura Ramais" ON public.ramais FOR SELECT USING (true);
CREATE POLICY "Insercao Ramais" ON public.ramais FOR INSERT WITH CHECK (auth.role() = 'authenticated');
CREATE POLICY "Atualizacao Ramais" ON public.ramais FOR UPDATE USING (auth.role() = 'authenticated');
CREATE POLICY "Exclusao Ramais" ON public.ramais FOR DELETE USING (auth.role() = 'authenticated');

-- URAS
CREATE POLICY "Leitura URAs" ON public.uras FOR SELECT USING (true);
CREATE POLICY "Insercao URAs" ON public.uras FOR INSERT WITH CHECK (auth.role() = 'authenticated');
CREATE POLICY "Atualizacao URAs" ON public.uras FOR UPDATE USING (auth.role() = 'authenticated');
CREATE POLICY "Exclusao URAs" ON public.uras FOR DELETE USING (auth.role() = 'authenticated');
