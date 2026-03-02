-- ============================================================
-- Migração Resiliente: camelCase -> snake_case (TOTAL)
-- Este script verifica se a tabela/coluna existe antes de renomear.
-- ============================================================

DO $$ 
BEGIN
    -- 1. RENOMEAÇÃO DE TABELAS (projetoItens -> projeto_itens)
    IF EXISTS (SELECT 1 FROM information_schema.tables WHERE table_name = 'projetoItens' AND table_schema = 'public') THEN
        ALTER TABLE "projetoItens" RENAME TO projeto_itens;
    END IF;

    -- 2. TABELA: unidades
    IF EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'unidades' AND column_name = 'faixaRamais') THEN
        ALTER TABLE unidades RENAME COLUMN "faixaRamais" TO faixa_ramais;
    ELSIF EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'unidades' AND column_name = 'faixaramais') THEN
        ALTER TABLE unidades RENAME COLUMN faixaramais TO faixa_ramais;
    END IF;

    IF EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'unidades' AND column_name = 'unidadeIntegrada') THEN
        ALTER TABLE unidades RENAME COLUMN "unidadeIntegrada" TO unidade_integrada;
    ELSIF EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'unidades' AND column_name = 'unidadeintegrada') THEN
        ALTER TABLE unidades RENAME COLUMN unidadeintegrada TO unidade_integrada;
    END IF;

    IF EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'unidades' AND column_name = 'centroCusto') THEN
        ALTER TABLE unidades RENAME COLUMN "centroCusto" TO centro_custo;
    ELSIF EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'unidades' AND column_name = 'centrocusto') THEN
        ALTER TABLE unidades RENAME COLUMN centrocusto TO centro_custo;
    END IF;

    IF EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'unidades' AND column_name = 'unidadePaiId') THEN
        ALTER TABLE unidades RENAME COLUMN "unidadePaiId" TO unidade_pai_id;
    ELSIF EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'unidades' AND column_name = 'unidadepaiid') THEN
        ALTER TABLE unidades RENAME COLUMN unidadepaiid TO unidade_pai_id;
    END IF;

    -- 3. TABELA: ramais
    IF EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'ramais' AND column_name = 'unidadeId') THEN
        ALTER TABLE ramais RENAME COLUMN "unidadeId" TO unidade_id;
    ELSIF EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'ramais' AND column_name = 'unidadeid') THEN
        ALTER TABLE ramais RENAME COLUMN unidadeid TO unidade_id;
    END IF;

    IF EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'ramais' AND column_name = 'tipoRamal') THEN
        ALTER TABLE ramais RENAME COLUMN "tipoRamal" TO tipo_ramal;
    ELSIF EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'ramais' AND column_name = 'tiporamal') THEN
        ALTER TABLE ramais RENAME COLUMN tiporamal TO tipo_ramal;
    END IF;

    IF EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'ramais' AND column_name = 'recursoPabxId') THEN
        ALTER TABLE ramais RENAME COLUMN "recursoPabxId" TO recurso_pabx_id;
    ELSIF EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'ramais' AND column_name = 'recursopabxid') THEN
        ALTER TABLE ramais RENAME COLUMN recursopabxid TO recurso_pabx_id;
    END IF;

    IF EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'ramais' AND column_name = 'blocoVp') THEN
        ALTER TABLE ramais RENAME COLUMN "blocoVp" TO bloco_vp;
    ELSIF EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'ramais' AND column_name = 'blocovp') THEN
        ALTER TABLE ramais RENAME COLUMN blocovp TO bloco_vp;
    END IF;

    IF EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'ramais' AND column_name = 'parPorta') THEN
        ALTER TABLE ramais RENAME COLUMN "parPorta" TO par_porta;
    ELSIF EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'ramais' AND column_name = 'parporta') THEN
        ALTER TABLE ramais RENAME COLUMN parporta TO par_porta;
    END IF;

    -- 4. TABELA: linhas
    IF EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'linhas' AND column_name = 'unidadeId') THEN
        ALTER TABLE linhas RENAME COLUMN "unidadeId" TO unidade_id;
    ELSIF EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'linhas' AND column_name = 'unidadeid') THEN
        ALTER TABLE linhas RENAME COLUMN unidadeid TO unidade_id;
    END IF;

    -- 5. TABELA: uras
    IF EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'uras' AND column_name = 'unidadeId') THEN
        ALTER TABLE uras RENAME COLUMN "unidadeId" TO unidade_id;
    ELSIF EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'uras' AND column_name = 'unidadeid') THEN
        ALTER TABLE uras RENAME COLUMN unidadeid TO unidade_id;
    END IF;

    IF EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'uras' AND column_name = 'linhaId') THEN
        ALTER TABLE uras RENAME COLUMN "linhaId" TO linha_id;
    ELSIF EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'uras' AND column_name = 'linhaid') THEN
        ALTER TABLE uras RENAME COLUMN linhaid TO linha_id;
    END IF;

    -- 6. TABELA: projetos
    IF EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'projetos' AND column_name = 'unidadeId') THEN
        ALTER TABLE projetos RENAME COLUMN "unidadeId" TO unidade_id;
    ELSIF EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'projetos' AND column_name = 'unidadeid') THEN
        ALTER TABLE projetos RENAME COLUMN unidadeid TO unidade_id;
    END IF;

    IF EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'projetos' AND column_name = 'dataInicio') THEN
        ALTER TABLE projetos RENAME COLUMN "dataInicio" TO data_inicio;
    ELSIF EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'projetos' AND column_name = 'datainicio') THEN
        ALTER TABLE projetos RENAME COLUMN datainicio TO data_inicio;
    END IF;

    -- 7. TABELA: projeto_itens (já deve estar renomeada ou ser nova)
    -- As colunas podem estar em camelCase se a tabela foi renomeada recentemente
    DECLARE
        target_tbl text := 'projeto_itens';
    BEGIN
        IF EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = target_tbl AND column_name = 'projetoId') THEN
            ALTER TABLE projeto_itens RENAME COLUMN "projetoId" TO projeto_id;
        END IF;
        IF EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = target_tbl AND column_name = 'itemTipo') THEN
            ALTER TABLE projeto_itens RENAME COLUMN "itemTipo" TO item_tipo;
        END IF;
        IF EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = target_tbl AND column_name = 'itemId') THEN
            ALTER TABLE projeto_itens RENAME COLUMN "itemId" TO item_id;
        END IF;
        IF EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = target_tbl AND column_name = 'itemLabel') THEN
            ALTER TABLE projeto_itens RENAME COLUMN "itemLabel" TO item_label;
        END IF;
        IF EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = target_tbl AND column_name = 'statusItem') THEN
            ALTER TABLE projeto_itens RENAME COLUMN "statusItem" TO status_item;
        END IF;
    END;

    -- 8. COLUNA UNIVERSAL: createdAt -> created_at
    DECLARE
        t text;
    BEGIN
        FOR t IN SELECT table_name FROM information_schema.tables WHERE table_schema = 'public' LOOP
            IF EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = t AND column_name = 'createdAt') THEN
                EXECUTE format('ALTER TABLE %I RENAME COLUMN "createdAt" TO created_at', t);
            ELSIF EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = t AND column_name = 'createdat') THEN
                EXECUTE format('ALTER TABLE %I RENAME COLUMN createdat TO created_at', t);
            END IF;
        END LOOP;
    END;

END $$;
