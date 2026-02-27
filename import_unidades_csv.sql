BEGIN;


DO $$
DECLARE
    v_unidade_id uuid;
BEGIN
    INSERT INTO public.unidades (nome, entidade, cidade, endereco, "faixaRamais")
    VALUES ('CLUBE José Barbosa Da Costa', 'SESI', 'Alfenas', 'Rua Joao Cezario 151 - Jardim América - Alfenas MG', '2000 - 2049')
    RETURNING id INTO v_unidade_id;

    INSERT INTO public.linhas (numero, operadora, "unidadeId", status)
    VALUES ('(35) 3291-9164', 'Método', v_unidade_id, 'Ativa');
END $$;

DO $$
DECLARE
    v_unidade_id uuid;
BEGIN
    INSERT INTO public.unidades (nome, entidade, cidade, endereco, "faixaRamais")
    VALUES ('Amadeu Tonon', 'SESI', 'Andradas', 'Rua João Casemiro 111, Vila Euclides - Andradas', '2100 - 2149')
    RETURNING id INTO v_unidade_id;

    INSERT INTO public.linhas (numero, operadora, "unidadeId", status)
    VALUES ('(35) 3731-4056', 'Método', v_unidade_id, 'Ativa');
END $$;

DO $$
DECLARE
    v_unidade_id uuid;
BEGIN
    INSERT INTO public.unidades (nome, entidade, cidade, endereco, "faixaRamais")
    VALUES ('CFP Mário Abdalla / José Alencar Gomes da Silva', 'SESI', 'Araguari', 'R. Manoel Assis Pereira, 140 - Goiás, Araguari - MG, 38442-174', '2150 - 2199')
    RETURNING id INTO v_unidade_id;

    INSERT INTO public.linhas (numero, operadora, "unidadeId", status)
    VALUES ('(34) 3512-0196', 'Método', v_unidade_id, 'Ativa');
END $$;

DO $$
DECLARE
    v_unidade_id uuid;
BEGIN
    INSERT INTO public.unidades (nome, entidade, cidade, endereco, "faixaRamais")
    VALUES ('UI CFP Djalma Guimarães', 'SESI', 'Araxá', 'Rua Abrão José Bittar, 405 - Araxá MG', '2200 - 2249')
    RETURNING id INTO v_unidade_id;

    INSERT INTO public.linhas (numero, operadora, "unidadeId", status)
    VALUES ('(34) 3669-5666', 'Método', v_unidade_id, 'Ativa');
END $$;

DO $$
DECLARE
    v_unidade_id uuid;
BEGIN
    INSERT INTO public.unidades (nome, entidade, cidade, endereco, "faixaRamais")
    VALUES ('CFP Eliezer Vitorino Costa', 'SENAI', 'Arcos', 'Rua Camburiu, Nº 195 - Bairro: São Pedro Arco/MG', '2250 - 2299')
    RETURNING id INTO v_unidade_id;

    INSERT INTO public.linhas (numero, operadora, "unidadeId", status)
    VALUES ('(37) 3351-3905', 'Método', v_unidade_id, 'Ativa');
END $$;

DO $$
DECLARE
    v_unidade_id uuid;
BEGIN
    INSERT INTO public.unidades (nome, entidade, cidade, endereco, "faixaRamais")
    VALUES ('CFP Guilherme Caldas Emrich', 'SENAI', 'Barão de Cocais', 'R. Dr. Antônio Soeiro, 108', '2300 - 2349')
    RETURNING id INTO v_unidade_id;

    INSERT INTO public.linhas (numero, operadora, "unidadeId", status)
    VALUES ('(31) 3837-5600', 'Método', v_unidade_id, 'Ativa');
END $$;

DO $$
DECLARE
    v_unidade_id uuid;
BEGIN
    INSERT INTO public.unidades (nome, entidade, cidade, endereco, "faixaRamais")
    VALUES ('Oscar Magalhaes Ferreira Unidade I', 'SESI', 'Barbacena', 'Av. Pereira Teixeira, 405 - Ibiapaba - Barbacena/MG', '2350 - 2399')
    RETURNING id INTO v_unidade_id;

    INSERT INTO public.linhas (numero, operadora, "unidadeId", status)
    VALUES ('(32) 3198-1749', 'Método', v_unidade_id, 'Ativa');
END $$;

DO $$
DECLARE
    v_unidade_id uuid;
BEGIN
    INSERT INTO public.unidades (nome, entidade, cidade, endereco, "faixaRamais")
    VALUES ('SENAI CFP OLAVO MACHADO - SESI Oscar Magalhaes Ferreira Unidade II', 'SESI', 'Barbacena', 'Praça Dom Bosco, 88A - Carmo - Barbacena MG', '2400 - 2449')
    RETURNING id INTO v_unidade_id;

    INSERT INTO public.linhas (numero, operadora, "unidadeId", status)
    VALUES ('(32) 3332-4496', 'Método', v_unidade_id, 'Ativa');
END $$;

DO $$
DECLARE
    v_unidade_id uuid;
BEGIN
    INSERT INTO public.unidades (nome, entidade, cidade, endereco, "faixaRamais")
    VALUES ('Américo Renê Giannetti', 'SENAI', 'Belo Horizonte', 'Av. Antônio Carlos 561, Belo Horizonte - MG', '2450 - 2499')
    RETURNING id INTO v_unidade_id;

    INSERT INTO public.linhas (numero, operadora, "unidadeId", status)
    VALUES ('(31) 3472-3126', 'Método', v_unidade_id, 'Ativa');
END $$;

DO $$
DECLARE
    v_unidade_id uuid;
BEGIN
    INSERT INTO public.unidades (nome, entidade, cidade, endereco, "faixaRamais")
    VALUES ('CTTI', 'SENAI', 'Belo Horizonte', 'R. Rio De Janeiro, 471 - 13° Andar - Centro CEP 30160-440 Belo Horizonte', '2500 - 2549')
    RETURNING id INTO v_unidade_id;

    INSERT INTO public.linhas (numero, operadora, "unidadeId", status)
    VALUES ('(31) 3472-3129', 'Método', v_unidade_id, 'Ativa');
END $$;

DO $$
DECLARE
    v_unidade_id uuid;
BEGIN
    INSERT INTO public.unidades (nome, entidade, cidade, endereco, "faixaRamais")
    VALUES ('MARIZA ARAÚJO', 'SESI', 'Belo Horizonte', 'Lindolfo Caetano, 10- Calafate - Belo Horizonte - Minas Gerais', '2550 - 2599')
    RETURNING id INTO v_unidade_id;

    INSERT INTO public.linhas (numero, operadora, "unidadeId", status)
    VALUES ('(31) 3472-3130', 'Método', v_unidade_id, 'Ativa');
END $$;

DO $$
DECLARE
    v_unidade_id uuid;
BEGIN
    INSERT INTO public.unidades (nome, entidade, cidade, endereco, "faixaRamais")
    VALUES ('Catem', 'SESI', 'Belo Horizonte', 'R. Albert Scharlet 05, Madre Gertrudes, BH - MG', '2600 - 2649')
    RETURNING id INTO v_unidade_id;

    INSERT INTO public.linhas (numero, operadora, "unidadeId", status)
    VALUES ('(31) 3472-3131', 'Método', v_unidade_id, 'Ativa');
END $$;

DO $$
DECLARE
    v_unidade_id uuid;
BEGIN
    INSERT INTO public.unidades (nome, entidade, cidade, endereco, "faixaRamais")
    VALUES ('General Onésimo Becker De Araújo', 'SESI', 'Belo Horizonte', 'Rua Cipriano De Carvalho, 255, Barreiro - Belo Horizonte', '2650 - 2699')
    RETURNING id INTO v_unidade_id;

    INSERT INTO public.linhas (numero, operadora, "unidadeId", status)
    VALUES ('(31) 3472-3124', 'Método', v_unidade_id, 'Ativa');
END $$;

DO $$
DECLARE
    v_unidade_id uuid;
BEGIN
    INSERT INTO public.unidades (nome, entidade, cidade, endereco, "faixaRamais")
    VALUES ('Museu De Artes E Ofícios', 'SESI', 'Belo Horizonte', 'Praça Rui Barbosa, 600 - Centro - Belo Horizonte MG', '2700 - 2749')
    RETURNING id INTO v_unidade_id;

    INSERT INTO public.linhas (numero, operadora, "unidadeId", status)
    VALUES ('(31) 2116-0419', 'Método', v_unidade_id, 'Ativa');
END $$;

DO $$
DECLARE
    v_unidade_id uuid;
BEGIN
    INSERT INTO public.unidades (nome, entidade, cidade, endereco, "faixaRamais")
    VALUES ('Newton Antônio Da Silva Pereira', 'SESI', 'Belo Horizonte', 'Rua Airuoca, 539 - BHte - MG - CEP: 31910-130', '2750 - 2799')
    RETURNING id INTO v_unidade_id;

    INSERT INTO public.linhas (numero, operadora, "unidadeId", status)
    VALUES ('(31) 3472-3125', 'Método', v_unidade_id, 'Ativa');
