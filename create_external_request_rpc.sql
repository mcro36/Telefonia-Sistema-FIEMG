-- ====================================================================================
-- SCRIPT: CRIAR FUNÇÃO RPC PARA SOLICITAÇÃO EXTERNA DE SERVIÇOS
-- Esta função permite que visitantes não autenticados insiram um projeto
-- na tabela 'projetos' pulando o RLS.
-- ====================================================================================

-- 1. DROPAR VERSÕES ANTIGAS PARA EVITAR CACHE MISMATCH
DROP FUNCTION IF EXISTS submit_public_project_request(text, uuid, text, jsonb);

-- 2. CRIAR FUNÇÃO SEGURA
CREATE OR REPLACE FUNCTION submit_public_project_request(
  v_email text,
  v_unidade_id uuid,
  v_unidade_nome text,
  v_itens jsonb
)
RETURNS uuid
SECURITY DEFINER  -- <-- ISSO FAZ ELA RODAR COMO POSTGRES SUPERUSER IGNORANDO RLS
SET search_path = public
AS $$
DECLARE
  novo_projeto_id uuid;
  nome_projeto text;
BEGIN
  
  -- Monta um nome dinâmico para o projeto baseado na data e e-mail
  nome_projeto := 'Solicitação Externa - ' || split_part(v_email, '@', 1) || ' - ' || to_char(now(), 'DD/MM/YYYY');

  -- Insere na tabela projetos
  INSERT INTO public.projetos (
    nome,
    status,
    unidade_id,
    inicio,
    deadline,
    chamado,
    observacao,
    itens
  ) VALUES (
    nome_projeto,
    'Pendente', -- Status fixo para indicar que precisa de análise
    v_unidade_id,
    CURRENT_DATE,
    CURRENT_DATE + interval '7 days', -- Deadline padrão de envio (1 semana)
    '',
    'Solicitado externamente pelo e-mail: ' || v_email,
    v_itens
  )
  RETURNING id INTO novo_projeto_id;

  RETURN novo_projeto_id;
END;
$$ LANGUAGE plpgsql;

-- 3. NOTIFICAR O POSTGREST PARA ATUALIZAR O CACHE
NOTIFY pgrst, 'reload schema';
