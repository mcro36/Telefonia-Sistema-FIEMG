-- =====================================================================
-- SCRIPT DE PADRONIZAÇÃO DE COLUNAS (CamelCase)
-- Execute este script no SQL Editor do seu Supabase
-- =====================================================================

-- 1. Tabela UNIDADES
DO $$ 
BEGIN
    IF EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'unidades' AND column_name = 'unidade_pai_id') THEN
        ALTER TABLE public.unidades RENAME COLUMN unidade_pai_id TO "unidadePaiId";
    END IF;
    IF EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'unidades' AND column_name = 'created_at') THEN
        ALTER TABLE public.unidades RENAME COLUMN created_at TO "createdAt";
    END IF;
END $$;

-- 2. Tabela LINHAS
DO $$ 
BEGIN
    IF EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'linhas' AND column_name = 'unidadeid') THEN
        ALTER TABLE public.linhas RENAME COLUMN unidadeid TO "unidadeId";
    END IF;
    IF EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'linhas' AND column_name = 'unidade_id') THEN
        ALTER TABLE public.linhas RENAME COLUMN unidade_id TO "unidadeId";
    END IF;
    IF EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'linhas' AND column_name = 'created_at') THEN
        ALTER TABLE public.linhas RENAME COLUMN created_at TO "createdAt";
    END IF;
END $$;

-- 3. Tabela RAMAIS
DO $$ 
BEGIN
    IF EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'ramais' AND column_name = 'unidadeid') THEN
        ALTER TABLE public.ramais RENAME COLUMN unidadeid TO "unidadeId";
    END IF;
    IF EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'ramais' AND column_name = 'unidade_id') THEN
        ALTER TABLE public.ramais RENAME COLUMN unidade_id TO "unidadeId";
    END IF;
    IF EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'ramais' AND column_name = 'created_at') THEN
        ALTER TABLE public.ramais RENAME COLUMN created_at TO "createdAt";
    END IF;
END $$;

-- 4. Tabela URAS
DO $$ 
BEGIN
    IF EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'uras' AND column_name = 'unidade_id') THEN
        ALTER TABLE public.uras RENAME COLUMN unidade_id TO "unidadeId";
    END IF;
    IF EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'uras' AND column_name = 'linha_id') THEN
        ALTER TABLE public.uras RENAME COLUMN linha_id TO "linhaId";
    END IF;
    IF EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'uras' AND column_name = 'mensagem_principal') THEN
        ALTER TABLE public.uras RENAME COLUMN mensagem_principal TO "mensagemPrincipal";
    END IF;
    IF EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'uras' AND column_name = 'created_at') THEN
        ALTER TABLE public.uras RENAME COLUMN created_at TO "createdAt";
    END IF;
END $$;
