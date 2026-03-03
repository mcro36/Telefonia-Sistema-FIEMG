-- =============================================================================================
-- SCRIPT DE SUGESTÃO PARA POLÍTICAS DE ROW LEVEL SECURITY (RLS) NO SUPABASE
-- =============================================================================================
-- Este script contém políticas de segurança (Policies) prontas que você pode rodar 
-- diretamente no painel SQL Editor do seu Supabase para proteger seu banco de dados 
-- contra acessos indevidos via API.
--
-- REQUISITOS: 
-- 1. Este script assume que o 'role' (Perfil) do usuário está armazenado nos metadados 
--    da conta de autenticação (auth.users)
-- 2. Todas as tabelas listadas já devem estar com o RLS ativo.
-- =============================================================================================

-- Habilitando RLS nas tabelas principais do projeto (caso ainda não estejam)
ALTER TABLE unidades ENABLE ROW LEVEL SECURITY;
ALTER TABLE linhas ENABLE ROW LEVEL SECURITY;
ALTER TABLE ramais ENABLE ROW LEVEL SECURITY;
ALTER TABLE recursos_pabx ENABLE ROW LEVEL SECURITY;
ALTER TABLE uras ENABLE ROW LEVEL SECURITY;

-- ---------------------------------------------------------------------------------
-- POLÍTICAS GENÉRICAS DE LEITURA (SELECT)
-- Permitir que todos os usuários autenticados (Admin ou Viewer) leiam os dados
-- ---------------------------------------------------------------------------------

CREATE POLICY "Permitir leitura de unidades para autenticados" ON unidades FOR SELECT USING (auth.role() = 'authenticated');
CREATE POLICY "Permitir leitura de linhas para autenticados" ON linhas FOR SELECT USING (auth.role() = 'authenticated');
CREATE POLICY "Permitir leitura de ramais para autenticados" ON ramais FOR SELECT USING (auth.role() = 'authenticated');
CREATE POLICY "Permitir leitura de recursos pabx para autenticados" ON recursos_pabx FOR SELECT USING (auth.role() = 'authenticated');
CREATE POLICY "Permitir leitura de uras para autenticados" ON uras FOR SELECT USING (auth.role() = 'authenticated');

-- ---------------------------------------------------------------------------------
-- POLÍTICAS RESTRITAS DE MODIFICAÇÃO (INSERT, UPDATE, DELETE)
-- Permitir escrita APENAS para usuários cujo raw_user_meta_data contenha role='Administrador'
-- ---------------------------------------------------------------------------------

-- Para a tabela UNIDADES
CREATE POLICY "Permitir inserts em unidades apenas para Administradores" ON unidades FOR INSERT WITH CHECK (auth.jwt() -> 'user_metadata' ->> 'role' = 'Administrador');
CREATE POLICY "Permitir updates em unidades apenas para Administradores" ON unidades FOR UPDATE USING (auth.jwt() -> 'user_metadata' ->> 'role' = 'Administrador');
CREATE POLICY "Permitir deletes em unidades apenas para Administradores" ON unidades FOR DELETE USING (auth.jwt() -> 'user_metadata' ->> 'role' = 'Administrador');

-- Para a tabela LINHAS
CREATE POLICY "Permitir inserts em linhas apenas para Administradores" ON linhas FOR INSERT WITH CHECK (auth.jwt() -> 'user_metadata' ->> 'role' = 'Administrador');
CREATE POLICY "Permitir updates em linhas apenas para Administradores" ON linhas FOR UPDATE USING (auth.jwt() -> 'user_metadata' ->> 'role' = 'Administrador');
CREATE POLICY "Permitir deletes em linhas apenas para Administradores" ON linhas FOR DELETE USING (auth.jwt() -> 'user_metadata' ->> 'role' = 'Administrador');

-- Para a tabela RAMAIS
CREATE POLICY "Permitir inserts em ramais apenas para Administradores" ON ramais FOR INSERT WITH CHECK (auth.jwt() -> 'user_metadata' ->> 'role' = 'Administrador');
CREATE POLICY "Permitir updates em ramais apenas para Administradores" ON ramais FOR UPDATE USING (auth.jwt() -> 'user_metadata' ->> 'role' = 'Administrador');
CREATE POLICY "Permitir deletes em ramais apenas para Administradores" ON ramais FOR DELETE USING (auth.jwt() -> 'user_metadata' ->> 'role' = 'Administrador');

-- Para a tabela URA
CREATE POLICY "Permitir inserts em uras apenas para Administradores" ON uras FOR INSERT WITH CHECK (auth.jwt() -> 'user_metadata' ->> 'role' = 'Administrador');
CREATE POLICY "Permitir updates em uras apenas para Administradores" ON uras FOR UPDATE USING (auth.jwt() -> 'user_metadata' ->> 'role' = 'Administrador');
CREATE POLICY "Permitir deletes em uras apenas para Administradores" ON uras FOR DELETE USING (auth.jwt() -> 'user_metadata' ->> 'role' = 'Administrador');


-- =============================================================================================
-- IMPORTANTE: Para isso funcionar, ao cadastrar um novo usuário ou mapear o acesso, certifique-se
-- de injetar { "role": "Administrador" } ou { "role": "Viewer" } nos metadados (user_metadata) dele.
-- =============================================================================================