END $$;

DO $$
DECLARE
    v_unidade_id uuid;
BEGIN
    INSERT INTO public.unidades (nome, entidade, cidade, endereco, "faixaRamais")
    VALUES ('São João Batista', 'SESI', 'Belo Horizonte', 'Rua Moacyr Froes, 83 - São João Batista. Belo Horizonte', '2800 - 2849')
    RETURNING id INTO v_unidade_id;

    INSERT INTO public.linhas (numero, operadora, "unidadeId", status)
    VALUES ('(31) 3427-2429', 'Método', v_unidade_id, 'Ativa');
END $$;

DO $$
DECLARE
    v_unidade_id uuid;
BEGIN
    INSERT INTO public.unidades (nome, entidade, cidade, endereco, "faixaRamais")
    VALUES ('Teatro SESIMINAS', 'SESI', 'Belo Horizonte', 'R. Álvares Maciel, 59 - Santa Efigênia, BH/MG - CEP - 30150-250', '2850 - 2899')
    RETURNING id INTO v_unidade_id;

    INSERT INTO public.linhas (numero, operadora, "unidadeId", status)
    VALUES ('(31) 2116-0418', 'Método', v_unidade_id, 'Ativa');
END $$;

DO $$
DECLARE
    v_unidade_id uuid;
BEGIN
    INSERT INTO public.unidades (nome, entidade, cidade, endereco, "faixaRamais")
    VALUES ('Unidade De Saúde E Segurança E Trabalho', 'SESI', 'Belo Horizonte', 'Endereço:  Av. Afonso Pena, 1500 - 15° Andar - Centro, Belo Horizonte - MG', '2900 - 2949')
    RETURNING id INTO v_unidade_id;

    INSERT INTO public.linhas (numero, operadora, "unidadeId", status)
    VALUES ('(31) 3361-1652', 'Método', v_unidade_id, 'Ativa');
END $$;

DO $$
DECLARE
    v_unidade_id uuid;
BEGIN
    INSERT INTO public.unidades (nome, entidade, cidade, endereco, "faixaRamais")
    VALUES ('Paulo De Tarso', 'SENAI', 'Belo Horizonte', 'Via Expressa, 3220 - Coração Eucarístico, Belo Horizonte - MG, 30720-410', '2950 - 2999')
    RETURNING id INTO v_unidade_id;

    INSERT INTO public.linhas (numero, operadora, "unidadeId", status)
    VALUES ('(31) 3419-0900', 'Método', v_unidade_id, 'Ativa');
END $$;

DO $$
DECLARE
    v_unidade_id uuid;
BEGIN
    INSERT INTO public.unidades (nome, entidade, cidade, endereco, "faixaRamais")
    VALUES ('Hamleto Magnavacca', 'SESI', 'Belo Horizonte', 'Av Senador Levindo Coelho Nº2680', '3000 - 3049')
    RETURNING id INTO v_unidade_id;

    INSERT INTO public.linhas (numero, operadora, "unidadeId", status)
    VALUES ('(31) 3385-6222', 'Método', v_unidade_id, 'Ativa');
END $$;

DO $$
DECLARE
    v_unidade_id uuid;
BEGIN
    INSERT INTO public.unidades (nome, entidade, cidade, endereco, "faixaRamais")
    VALUES ('NOVA ESCOLA - CORAÇÃO EUCARISTICO', 'SESI', 'Belo Horizonte', 'Itutinga, 340, Minas Brasil, Belo Horizonte', '8500 - 8549')
    RETURNING id INTO v_unidade_id;

    INSERT INTO public.linhas (numero, operadora, "unidadeId", status)
    VALUES ('(31) 3191-6287', 'Método', v_unidade_id, 'Ativa');
END $$;

DO $$
DECLARE
    v_unidade_id uuid;
BEGIN
    INSERT INTO public.unidades (nome, entidade, cidade, endereco, "faixaRamais")
    VALUES ('LEOPODINA', 'SESI', 'LEOPODINA', 'Clube Jair de Oliveira', '9000 - 9049')
    RETURNING id INTO v_unidade_id;
END $$;

DO $$
DECLARE
    v_unidade_id uuid;
BEGIN
    INSERT INTO public.unidades (nome, entidade, cidade, endereco, "faixaRamais")
    VALUES ('Maria Madalena Nogueira', 'SESI', 'Betim', 'RUA KAREN LESSA RODRIGUES, 50 - ARQUIPÉLAGO VERDE, BETIM/MG | CEP: 32656-840', '8600 - 8649')
    RETURNING id INTO v_unidade_id;

    INSERT INTO public.linhas (numero, operadora, "unidadeId", status)
    VALUES ('(31) 3191-6294', 'Método', v_unidade_id, 'Ativa');
END $$;

DO $$
DECLARE
    v_unidade_id uuid;
BEGIN
    INSERT INTO public.unidades (nome, entidade, cidade, endereco, "faixaRamais")
    VALUES ('Clube do trabalhador Francisco Netto Motta', 'SESI', 'Betim', 'R. Bela Vista, 220 - Chácaras, Betim - MG, 32670-364', '3150 - 3199')
    RETURNING id INTO v_unidade_id;

    INSERT INTO public.linhas (numero, operadora, "unidadeId", status)
    VALUES ('(31) 3472-3134', 'Método', v_unidade_id, 'Ativa');
END $$;

DO $$
DECLARE
    v_unidade_id uuid;
BEGIN
    INSERT INTO public.unidades (nome, entidade, cidade, endereco, "faixaRamais")
    VALUES ('CETEM Maria Madalena Nogueira', 'SENAI', 'Betim', 'Av Amazonas N° 55, Centro - Betim - MG', '3200 - 3249')
    RETURNING id INTO v_unidade_id;

    INSERT INTO public.linhas (numero, operadora, "unidadeId", status)
    VALUES ('(31) 3472-3133', 'Método', v_unidade_id, 'Ativa');
END $$;

DO $$
DECLARE
    v_unidade_id uuid;
BEGIN
    INSERT INTO public.unidades (nome, entidade, cidade, endereco, "faixaRamais")
    VALUES ('antigo ISVOR', 'SENAI', 'BETIM', 'Av. Anastácio Franco do Amaral, 81 - Jardim Petropolis, Betim - MG, 32655-034', '9200 - 9249')
    RETURNING id INTO v_unidade_id;

    INSERT INTO public.linhas (numero, operadora, "unidadeId", status)
    VALUES ('(31) 3593-1413', 'Método', v_unidade_id, 'Ativa');
END $$;

DO $$
DECLARE
    v_unidade_id uuid;
BEGIN
    INSERT INTO public.unidades (nome, entidade, cidade, endereco, "faixaRamais")
    VALUES ('José Ignacio Peixoto', 'SENAI', 'Cataguases', 'Rua Gama Cerqueira, 281 - Haidée, Cataguases - MG', '3250 - 3299')
    RETURNING id INTO v_unidade_id;

    INSERT INTO public.linhas (numero, operadora, "unidadeId", status)
    VALUES ('(32) 3429-1050', 'Método', v_unidade_id, 'Ativa');
END $$;

DO $$
DECLARE
    v_unidade_id uuid;
BEGIN
    INSERT INTO public.unidades (nome, entidade, cidade, endereco, "faixaRamais")
    VALUES ('Rodrigo Lana', 'SESI', 'Cataguases', 'R. Ofélia Resende, 101 - Menezes, Cataguases - MG, 36773-082', '3300 - 3349')
    RETURNING id INTO v_unidade_id;

    INSERT INTO public.linhas (numero, operadora, "unidadeId", status)
    VALUES ('(32) 3429-1051', 'Método', v_unidade_id, 'Ativa');
END $$;

DO $$
DECLARE
    v_unidade_id uuid;
BEGIN
    INSERT INTO public.unidades (nome, entidade, cidade, endereco, "faixaRamais")
    VALUES ('CFP Risoleta Tolentino Neves', 'SENAI', 'Cláudio', 'Rod MG 260 - Km 33, Nº 05, Anel Rodoviário - Cláudio/MG', '3350 - 3399')
    RETURNING id INTO v_unidade_id;

    INSERT INTO public.linhas (numero, operadora, "unidadeId", status)
    VALUES ('(37) 3362-0016', 'Método', v_unidade_id, 'Ativa');
END $$;

DO $$
DECLARE
    v_unidade_id uuid;
BEGIN
    INSERT INTO public.unidades (nome, entidade, cidade, endereco, "faixaRamais")
    VALUES ('CFP José aparecido de oliveira', 'SENAI', 'Conceição do Mato Dentro', 'R. São Francisco, 501 - Bandeirinhas, Conceição Do Mato Dentro - MG, 35860-000', '3400 - 3449')
    RETURNING id INTO v_unidade_id;

    INSERT INTO public.linhas (numero, operadora, "unidadeId", status)
    VALUES ('(31) 3868-1876', 'Método', v_unidade_id, 'Ativa');
