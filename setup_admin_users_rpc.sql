-- ====================================================================================
-- ESTE SCRIPT CRIA FUNÇÕES (RPCs) PARA QUE O SEU DASHBOARD CONSIGA LISTAR E EDITAR 
-- USUÁRIOS DIRETAMENTE NA TABELA "auth.users" DO SUPABASE, SEM VAZAR CHAVES MESTRAS.
-- 
-- RODAR ISSO NO SQL EDITOR DO SUPABASE!
-- ====================================================================================

-- 1. Função para LISTAR todos os usuários (Apenas Administradores podem rodar)
CREATE OR REPLACE FUNCTION get_users_list()
RETURNS TABLE (
  id uuid,
  email varchar,
  raw_user_meta_data jsonb,
  created_at timestamptz
) 
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  -- Validação de Segurança: Se não for Administrador, aborta
  IF (coalesce((current_setting('request.jwt.claims', true)::jsonb)->'user_metadata'->>'role', '') != 'Administrador') THEN
    RAISE EXCEPTION 'Acesso negado: Perfil de Administrador exigido.';
  END IF;

  RETURN QUERY 
  SELECT 
    au.id, 
    au.email::varchar, 
    coalesce(au.raw_user_meta_data, '{}'::jsonb), 
    au.created_at
  FROM auth.users au
  ORDER BY au.created_at DESC;
END;
$$ LANGUAGE plpgsql;


-- 2. Função para ALTERAR O STATUS VIRTUAL ou ROLE de um usuário
CREATE OR REPLACE FUNCTION update_user_metadata(
  target_user_id uuid,
  new_role text DEFAULT NULL,
  is_active boolean DEFAULT NULL
)
RETURNS void
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  current_meta jsonb;
BEGIN
  -- Validação de Segurança
  IF (coalesce((current_setting('request.jwt.claims', true)::jsonb)->'user_metadata'->>'role', '') != 'Administrador') THEN
    RAISE EXCEPTION 'Acesso negado: Perfil de Administrador exigido.';
  END IF;

  -- Busca o metadata atual
  SELECT raw_user_meta_data INTO current_meta FROM auth.users WHERE auth.users.id = target_user_id;
  current_meta := coalesce(current_meta, '{}'::jsonb);

  -- Atualiza o cargo se passado
  IF new_role IS NOT NULL THEN
    current_meta := jsonb_set(current_meta, '{role}', to_jsonb(new_role));
  END IF;

  -- Atualiza o status ativo (Habilitar) se passado
  IF is_active IS NOT NULL THEN
    current_meta := jsonb_set(current_meta, '{is_active}', to_jsonb(is_active));
  END IF;

  -- Salva de volta
  UPDATE auth.users 
  SET raw_user_meta_data = current_meta 
  WHERE auth.users.id = target_user_id;

END;
$$ LANGUAGE plpgsql;


-- 3. Função para EXCLUIR VIRTUALMENTE ou COMPLETAMENTE UM USUARIO
CREATE OR REPLACE FUNCTION delete_user(target_user_id uuid)
RETURNS void
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  -- Validação de Segurança
  IF (coalesce((current_setting('request.jwt.claims', true)::jsonb)->'user_metadata'->>'role', '') != 'Administrador') THEN
    RAISE EXCEPTION 'Acesso negado: Perfil de Administrador exigido.';
  END IF;

  -- Deleta fisicamente o usuário do Auth do Supabase
  DELETE FROM auth.users WHERE id = target_user_id;
END;
$$ LANGUAGE plpgsql;


-- 4. Função para EDITAR PERFIL E EMAIL DO USUÁRIO
CREATE OR REPLACE FUNCTION update_user_details(
  target_user_id text,
  new_email text,
  new_name text,
  new_role text
)
RETURNS void
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  current_meta jsonb;
  target_uuid uuid;
BEGIN
  -- Cast seguro para UUID
  target_uuid := target_user_id::uuid;
  
  -- Validação de Segurança
  IF (coalesce((current_setting('request.jwt.claims', true)::jsonb)->'user_metadata'->>'role', '') != 'Administrador') THEN
    RAISE EXCEPTION 'Acesso negado: Perfil de Administrador exigido.';
  END IF;

  -- Busca o metadata atual
  SELECT raw_user_meta_data INTO current_meta FROM auth.users WHERE auth.users.id = target_uuid;
  current_meta := coalesce(current_meta, '{}'::jsonb);

  -- Modifica o JSON
  current_meta := jsonb_set(current_meta, '{name}', to_jsonb(new_name));
  current_meta := jsonb_set(current_meta, '{role}', to_jsonb(new_role));
  current_meta := jsonb_set(current_meta, '{avatarInitials}', to_jsonb(upper(substring(new_name from 1 for 1))));

  -- Atualiza na tabela Auth
  UPDATE auth.users 
  SET 
    email = new_email,
    raw_user_meta_data = current_meta 
  WHERE auth.users.id = target_uuid;

END;
$$ LANGUAGE plpgsql;

-- 5. Função Extra para Forçar a Atualização do Cache de Schema no PostgREST (Supabase)
NOTIFY pgrst, 'reload schema';
