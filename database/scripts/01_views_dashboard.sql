-- =====================================================================================
-- Script de Otimização Supabase: Views & RPCs
-- =====================================================================================

-- 1. View para listar unidades com contagens agregadas diretas do banco
-- Isso substitui a necessidade do front-end baixar todos os ramais e linhas
CREATE OR REPLACE VIEW unidades_com_contagens AS
SELECT 
  u.*,
  (SELECT count(*) FROM ramais r WHERE r.unidade_id = u.id AND r.status = 'Ativo') as ramais_ativos,
  (SELECT count(*) FROM linhas l WHERE l.unidade_id = u.id AND l.status = 'Ativa') as linhas_ativas
FROM unidades u;

-- Observação: Para que o PostgREST exponha a nova view, é necessário garantir acesso
GRANT SELECT ON unidades_com_contagens TO anon, authenticated;


-- 2. Função RPC para retornar as estatísticas compiladas do Dashboard de uma só vez
CREATE OR REPLACE FUNCTION get_dashboard_summary()
RETURNS json AS $$
DECLARE
  v_unidades_count INT;
  v_sip_ativos_count INT;
  v_pabx_ativos_count INT;
  v_linhas_count INT;
  v_ramais_por_mes JSON;
  v_ramais_por_regiao JSON;
BEGIN
  -- Contagens base
  SELECT count(*) INTO v_unidades_count FROM unidades;
  
  SELECT count(*) INTO v_sip_ativos_count FROM ramais 
  WHERE tipo = 'SIP' AND status = 'Ativo';
  
  SELECT count(*) INTO v_pabx_ativos_count FROM ramais 
  WHERE tipo != 'SIP' AND status = 'Ativo';
  
  SELECT count(*) INTO v_linhas_count FROM linhas;
  
  -- Ramais por mês (últimos 6 meses)
  SELECT json_agg(t) INTO v_ramais_por_mes FROM (
    SELECT to_char(created_at, 'YYYY-MM') as mes, count(*) as total
    FROM ramais
    WHERE created_at >= date_trunc('month', current_date - interval '5 months')
    GROUP BY 1
    ORDER BY 1
  ) t;
  
  -- Ramais por região
  SELECT json_agg(t) INTO v_ramais_por_regiao FROM (
    SELECT coalesce(u.cidade, 'Não informada') as cidade, count(r.id) as total
    FROM ramais r
    JOIN unidades u ON r.unidade_id = u.id
    GROUP BY u.cidade
    ORDER BY total DESC
    LIMIT 5
  ) t;
  
  -- Retorna JSON consolidado
  RETURN json_build_object(
    'unidades', v_unidades_count,
    'sipAtivos', v_sip_ativos_count,
    'pabxAtivos', v_pabx_ativos_count,
    'linhas', v_linhas_count,
    'ramaisPorMes', COALESCE(v_ramais_por_mes, '[]'::json),
    'ramaisPorRegiao', COALESCE(v_ramais_por_regiao, '[]'::json)
  );
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Permissões para a função acessar os dados
GRANT EXECUTE ON FUNCTION get_dashboard_summary() TO authenticated;
GRANT EXECUTE ON FUNCTION get_dashboard_summary() TO anon;