END $$;

DO $$
DECLARE
    v_unidade_id uuid;
BEGIN
    INSERT INTO public.unidades (nome, entidade, cidade, endereco, "faixaRamais")
    VALUES ('verificar', 'SESI', 'Conceição do Mato Dentro', 'verificar', '3050 - 3099')
    RETURNING id INTO v_unidade_id;

    INSERT INTO public.linhas (numero, operadora, "unidadeId", status)
    VALUES ('(31) 3868-1763', 'Método', v_unidade_id, 'Ativa');
END $$;

DO $$
DECLARE
    v_unidade_id uuid;
BEGIN
    INSERT INTO public.unidades (nome, entidade, cidade, endereco, "faixaRamais")
    VALUES ('CFP Alvimar Carneiro De Rezende', 'SENAI', 'Contagem', 'Av. Sócrates Mariani Bitencourt, 711 - Cinco, Contagem - MG, 32010-010', '3500 - 3549')
    RETURNING id INTO v_unidade_id;

    INSERT INTO public.linhas (numero, operadora, "unidadeId", status)
    VALUES ('(31) 3472-3141', 'Método', v_unidade_id, 'Ativa');
END $$;

DO $$
DECLARE
    v_unidade_id uuid;
BEGIN
    INSERT INTO public.unidades (nome, entidade, cidade, endereco, "faixaRamais")
    VALUES ('CFP Euvaldo Lodi', 'SENAI', 'Contagem', 'Rua Doutor José Americo Cançado Bahia Nº 75', '3550 - 3599')
    RETURNING id INTO v_unidade_id;

    INSERT INTO public.linhas (numero, operadora, "unidadeId", status)
    VALUES ('(31) 3472-3139', 'Método', v_unidade_id, 'Ativa');
END $$;

DO $$
DECLARE
    v_unidade_id uuid;
BEGIN
    INSERT INTO public.unidades (nome, entidade, cidade, endereco, "faixaRamais")
    VALUES ('Cedetem', 'SENAI', 'Contagem', 'Av. Sindicalista Wanderlei Teixeira Fernandes, 265 - Polo Moveleiro, Contagem - MG, 32113-498', '3600 - 3649')
    RETURNING id INTO v_unidade_id;

    INSERT INTO public.linhas (numero, operadora, "unidadeId", status)
    VALUES ('(31) 3472-3137', 'Método', v_unidade_id, 'Ativa');
END $$;

DO $$
DECLARE
    v_unidade_id uuid;
BEGIN
    INSERT INTO public.unidades (nome, entidade, cidade, endereco, "faixaRamais")
    VALUES ('Centro 4.0', 'SENAI', 'Contagem', 'R. Dr. José Américo Cansado Bahia, 123 - Cidade Industrial, Contagem - MG, 32210-130', '3650 - 3699')
    RETURNING id INTO v_unidade_id;

    INSERT INTO public.linhas (numero, operadora, "unidadeId", status)
    VALUES ('(31) 3472-3143', 'Método', v_unidade_id, 'Ativa');
END $$;

DO $$
DECLARE
    v_unidade_id uuid;
BEGIN
    INSERT INTO public.unidades (nome, entidade, cidade, endereco, "faixaRamais")
    VALUES ('Alvimar Carneiro De Rezende', 'SESI', 'Contagem', 'Av. Sócrates Mariani Bitencourt, 750 - Cinco, Contagem - MG, 32010-010', '3700 - 3749')
    RETURNING id INTO v_unidade_id;

    INSERT INTO public.linhas (numero, operadora, "unidadeId", status)
    VALUES ('(31) 3472-3142', 'Método', v_unidade_id, 'Ativa');
END $$;

DO $$
DECLARE
    v_unidade_id uuid;
BEGIN
    INSERT INTO public.unidades (nome, entidade, cidade, endereco, "faixaRamais")
    VALUES ('Benjamin Guimarães', 'SESI', 'Contagem', 'R. Um, 303 - Santa Maria Contagem - MG', '3750 - 3799')
    RETURNING id INTO v_unidade_id;

    INSERT INTO public.linhas (numero, operadora, "unidadeId", status)
    VALUES ('(31) 3472-3138', 'Método', v_unidade_id, 'Ativa');
END $$;

DO $$
DECLARE
    v_unidade_id uuid;
BEGIN
    INSERT INTO public.unidades (nome, entidade, cidade, endereco, "faixaRamais")
    VALUES ('Centro De Educação Infantil  Leonor Franco', 'SESI', 'Contagem', 'R. Rio Paranaguá, 129 - Novo Riacho, Contagem - MG, 32280-300', '3800 - 3849')
    RETURNING id INTO v_unidade_id;

    INSERT INTO public.linhas (numero, operadora, "unidadeId", status)
    VALUES ('(31) 3472-3135', 'Método', v_unidade_id, 'Ativa');
END $$;

DO $$
DECLARE
    v_unidade_id uuid;
BEGIN
    INSERT INTO public.unidades (nome, entidade, cidade, endereco, "faixaRamais")
    VALUES ('Restaurante Do Trabalhador Henriqueta Maria Pietro', 'SESI', 'Contagem', 'Av. Cardeal Eugênio Pacelli, 2211.', '3850 - 3899')
    RETURNING id INTO v_unidade_id;

    INSERT INTO public.linhas (numero, operadora, "unidadeId", status)
    VALUES ('(31) 3472-3136', 'Método', v_unidade_id, 'Ativa');
END $$;

DO $$
DECLARE
    v_unidade_id uuid;
BEGIN
    INSERT INTO public.unidades (nome, entidade, cidade, endereco, "faixaRamais")
    VALUES ('Arthur Brito Bezerra Mello', 'SESI', 'Curvelo', 'Rua Guimarães Rosa, 185 - Bela Vista 35790-000 Curvelo', '3900 - 3949')
    RETURNING id INTO v_unidade_id;

    INSERT INTO public.linhas (numero, operadora, "unidadeId", status)
    VALUES ('(38) 3721-3434', 'Método', v_unidade_id, 'Ativa');
END $$;

DO $$
DECLARE
    v_unidade_id uuid;
BEGIN
    INSERT INTO public.unidades (nome, entidade, cidade, endereco, "faixaRamais")
    VALUES ('CFP Anielo Greco', 'SENAI', 'Divinópolis', 'Rua, Tv. Eng. Benjamim De Oliveira, 144 - A - Esplanada, Divinópolis', '4000 - 4049')
    RETURNING id INTO v_unidade_id;

    INSERT INTO public.linhas (numero, operadora, "unidadeId", status)
    VALUES ('(37) 3112-0002', 'Método', v_unidade_id, 'Ativa');
END $$;

DO $$
DECLARE
    v_unidade_id uuid;
BEGIN
    INSERT INTO public.unidades (nome, entidade, cidade, endereco, "faixaRamais")
    VALUES ('Cat Coronel Jovelino Rabelo', 'SESI', 'Divinópolis', 'Rua Pratápolis, 02 - Bom Pastor. Divinópolis / MG', '4050 - 4099')
    RETURNING id INTO v_unidade_id;

    INSERT INTO public.linhas (numero, operadora, "unidadeId", status)
    VALUES ('(37) 3222-0646', 'Método', v_unidade_id, 'Ativa');
END $$;

DO $$
DECLARE
    v_unidade_id uuid;
BEGIN
    INSERT INTO public.unidades (nome, entidade, cidade, endereco, "faixaRamais")
    VALUES ('SST', 'SESI', 'Divinópolis', 'Rua, Tv. Eng. Benjamim De Oliveira, 144 - Esplanada, Divinópolis', '8650 - 8699')
    RETURNING id INTO v_unidade_id;

    INSERT INTO public.linhas (numero, operadora, "unidadeId", status)
    VALUES ('(37) 3690-4400', 'Método', v_unidade_id, 'Ativa');
END $$;

DO $$
DECLARE
    v_unidade_id uuid;
BEGIN
    INSERT INTO public.unidades (nome, entidade, cidade, endereco, "faixaRamais")
    VALUES ('CFP Janez Hlebanja', 'SENAI', 'Extrema', 'Av. Alcebíades Gilli, Nº 11', '4100 - 4149')
    RETURNING id INTO v_unidade_id;

    INSERT INTO public.linhas (numero, operadora, "unidadeId", status)
    VALUES ('(35) 3100-1350', 'Método', v_unidade_id, 'Ativa');
END $$;

DO $$
DECLARE
    v_unidade_id uuid;
BEGIN
    INSERT INTO public.unidades (nome, entidade, cidade, endereco, "faixaRamais")
    VALUES ('SESI Escola Extrema', 'SESI', 'Extrema', 'Avenida Paulo Migliorini, 303 - Morro Grande - Extrema - MG', '4150 - 4199')
    RETURNING id INTO v_unidade_id;

    INSERT INTO public.linhas (numero, operadora, "unidadeId", status)
    VALUES ('(35) 3435-5864', 'Método', v_unidade_id, 'Ativa');
