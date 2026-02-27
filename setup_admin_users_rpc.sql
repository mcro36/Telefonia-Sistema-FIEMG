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
