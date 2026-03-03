-- ATUALIZAR PRIVILÉGIOS DE USUÁRIO PARA ADMINISTRADOR
-- Substitua 'SEU_EMAIL_AQUI' pelo e-mail com o qual você faz login no painel!

UPDATE auth.users 
SET raw_user_meta_data = 
    COALESCE(raw_user_meta_data, '{}'::jsonb) || '{"role": "Administrador"}'::jsonb
WHERE email = 'SEU_EMAIL_AQUI';

-- Após executar este script, o seu usuário já terá privilégios máximos.
-- NOTA: Você precisará deslogar e logar novamente no frontend (App React) 
-- para que o novo Token JWT recarregue com essa permissão ativada.