END $$;

DO $$
DECLARE
    v_unidade_id uuid;
BEGIN
    INSERT INTO public.unidades (nome, entidade, cidade, endereco, "faixaRamais")
    VALUES ('CT Luiz Rodrigues Da Costa', 'SENAI', 'Formiga', 'Trua João Pedrosa, 215 - Quinzinho Formiga -MG', '4200 - 4249')
    RETURNING id INTO v_unidade_id;

    INSERT INTO public.linhas (numero, operadora, "unidadeId", status)
    VALUES ('(37) 3321-3218', 'Método', v_unidade_id, 'Ativa');
END $$;

DO $$
DECLARE
    v_unidade_id uuid;
BEGIN
    INSERT INTO public.unidades (nome, entidade, cidade, endereco, "faixaRamais")
    VALUES ('Ui Luiz Chaves', 'SENAI', 'Governador Valadares', 'Rua Leda Maria Mota Godinho, 120 - JK II - MG - CEP 35045-570', '4300 - 4349')
    RETURNING id INTO v_unidade_id;

    INSERT INTO public.linhas (numero, operadora, "unidadeId", status)
    VALUES ('(33) 3272-4615', 'Método', v_unidade_id, 'Ativa');
END $$;

DO $$
DECLARE
    v_unidade_id uuid;
BEGIN
    INSERT INTO public.unidades (nome, entidade, cidade, endereco, "faixaRamais")
    VALUES ('Abílio Rodrigues Patto', 'SESI', 'Governador Valadares', 'Treze De Maio, 1120 - São Paulo, Gov. Valadares - MG, 35030-210', '4350 - 4399')
    RETURNING id INTO v_unidade_id;

    INSERT INTO public.linhas (numero, operadora, "unidadeId", status)
    VALUES ('(33) 3272-6590', 'Método', v_unidade_id, 'Ativa');
END $$;

DO $$
DECLARE
    v_unidade_id uuid;
BEGIN
    INSERT INTO public.unidades (nome, entidade, cidade, endereco, "faixaRamais")
    VALUES ('Segurança e Saúde no Trabalho em Governador Valadares', 'SESI', 'Governador Valadares', 'Rua Treze de Maio, 1120 - Bairro São Paulo', '8700 - 8749')
    RETURNING id INTO v_unidade_id;

    INSERT INTO public.linhas (numero, operadora, "unidadeId", status)
    VALUES ('(33) 3272-6623', 'Método', v_unidade_id, 'Ativa');
END $$;

DO $$
DECLARE
    v_unidade_id uuid;
BEGIN
    INSERT INTO public.unidades (nome, entidade, cidade, endereco, "faixaRamais")
    VALUES ('Unidade De Segurança E Saúde No Trabalho', 'SESI', 'Ipatinga', 'Rua Guarujá, 74 - Vila Ipanema - Ipatinga MG', '4400 - 4449')
    RETURNING id INTO v_unidade_id;

    INSERT INTO public.linhas (numero, operadora, "unidadeId", status)
    VALUES ('(31) 3823-3038', 'Método', v_unidade_id, 'Ativa');
END $$;

DO $$
DECLARE
    v_unidade_id uuid;
BEGIN
    INSERT INTO public.unidades (nome, entidade, cidade, endereco, "faixaRamais")
    VALUES ('Rinaldo Campos Soares', 'SENAI', 'Ipatinga', 'Av. Pedro Linhares Gomes, 5431 - Horto, Ipatinga - MG', '4500 - 4549')
    RETURNING id INTO v_unidade_id;

    INSERT INTO public.linhas (numero, operadora, "unidadeId", status)
    VALUES ('(31) 3822-9604', 'Método', v_unidade_id, 'Ativa');
END $$;

DO $$
DECLARE
    v_unidade_id uuid;
BEGIN
    INSERT INTO public.unidades (nome, entidade, cidade, endereco, "faixaRamais")
    VALUES ('Escola Santa Rita De Cássia', 'SESI', 'Ipatinga', 'Rua Wenceslau Brás, N 65 - Imbaúbas, Ipatinga - MG', '4550 - 4599')
    RETURNING id INTO v_unidade_id;

    INSERT INTO public.linhas (numero, operadora, "unidadeId", status)
    VALUES ('(31) 3823-3029', 'Método', v_unidade_id, 'Ativa');
END $$;

DO $$
DECLARE
    v_unidade_id uuid;
BEGIN
    INSERT INTO public.unidades (nome, entidade, cidade, endereco, "faixaRamais")
    VALUES ('Rinaldo Campos Soares', 'SESI', 'Ipatinga', 'Av. Pedro Linhares Gomes, 5431 - Horto, Ipatinga - MG, 35160-900', '8750 - 8799')
    RETURNING id INTO v_unidade_id;

    INSERT INTO public.linhas (numero, operadora, "unidadeId", status)
    VALUES ('(31) 3824-8132', 'Método', v_unidade_id, 'Ativa');
END $$;

DO $$
DECLARE
    v_unidade_id uuid;
BEGIN
    INSERT INTO public.unidades (nome, entidade, cidade, endereco, "faixaRamais")
    VALUES ('CFP Pedro Martins Guerra', 'SENAI', 'Itabira', 'Rua Nossa Senhora Da Piedade, S/N,Bairro: Campestre', '4600 - 4649')
    RETURNING id INTO v_unidade_id;

    INSERT INTO public.linhas (numero, operadora, "unidadeId", status)
    VALUES ('(31) 3834-5678', 'Método', v_unidade_id, 'Ativa');
END $$;

DO $$
DECLARE
    v_unidade_id uuid;
BEGIN
    INSERT INTO public.unidades (nome, entidade, cidade, endereco, "faixaRamais")
    VALUES ('CFP LAÉRCIO GARCIA NOGUEIRA', 'SENAI', 'Itabirito', 'Rua João Pinheiro, 895, Santa Efigênia - Itabirito - MG', '4650 - 4699')
    RETURNING id INTO v_unidade_id;

    INSERT INTO public.linhas (numero, operadora, "unidadeId", status)
    VALUES ('(31) 3561-4058', 'Método', v_unidade_id, 'Ativa');
END $$;

DO $$
DECLARE
    v_unidade_id uuid;
BEGIN
    INSERT INTO public.unidades (nome, entidade, cidade, endereco, "faixaRamais")
    VALUES ('Vitor Vieira Dos Santos', 'SESI', 'Itajubá', 'Av. Dos Ferroviários, 725 - Morro Chic, Itajubá - MG, 37505-034', '4750 - 4799')
    RETURNING id INTO v_unidade_id;

    INSERT INTO public.linhas (numero, operadora, "unidadeId", status)
    VALUES ('(35) 3622-2809', 'Método', v_unidade_id, 'Ativa');
END $$;

DO $$
DECLARE
    v_unidade_id uuid;
BEGIN
    INSERT INTO public.unidades (nome, entidade, cidade, endereco, "faixaRamais")
    VALUES ('Aureliano Chaves', 'SENAI', 'Itajubá', 'Rua Doutor Luiz Rennó, 715 - Avenida, Itajubá - MG, 37504-050', '4700 - 4749')
    RETURNING id INTO v_unidade_id;

    INSERT INTO public.linhas (numero, operadora, "unidadeId", status)
    VALUES ('(35) 3623-1788', 'Método', v_unidade_id, 'Ativa');
END $$;

DO $$
DECLARE
    v_unidade_id uuid;
BEGIN
    INSERT INTO public.unidades (nome, entidade, cidade, endereco, "faixaRamais")
    VALUES ('NUMES Núcleo de Reforma de Máquinas e Equipamentos SENAI/MG', 'SENAI', 'Itaúna', 'R. Lília Antunes, 99 - Nogueira Machado, Itaúna - MG, 35680-270', '4800 - 4849')
    RETURNING id INTO v_unidade_id;

    INSERT INTO public.linhas (numero, operadora, "unidadeId", status)
    VALUES ('(37) 3204-1145', 'Método', v_unidade_id, 'Ativa');
END $$;

DO $$
DECLARE
    v_unidade_id uuid;
BEGIN
    INSERT INTO public.unidades (nome, entidade, cidade, endereco, "faixaRamais")
    VALUES ('Cetef Marcelino Corradi', 'SENAI', 'Itaúna', 'R. Lília Antunes, 99 - Nogueira Machado, Itaúna - MG, 35680-270', '4850 - 4899')
    RETURNING id INTO v_unidade_id;

    INSERT INTO public.linhas (numero, operadora, "unidadeId", status)
    VALUES ('(37) 3249-2400', 'Método', v_unidade_id, 'Ativa');
END $$;

DO $$
DECLARE
    v_unidade_id uuid;
BEGIN
    INSERT INTO public.unidades (nome, entidade, cidade, endereco, "faixaRamais")
    VALUES ('Unidade De Segurança E Saúde No Trabalho', 'SESI', 'Itaúna', 'Rua Godofredo Goncalves 316, Centro Itaúna-MG CEP 35680047', '4900 - 4949')
    RETURNING id INTO v_unidade_id;

    INSERT INTO public.linhas (numero, operadora, "unidadeId", status)
    VALUES ('(37) 3201-0552', 'Método', v_unidade_id, 'Ativa');
