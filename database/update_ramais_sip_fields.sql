-- =====================================================================
-- SCRIPT DE ATUALIZAÇÃO DE CAMPOS PARA RAMAIS SIP
-- Execute este script no SQL Editor do seu Supabase
-- =====================================================================

-- Adicionando colunas para Redirecionamento e Grupo de Captura
ALTER TABLE public.ramais
ADD COLUMN IF NOT EXISTS "redirecionamentoEnabled" BOOLEAN DEFAULT FALSE,
ADD COLUMN IF NOT EXISTS "salto1" TEXT,
ADD COLUMN IF NOT EXISTS "salto2" TEXT,
ADD COLUMN IF NOT EXISTS "salto3" TEXT,
ADD COLUMN IF NOT EXISTS "grupoCapturaEnabled" BOOLEAN DEFAULT FALSE,
ADD COLUMN IF NOT EXISTS "grupoCaptura" TEXT;

-- Opcional: Remover a coluna URA se você tiver certeza que nenhum ramal SIP a utiliza mais.
-- Como segurança, vamos apenas deixá-la lá, mas o frontend não a enviará mais.
