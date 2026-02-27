-- =====================================================================
-- FIX: ADICIONAR COLUNA TECNOLOGIA NA TABELA RAMAIS
-- Garante que a tecnologia (Analógico/Digital) seja persistida no ramal
-- =====================================================================

-- 1. Adicionar coluna tipoRamal na tabela ramais
ALTER TABLE public.ramais 
ADD COLUMN IF NOT EXISTS "tipoRamal" TEXT;

-- 2. Sincronizar dados existentes (opcional, mas ajuda se houver registros)
-- UPDATE public.ramais r
-- SET "tipoRamal" = rec.tecnologia_padrao
-- FROM public.recursos_pabx rec
-- WHERE r."recursoPabxId" = rec.id;

NOTIFY pgrst, 'reload schema';