END $$;

DO $$
DECLARE
    v_unidade_id uuid;
BEGIN
    INSERT INTO public.unidades (nome, entidade, cidade, endereco, "faixaRamais")
    VALUES ('Escola Dario Gonçalves De Souza', 'SESI', 'Itaúna', 'Avenida São João, 4147, Centro, Itaúna - MG - CEP 35680-065', '4950 - 4999')
    RETURNING id INTO v_unidade_id;

    INSERT INTO public.linhas (numero, operadora, "unidadeId", status)
    VALUES ('(37) 3249-0300', 'Método', v_unidade_id, 'Ativa');
END $$;

DO $$
DECLARE
    v_unidade_id uuid;
BEGIN
    INSERT INTO public.unidades (nome, entidade, cidade, endereco, "faixaRamais")
    VALUES ('Dr. Schlacher', 'SESI', 'João Monlevade', 'R. Alvoni De Castro, 0 - José De Alencar, João Monlevade - MG', '5150 - 5199')
    RETURNING id INTO v_unidade_id;

    INSERT INTO public.linhas (numero, operadora, "unidadeId", status)
    VALUES ('(31) 3851-2868', 'Método', v_unidade_id, 'Ativa');
END $$;

DO $$
DECLARE
    v_unidade_id uuid;
BEGIN
    INSERT INTO public.unidades (nome, entidade, cidade, endereco, "faixaRamais")
    VALUES ('Nansen Araújo', 'SENAI', 'João Monlevade', 'Rua Vinte E Três, 140, Areia Preta, João Monlevade - MG', '5100 - 5149')
    RETURNING id INTO v_unidade_id;

    INSERT INTO public.linhas (numero, operadora, "unidadeId", status)
    VALUES ('(31) 3851-5171', 'Método', v_unidade_id, 'Ativa');
END $$;

DO $$
DECLARE
    v_unidade_id uuid;
BEGIN
    INSERT INTO public.unidades (nome, entidade, cidade, endereco, "faixaRamais")
    VALUES ('Cidt Luiz Adelar Scheuer', 'SENAI', 'Juiz de Fora', 'Rodovia Br-040, Km 773, S/N - Barreira Do Triunfo, MG, 36035-000', '5250 - 5299')
    RETURNING id INTO v_unidade_id;

    INSERT INTO public.linhas (numero, operadora, "unidadeId", status)
    VALUES ('(32) 3692-8240', 'Método', v_unidade_id, 'Ativa');
END $$;

DO $$
DECLARE
    v_unidade_id uuid;
BEGIN
    INSERT INTO public.unidades (nome, entidade, cidade, endereco, "faixaRamais")
    VALUES ('José Fagundes Netto', 'SENAI', 'Juiz de Fora', 'Av. Barão Do Rio Branco, 1219 - Centro, Juiz De Fora - MG', '5300 - 5349')
    RETURNING id INTO v_unidade_id;

    INSERT INTO public.linhas (numero, operadora, "unidadeId", status)
    VALUES ('(32) 3692-8239', 'Método', v_unidade_id, 'Ativa');
END $$;

DO $$
DECLARE
    v_unidade_id uuid;
BEGIN
    INSERT INTO public.unidades (nome, entidade, cidade, endereco, "faixaRamais")
    VALUES ('Centro Esportivo Do Trabalhador José Weiss', 'SESI', 'Juiz de Fora', 'Av. Brasil, 3357 - Centro, Juiz De Fora - MG, 36060-010', '5350 - 5399')
    RETURNING id INTO v_unidade_id;

    INSERT INTO public.linhas (numero, operadora, "unidadeId", status)
    VALUES ('(32) 3239-2266', 'Método', v_unidade_id, 'Ativa');
END $$;

DO $$
DECLARE
    v_unidade_id uuid;
BEGIN
    INSERT INTO public.unidades (nome, entidade, cidade, endereco, "faixaRamais")
    VALUES ('Clube Campestre Nansen Araújo', 'SESI', 'Juiz de Fora', 'Av. Eugênio Do Nascimento, 201 - Juiz De Fora, MG, 36038-330', '5400 - 5449')
    RETURNING id INTO v_unidade_id;

    INSERT INTO public.linhas (numero, operadora, "unidadeId", status)
    VALUES ('(32) 3239-2255', 'Método', v_unidade_id, 'Ativa');
END $$;

DO $$
DECLARE
    v_unidade_id uuid;
BEGIN
    INSERT INTO public.unidades (nome, entidade, cidade, endereco, "faixaRamais")
    VALUES ('Cidt Luiz Adelar Scheuer Restaurante', 'SESI', 'Juiz de Fora', 'Br 040 Km 773, Juiz De Fora', '5450 - 5499')
    RETURNING id INTO v_unidade_id;

    INSERT INTO public.linhas (numero, operadora, "unidadeId", status)
    VALUES ('(32) 3692-8238', 'Método', v_unidade_id, 'Ativa');
END $$;

DO $$
DECLARE
    v_unidade_id uuid;
BEGIN
    INSERT INTO public.unidades (nome, entidade, cidade, endereco, "faixaRamais")
    VALUES ('Unidade De Saúde E Segurança No Trabalho', 'SESI', 'Juiz de Fora', 'R. Marechal Floriano Peixoto, 550, Centro - Juiz De Fora', '5500 - 5549')
    RETURNING id INTO v_unidade_id;

    INSERT INTO public.linhas (numero, operadora, "unidadeId", status)
    VALUES ('(32) 3692-8236', 'Método', v_unidade_id, 'Ativa');
END $$;

DO $$
DECLARE
    v_unidade_id uuid;
BEGIN
    INSERT INTO public.unidades (nome, entidade, cidade, endereco, "faixaRamais")
    VALUES ('NOVA ESCOLA', 'SESI', 'Juiz de Fora', 'Rua Sampaio, 300 - GRANBERY', '8850 - 8899')
    RETURNING id INTO v_unidade_id;

    INSERT INTO public.linhas (numero, operadora, "unidadeId", status)
    VALUES ('(32) 3239-2213', 'Método', v_unidade_id, 'Ativa');
END $$;

DO $$
DECLARE
    v_unidade_id uuid;
BEGIN
    INSERT INTO public.unidades (nome, entidade, cidade, endereco, "faixaRamais")
    VALUES ('CIT ITR', 'SENAI', 'Lagoa Santa', 'Avenida Belmiro João Salomão, 35 - Bairro Latiçam Gomides, Lagoa Santa - MG, 33400-000', '2050 - 2099')
    RETURNING id INTO v_unidade_id;

    INSERT INTO public.linhas (numero, operadora, "unidadeId", status)
    VALUES ('(31) 3191-6292', 'Método', v_unidade_id, 'Ativa');
END $$;

DO $$
DECLARE
    v_unidade_id uuid;
BEGIN
    INSERT INTO public.unidades (nome, entidade, cidade, endereco, "faixaRamais")
    VALUES ('CFP Jose Luciano Duarte Penido', 'SENAI', 'Mariana', 'Rodovia Do Contorno, S/N - Colina CEP 35420-000 - Mariana - MG', '5550 - 5599')
    RETURNING id INTO v_unidade_id;

    INSERT INTO public.linhas (numero, operadora, "unidadeId", status)
    VALUES ('(31) 3557-2120', 'Método', v_unidade_id, 'Ativa');
END $$;

DO $$
DECLARE
    v_unidade_id uuid;
BEGIN
    INSERT INTO public.unidades (nome, entidade, cidade, endereco, "faixaRamais")
    VALUES ('CFP Luiz De Paula', 'SENAI', 'Montes Claros', 'Av. Dulce Sarmento, 601 - São José - Montes Claros - MG', '5650 - 5699')
    RETURNING id INTO v_unidade_id;

    INSERT INTO public.linhas (numero, operadora, "unidadeId", status)
    VALUES ('(38) 3441-0037', 'Método', v_unidade_id, 'Ativa');
END $$;

DO $$
DECLARE
    v_unidade_id uuid;
BEGIN
    INSERT INTO public.unidades (nome, entidade, cidade, endereco, "faixaRamais")
    VALUES ('Escola', 'SESI', 'Montes Claros', 'Rua Paris, 240 - Ibituruna', '5750 - 5799')
    RETURNING id INTO v_unidade_id;

    INSERT INTO public.linhas (numero, operadora, "unidadeId", status)
    VALUES ('(38) 3441-0039', 'Método', v_unidade_id, 'Ativa');
END $$;

DO $$
DECLARE
    v_unidade_id uuid;
