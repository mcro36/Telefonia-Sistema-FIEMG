-- database/scripts/02_security_fixes.sql

-- =============================================================================
-- 1. MIGRAÇÃO DE ROLE PARA APP_METADATA
--    (Execute apenas uma vez para preparar os usuários existentes)
-- =============================================================================
UPDATE auth.users
SET raw_app_meta_data = 
  COALESCE(raw_app_meta_data, '{}'::jsonb) || 
  jsonb_build_object('role', raw_user_meta_data->>'role')
WHERE raw_user_meta_data->>'role' IS NOT NULL;


-- =============================================================================
-- 2. AJUSTES EM VIEWS E FUNCTIONS (Security Definer & Search Path)
-- =============================================================================
-- Força a visualização a rodar sob os privilégios de quem a invoca
ALTER VIEW public.unidades_com_contagens SET (security_invoker = true);

-- Garante search_path seguro nas funções para evitar injeção de schema
ALTER FUNCTION public.propagar_faixa_ramais SET search_path = public;
ALTER FUNCTION public.get_dashboard_summary SET search_path = public;


-- =============================================================================
-- 3. AJUSTES NAS POLÍTICAS (RLS) - APENAS ADMINISTRADORES PODEM EDITAR/INSERIR
-- =============================================================================
-- Optaremos pelo uso direto nas regras para maior transparência do Linter.

-- -----------------------------------------------------------------------------
-- TABELA: unidades
-- -----------------------------------------------------------------------------
DROP POLICY IF EXISTS "Permitir inserts em unidades apenas para Administradores" ON public.unidades;
DROP POLICY IF EXISTS "Permitir updates em unidades apenas para Administradores" ON public.unidades;
DROP POLICY IF EXISTS "Permitir deletes em unidades apenas para Administradores" ON public.unidades;

CREATE POLICY "Permitir inserts em unidades apenas para Administradores" ON public.unidades
FOR INSERT TO authenticated WITH CHECK ((auth.jwt() -> 'app_metadata' ->> 'role') = 'Administrador');

CREATE POLICY "Permitir updates em unidades apenas para Administradores" ON public.unidades
FOR UPDATE TO authenticated USING ((auth.jwt() -> 'app_metadata' ->> 'role') = 'Administrador');

CREATE POLICY "Permitir deletes em unidades apenas para Administradores" ON public.unidades
FOR DELETE TO authenticated USING ((auth.jwt() -> 'app_metadata' ->> 'role') = 'Administrador');


-- -----------------------------------------------------------------------------
-- TABELA: linhas
-- -----------------------------------------------------------------------------
DROP POLICY IF EXISTS "Permitir inserts em linhas apenas para Administradores" ON public.linhas;
DROP POLICY IF EXISTS "Permitir updates em linhas apenas para Administradores" ON public.linhas;
DROP POLICY IF EXISTS "Permitir deletes em linhas apenas para Administradores" ON public.linhas;

CREATE POLICY "Permitir inserts em linhas apenas para Administradores" ON public.linhas
FOR INSERT TO authenticated WITH CHECK ((auth.jwt() -> 'app_metadata' ->> 'role') = 'Administrador');

CREATE POLICY "Permitir updates em linhas apenas para Administradores" ON public.linhas
FOR UPDATE TO authenticated USING ((auth.jwt() -> 'app_metadata' ->> 'role') = 'Administrador');

CREATE POLICY "Permitir deletes em linhas apenas para Administradores" ON public.linhas
FOR DELETE TO authenticated USING ((auth.jwt() -> 'app_metadata' ->> 'role') = 'Administrador');


-- -----------------------------------------------------------------------------
-- TABELA: ramais
-- -----------------------------------------------------------------------------
DROP POLICY IF EXISTS "Permitir inserts em ramais apenas para Administradores" ON public.ramais;
DROP POLICY IF EXISTS "Permitir updates em ramais apenas para Administradores" ON public.ramais;
DROP POLICY IF EXISTS "Permitir deletes em ramais apenas para Administradores" ON public.ramais;

