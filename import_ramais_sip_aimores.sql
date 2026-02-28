BEGIN;
DO $$ 
DECLARE
    v_unidade_id uuid;
    v_linha_id uuid;
    v_ura_id uuid;
BEGIN
    -- 1. Buscando a Unidade 'Sede Aimorés'
    SELECT id INTO v_unidade_id FROM public.unidades WHERE nome ILIKE '%Sede Aimorés%' LIMIT 1;
    IF v_unidade_id IS NULL THEN
        RAISE EXCEPTION 'Unidade Sede Aimorés não encontrada!';
    END IF;

    -- Garantindo Linha Principal (31) 3241-7173
    SELECT id INTO v_linha_id FROM public.linhas WHERE numero = '(31) 3241-7173' LIMIT 1;
    IF v_linha_id IS NULL THEN
        INSERT INTO public.linhas (numero, operadora, "unidadeId", status)
        VALUES ('(31) 3241-7173', 'Método', v_unidade_id, 'Ativa')
        RETURNING id INTO v_linha_id;
    END IF;

    -- Garantindo Linha Principal (31) 3280-6001
    SELECT id INTO v_linha_id FROM public.linhas WHERE numero = '(31) 3280-6001' LIMIT 1;
    IF v_linha_id IS NULL THEN
        INSERT INTO public.linhas (numero, operadora, "unidadeId", status)
        VALUES ('(31) 3280-6001', 'Método', v_unidade_id, 'Ativa')
        RETURNING id INTO v_linha_id;
    END IF;

    -- Garantindo Linha Principal (31) 3280-6002
    SELECT id INTO v_linha_id FROM public.linhas WHERE numero = '(31) 3280-6002' LIMIT 1;
    IF v_linha_id IS NULL THEN
        INSERT INTO public.linhas (numero, operadora, "unidadeId", status)
        VALUES ('(31) 3280-6002', 'Método', v_unidade_id, 'Ativa')
        RETURNING id INTO v_linha_id;
    END IF;

    -- Garantindo Linha Principal (31) 3280-6003
    SELECT id INTO v_linha_id FROM public.linhas WHERE numero = '(31) 3280-6003' LIMIT 1;
    IF v_linha_id IS NULL THEN
        INSERT INTO public.linhas (numero, operadora, "unidadeId", status)
        VALUES ('(31) 3280-6003', 'Método', v_unidade_id, 'Ativa')
        RETURNING id INTO v_linha_id;
    END IF;

    -- Garantindo Linha Principal (31) 3280-6004
    SELECT id INTO v_linha_id FROM public.linhas WHERE numero = '(31) 3280-6004' LIMIT 1;
    IF v_linha_id IS NULL THEN
        INSERT INTO public.linhas (numero, operadora, "unidadeId", status)
        VALUES ('(31) 3280-6004', 'Método', v_unidade_id, 'Ativa')
        RETURNING id INTO v_linha_id;
    END IF;

    -- Garantindo Linha Principal (31) 3241-7180
    SELECT id INTO v_linha_id FROM public.linhas WHERE numero = '(31) 3241-7180' LIMIT 1;
    IF v_linha_id IS NULL THEN
        INSERT INTO public.linhas (numero, operadora, "unidadeId", status)
        VALUES ('(31) 3241-7180', 'Método', v_unidade_id, 'Ativa')
        RETURNING id INTO v_linha_id;
    END IF;

    -- Garantindo Linha Principal (31) 3241-7183
    SELECT id INTO v_linha_id FROM public.linhas WHERE numero = '(31) 3241-7183' LIMIT 1;
    IF v_linha_id IS NULL THEN
        INSERT INTO public.linhas (numero, operadora, "unidadeId", status)
        VALUES ('(31) 3241-7183', 'Método', v_unidade_id, 'Ativa')
        RETURNING id INTO v_linha_id;
    END IF;

    -- Garantindo Linha Principal (31) 3280-6005
    SELECT id INTO v_linha_id FROM public.linhas WHERE numero = '(31) 3280-6005' LIMIT 1;
    IF v_linha_id IS NULL THEN
        INSERT INTO public.linhas (numero, operadora, "unidadeId", status)
        VALUES ('(31) 3280-6005', 'Método', v_unidade_id, 'Ativa')
        RETURNING id INTO v_linha_id;
    END IF;

    -- Garantindo Linha Principal (31) 3280-6006
    SELECT id INTO v_linha_id FROM public.linhas WHERE numero = '(31) 3280-6006' LIMIT 1;
    IF v_linha_id IS NULL THEN
        INSERT INTO public.linhas (numero, operadora, "unidadeId", status)
        VALUES ('(31) 3280-6006', 'Método', v_unidade_id, 'Ativa')
        RETURNING id INTO v_linha_id;
    END IF;

    -- Garantindo Linha Principal (31) 3280-6000
    SELECT id INTO v_linha_id FROM public.linhas WHERE numero = '(31) 3280-6000' LIMIT 1;
    IF v_linha_id IS NULL THEN
        INSERT INTO public.linhas (numero, operadora, "unidadeId", status)
        VALUES ('(31) 3280-6000', 'Método', v_unidade_id, 'Ativa')
        RETURNING id INTO v_linha_id;
    END IF;

    -- Garantindo Linha Principal (31) 3263-4753
    SELECT id INTO v_linha_id FROM public.linhas WHERE numero = '(31) 3263-4753' LIMIT 1;
    IF v_linha_id IS NULL THEN
        INSERT INTO public.linhas (numero, operadora, "unidadeId", status)
        VALUES ('(31) 3263-4753', 'Método', v_unidade_id, 'Ativa')
        RETURNING id INTO v_linha_id;
    END IF;

    -- Garantindo Linha Principal (31) 3241-7185
    SELECT id INTO v_linha_id FROM public.linhas WHERE numero = '(31) 3241-7185' LIMIT 1;
    IF v_linha_id IS NULL THEN
        INSERT INTO public.linhas (numero, operadora, "unidadeId", status)
        VALUES ('(31) 3241-7185', 'Método', v_unidade_id, 'Ativa')
        RETURNING id INTO v_linha_id;
    END IF;

    -- Garantindo Linha Principal (31) 3280-6007
    SELECT id INTO v_linha_id FROM public.linhas WHERE numero = '(31) 3280-6007' LIMIT 1;
    IF v_linha_id IS NULL THEN
        INSERT INTO public.linhas (numero, operadora, "unidadeId", status)
        VALUES ('(31) 3280-6007', 'Método', v_unidade_id, 'Ativa')
        RETURNING id INTO v_linha_id;
    END IF;

    -- Garantindo Linha Principal (31) 3280-6008
    SELECT id INTO v_linha_id FROM public.linhas WHERE numero = '(31) 3280-6008' LIMIT 1;
    IF v_linha_id IS NULL THEN
        INSERT INTO public.linhas (numero, operadora, "unidadeId", status)
        VALUES ('(31) 3280-6008', 'Método', v_unidade_id, 'Ativa')
        RETURNING id INTO v_linha_id;
    END IF;

    -- Inserindo URA Consolidade: URA_financeiro
    SELECT id INTO v_linha_id FROM public.linhas WHERE numero = '(31) 3241-7173' LIMIT 1;
    INSERT INTO public.uras (nome, "linhaId", "unidadeId", "mensagemPrincipal", opcoes, status)
    VALUES ('URA_financeiro', v_linha_id, v_unidade_id, 'Olá, você ligou no Suporte Administrativo Financeiro do Sistema FIEMG. Digite o ramal ou aguarde para ouvir as opções.', '[{"key":"1","label":"Para falar com o Suporte administrativo e financeiro. Digite 1","destination":"URA secundaria - Opção 1","type":"grp"},{"key":"2","label":"Para falar com o setor de Cobrança. Digite 2","destination":"GC-COBRANCA","type":"grp"},{"key":"3","label":"Para faturamento com recebíveis. Digite 3","destination":"GC-RECEBIVEIS","type":"grp"},{"key":"4","label":"Ou aguarde na linha para ser atentido.","destination":"GC-SUPORTE","type":"grp"}]'::jsonb, 'Ativa')
    RETURNING id INTO v_ura_id;

    -- Inserindo Ramal SIP: 1800 (COBRANCA)
    SELECT id INTO v_linha_id FROM public.linhas WHERE numero = '(31) 3241-7173' LIMIT 1;
    INSERT INTO public.ramais (
        numero, tipo, status, setor, "unidadeId", nome, ddr, 
        observacao, "redirecionamentoEnabled", salto1, salto2, salto3, 
        "grupoCapturaEnabled", "grupoCaptura", "microsipUser", "microsipPass"
    ) VALUES (
        '1800', 'SIP', 'Ativo', 'FINANCEIRO - COBRANCA', v_unidade_id, 'COBRANCA', v_linha_id, 
        'Carol', true, 'Recepção', '2001', '', 
        true, 'GC-COBRANCA', '3192411800', 'R3m@t0754'
    );

    -- Inserindo Ramal SIP: 1801 (COBRANCA)
    SELECT id INTO v_linha_id FROM public.linhas WHERE numero = '(31) 3241-7173' LIMIT 1;
    INSERT INTO public.ramais (
        numero, tipo, status, setor, "unidadeId", nome, ddr, 
        observacao, "redirecionamentoEnabled", salto1, salto2, salto3, 
        "grupoCapturaEnabled", "grupoCaptura", "microsipUser", "microsipPass"
    ) VALUES (
        '1801', 'SIP', 'Ativo', 'FINANCEIRO - COBRANCA', v_unidade_id, 'COBRANCA', v_linha_id, 
        'Thiago', true, 'Administrativo', '2000', '', 
        true, 'GC-COBRANCA', '3192411801', 'R3m@t0529'
    );

    -- Inserindo Ramal SIP: 1802 (COBRANCA)
    SELECT id INTO v_linha_id FROM public.linhas WHERE numero = '(31) 3241-7173' LIMIT 1;
    INSERT INTO public.ramais (
        numero, tipo, status, setor, "unidadeId", nome, ddr, 
        observacao, "redirecionamentoEnabled", salto1, salto2, salto3, 
        "grupoCapturaEnabled", "grupoCaptura", "microsipUser", "microsipPass"
    ) VALUES (
        '1802', 'SIP', 'Ativo', 'FINANCEIRO - COBRANCA', v_unidade_id, 'COBRANCA', v_linha_id, 
        'William', true, 'Esportes', '2001', '', 
        true, 'GC-COBRANCA', '3192411802', 'R3m@t0770'
    );

    -- Inserindo Ramal SIP: 1803 (COBRANCA)
    SELECT id INTO v_linha_id FROM public.linhas WHERE numero = '(31) 3241-7173' LIMIT 1;
    INSERT INTO public.ramais (
        numero, tipo, status, setor, "unidadeId", nome, ddr, 
        observacao, "redirecionamentoEnabled", salto1, salto2, salto3, 
        "grupoCapturaEnabled", "grupoCaptura", "microsipUser", "microsipPass"
    ) VALUES (
        '1803', 'SIP', 'Ativo', 'FINANCEIRO - COBRANCA', v_unidade_id, 'COBRANCA', v_linha_id, 
        'Thais - Ferias', false, '', '', '', 
        true, 'GC-COBRANCA', '3192411803', 'R3m@t0230'
    );

    -- Inserindo Ramal SIP: 1804 (COBRANCA)
    SELECT id INTO v_linha_id FROM public.linhas WHERE numero = '(31) 3241-7173' LIMIT 1;
    INSERT INTO public.ramais (
        numero, tipo, status, setor, "unidadeId", nome, ddr, 
        observacao, "redirecionamentoEnabled", salto1, salto2, salto3, 
        "grupoCapturaEnabled", "grupoCaptura", "microsipUser", "microsipPass"
    ) VALUES (
        '1804', 'SIP', 'Ativo', 'FINANCEIRO - COBRANCA', v_unidade_id, 'COBRANCA', v_linha_id, 
        'Vitoria', false, '', '', '', 
        true, 'GC-COBRANCA', '3192411804', 'R3m@t0414'
    );

    -- Inserindo Ramal SIP: 1805 (COBRANCA)
    SELECT id INTO v_linha_id FROM public.linhas WHERE numero = '(31) 3241-7173' LIMIT 1;
    INSERT INTO public.ramais (
        numero, tipo, status, setor, "unidadeId", nome, ddr, 
        observacao, "redirecionamentoEnabled", salto1, salto2, salto3, 
        "grupoCapturaEnabled", "grupoCaptura", "microsipUser", "microsipPass"
    ) VALUES (
        '1805', 'SIP', 'Ativo', 'FINANCEIRO - COBRANCA', v_unidade_id, 'COBRANCA', v_linha_id, 
        'Telma', false, '', '', '', 
        true, 'GC-COBRANCA', '3192411805', 'R3m@t0744'
    );

    -- Inserindo Ramal SIP: 1806 (COBRANCA)
    SELECT id INTO v_linha_id FROM public.linhas WHERE numero = '(31) 3241-7173' LIMIT 1;
    INSERT INTO public.ramais (
        numero, tipo, status, setor, "unidadeId", nome, ddr, 
        observacao, "redirecionamentoEnabled", salto1, salto2, salto3, 
        "grupoCapturaEnabled", "grupoCaptura", "microsipUser", "microsipPass"
    ) VALUES (
        '1806', 'SIP', 'Ativo', 'FINANCEIRO - COBRANCA', v_unidade_id, 'COBRANCA', v_linha_id, 
        'Jacqueline', false, '', '', '', 
        true, 'GC-COBRANCA', '3192411806', 'R3m@t0201'
    );

    -- Inserindo Ramal SIP: 1807 (COBRANCA)
    SELECT id INTO v_linha_id FROM public.linhas WHERE numero = '(31) 3241-7173' LIMIT 1;
    INSERT INTO public.ramais (
        numero, tipo, status, setor, "unidadeId", nome, ddr, 
        observacao, "redirecionamentoEnabled", salto1, salto2, salto3, 
        "grupoCapturaEnabled", "grupoCaptura", "microsipUser", "microsipPass"
    ) VALUES (
        '1807', 'SIP', 'Ativo', 'FINANCEIRO - COBRANCA', v_unidade_id, 'COBRANCA', v_linha_id, 
        'Claudiana', false, '', '', '', 
        true, 'GC-COBRANCA', '3192411807', 'R3m@t0173'
    );

    -- Inserindo Ramal SIP: 1808 (RECEBIVEIS)
    SELECT id INTO v_linha_id FROM public.linhas WHERE numero = '(31) 3241-7173' LIMIT 1;
    INSERT INTO public.ramais (
        numero, tipo, status, setor, "unidadeId", nome, ddr, 
        observacao, "redirecionamentoEnabled", salto1, salto2, salto3, 
        "grupoCapturaEnabled", "grupoCaptura", "microsipUser", "microsipPass"
    ) VALUES (
        '1808', 'SIP', 'Ativo', 'FINANCEIRO - RECEBIVEIS', v_unidade_id, 'RECEBIVEIS', v_linha_id, 
        'Sandra e Flavio', false, '', '', '', 
        true, 'GC-RECEBIVEIS', '3192411808', 'R3m@t0632'
    );

    -- Inserindo Ramal SIP: 1809 (RECEBIVEIS)
    SELECT id INTO v_linha_id FROM public.linhas WHERE numero = '(31) 3241-7173' LIMIT 1;
    INSERT INTO public.ramais (
        numero, tipo, status, setor, "unidadeId", nome, ddr, 
        observacao, "redirecionamentoEnabled", salto1, salto2, salto3, 
        "grupoCapturaEnabled", "grupoCaptura", "microsipUser", "microsipPass"
    ) VALUES (
        '1809', 'SIP', 'Ativo', 'FINANCEIRO - RECEBIVEIS', v_unidade_id, 'RECEBIVEIS', v_linha_id, 
        'Deise e Olga', false, '', '', '', 
        true, 'GC-RECEBIVEIS', '3192411809', 'R3m@t0261'
    );

    -- Inserindo Ramal SIP: 1810 (SUPORTE)
    SELECT id INTO v_linha_id FROM public.linhas WHERE numero = '(31) 3241-7173' LIMIT 1;
    INSERT INTO public.ramais (
        numero, tipo, status, setor, "unidadeId", nome, ddr, 
        observacao, "redirecionamentoEnabled", salto1, salto2, salto3, 
        "grupoCapturaEnabled", "grupoCaptura", "microsipUser", "microsipPass"
    ) VALUES (
        '1810', 'SIP', 'Ativo', 'FINANCEIRO - SUPORTE', v_unidade_id, 'SUPORTE', v_linha_id, 
        'Poliana', false, '', '', '', 
        true, 'GC-SUPORTE', '3192411810', 'R3m@t0292'
    );

    -- Inserindo Ramal SIP: 1811 (SUPORTE)
    SELECT id INTO v_linha_id FROM public.linhas WHERE numero = '(31) 3241-7173' LIMIT 1;
    INSERT INTO public.ramais (
        numero, tipo, status, setor, "unidadeId", nome, ddr, 
        observacao, "redirecionamentoEnabled", salto1, salto2, salto3, 
        "grupoCapturaEnabled", "grupoCaptura", "microsipUser", "microsipPass"
    ) VALUES (
        '1811', 'SIP', 'Ativo', 'FINANCEIRO - SUPORTE', v_unidade_id, 'SUPORTE', v_linha_id, 
        'Barbara', false, '', '', '', 
        true, 'GC-SUPORTE', '3192411811', 'R3m@t0341'
    );

    -- Inserindo Ramal SIP: 1812 (SUPORTE)
    SELECT id INTO v_linha_id FROM public.linhas WHERE numero = '(31) 3241-7173' LIMIT 1;
    INSERT INTO public.ramais (
        numero, tipo, status, setor, "unidadeId", nome, ddr, 
        observacao, "redirecionamentoEnabled", salto1, salto2, salto3, 
        "grupoCapturaEnabled", "grupoCaptura", "microsipUser", "microsipPass"
    ) VALUES (
        '1812', 'SIP', 'Ativo', 'FINANCEIRO - SUPORTE', v_unidade_id, 'SUPORTE', v_linha_id, 
        'Leonardo Clayton', false, '', '', '', 
        true, 'GC-SUPORTE', '3192411812', 'R3m@t0135'
    );

    -- Inserindo Ramal SIP: 1813 (SUPORTE)
    SELECT id INTO v_linha_id FROM public.linhas WHERE numero = '(31) 3241-7173' LIMIT 1;
    INSERT INTO public.ramais (
        numero, tipo, status, setor, "unidadeId", nome, ddr, 
        observacao, "redirecionamentoEnabled", salto1, salto2, salto3, 
        "grupoCapturaEnabled", "grupoCaptura", "microsipUser", "microsipPass"
    ) VALUES (
        '1813', 'SIP', 'Ativo', 'FINANCEIRO - SUPORTE', v_unidade_id, 'SUPORTE', v_linha_id, 
        'Leonardo Tomas', false, '', '', '', 
        true, 'GC-SUPORTE', '3192411813', 'R3m@t0872'
    );

    -- Inserindo Ramal SIP: 1814 (SUPORTE)
    SELECT id INTO v_linha_id FROM public.linhas WHERE numero = '(31) 3241-7173' LIMIT 1;
    INSERT INTO public.ramais (
        numero, tipo, status, setor, "unidadeId", nome, ddr, 
        observacao, "redirecionamentoEnabled", salto1, salto2, salto3, 
        "grupoCapturaEnabled", "grupoCaptura", "microsipUser", "microsipPass"
    ) VALUES (
        '1814', 'SIP', 'Ativo', 'FINANCEIRO - SUPORTE', v_unidade_id, 'SUPORTE', v_linha_id, 
        'Patricia', false, '', '', '', 
        true, 'GC-SUPORTE', '3192411814', 'R3m@t0171'
    );

    -- Inserindo Ramal SIP: 1815 (TESOURARIA)
    SELECT id INTO v_linha_id FROM public.linhas WHERE numero = '(31) 3241-7173' LIMIT 1;
    INSERT INTO public.ramais (
        numero, tipo, status, setor, "unidadeId", nome, ddr, 
        observacao, "redirecionamentoEnabled", salto1, salto2, salto3, 
        "grupoCapturaEnabled", "grupoCaptura", "microsipUser", "microsipPass"
    ) VALUES (
        '1815', 'SIP', 'Ativo', 'FINANCEIRO - TESOURARIA', v_unidade_id, 'TESOURARIA', v_linha_id, 
        'Thais', false, '', '', '', 
        true, 'GC-TESOURARIA', '3192411815', 'R3m@t0935'
    );

    -- Inserindo Ramal SIP: 1816 (TESOURARIA)
    SELECT id INTO v_linha_id FROM public.linhas WHERE numero = '(31) 3241-7173' LIMIT 1;
    INSERT INTO public.ramais (
        numero, tipo, status, setor, "unidadeId", nome, ddr, 
        observacao, "redirecionamentoEnabled", salto1, salto2, salto3, 
        "grupoCapturaEnabled", "grupoCaptura", "microsipUser", "microsipPass"
    ) VALUES (
        '1816', 'SIP', 'Ativo', 'FINANCEIRO - TESOURARIA', v_unidade_id, 'TESOURARIA', v_linha_id, 
        'Geisa', false, '', '', '', 
        true, 'GC-TESOURARIA', '3192411816', 'R3m@t0801'
    );

    -- Inserindo Ramal SIP: 1817 (TESOURARIA)
    SELECT id INTO v_linha_id FROM public.linhas WHERE numero = '(31) 3241-7173' LIMIT 1;
    INSERT INTO public.ramais (
        numero, tipo, status, setor, "unidadeId", nome, ddr, 
        observacao, "redirecionamentoEnabled", salto1, salto2, salto3, 
        "grupoCapturaEnabled", "grupoCaptura", "microsipUser", "microsipPass"
    ) VALUES (
        '1817', 'SIP', 'Ativo', 'FINANCEIRO - TESOURARIA', v_unidade_id, 'TESOURARIA', v_linha_id, 
        'Jonatha', false, '', '', '', 
        true, 'GC-TESOURARIA', '3192411817', 'R3m@t0798'
    );

    -- Inserindo Ramal SIP: 1818 (TESOURARIA)
    SELECT id INTO v_linha_id FROM public.linhas WHERE numero = '(31) 3241-7173' LIMIT 1;
    INSERT INTO public.ramais (
        numero, tipo, status, setor, "unidadeId", nome, ddr, 
        observacao, "redirecionamentoEnabled", salto1, salto2, salto3, 
        "grupoCapturaEnabled", "grupoCaptura", "microsipUser", "microsipPass"
    ) VALUES (
        '1818', 'SIP', 'Ativo', 'FINANCEIRO - TESOURARIA', v_unidade_id, 'TESOURARIA', v_linha_id, 
        'hugo', false, '', '', '', 
        true, 'GC-TESOURARIA', '3192411818', 'R3m@t0207'
    );

    -- Inserindo Ramal SIP: 1819 (PRESTACAO DE CONTAS)
    SELECT id INTO v_linha_id FROM public.linhas WHERE numero = '(31) 3280-6001' LIMIT 1;
    INSERT INTO public.ramais (
        numero, tipo, status, setor, "unidadeId", nome, ddr, 
        observacao, "redirecionamentoEnabled", salto1, salto2, salto3, 
        "grupoCapturaEnabled", "grupoCaptura", "microsipUser", "microsipPass"
    ) VALUES (
        '1819', 'SIP', 'Ativo', 'FINANCEIRO - PRESTACAO DE CONTAS', v_unidade_id, 'PRESTACAO DE CONTAS', v_linha_id, 
        'Vanessa', false, '', '', '', 
        true, 'GC-PRESTACAO DE CONTAS', '3192411819', 'R3m@t0691'
    );

    -- Inserindo Ramal SIP: 1820 (PRESTACAO DE CONTAS)
    SELECT id INTO v_linha_id FROM public.linhas WHERE numero = '(31) 3280-6001' LIMIT 1;
    INSERT INTO public.ramais (
        numero, tipo, status, setor, "unidadeId", nome, ddr, 
        observacao, "redirecionamentoEnabled", salto1, salto2, salto3, 
        "grupoCapturaEnabled", "grupoCaptura", "microsipUser", "microsipPass"
    ) VALUES (
        '1820', 'SIP', 'Ativo', 'FINANCEIRO - PRESTACAO DE CONTAS', v_unidade_id, 'PRESTACAO DE CONTAS', v_linha_id, 
        'Cintia', false, '', '', '', 
        true, 'GC-PRESTACAO DE CONTAS', '3192411820', 'R3m@t0289'
    );

    -- Inserindo Ramal SIP: 1821 (PRESTACAO DE CONTAS)
    SELECT id INTO v_linha_id FROM public.linhas WHERE numero = '(31) 3280-6002' LIMIT 1;
    INSERT INTO public.ramais (
        numero, tipo, status, setor, "unidadeId", nome, ddr, 
        observacao, "redirecionamentoEnabled", salto1, salto2, salto3, 
        "grupoCapturaEnabled", "grupoCaptura", "microsipUser", "microsipPass"
    ) VALUES (
        '1821', 'SIP', 'Ativo', 'FINANCEIRO - PRESTACAO DE CONTAS', v_unidade_id, 'PRESTACAO DE CONTAS', v_linha_id, 
        'Marcos', false, '', '', '', 
        true, 'GC-PRESTACAO DE CONTAS', '3192411821', 'R3m@t0911'
    );

    -- Inserindo Ramal SIP: 1822 (PRESTACAO DE CONTAS)
    SELECT id INTO v_linha_id FROM public.linhas WHERE numero = '(31) 3280-6002' LIMIT 1;
    INSERT INTO public.ramais (
        numero, tipo, status, setor, "unidadeId", nome, ddr, 
        observacao, "redirecionamentoEnabled", salto1, salto2, salto3, 
        "grupoCapturaEnabled", "grupoCaptura", "microsipUser", "microsipPass"
    ) VALUES (
        '1822', 'SIP', 'Ativo', 'FINANCEIRO - PRESTACAO DE CONTAS', v_unidade_id, 'PRESTACAO DE CONTAS', v_linha_id, 
        'Leticia', false, '', '', '', 
        true, 'GC-PRESTACAO DE CONTAS', '3192411822', 'R3m@t0608'
    );

    -- Inserindo Ramal SIP: 1823 (PRESTACAO DE CONTAS)
    SELECT id INTO v_linha_id FROM public.linhas WHERE numero = '(31) 3280-6003' LIMIT 1;
    INSERT INTO public.ramais (
        numero, tipo, status, setor, "unidadeId", nome, ddr, 
        observacao, "redirecionamentoEnabled", salto1, salto2, salto3, 
        "grupoCapturaEnabled", "grupoCaptura", "microsipUser", "microsipPass"
    ) VALUES (
        '1823', 'SIP', 'Ativo', 'FINANCEIRO - PRESTACAO DE CONTAS', v_unidade_id, 'PRESTACAO DE CONTAS', v_linha_id, 
        'Ayrane', false, '', '', '', 
        true, 'GC-PRESTACAO DE CONTAS', '3192411823', 'R3m@t0696'
    );

    -- Inserindo Ramal SIP: 1824 (PRESTACAO DE CONTAS)
    SELECT id INTO v_linha_id FROM public.linhas WHERE numero = '(31) 3280-6003' LIMIT 1;
    INSERT INTO public.ramais (
        numero, tipo, status, setor, "unidadeId", nome, ddr, 
        observacao, "redirecionamentoEnabled", salto1, salto2, salto3, 
        "grupoCapturaEnabled", "grupoCaptura", "microsipUser", "microsipPass"
    ) VALUES (
        '1824', 'SIP', 'Ativo', 'FINANCEIRO - PRESTACAO DE CONTAS', v_unidade_id, 'PRESTACAO DE CONTAS', v_linha_id, 
        'Mackissuel', false, '', '', '', 
        true, 'GC-PRESTACAO DE CONTAS', '3192411824', 'R3m@t0154'
    );

    -- Inserindo Ramal SIP: 1825 (PRESTACAO DE CONTAS)
    SELECT id INTO v_linha_id FROM public.linhas WHERE numero = '(31) 3280-6004' LIMIT 1;
    INSERT INTO public.ramais (
        numero, tipo, status, setor, "unidadeId", nome, ddr, 
        observacao, "redirecionamentoEnabled", salto1, salto2, salto3, 
        "grupoCapturaEnabled", "grupoCaptura", "microsipUser", "microsipPass"
    ) VALUES (
        '1825', 'SIP', 'Ativo', 'FINANCEIRO - PRESTACAO DE CONTAS', v_unidade_id, 'PRESTACAO DE CONTAS', v_linha_id, 
        'Ronaldo - ferias', false, '', '', '', 
        true, 'GC-PRESTACAO DE CONTAS', '3192411825', 'R3m@t0645'
    );

    -- Inserindo Ramal SIP: 1826 (PRESTACAO DE CONTAS)
    SELECT id INTO v_linha_id FROM public.linhas WHERE numero = '(31) 3280-6004' LIMIT 1;
    INSERT INTO public.ramais (
        numero, tipo, status, setor, "unidadeId", nome, ddr, 
        observacao, "redirecionamentoEnabled", salto1, salto2, salto3, 
        "grupoCapturaEnabled", "grupoCaptura", "microsipUser", "microsipPass"
    ) VALUES (
        '1826', 'SIP', 'Ativo', 'FINANCEIRO - PRESTACAO DE CONTAS', v_unidade_id, 'PRESTACAO DE CONTAS', v_linha_id, 
        'fRANCIELLE', false, '', '', '', 
        true, 'GC-PRESTACAO DE CONTAS', '3192411826', 'R3m@t0763'
    );

    -- Inserindo Ramal SIP: 1827 (ARRECADACAO)
    SELECT id INTO v_linha_id FROM public.linhas WHERE numero = '(31) 3241-7180' LIMIT 1;
    INSERT INTO public.ramais (
        numero, tipo, status, setor, "unidadeId", nome, ddr, 
        observacao, "redirecionamentoEnabled", salto1, salto2, salto3, 
        "grupoCapturaEnabled", "grupoCaptura", "microsipUser", "microsipPass"
    ) VALUES (
        '1827', 'SIP', 'Ativo', 'FINANCEIRO - ARRECADACAO', v_unidade_id, 'ARRECADACAO', v_linha_id, 
        '', false, '', '', '', 
        false, '', '3192411827', 'R3m@t0651'
    );

    -- Inserindo Ramal SIP: 1828 (ARRECADACAO)
    SELECT id INTO v_linha_id FROM public.linhas WHERE numero = '(31) 3241-7183' LIMIT 1;
    INSERT INTO public.ramais (
        numero, tipo, status, setor, "unidadeId", nome, ddr, 
        observacao, "redirecionamentoEnabled", salto1, salto2, salto3, 
        "grupoCapturaEnabled", "grupoCaptura", "microsipUser", "microsipPass"
    ) VALUES (
        '1828', 'SIP', 'Ativo', 'FINANCEIRO - ARRECADACAO', v_unidade_id, 'ARRECADACAO', v_linha_id, 
        '', false, '', '', '', 
        false, '', '3192411828', 'R3m@t0619'
    );

    -- Inserindo Ramal SIP: 1829 (FATURAMENTO)
    SELECT id INTO v_linha_id FROM public.linhas WHERE numero = '(31) 3280-6005' LIMIT 1;
    INSERT INTO public.ramais (
        numero, tipo, status, setor, "unidadeId", nome, ddr, 
        observacao, "redirecionamentoEnabled", salto1, salto2, salto3, 
        "grupoCapturaEnabled", "grupoCaptura", "microsipUser", "microsipPass"
    ) VALUES (
        '1829', 'SIP', 'Ativo', 'FINANCEIRO - FATURAMENTO', v_unidade_id, 'FATURAMENTO', v_linha_id, 
        '', false, '', '', '', 
        false, '', '3192411829', 'R3m@t0740'
    );

    -- Inserindo Ramal SIP: 1830 (FATURAMENTO)
    SELECT id INTO v_linha_id FROM public.linhas WHERE numero = '(31) 3280-6005' LIMIT 1;
    INSERT INTO public.ramais (
        numero, tipo, status, setor, "unidadeId", nome, ddr, 
        observacao, "redirecionamentoEnabled", salto1, salto2, salto3, 
        "grupoCapturaEnabled", "grupoCaptura", "microsipUser", "microsipPass"
    ) VALUES (
        '1830', 'SIP', 'Ativo', 'FINANCEIRO - FATURAMENTO', v_unidade_id, 'FATURAMENTO', v_linha_id, 
        '', false, '', '', '', 
        false, '', '3192411830', 'R3m@t0898'
    );

    -- Inserindo Ramal SIP: 1831 (SUPRIMENTOS)
    SELECT id INTO v_linha_id FROM public.linhas WHERE numero = '(31) 3280-6006' LIMIT 1;
    INSERT INTO public.ramais (
        numero, tipo, status, setor, "unidadeId", nome, ddr, 
        observacao, "redirecionamentoEnabled", salto1, salto2, salto3, 
        "grupoCapturaEnabled", "grupoCaptura", "microsipUser", "microsipPass"
    ) VALUES (
        '1831', 'SIP', 'Ativo', 'SUPRIMENTOS', v_unidade_id, 'SUPRIMENTOS', v_linha_id, 
        'Heloisa e Mara', false, '', '', '', 
        false, '', '3192411831', 'R3m@t0573'
    );

    -- Inserindo Ramal SIP: 1832 (SUPRIMENTOS)
    SELECT id INTO v_linha_id FROM public.linhas WHERE numero = '(31) 3280-6006' LIMIT 1;
    INSERT INTO public.ramais (
        numero, tipo, status, setor, "unidadeId", nome, ddr, 
        observacao, "redirecionamentoEnabled", salto1, salto2, salto3, 
        "grupoCapturaEnabled", "grupoCaptura", "microsipUser", "microsipPass"
    ) VALUES (
        '1832', 'SIP', 'Ativo', 'SUPRIMENTOS', v_unidade_id, 'SUPRIMENTOS', v_linha_id, 
        'Andreá e Danielle', false, '', '', '', 
        false, '', '3192411832', 'R3m@t0715'
    );

    -- Inserindo Ramal SIP: 1833 (SUPRIMENTOS)
    SELECT id INTO v_linha_id FROM public.linhas WHERE numero = '(31) 3280-6006' LIMIT 1;
    INSERT INTO public.ramais (
        numero, tipo, status, setor, "unidadeId", nome, ddr, 
        observacao, "redirecionamentoEnabled", salto1, salto2, salto3, 
        "grupoCapturaEnabled", "grupoCaptura", "microsipUser", "microsipPass"
    ) VALUES (
        '1833', 'SIP', 'Ativo', 'SUPRIMENTOS', v_unidade_id, 'SUPRIMENTOS', v_linha_id, 
        'Bruno e  Ana Cristina A', false, '', '', '', 
        false, '', '3192411833', 'R3m@t0533'
    );

    -- Inserindo Ramal SIP: 1834 (SUPRIMENTOS)
    SELECT id INTO v_linha_id FROM public.linhas WHERE numero = '(31) 3280-6006' LIMIT 1;
    INSERT INTO public.ramais (
        numero, tipo, status, setor, "unidadeId", nome, ddr, 
        observacao, "redirecionamentoEnabled", salto1, salto2, salto3, 
        "grupoCapturaEnabled", "grupoCaptura", "microsipUser", "microsipPass"
    ) VALUES (
        '1834', 'SIP', 'Ativo', 'SUPRIMENTOS', v_unidade_id, 'SUPRIMENTOS', v_linha_id, 
        'Ademir e Ilídio', false, '', '', '', 
        false, '', '3192411834', 'R3m@t0391'
    );

    -- Inserindo Ramal SIP: 1835 (SUPRIMENTOS)
    SELECT id INTO v_linha_id FROM public.linhas WHERE numero = '(31) 3280-6006' LIMIT 1;
    INSERT INTO public.ramais (
        numero, tipo, status, setor, "unidadeId", nome, ddr, 
        observacao, "redirecionamentoEnabled", salto1, salto2, salto3, 
        "grupoCapturaEnabled", "grupoCaptura", "microsipUser", "microsipPass"
    ) VALUES (
        '1835', 'SIP', 'Ativo', 'SUPRIMENTOS', v_unidade_id, 'SUPRIMENTOS', v_linha_id, 
        'Renata e Izabela Gonçalves A', false, '', '', '', 
        false, '', '3192411835', 'R3m@t0127'
    );

    -- Inserindo Ramal SIP: 1836 (SUPRIMENTOS)
    SELECT id INTO v_linha_id FROM public.linhas WHERE numero = '(31) 3280-6006' LIMIT 1;
    INSERT INTO public.ramais (
        numero, tipo, status, setor, "unidadeId", nome, ddr, 
        observacao, "redirecionamentoEnabled", salto1, salto2, salto3, 
        "grupoCapturaEnabled", "grupoCaptura", "microsipUser", "microsipPass"
    ) VALUES (
        '1836', 'SIP', 'Ativo', 'SUPRIMENTOS', v_unidade_id, 'SUPRIMENTOS', v_linha_id, 
        'Priscilla e Marilene A', false, '', '', '', 
        false, '', '3192411836', 'R3m@t0979'
    );

    -- Inserindo Ramal SIP: 1837 (SUPRIMENTOS)
    SELECT id INTO v_linha_id FROM public.linhas WHERE numero = '(31) 3280-6006' LIMIT 1;
    INSERT INTO public.ramais (
        numero, tipo, status, setor, "unidadeId", nome, ddr, 
        observacao, "redirecionamentoEnabled", salto1, salto2, salto3, 
        "grupoCapturaEnabled", "grupoCaptura", "microsipUser", "microsipPass"
    ) VALUES (
        '1837', 'SIP', 'Ativo', 'SUPRIMENTOS', v_unidade_id, 'SUPRIMENTOS', v_linha_id, 
        'Liliane e Isabella Sales A', false, '', '', '', 
        false, '', '3192411837', 'R3m@t0206'
    );

    -- Inserindo Ramal SIP: 1838 (SUPRIMENTOS)
    SELECT id INTO v_linha_id FROM public.linhas WHERE numero = '(31) 3280-6006' LIMIT 1;
    INSERT INTO public.ramais (
        numero, tipo, status, setor, "unidadeId", nome, ddr, 
        observacao, "redirecionamentoEnabled", salto1, salto2, salto3, 
        "grupoCapturaEnabled", "grupoCaptura", "microsipUser", "microsipPass"
    ) VALUES (
        '1838', 'SIP', 'Ativo', 'SUPRIMENTOS', v_unidade_id, 'SUPRIMENTOS', v_linha_id, 
        'Renato e Regina Kelly', false, '', '', '', 
        false, '', '3192411838', 'R3m@t0510'
    );

    -- Inserindo Ramal SIP: 1839 (SUPRIMENTOS)
    SELECT id INTO v_linha_id FROM public.linhas WHERE numero = '(31) 3280-6006' LIMIT 1;
    INSERT INTO public.ramais (
        numero, tipo, status, setor, "unidadeId", nome, ddr, 
        observacao, "redirecionamentoEnabled", salto1, salto2, salto3, 
        "grupoCapturaEnabled", "grupoCaptura", "microsipUser", "microsipPass"
    ) VALUES (
        '1839', 'SIP', 'Ativo', 'SUPRIMENTOS', v_unidade_id, 'SUPRIMENTOS', v_linha_id, 
        'Alexandre e Isabela Lamarca', false, '', '', '', 
        false, '', '3192411839', 'R3m@t0583'
    );

    -- Inserindo Ramal SIP: 1840 (SUPRIMENTOS)
    SELECT id INTO v_linha_id FROM public.linhas WHERE numero = '(31) 3280-6006' LIMIT 1;
    INSERT INTO public.ramais (
        numero, tipo, status, setor, "unidadeId", nome, ddr, 
        observacao, "redirecionamentoEnabled", salto1, salto2, salto3, 
        "grupoCapturaEnabled", "grupoCaptura", "microsipUser", "microsipPass"
    ) VALUES (
        '1840', 'SIP', 'Ativo', 'SUPRIMENTOS', v_unidade_id, 'SUPRIMENTOS', v_linha_id, 
        'Ana Paula e Débora A', false, '', '', '', 
        false, '', '3192411840', 'R3m@t0635'
    );

    -- Inserindo Ramal SIP: 1841 (SUPRIMENTOS)
    SELECT id INTO v_linha_id FROM public.linhas WHERE numero = '(31) 3280-6006' LIMIT 1;
    INSERT INTO public.ramais (
        numero, tipo, status, setor, "unidadeId", nome, ddr, 
        observacao, "redirecionamentoEnabled", salto1, salto2, salto3, 
        "grupoCapturaEnabled", "grupoCaptura", "microsipUser", "microsipPass"
    ) VALUES (
        '1841', 'SIP', 'Ativo', 'SUPRIMENTOS', v_unidade_id, 'SUPRIMENTOS', v_linha_id, 
        'Thatiane e Lindsleine', false, '', '', '', 
        false, '', '3192411841', 'R3m@t0702'
    );

    -- Inserindo Ramal SIP: 1842 (SUPRIMENTOS)
    SELECT id INTO v_linha_id FROM public.linhas WHERE numero = '(31) 3280-6006' LIMIT 1;
    INSERT INTO public.ramais (
        numero, tipo, status, setor, "unidadeId", nome, ddr, 
        observacao, "redirecionamentoEnabled", salto1, salto2, salto3, 
        "grupoCapturaEnabled", "grupoCaptura", "microsipUser", "microsipPass"
    ) VALUES (
        '1842', 'SIP', 'Ativo', 'SUPRIMENTOS', v_unidade_id, 'SUPRIMENTOS', v_linha_id, 
        'Anderson e Vinicius', false, '', '', '', 
        false, '', '3192411842', 'R3m@t0771'
    );

    -- Inserindo Ramal SIP: 1843 (SUPRIMENTOS)
    SELECT id INTO v_linha_id FROM public.linhas WHERE numero = '(31) 3280-6006' LIMIT 1;
    INSERT INTO public.ramais (
        numero, tipo, status, setor, "unidadeId", nome, ddr, 
        observacao, "redirecionamentoEnabled", salto1, salto2, salto3, 
        "grupoCapturaEnabled", "grupoCaptura", "microsipUser", "microsipPass"
    ) VALUES (
        '1843', 'SIP', 'Ativo', 'SUPRIMENTOS', v_unidade_id, 'SUPRIMENTOS', v_linha_id, 
        'Matheus Cobra', false, '', '', '', 
        false, '', '3192411843', 'R3m@t0830'
    );

    -- Inserindo Ramal SIP: 1844 (SUPRIMENTOS)
    SELECT id INTO v_linha_id FROM public.linhas WHERE numero = '(31) 3280-6006' LIMIT 1;
    INSERT INTO public.ramais (
        numero, tipo, status, setor, "unidadeId", nome, ddr, 
        observacao, "redirecionamentoEnabled", salto1, salto2, salto3, 
        "grupoCapturaEnabled", "grupoCaptura", "microsipUser", "microsipPass"
    ) VALUES (
        '1844', 'SIP', 'Ativo', 'SUPRIMENTOS', v_unidade_id, 'SUPRIMENTOS', v_linha_id, 
        'Ana Paula, Jaqueline e Daniela Rodrigues', false, '', '', '', 
        false, '', '3192411844', 'R3m@t0668'
    );

    -- Inserindo Ramal SIP: 1845 (SUPRIMENTOS)
    SELECT id INTO v_linha_id FROM public.linhas WHERE numero = '(31) 3280-6006' LIMIT 1;
    INSERT INTO public.ramais (
        numero, tipo, status, setor, "unidadeId", nome, ddr, 
        observacao, "redirecionamentoEnabled", salto1, salto2, salto3, 
        "grupoCapturaEnabled", "grupoCaptura", "microsipUser", "microsipPass"
    ) VALUES (
        '1845', 'SIP', 'Ativo', 'SUPRIMENTOS', v_unidade_id, 'SUPRIMENTOS', v_linha_id, 
        'Maria Luiza, Patricia e Lilian', false, '', '', '', 
        false, '', '3192411845', 'R3m@t0609'
    );

    -- Inserindo Ramal SIP: 1846 (SUPRIMENTOS)
    SELECT id INTO v_linha_id FROM public.linhas WHERE numero = '(31) 3280-6006' LIMIT 1;
    INSERT INTO public.ramais (
        numero, tipo, status, setor, "unidadeId", nome, ddr, 
        observacao, "redirecionamentoEnabled", salto1, salto2, salto3, 
        "grupoCapturaEnabled", "grupoCaptura", "microsipUser", "microsipPass"
    ) VALUES (
        '1846', 'SIP', 'Ativo', 'SUPRIMENTOS', v_unidade_id, 'SUPRIMENTOS', v_linha_id, 
        'Jennifer, Jéssica', false, '', '', '', 
        false, '', '3192411846', 'R3m@t0155'
    );

    -- Inserindo Ramal SIP: 1847 (SUPRIMENTOS)
    SELECT id INTO v_linha_id FROM public.linhas WHERE numero = '(31) 3280-6006' LIMIT 1;
    INSERT INTO public.ramais (
        numero, tipo, status, setor, "unidadeId", nome, ddr, 
        observacao, "redirecionamentoEnabled", salto1, salto2, salto3, 
        "grupoCapturaEnabled", "grupoCaptura", "microsipUser", "microsipPass"
    ) VALUES (
        '1847', 'SIP', 'Ativo', 'SUPRIMENTOS', v_unidade_id, 'SUPRIMENTOS', v_linha_id, 
        'Lucas, Yuri e Daniel', false, '', '', '', 
        false, '', '3192411847', 'R3m@t0670'
    );

    -- Inserindo Ramal SIP: 1848 (SUPRIMENTOS)
    SELECT id INTO v_linha_id FROM public.linhas WHERE numero = '(31) 3280-6006' LIMIT 1;
    INSERT INTO public.ramais (
        numero, tipo, status, setor, "unidadeId", nome, ddr, 
        observacao, "redirecionamentoEnabled", salto1, salto2, salto3, 
        "grupoCapturaEnabled", "grupoCaptura", "microsipUser", "microsipPass"
    ) VALUES (
        '1848', 'SIP', 'Ativo', 'SUPRIMENTOS', v_unidade_id, 'SUPRIMENTOS', v_linha_id, 
        'André Alves da Creuz', false, '', '', '', 
        false, '', '3192411848', 'R3m@t0466'
    );

    -- Inserindo Ramal SIP: 1849 (SUPRIMENTOS)
    SELECT id INTO v_linha_id FROM public.linhas WHERE numero = '(31) 3280-6006' LIMIT 1;
    INSERT INTO public.ramais (
        numero, tipo, status, setor, "unidadeId", nome, ddr, 
        observacao, "redirecionamentoEnabled", salto1, salto2, salto3, 
        "grupoCapturaEnabled", "grupoCaptura", "microsipUser", "microsipPass"
    ) VALUES (
        '1849', 'SIP', 'Ativo', 'SUPRIMENTOS', v_unidade_id, 'SUPRIMENTOS', v_linha_id, 
        'Gestão de Fornecedores (a definir as pessoas)', false, '', '', '', 
        false, '', '3192411849', 'R3m@t0490'
    );

    -- Inserindo Ramal SIP: 1850 (SUPRIMENTOS)
    SELECT id INTO v_linha_id FROM public.linhas WHERE numero = '(31) 3280-6006' LIMIT 1;
    INSERT INTO public.ramais (
        numero, tipo, status, setor, "unidadeId", nome, ddr, 
        observacao, "redirecionamentoEnabled", salto1, salto2, salto3, 
        "grupoCapturaEnabled", "grupoCaptura", "microsipUser", "microsipPass"
    ) VALUES (
        '1850', 'SIP', 'Ativo', 'SUPRIMENTOS', v_unidade_id, 'SUPRIMENTOS', v_linha_id, 
        'Gestão de Fornecedores (a definir as pessoas)', false, '', '', '', 
        false, '', '3192411850', 'R3m@t0443'
    );

    -- Inserindo Ramal SIP: 1851 (GESTAO DE CONTRATOS)
    SELECT id INTO v_linha_id FROM public.linhas WHERE numero = '(31) 3280-6006' LIMIT 1;
    INSERT INTO public.ramais (
        numero, tipo, status, setor, "unidadeId", nome, ddr, 
        observacao, "redirecionamentoEnabled", salto1, salto2, salto3, 
        "grupoCapturaEnabled", "grupoCaptura", "microsipUser", "microsipPass"
    ) VALUES (
        '1851', 'SIP', 'Ativo', 'GESTAO DE CONTRATOS', v_unidade_id, 'GESTAO DE CONTRATOS', v_linha_id, 
        '', false, '', '', '', 
        false, '', '3192411851', 'R3m@t0532'
    );

    -- Inserindo Ramal SIP: 1852 (GESTAO DE CONTRATOS)
    SELECT id INTO v_linha_id FROM public.linhas WHERE numero = '(31) 3280-6006' LIMIT 1;
    INSERT INTO public.ramais (
        numero, tipo, status, setor, "unidadeId", nome, ddr, 
        observacao, "redirecionamentoEnabled", salto1, salto2, salto3, 
        "grupoCapturaEnabled", "grupoCaptura", "microsipUser", "microsipPass"
    ) VALUES (
        '1852', 'SIP', 'Ativo', 'GESTAO DE CONTRATOS', v_unidade_id, 'GESTAO DE CONTRATOS', v_linha_id, 
        '', false, '', '', '', 
        false, '', '3192411852', 'R3m@t0821'
    );

    -- Inserindo Ramal SIP: 1853 (CONTROLADORIA)
    SELECT id INTO v_linha_id FROM public.linhas WHERE numero = '(31) 3280-6000' LIMIT 1;
    INSERT INTO public.ramais (
        numero, tipo, status, setor, "unidadeId", nome, ddr, 
        observacao, "redirecionamentoEnabled", salto1, salto2, salto3, 
        "grupoCapturaEnabled", "grupoCaptura", "microsipUser", "microsipPass"
    ) VALUES (
        '1853', 'SIP', 'Ativo', 'CONTROLADORIA', v_unidade_id, 'CONTROLADORIA', v_linha_id, 
        '', false, '', '', '', 
        false, '', '3192411853', 'R3m@t0332'
    );

    -- Inserindo Ramal SIP: 1854 (FISCAL)
    SELECT id INTO v_linha_id FROM public.linhas WHERE numero = '(31) 3280-6000' LIMIT 1;
    INSERT INTO public.ramais (
        numero, tipo, status, setor, "unidadeId", nome, ddr, 
        observacao, "redirecionamentoEnabled", salto1, salto2, salto3, 
        "grupoCapturaEnabled", "grupoCaptura", "microsipUser", "microsipPass"
    ) VALUES (
        '1854', 'SIP', 'Ativo', 'CONTROLADORIA', v_unidade_id, 'FISCAL', v_linha_id, 
        '', false, '', '', '', 
        false, '', '3192411854', 'R3m@t0936'
    );

    -- Inserindo Ramal SIP: 1855 (FISCAL)
    SELECT id INTO v_linha_id FROM public.linhas WHERE numero = '(31) 3280-6000' LIMIT 1;
    INSERT INTO public.ramais (
        numero, tipo, status, setor, "unidadeId", nome, ddr, 
        observacao, "redirecionamentoEnabled", salto1, salto2, salto3, 
        "grupoCapturaEnabled", "grupoCaptura", "microsipUser", "microsipPass"
    ) VALUES (
        '1855', 'SIP', 'Ativo', 'CONTROLADORIA', v_unidade_id, 'FISCAL', v_linha_id, 
        '', false, '', '', '', 
        false, '', '3192411855', 'R3m@t0778'
    );

    -- Inserindo Ramal SIP: 1856 (FISCAL)
    SELECT id INTO v_linha_id FROM public.linhas WHERE numero = '(31) 3280-6000' LIMIT 1;
    INSERT INTO public.ramais (
        numero, tipo, status, setor, "unidadeId", nome, ddr, 
        observacao, "redirecionamentoEnabled", salto1, salto2, salto3, 
        "grupoCapturaEnabled", "grupoCaptura", "microsipUser", "microsipPass"
    ) VALUES (
        '1856', 'SIP', 'Ativo', 'CONTROLADORIA', v_unidade_id, 'FISCAL', v_linha_id, 
        '', false, '', '', '', 
        false, '', '3192411856', 'R3m@t0719'
    );

    -- Inserindo Ramal SIP: 1857 (FISCAL)
    SELECT id INTO v_linha_id FROM public.linhas WHERE numero = '(31) 3280-6000' LIMIT 1;
    INSERT INTO public.ramais (
        numero, tipo, status, setor, "unidadeId", nome, ddr, 
        observacao, "redirecionamentoEnabled", salto1, salto2, salto3, 
        "grupoCapturaEnabled", "grupoCaptura", "microsipUser", "microsipPass"
    ) VALUES (
        '1857', 'SIP', 'Ativo', 'CONTROLADORIA', v_unidade_id, 'FISCAL', v_linha_id, 
        '', false, '', '', '', 
        false, '', '3192411857', 'R3m@t0507'
    );

    -- Inserindo Ramal SIP: 1858 (FISCAL)
    SELECT id INTO v_linha_id FROM public.linhas WHERE numero = '(31) 3280-6000' LIMIT 1;
    INSERT INTO public.ramais (
        numero, tipo, status, setor, "unidadeId", nome, ddr, 
        observacao, "redirecionamentoEnabled", salto1, salto2, salto3, 
        "grupoCapturaEnabled", "grupoCaptura", "microsipUser", "microsipPass"
    ) VALUES (
        '1858', 'SIP', 'Ativo', 'CONTROLADORIA', v_unidade_id, 'FISCAL', v_linha_id, 
        '', false, '', '', '', 
        false, '', '3192411858', 'R3m@t0240'
    );

    -- Inserindo Ramal SIP: 1859 (FISCAL)
    SELECT id INTO v_linha_id FROM public.linhas WHERE numero = '(31) 3280-6000' LIMIT 1;
    INSERT INTO public.ramais (
        numero, tipo, status, setor, "unidadeId", nome, ddr, 
        observacao, "redirecionamentoEnabled", salto1, salto2, salto3, 
        "grupoCapturaEnabled", "grupoCaptura", "microsipUser", "microsipPass"
    ) VALUES (
        '1859', 'SIP', 'Ativo', 'CONTROLADORIA', v_unidade_id, 'FISCAL', v_linha_id, 
        '', false, '', '', '', 
        false, '', '3192411859', 'R3m@t0273'
    );

    -- Inserindo Ramal SIP: 1860 (FISCAL)
    SELECT id INTO v_linha_id FROM public.linhas WHERE numero = '(31) 3280-6000' LIMIT 1;
    INSERT INTO public.ramais (
        numero, tipo, status, setor, "unidadeId", nome, ddr, 
        observacao, "redirecionamentoEnabled", salto1, salto2, salto3, 
        "grupoCapturaEnabled", "grupoCaptura", "microsipUser", "microsipPass"
    ) VALUES (
        '1860', 'SIP', 'Ativo', 'CONTROLADORIA', v_unidade_id, 'FISCAL', v_linha_id, 
        '', false, '', '', '', 
        false, '', '3192411860', 'R3m@t0768'
    );

    -- Inserindo Ramal SIP: 1861 (CONTABILIDADE)
    SELECT id INTO v_linha_id FROM public.linhas WHERE numero = '(31) 3280-6000' LIMIT 1;
    INSERT INTO public.ramais (
        numero, tipo, status, setor, "unidadeId", nome, ddr, 
        observacao, "redirecionamentoEnabled", salto1, salto2, salto3, 
        "grupoCapturaEnabled", "grupoCaptura", "microsipUser", "microsipPass"
    ) VALUES (
        '1861', 'SIP', 'Ativo', 'CONTROLADORIA', v_unidade_id, 'CONTABILIDADE', v_linha_id, 
        '', false, '', '', '', 
        false, '', '3192411861', 'R3m@t0658'
    );

    -- Inserindo Ramal SIP: 1862 (CONTABILIDADE)
    SELECT id INTO v_linha_id FROM public.linhas WHERE numero = '(31) 3280-6000' LIMIT 1;
    INSERT INTO public.ramais (
        numero, tipo, status, setor, "unidadeId", nome, ddr, 
        observacao, "redirecionamentoEnabled", salto1, salto2, salto3, 
        "grupoCapturaEnabled", "grupoCaptura", "microsipUser", "microsipPass"
    ) VALUES (
        '1862', 'SIP', 'Ativo', 'CONTROLADORIA', v_unidade_id, 'CONTABILIDADE', v_linha_id, 
        '', false, '', '', '', 
        false, '', '3192411862', 'R3m@t0783'
    );

    -- Inserindo Ramal SIP: 1863 (CONTABILIDADE)
    SELECT id INTO v_linha_id FROM public.linhas WHERE numero = '(31) 3280-6000' LIMIT 1;
    INSERT INTO public.ramais (
        numero, tipo, status, setor, "unidadeId", nome, ddr, 
        observacao, "redirecionamentoEnabled", salto1, salto2, salto3, 
        "grupoCapturaEnabled", "grupoCaptura", "microsipUser", "microsipPass"
    ) VALUES (
        '1863', 'SIP', 'Ativo', 'CONTROLADORIA', v_unidade_id, 'CONTABILIDADE', v_linha_id, 
        '', false, '', '', '', 
        false, '', '3192411863', 'R3m@t0436'
    );

    -- Inserindo Ramal SIP: 1864 (CONTABILIDADE)
    SELECT id INTO v_linha_id FROM public.linhas WHERE numero = '(31) 3280-6000' LIMIT 1;
    INSERT INTO public.ramais (
        numero, tipo, status, setor, "unidadeId", nome, ddr, 
        observacao, "redirecionamentoEnabled", salto1, salto2, salto3, 
        "grupoCapturaEnabled", "grupoCaptura", "microsipUser", "microsipPass"
    ) VALUES (
        '1864', 'SIP', 'Ativo', 'CONTROLADORIA', v_unidade_id, 'CONTABILIDADE', v_linha_id, 
        '', false, '', '', '', 
        false, '', '3192411864', 'R3m@t0732'
    );

    -- Inserindo Ramal SIP: 1865 (CONTABILIDADE)
    SELECT id INTO v_linha_id FROM public.linhas WHERE numero = '(31) 3280-6000' LIMIT 1;
    INSERT INTO public.ramais (
        numero, tipo, status, setor, "unidadeId", nome, ddr, 
        observacao, "redirecionamentoEnabled", salto1, salto2, salto3, 
        "grupoCapturaEnabled", "grupoCaptura", "microsipUser", "microsipPass"
    ) VALUES (
        '1865', 'SIP', 'Ativo', 'CONTROLADORIA', v_unidade_id, 'CONTABILIDADE', v_linha_id, 
        '', false, '', '', '', 
        false, '', '3192411865', 'R3m@t0302'
    );

    -- Inserindo Ramal SIP: 1866 (CONTABILIDADE)
    SELECT id INTO v_linha_id FROM public.linhas WHERE numero = '(31) 3280-6000' LIMIT 1;
    INSERT INTO public.ramais (
        numero, tipo, status, setor, "unidadeId", nome, ddr, 
        observacao, "redirecionamentoEnabled", salto1, salto2, salto3, 
        "grupoCapturaEnabled", "grupoCaptura", "microsipUser", "microsipPass"
    ) VALUES (
        '1866', 'SIP', 'Ativo', 'CONTROLADORIA', v_unidade_id, 'CONTABILIDADE', v_linha_id, 
        '', false, '', '', '', 
        false, '', '3192411866', 'R3m@t0267'
    );

    -- Inserindo Ramal SIP: 1867 (CONTABILIDADE)
    SELECT id INTO v_linha_id FROM public.linhas WHERE numero = '(31) 3280-6000' LIMIT 1;
    INSERT INTO public.ramais (
        numero, tipo, status, setor, "unidadeId", nome, ddr, 
        observacao, "redirecionamentoEnabled", salto1, salto2, salto3, 
        "grupoCapturaEnabled", "grupoCaptura", "microsipUser", "microsipPass"
    ) VALUES (
        '1867', 'SIP', 'Ativo', 'CONTROLADORIA', v_unidade_id, 'CONTABILIDADE', v_linha_id, 
        '', false, '', '', '', 
        false, '', '3192411867', 'R3m@t0195'
    );

    -- Inserindo Ramal SIP: 1868 (ORÇAMENTO)
    SELECT id INTO v_linha_id FROM public.linhas WHERE numero = '(31) 3280-6000' LIMIT 1;
    INSERT INTO public.ramais (
        numero, tipo, status, setor, "unidadeId", nome, ddr, 
        observacao, "redirecionamentoEnabled", salto1, salto2, salto3, 
        "grupoCapturaEnabled", "grupoCaptura", "microsipUser", "microsipPass"
    ) VALUES (
        '1868', 'SIP', 'Ativo', 'CONTROLADORIA', v_unidade_id, 'ORÇAMENTO', v_linha_id, 
        '', false, '', '', '', 
        false, '', '3192411868', 'R3m@t0997'
    );

    -- Inserindo Ramal SIP: 1869 (ORÇAMENTO)
    SELECT id INTO v_linha_id FROM public.linhas WHERE numero = '(31) 3280-6000' LIMIT 1;
    INSERT INTO public.ramais (
        numero, tipo, status, setor, "unidadeId", nome, ddr, 
        observacao, "redirecionamentoEnabled", salto1, salto2, salto3, 
        "grupoCapturaEnabled", "grupoCaptura", "microsipUser", "microsipPass"
    ) VALUES (
        '1869', 'SIP', 'Ativo', 'CONTROLADORIA', v_unidade_id, 'ORÇAMENTO', v_linha_id, 
        '', false, '', '', '', 
        false, '', '3192411869', 'R3m@t0585'
    );

    -- Inserindo Ramal SIP: 1870 (ORÇAMENTO)
    SELECT id INTO v_linha_id FROM public.linhas WHERE numero = '(31) 3280-6000' LIMIT 1;
    INSERT INTO public.ramais (
        numero, tipo, status, setor, "unidadeId", nome, ddr, 
        observacao, "redirecionamentoEnabled", salto1, salto2, salto3, 
        "grupoCapturaEnabled", "grupoCaptura", "microsipUser", "microsipPass"
    ) VALUES (
        '1870', 'SIP', 'Ativo', 'CONTROLADORIA', v_unidade_id, 'ORÇAMENTO', v_linha_id, 
        '', false, '', '', '', 
        false, '', '3192411870', 'R3m@t0336'
    );

    -- Inserindo Ramal SIP: 1871 (ORÇAMENTO)
    SELECT id INTO v_linha_id FROM public.linhas WHERE numero = '(31) 3280-6000' LIMIT 1;
    INSERT INTO public.ramais (
        numero, tipo, status, setor, "unidadeId", nome, ddr, 
        observacao, "redirecionamentoEnabled", salto1, salto2, salto3, 
        "grupoCapturaEnabled", "grupoCaptura", "microsipUser", "microsipPass"
    ) VALUES (
        '1871', 'SIP', 'Ativo', 'CONTROLADORIA', v_unidade_id, 'ORÇAMENTO', v_linha_id, 
        '', false, '', '', '', 
        false, '', '3192411871', 'R3m@t0381'
    );

    -- Inserindo Ramal SIP: 1872 (ORÇAMENTO)
    SELECT id INTO v_linha_id FROM public.linhas WHERE numero = '(31) 3280-6000' LIMIT 1;
    INSERT INTO public.ramais (
        numero, tipo, status, setor, "unidadeId", nome, ddr, 
        observacao, "redirecionamentoEnabled", salto1, salto2, salto3, 
        "grupoCapturaEnabled", "grupoCaptura", "microsipUser", "microsipPass"
    ) VALUES (
        '1872', 'SIP', 'Ativo', 'CONTROLADORIA', v_unidade_id, 'ORÇAMENTO', v_linha_id, 
        '', false, '', '', '', 
        false, '', '3192411872', 'R3m@t0101'
    );

    -- Inserindo Ramal SIP: 1873 (PATRIMÔNIO)
    SELECT id INTO v_linha_id FROM public.linhas WHERE numero = '(31) 3280-6000' LIMIT 1;
    INSERT INTO public.ramais (
        numero, tipo, status, setor, "unidadeId", nome, ddr, 
        observacao, "redirecionamentoEnabled", salto1, salto2, salto3, 
        "grupoCapturaEnabled", "grupoCaptura", "microsipUser", "microsipPass"
    ) VALUES (
        '1873', 'SIP', 'Ativo', 'CONTROLADORIA', v_unidade_id, 'PATRIMÔNIO', v_linha_id, 
        '', false, '', '', '', 
        false, '', '3192411873', 'R3m@t0656'
    );

    -- Inserindo Ramal SIP: 1874 (PATRIMÔNIO)
    SELECT id INTO v_linha_id FROM public.linhas WHERE numero = '(31) 3280-6000' LIMIT 1;
    INSERT INTO public.ramais (
        numero, tipo, status, setor, "unidadeId", nome, ddr, 
        observacao, "redirecionamentoEnabled", salto1, salto2, salto3, 
        "grupoCapturaEnabled", "grupoCaptura", "microsipUser", "microsipPass"
    ) VALUES (
        '1874', 'SIP', 'Ativo', 'CONTROLADORIA', v_unidade_id, 'PATRIMÔNIO', v_linha_id, 
        '', false, '', '', '', 
        false, '', '3192411874', 'R3m@t0632'
    );

    -- Inserindo Ramal SIP: 1875 (PATRIMÔNIO)
    SELECT id INTO v_linha_id FROM public.linhas WHERE numero = '(31) 3280-6000' LIMIT 1;
    INSERT INTO public.ramais (
        numero, tipo, status, setor, "unidadeId", nome, ddr, 
        observacao, "redirecionamentoEnabled", salto1, salto2, salto3, 
        "grupoCapturaEnabled", "grupoCaptura", "microsipUser", "microsipPass"
    ) VALUES (
        '1875', 'SIP', 'Ativo', 'CONTROLADORIA', v_unidade_id, 'PATRIMÔNIO', v_linha_id, 
        '', false, '', '', '', 
        false, '', '3192411875', 'R3m@t0220'
    );

    -- Inserindo Ramal SIP: 1876 (PATRIMÔNIO)
    SELECT id INTO v_linha_id FROM public.linhas WHERE numero = '(31) 3280-6000' LIMIT 1;
    INSERT INTO public.ramais (
        numero, tipo, status, setor, "unidadeId", nome, ddr, 
        observacao, "redirecionamentoEnabled", salto1, salto2, salto3, 
        "grupoCapturaEnabled", "grupoCaptura", "microsipUser", "microsipPass"
    ) VALUES (
        '1876', 'SIP', 'Ativo', 'CONTROLADORIA', v_unidade_id, 'PATRIMÔNIO', v_linha_id, 
        '', false, '', '', '', 
        false, '', '3192411876', 'R3m@t0704'
    );

    -- Inserindo Ramal SIP: 1877 (PATRIMÔNIO)
    SELECT id INTO v_linha_id FROM public.linhas WHERE numero = '(31) 3280-6000' LIMIT 1;
    INSERT INTO public.ramais (
        numero, tipo, status, setor, "unidadeId", nome, ddr, 
        observacao, "redirecionamentoEnabled", salto1, salto2, salto3, 
        "grupoCapturaEnabled", "grupoCaptura", "microsipUser", "microsipPass"
    ) VALUES (
        '1877', 'SIP', 'Ativo', 'CONTROLADORIA', v_unidade_id, 'PATRIMÔNIO', v_linha_id, 
        '', false, '', '', '', 
        false, '', '3192411877', 'R3m@t0412'
    );

    -- Inserindo Ramal SIP: 1878 (ENGENHARIA)
    SELECT id INTO v_linha_id FROM public.linhas WHERE numero = '(31) 3263-4753' LIMIT 1;
    INSERT INTO public.ramais (
        numero, tipo, status, setor, "unidadeId", nome, ddr, 
        observacao, "redirecionamentoEnabled", salto1, salto2, salto3, 
        "grupoCapturaEnabled", "grupoCaptura", "microsipUser", "microsipPass"
    ) VALUES (
        '1878', 'SIP', 'Ativo', 'ENGENHARIA', v_unidade_id, 'ENGENHARIA', v_linha_id, 
        '', false, '', '', '', 
        false, '', '3192411878', 'R3m@t0706'
    );

    -- Inserindo Ramal SIP: 1879 (RECEPCAO)
    SELECT id INTO v_linha_id FROM public.linhas WHERE numero = '(31) 3241-7185' LIMIT 1;
    INSERT INTO public.ramais (
        numero, tipo, status, setor, "unidadeId", nome, ddr, 
        observacao, "redirecionamentoEnabled", salto1, salto2, salto3, 
        "grupoCapturaEnabled", "grupoCaptura", "microsipUser", "microsipPass"
    ) VALUES (
        '1879', 'SIP', 'Ativo', 'RECEPCAO', v_unidade_id, 'RECEPCAO', v_linha_id, 
        '', false, '', '', '', 
        false, '', '3192411879', 'R3m@t0401'
    );

    -- Inserindo Ramal SIP: 1880 (SERVICEDESK - RBA)
    SELECT id INTO v_linha_id FROM public.linhas WHERE numero = '(31) 3280-6007' LIMIT 1;
    INSERT INTO public.ramais (
        numero, tipo, status, setor, "unidadeId", nome, ddr, 
        observacao, "redirecionamentoEnabled", salto1, salto2, salto3, 
        "grupoCapturaEnabled", "grupoCaptura", "microsipUser", "microsipPass"
    ) VALUES (
        '1880', 'SIP', 'Ativo', 'GTI', v_unidade_id, 'SERVICEDESK - RBA', v_linha_id, 
        'André, Matheus', false, '', '', '', 
        false, '', '3192411880', 'R3m@t0913'
    );

    -- Inserindo Ramal SIP: 1881 (SERVICEDESK-AYMORES)
    SELECT id INTO v_linha_id FROM public.linhas WHERE numero = '(31) 3280-6007' LIMIT 1;
    INSERT INTO public.ramais (
        numero, tipo, status, setor, "unidadeId", nome, ddr, 
        observacao, "redirecionamentoEnabled", salto1, salto2, salto3, 
        "grupoCapturaEnabled", "grupoCaptura", "microsipUser", "microsipPass"
    ) VALUES (
        '1881', 'SIP', 'Ativo', 'GTI', v_unidade_id, 'SERVICEDESK-AYMORES', v_linha_id, 
        'TURMA TODA', false, '', '', '', 
        false, '', '3192411881', 'R3m@t0718'
    );

    -- Inserindo Ramal SIP: 1882 (GTI)
    SELECT id INTO v_linha_id FROM public.linhas WHERE numero = '(31) 3280-6007' LIMIT 1;
    INSERT INTO public.ramais (
        numero, tipo, status, setor, "unidadeId", nome, ddr, 
        observacao, "redirecionamentoEnabled", salto1, salto2, salto3, 
        "grupoCapturaEnabled", "grupoCaptura", "microsipUser", "microsipPass"
    ) VALUES (
        '1882', 'SIP', 'Ativo', 'GTI', v_unidade_id, 'GTI', v_linha_id, 
        '', false, '', '', '', 
        false, '', '3192411882', 'R3m@t0622'
    );

    -- Inserindo Ramal SIP: 1883 (GTI)
    SELECT id INTO v_linha_id FROM public.linhas WHERE numero = '(31) 3280-6008' LIMIT 1;
    INSERT INTO public.ramais (
        numero, tipo, status, setor, "unidadeId", nome, ddr, 
        observacao, "redirecionamentoEnabled", salto1, salto2, salto3, 
        "grupoCapturaEnabled", "grupoCaptura", "microsipUser", "microsipPass"
    ) VALUES (
        '1883', 'SIP', 'Ativo', 'GTI', v_unidade_id, 'GTI', v_linha_id, 
        '', false, '', '', '', 
        false, '', '3192411883', 'R3m@t0962'
    );

    -- Inserindo Ramal SIP: 1884 (GTI)
    SELECT id INTO v_linha_id FROM public.linhas WHERE numero = '(31) 3280-6008' LIMIT 1;
    INSERT INTO public.ramais (
        numero, tipo, status, setor, "unidadeId", nome, ddr, 
        observacao, "redirecionamentoEnabled", salto1, salto2, salto3, 
        "grupoCapturaEnabled", "grupoCaptura", "microsipUser", "microsipPass"
    ) VALUES (
        '1884', 'SIP', 'Ativo', 'GTI', v_unidade_id, 'GTI', v_linha_id, 
        '', false, '', '', '', 
        false, '', '3192411884', 'R3m@t0839'
    );

    -- Inserindo Ramal SIP: 1885 (GTI)
    SELECT id INTO v_linha_id FROM public.linhas WHERE numero = '(31) 3280-6008' LIMIT 1;
    INSERT INTO public.ramais (
        numero, tipo, status, setor, "unidadeId", nome, ddr, 
        observacao, "redirecionamentoEnabled", salto1, salto2, salto3, 
        "grupoCapturaEnabled", "grupoCaptura", "microsipUser", "microsipPass"
    ) VALUES (
        '1885', 'SIP', 'Ativo', 'GTI', v_unidade_id, 'GTI', v_linha_id, 
        '', false, '', '', '', 
        false, '', '3192411885', 'R3m@t0152'
    );

END $$;
COMMIT;