BEGIN
    INSERT INTO public.unidades (nome, entidade, cidade, endereco, "faixaRamais")
    VALUES ('Unidade De Segurança E Saúde No Trabalho', 'SESI', 'Montes Claros', 'Av. Armênio Veloso, 46 - Centro - Montes Claros - MG', '5800 - 5849')
    RETURNING id INTO v_unidade_id;

    INSERT INTO public.linhas (numero, operadora, "unidadeId", status)
    VALUES ('(38) 3441-0038', 'Método', v_unidade_id, 'Ativa');
END $$;

DO $$
DECLARE
    v_unidade_id uuid;
BEGIN
    INSERT INTO public.unidades (nome, entidade, cidade, endereco, "faixaRamais")
    VALUES ('Clube Do Trabalhador Valdemar Versiani Dos Anjos', 'SESI', 'Montes Claros', 'Rua Ivete Vargas, nº 450 - Vila Regina', '5700 - 5749')
    RETURNING id INTO v_unidade_id;

    INSERT INTO public.linhas (numero, operadora, "unidadeId", status)
    VALUES ('(38) 3441-0035', 'Método', v_unidade_id, 'Ativa');
END $$;

DO $$
DECLARE
    v_unidade_id uuid;
BEGIN
    INSERT INTO public.unidades (nome, entidade, cidade, endereco, "faixaRamais")
    VALUES ('Cezar Augusto Bianchi Botaro', 'SENAI', 'Muriaé', 'Rua Sinval Florêncio Da Silva - Centro, Muriaé - MG', '5850 - 5899')
    RETURNING id INTO v_unidade_id;

    INSERT INTO public.linhas (numero, operadora, "unidadeId", status)
    VALUES ('(32) 3696-4850', 'Método', v_unidade_id, 'Ativa');
END $$;

DO $$
DECLARE
    v_unidade_id uuid;
BEGIN
    INSERT INTO public.unidades (nome, entidade, cidade, endereco, "faixaRamais")
    VALUES ('CFP Afonso Greco', 'SENAI', 'Nova Lima', 'Praça Expedicionário Assunção, 168 - MG - CEP 34000-309', '5900 - 5949')
    RETURNING id INTO v_unidade_id;

    INSERT INTO public.linhas (numero, operadora, "unidadeId", status)
    VALUES ('(31) 3541-3209', 'Método', v_unidade_id, 'Ativa');
END $$;

DO $$
DECLARE
    v_unidade_id uuid;
BEGIN
    INSERT INTO public.unidades (nome, entidade, cidade, endereco, "faixaRamais")
    VALUES ('CFP', 'SENAI', 'Ouro Branco', 'Rua Macapá 177, Luzia Augusta - Ouro Branco MG', '6000 - 6049')
    RETURNING id INTO v_unidade_id;

    INSERT INTO public.linhas (numero, operadora, "unidadeId", status)
    VALUES ('(31) 3749-7251', 'Método', v_unidade_id, 'Ativa');
END $$;

DO $$
DECLARE
    v_unidade_id uuid;
BEGIN
    INSERT INTO public.unidades (nome, entidade, cidade, endereco, "faixaRamais")
    VALUES ('Unidade De Segurança E Saúde No Trabalho', 'SESI', 'Ouro Branco', 'R. Cristais, 254 - Metalúrgicos, Ouro Branco - MG, 36420-000', '6025 - 6074')
    RETURNING id INTO v_unidade_id;

    INSERT INTO public.linhas (numero, operadora, "unidadeId", status)
    VALUES ('(31) 3749-7250', 'Método', v_unidade_id, 'Ativa');
END $$;

DO $$
DECLARE
    v_unidade_id uuid;
BEGIN
    INSERT INTO public.unidades (nome, entidade, cidade, endereco, "faixaRamais")
    VALUES ('Centro Cultural E Turístico', 'SESI', 'Ouro Preto', 'Praça Tiradentes 04, Ouro Preto', '8400 - 8449')
    RETURNING id INTO v_unidade_id;

    INSERT INTO public.linhas (numero, operadora, "unidadeId", status)
    VALUES ('(31) 3551-5220', 'Método', v_unidade_id, 'Ativa');
END $$;

DO $$
DECLARE
    v_unidade_id uuid;
BEGIN
    INSERT INTO public.unidades (nome, entidade, cidade, endereco, "faixaRamais")
    VALUES ('NOVA ESCOLA', 'SESI', 'Paracatu', 'verificar', '8950 - 8999')
    RETURNING id INTO v_unidade_id;
END $$;

DO $$
DECLARE
    v_unidade_id uuid;
BEGIN
    INSERT INTO public.unidades (nome, entidade, cidade, endereco, "faixaRamais")
    VALUES ('UI EPITÁCIO CARDOSO NAVES', 'SENAI', 'Paracatu', 'Rua Afrânio Salustiano Pereira, 201, Paracatu, Minas Gerais', '6150 - 6199')
    RETURNING id INTO v_unidade_id;

    INSERT INTO public.linhas (numero, operadora, "unidadeId", status)
    VALUES ('(38) 3671-9035', 'Método', v_unidade_id, 'Ativa');
END $$;

DO $$
DECLARE
    v_unidade_id uuid;
BEGIN
    INSERT INTO public.unidades (nome, entidade, cidade, endereco, "faixaRamais")
    VALUES ('NOVA ESCOLA', 'SESI', 'PATOS DE MINAS', 'verificar', '9050 - 9099')
    RETURNING id INTO v_unidade_id;
END $$;

DO $$
DECLARE
    v_unidade_id uuid;
BEGIN
    INSERT INTO public.unidades (nome, entidade, cidade, endereco, "faixaRamais")
    VALUES ('Pedro Leopoldo UI GERSON DIAS', 'SESI', 'Pedro Leopoldo', 'Av. Coronel Juventino Dias, 856 - Centro - Pedro Leopoldo - MG', '6300 - 6349')
    RETURNING id INTO v_unidade_id;

    INSERT INTO public.linhas (numero, operadora, "unidadeId", status)
    VALUES ('(31) 3660-0200', 'Método', v_unidade_id, 'Ativa');
END $$;

DO $$
DECLARE
    v_unidade_id uuid;
BEGIN
    INSERT INTO public.unidades (nome, entidade, cidade, endereco, "faixaRamais")
    VALUES ('Dirceu De Oliveira Martins', 'SENAI', 'Pirapetinga', 'Rua Antônio Ribeiro Da Costa Jr - Centro, Pirapetinga - MG', '6350 - 6399')
    RETURNING id INTO v_unidade_id;

    INSERT INTO public.linhas (numero, operadora, "unidadeId", status)
    VALUES ('(32) 3465-1852', 'Método', v_unidade_id, 'Ativa');
END $$;

DO $$
DECLARE
    v_unidade_id uuid;
BEGIN
    INSERT INTO public.unidades (nome, entidade, cidade, endereco, "faixaRamais")
    VALUES ('Ui Sebastião Augusto De Lima', 'SENAI', 'Pirapora', 'Rua Cristiano Machado, 765 39270-000 - Pirapora MG', '6400 - 6449')
    RETURNING id INTO v_unidade_id;

    INSERT INTO public.linhas (numero, operadora, "unidadeId", status)
    VALUES ('(38) 3743-9619', 'Método', v_unidade_id, 'Ativa');
END $$;

DO $$
DECLARE
    v_unidade_id uuid;
BEGIN
    INSERT INTO public.unidades (nome, entidade, cidade, endereco, "faixaRamais")
    VALUES ('NOVA ESCOLA', 'SESI', 'POÇOS DE CALDAS', 'Av. João Pinheiro, 1046 - Centro, Poços de Caldas - MG, 37701-386', '9100 - 9149')
    RETURNING id INTO v_unidade_id;

    INSERT INTO public.linhas (numero, operadora, "unidadeId", status)
    VALUES ('(35) 3114-5395', 'Método', v_unidade_id, 'Ativa');
END $$;

DO $$
DECLARE
    v_unidade_id uuid;
BEGIN
    INSERT INTO public.unidades (nome, entidade, cidade, endereco, "faixaRamais")
    VALUES ('João Moreia Salles', 'SENAI', 'Poços de Caldas', 'Rua Pedro Barbosa 600 - Monte Verde - Poços De Caldas', '6450 - 6499')
    RETURNING id INTO v_unidade_id;

    INSERT INTO public.linhas (numero, operadora, "unidadeId", status)
    VALUES ('(35) 3729-2600', 'Método', v_unidade_id, 'Ativa');
END $$;

DO $$
DECLARE
    v_unidade_id uuid;
BEGIN
    INSERT INTO public.unidades (nome, entidade, cidade, endereco, "faixaRamais")
    VALUES ('CFP São Vicente De Paulo', 'SENAI', 'Ponte Nova', 'Av. Dr. Cristiano De Freitas Castro, 930 - Triângulo, Ponte Nova MG', '8225 - 8274')
    RETURNING id INTO v_unidade_id;

    INSERT INTO public.linhas (numero, operadora, "unidadeId", status)
    VALUES ('(31) 3817-1912', 'Método', v_unidade_id, 'Ativa');
END $$;

DO $$
DECLARE
    v_unidade_id uuid;