CREATE POLICY "Permitir inserts em ramais apenas para Administradores" ON public.ramais
FOR INSERT TO authenticated WITH CHECK ((auth.jwt() -> 'app_metadata' ->> 'role') = 'Administrador');

CREATE POLICY "Permitir updates em ramais apenas para Administradores" ON public.ramais
FOR UPDATE TO authenticated USING ((auth.jwt() -> 'app_metadata' ->> 'role') = 'Administrador');

CREATE POLICY "Permitir deletes em ramais apenas para Administradores" ON public.ramais
FOR DELETE TO authenticated USING ((auth.jwt() -> 'app_metadata' ->> 'role') = 'Administrador');


-- -----------------------------------------------------------------------------
-- TABELA: uras
-- -----------------------------------------------------------------------------
DROP POLICY IF EXISTS "Permitir inserts em uras apenas para Administradores" ON public.uras;
DROP POLICY IF EXISTS "Permitir updates em uras apenas para Administradores" ON public.uras;
DROP POLICY IF EXISTS "Permitir deletes em uras apenas para Administradores" ON public.uras;

CREATE POLICY "Permitir inserts em uras apenas para Administradores" ON public.uras
FOR INSERT TO authenticated WITH CHECK ((auth.jwt() -> 'app_metadata' ->> 'role') = 'Administrador');

CREATE POLICY "Permitir updates em uras apenas para Administradores" ON public.uras
FOR UPDATE TO authenticated USING ((auth.jwt() -> 'app_metadata' ->> 'role') = 'Administrador');

CREATE POLICY "Permitir deletes em uras apenas para Administradores" ON public.uras
FOR DELETE TO authenticated USING ((auth.jwt() -> 'app_metadata' ->> 'role') = 'Administrador');


-- -----------------------------------------------------------------------------
-- TABELA: projetos
-- -----------------------------------------------------------------------------
DROP POLICY IF EXISTS "projetos_insert" ON public.projetos;
DROP POLICY IF EXISTS "projetos_update" ON public.projetos;
DROP POLICY IF EXISTS "projetos_delete" ON public.projetos;

CREATE POLICY "projetos_insert" ON public.projetos
FOR INSERT TO authenticated WITH CHECK (auth.uid() IS NOT NULL);

CREATE POLICY "projetos_update" ON public.projetos
FOR UPDATE TO authenticated USING ((auth.jwt() -> 'app_metadata' ->> 'role') = 'Administrador');

CREATE POLICY "projetos_delete" ON public.projetos
FOR DELETE TO authenticated USING ((auth.jwt() -> 'app_metadata' ->> 'role') = 'Administrador');

-- -----------------------------------------------------------------------------
-- TABELA: projeto_itens
-- -----------------------------------------------------------------------------
DROP POLICY IF EXISTS "projetoItens_insert" ON public.projeto_itens;
DROP POLICY IF EXISTS "projetoItens_update" ON public.projeto_itens;
DROP POLICY IF EXISTS "projetoItens_delete" ON public.projeto_itens;

CREATE POLICY "projetoItens_insert" ON public.projeto_itens
FOR INSERT TO authenticated WITH CHECK (auth.uid() IS NOT NULL);

CREATE POLICY "projetoItens_update" ON public.projeto_itens
FOR UPDATE TO authenticated USING ((auth.jwt() -> 'app_metadata' ->> 'role') = 'Administrador');

CREATE POLICY "projetoItens_delete" ON public.projeto_itens
FOR DELETE TO authenticated USING ((auth.jwt() -> 'app_metadata' ->> 'role') = 'Administrador');


-- -----------------------------------------------------------------------------
-- TABELA: recursos_pabx
-- -----------------------------------------------------------------------------
DROP POLICY IF EXISTS "Permitir escrita para usuários autenticados" ON public.recursos_pabx;

CREATE POLICY "Permitir escrita para usuários autenticados" ON public.recursos_pabx
FOR ALL TO authenticated USING ((auth.jwt() -> 'app_metadata' ->> 'role') = 'Administrador') WITH CHECK ((auth.jwt() -> 'app_metadata' ->> 'role') = 'Administrador');


-- Fim do Script