BEGIN
    INSERT INTO public.unidades (nome, entidade, cidade, endereco, "faixaRamais")
    VALUES ('Cat Gastão Ferreira Dos Santos', 'SESI', 'Ponte Nova', 'Av. Dr. Cristiano De Freitas Castro, 930 - Triângulo, Ponte Nova MG', '9150 - 9199')
    RETURNING id INTO v_unidade_id;

    INSERT INTO public.linhas (numero, operadora, "unidadeId", status)
    VALUES ('(31) 3817-3326', 'Método', v_unidade_id, 'Ativa');
END $$;

DO $$
DECLARE
    v_unidade_id uuid;
BEGIN
    INSERT INTO public.unidades (nome, entidade, cidade, endereco, "faixaRamais")
    VALUES ('Cat Irmão Gino Maria Rossi', 'SESI', 'Pouso Alegre', 'Praça José Correa Campos, 46 - São Geraldo Pouso Alegre', '6550 - 6599')
    RETURNING id INTO v_unidade_id;

    INSERT INTO public.linhas (numero, operadora, "unidadeId", status)
    VALUES ('(35) 3112-1023', 'Método', v_unidade_id, 'Ativa');
END $$;

DO $$
DECLARE
    v_unidade_id uuid;
BEGIN
    INSERT INTO public.unidades (nome, entidade, cidade, endereco, "faixaRamais")
    VALUES ('Orlando Chiarini', 'SENAI', 'Pouso Alegre', 'Av. Ver. Antônio Da Costa Rios, 322 - São Geraldo, Pouso Alegre - MG, 37550-000', '6600 - 6649')
    RETURNING id INTO v_unidade_id;

    INSERT INTO public.linhas (numero, operadora, "unidadeId", status)
    VALUES ('(35) 3423-7330', 'Método', v_unidade_id, 'Ativa');
END $$;

DO $$
DECLARE
    v_unidade_id uuid;
BEGIN
    INSERT INTO public.unidades (nome, entidade, cidade, endereco, "faixaRamais")
    VALUES ('UI João Carlos Giovannini', 'SENAI', 'Santa Luzia', 'Rua Benedito Freire Da Paz, 197, Boa Esperança, Santa Luzia', '6650 - 6699')
    RETURNING id INTO v_unidade_id;

    INSERT INTO public.linhas (numero, operadora, "unidadeId", status)
    VALUES ('(31) 3641-4518', 'Método', v_unidade_id, 'Ativa');
END $$;

DO $$
DECLARE
    v_unidade_id uuid;
BEGIN
    INSERT INTO public.unidades (nome, entidade, cidade, endereco, "faixaRamais")
    VALUES ('Srs Estefan Bogdan Saleg', 'SENAI', 'Santa Rita do Sapucaí', 'Rua Empresarial Prefeito Paulo Frederico De Toledo,160 Arco Íris', '6700 - 6749')
    RETURNING id INTO v_unidade_id;

    INSERT INTO public.linhas (numero, operadora, "unidadeId", status)
    VALUES ('(35) 3471-5671', 'Método', v_unidade_id, 'Ativa');
END $$;

DO $$
DECLARE
    v_unidade_id uuid;
BEGIN
    INSERT INTO public.unidades (nome, entidade, cidade, endereco, "faixaRamais")
    VALUES ('CT Pirotecnia - Oscar José Do Nascimento', 'SENAI', 'Santo Antônio do Monte', 'Rua Padre Paulo, 525, Bairro Mãe Chiquinha - Santo Antônio Do Monte - MG CEP 35560-000', '6750 - 6799')
    RETURNING id INTO v_unidade_id;

    INSERT INTO public.linhas (numero, operadora, "unidadeId", status)
    VALUES ('(37) 3281-3315', 'Método', v_unidade_id, 'Ativa');
END $$;

DO $$
DECLARE
    v_unidade_id uuid;
BEGIN
    INSERT INTO public.unidades (nome, entidade, cidade, endereco, "faixaRamais")
    VALUES ('CFP José Fernando Coura', 'SENAI', 'São Gonçalo do Rio Abaixo', 'R. Januária, 646 - Guanabara', '6850 - 6899')
    RETURNING id INTO v_unidade_id;

    INSERT INTO public.linhas (numero, operadora, "unidadeId", status)
    VALUES ('(31) 3833-5753', 'Método', v_unidade_id, 'Ativa');
END $$;

DO $$
DECLARE
    v_unidade_id uuid;
BEGIN
    INSERT INTO public.unidades (nome, entidade, cidade, endereco, "faixaRamais")
    VALUES ('Ui José Bento Nogueira Junqueira', 'SESI', 'São Gonçalo do Sapucaí', 'Av Jose Benedito De Paiva - São Gonçalo Do Sapucaí, MG, 37490-000', '6900 - 6949')
    RETURNING id INTO v_unidade_id;

    INSERT INTO public.linhas (numero, operadora, "unidadeId", status)
    VALUES ('(32) 3241-1183', 'Método', v_unidade_id, 'Ativa');
END $$;

DO $$
DECLARE
    v_unidade_id uuid;
BEGIN
    INSERT INTO public.unidades (nome, entidade, cidade, endereco, "faixaRamais")
    VALUES ('Escola Dom Bosco', 'SESI', 'são João Del Rei', 'R. Engenheiro Gustavo Campos, 15 - Matosinhos', '6950 - 6999')
    RETURNING id INTO v_unidade_id;

    INSERT INTO public.linhas (numero, operadora, "unidadeId", status)
    VALUES ('(32) 3371-5410', 'Método', v_unidade_id, 'Ativa');
END $$;

DO $$
DECLARE
    v_unidade_id uuid;
BEGIN
    INSERT INTO public.unidades (nome, entidade, cidade, endereco, "faixaRamais")
    VALUES ('Silvio Assunção Teixeira', 'SENAI', 'são João Del Rei', 'Praça Bom Jesus De Matosinhos, 1 - São João Del Rei', '7000 - 7049')
    RETURNING id INTO v_unidade_id;

    INSERT INTO public.linhas (numero, operadora, "unidadeId", status)
    VALUES ('(32) 3371-6303', 'Método', v_unidade_id, 'Ativa');
END $$;

DO $$
DECLARE
    v_unidade_id uuid;
BEGIN
    INSERT INTO public.unidades (nome, entidade, cidade, endereco, "faixaRamais")
    VALUES ('UI ROBSON BRAGA DE ANDRADE', 'SENAI', 'São João Nepomuceno', 'R. Roberto Schincariol, 81 - Distrito Industrial, São João Nepomuceno - MG', '7050 - 7099')
    RETURNING id INTO v_unidade_id;

    INSERT INTO public.linhas (numero, operadora, "unidadeId", status)
    VALUES ('(32) 3261-7011', 'Método', v_unidade_id, 'Ativa');
END $$;

DO $$
DECLARE
    v_unidade_id uuid;
BEGIN
    INSERT INTO public.unidades (nome, entidade, cidade, endereco, "faixaRamais")
    VALUES ('Monsenhor  Jerônimo Mancin', 'SENAI', 'São Sebastião do Paraíso', 'R. Ten. José Joaquim, 1512 - Vila Helena, São Sebastião Do Paraíso - MG', '7100 - 7149')
    RETURNING id INTO v_unidade_id;

    INSERT INTO public.linhas (numero, operadora, "unidadeId", status)
    VALUES ('(35) 3558-1365', 'Método', v_unidade_id, 'Ativa');
END $$;

DO $$
DECLARE
    v_unidade_id uuid;
BEGIN
    INSERT INTO public.unidades (nome, entidade, cidade, endereco, "faixaRamais")
    VALUES ('Fundação Zerrenner', 'SENAI', 'Sete Lagoas', 'Av. Cornélio Viana, 1115, Nossa Senhora do Carmo', '7150 - 7199')
    RETURNING id INTO v_unidade_id;

    INSERT INTO public.linhas (numero, operadora, "unidadeId", status)
    VALUES ('(31) 3776-9930', 'Método', v_unidade_id, 'Ativa');
END $$;

DO $$
DECLARE
    v_unidade_id uuid;
BEGIN
    INSERT INTO public.unidades (nome, entidade, cidade, endereco, "faixaRamais")
    VALUES ('Otoni Alves Costa', 'SESI', 'Sete Lagoas', 'R. Joaquim Madaleno, 56 - Chácara Do Paiva, Sete Lagoas', '7200 - 7249')
    RETURNING id INTO v_unidade_id;

    INSERT INTO public.linhas (numero, operadora, "unidadeId", status)
    VALUES ('(31) 3509-0402', 'Método', v_unidade_id, 'Ativa');
END $$;

DO $$
DECLARE
    v_unidade_id uuid;
BEGIN
    INSERT INTO public.unidades (nome, entidade, cidade, endereco, "faixaRamais")
    VALUES ('CFP Luciano José De Araújo', 'SENAI', 'Timóteo', 'Av. Judite Maria Do Carmo, 12 - Olaria, Timóteo - MG, 35180-184', '7250 - 7299')
    RETURNING id INTO v_unidade_id;

    INSERT INTO public.linhas (numero, operadora, "unidadeId", status)
    VALUES ('(31) 3848-1198', 'Método', v_unidade_id, 'Ativa');
END $$;

DO $$
DECLARE
    v_unidade_id uuid;
BEGIN
    INSERT INTO public.unidades (nome, entidade, cidade, endereco, "faixaRamais")
    VALUES ('CFP Ademar Marra', 'SENAI', 'Três Marias', 'Av. Campos Gerais, Nº 69 - Parque Diadorim', '7300 - 7349')
    RETURNING id INTO v_unidade_id;

    INSERT INTO public.linhas (numero, operadora, "unidadeId", status)
    VALUES ('(38) 3754-8650', 'Método', v_unidade_id, 'Ativa');
END $$;

DO $$
DECLARE
    v_unidade_id uuid;
BEGIN
    INSERT INTO public.unidades (nome, entidade, cidade, endereco, "faixaRamais")
    VALUES ('Professor Josino De Brito Campos', 'SESI', 'Três Pontas', 'Rua Regina Célia Vicentini, 297 Bairro Alcides Mesquita', '7350 - 7399')
    RETURNING id INTO v_unidade_id;

    INSERT INTO public.linhas (numero, operadora, "unidadeId", status)
    VALUES ('(35) 3265-4210', 'Método', v_unidade_id, 'Ativa');
END $$;

DO $$
DECLARE
    v_unidade_id uuid;
BEGIN
    INSERT INTO public.unidades (nome, entidade, cidade, endereco, "faixaRamais")
    VALUES ('CFP', 'SENAI', 'Turmalina', 'Avenida Eucalipto, Número 1000, Nova Turmalina- Turmalina-MG', '7400 - 7449')
    RETURNING id INTO v_unidade_id;

    INSERT INTO public.linhas (numero, operadora, "unidadeId", status)
    VALUES ('(38) 3527-1978', 'Método', v_unidade_id, 'Ativa');
END $$;

DO $$
DECLARE
    v_unidade_id uuid;
BEGIN
    INSERT INTO public.unidades (nome, entidade, cidade, endereco, "faixaRamais")
    VALUES ('José Alencar Gomes Da Silva Ubá', 'SENAI', 'Ubá', 'Av. Jesus Brandão, 452 - San Raphael, Ubá - MG, 36500-000', '7450 - 7499')
    RETURNING id INTO v_unidade_id;

    INSERT INTO public.linhas (numero, operadora, "unidadeId", status)
    VALUES ('(32) 3541-2752', 'Método', v_unidade_id, 'Ativa');
END $$;

DO $$
DECLARE
    v_unidade_id uuid;
BEGIN
    INSERT INTO public.unidades (nome, entidade, cidade, endereco, "faixaRamais")
    VALUES ('José Alencar Gomes Da Silva', 'SESI', 'Ubá', 'Avenida Jesus Brandão, 360 - San Raphael, Ubá - Minas Gerais - CEP 36507-190', '7500 - 7549')
    RETURNING id INTO v_unidade_id;

    INSERT INTO public.linhas (numero, operadora, "unidadeId", status)
    VALUES ('(32) 3531-1036', 'Método', v_unidade_id, 'Ativa');
END $$;

DO $$
DECLARE
    v_unidade_id uuid;
BEGIN
    INSERT INTO public.unidades (nome, entidade, cidade, endereco, "faixaRamais")
    VALUES ('Clube Hylio Foresti', 'SESI', 'Varginha', 'Av. Dr. Mario Frota, 195 - Santa Maria - Varginha - MG, 37044-270', '8050 - 8099')
    RETURNING id INTO v_unidade_id;
END $$;

DO $$
DECLARE
    v_unidade_id uuid;
BEGIN
    INSERT INTO public.unidades (nome, entidade, cidade, endereco, "faixaRamais")
    VALUES ('Aloysio Ribeiro De Almeida Unidade II', 'SESI', 'Varginha', 'Av. Dr. Mario Frota, 195 - Santa Maria - Varginha - MG, 37044-270', '8100 - 8149')
    RETURNING id INTO v_unidade_id;

    INSERT INTO public.linhas (numero, operadora, "unidadeId", status)
    VALUES ('(35) 3113-0017', 'Método', v_unidade_id, 'Ativa');
END $$;

DO $$
DECLARE
    v_unidade_id uuid;
BEGIN
    INSERT INTO public.unidades (nome, entidade, cidade, endereco, "faixaRamais")
    VALUES ('Ui Aloysio Ribeiro De Almeida Unidade I', 'SENAI', 'Varginha', 'Av. Benjamin Constant, Nº 389 - Centro - Varginha MG', '8150 - 8199')
    RETURNING id INTO v_unidade_id;

    INSERT INTO public.linhas (numero, operadora, "unidadeId", status)
    VALUES ('(35) 3113-0016', 'Método', v_unidade_id, 'Ativa');
END $$;

DO $$
DECLARE
    v_unidade_id uuid;
BEGIN
    INSERT INTO public.unidades (nome, entidade, cidade, endereco, "faixaRamais")
    VALUES ('CFP Joaquim De Paula Ferreira', 'SENAI', 'Várzea da Palma', 'Rua Avany Leite Greco, 631 - Paulo Vi 39.260-000 Várzea Da Palma MG', '8200 - 8249')
    RETURNING id INTO v_unidade_id;

    INSERT INTO public.linhas (numero, operadora, "unidadeId", status)
    VALUES ('(38) 3731-1037', 'Método', v_unidade_id, 'Ativa');
END $$;

DO $$
DECLARE
    v_unidade_id uuid;
BEGIN
    INSERT INTO public.unidades (nome, entidade, cidade, endereco, "faixaRamais")
    VALUES ('UI LUIZ CÉSAR ALBERTINI', 'SESI', 'Vespasiano', 'R. Manoel Bertoldo Fagundes, 480 - Vespasiano, 33200-662', '8300 - 8349')
    RETURNING id INTO v_unidade_id;

    INSERT INTO public.linhas (numero, operadora, "unidadeId", status)
    VALUES ('(31) 3629-9350', 'Método', v_unidade_id, 'Ativa');
END $$;

DO $$
DECLARE
    v_unidade_id uuid;
BEGIN
    INSERT INTO public.unidades (nome, entidade, cidade, endereco, "faixaRamais")
    VALUES ('Silvio Benatti', 'SENAI', 'Visconde do Rio Branco', 'Av. São João Batista, 165 - Centro, Visconde Do Rio Branco -MG', '8350 - 8399')
    RETURNING id INTO v_unidade_id;

    INSERT INTO public.linhas (numero, operadora, "unidadeId", status)
    VALUES ('(32) 3551-6905', 'Método', v_unidade_id, 'Ativa');
END $$;

DO $$
DECLARE
    v_unidade_id uuid;
BEGIN
    INSERT INTO public.unidades (nome, entidade, cidade, endereco, "faixaRamais")
    VALUES ('SENAI Passos UI Clezia de Melo Freire.', 'SENAI', 'PASSOS', 'Rua Mogiana s/nº - Canjeranus, Passos - M', '9025 - 9074')
    RETURNING id INTO v_unidade_id;

    INSERT INTO public.linhas (numero, operadora, "unidadeId", status)
    VALUES ('(35) 2115-0053', 'Método', v_unidade_id, 'Ativa');
END $$;

DO $$
DECLARE
    v_unidade_id uuid;
BEGIN
    INSERT INTO public.unidades (nome, entidade, cidade, endereco, "faixaRamais")
    VALUES ('ESCOLA', 'SESI', 'ALFENAS', 'verificar', '9125 - 9174')
    RETURNING id INTO v_unidade_id;

    INSERT INTO public.linhas (numero, operadora, "unidadeId", status)
    VALUES ('(35) 2135-0068', 'Método', v_unidade_id, 'Ativa');
END $$;

DO $$
DECLARE
    v_unidade_id uuid;
BEGIN
    INSERT INTO public.unidades (nome, entidade, cidade, endereco, "faixaRamais")
    VALUES ('ESCOLA', 'SESI', 'ARAÇUAÍ', 'verificar', '9225 - 9274')
    RETURNING id INTO v_unidade_id;

    INSERT INTO public.linhas (numero, operadora, "unidadeId", status)
    VALUES ('(33) 3731-9499', 'Método', v_unidade_id, 'Ativa');
END $$;

DO $$
DECLARE
    v_unidade_id uuid;
BEGIN
    INSERT INTO public.unidades (nome, entidade, cidade, endereco, "faixaRamais")
    VALUES ('ESCOLA', 'SESI', 'ARCOS', 'verificar', '9250 - 9299')
    RETURNING id INTO v_unidade_id;

    INSERT INTO public.linhas (numero, operadora, "unidadeId", status)
    VALUES ('(37) 2031-0052', 'Método', v_unidade_id, 'Ativa');
END $$;

COMMIT;
