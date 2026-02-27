const fs = require('fs');

const rawCsv = `SESI; Alfenas ;CLUBE José Barbosa Da Costa ;Rua Joao Cezario 151 - Jardim América - Alfenas MG;35 3291-9164;2000
SESI;Andradas;Amadeu Tonon;Rua João Casemiro 111, Vila Euclides - Andradas;35 3731-4056;2100
SESI;Araguari;CFP Mário Abdalla / José Alencar Gomes da Silva;R. Manoel Assis Pereira, 140 - Goiás, Araguari - MG, 38442-174;34 3512-0196;2150
SESI SENAI;Araxá;UI CFP Djalma Guimarães;Rua Abrão José Bittar, 405 - Araxá MG;34 3669-5666;2200
SENAI;Arcos;CFP Eliezer Vitorino Costa;Rua Camburiu, Nº 195 - Bairro: São Pedro Arco/MG;37 3351-3905;2250
SENAI;Barão de Cocais;CFP Guilherme Caldas Emrich;R. Dr. Antônio Soeiro, 108;31 3837-5600;2300
SESI;Barbacena;Oscar Magalhaes Ferreira Unidade I;Av. Pereira Teixeira, 405 - Ibiapaba - Barbacena/MG;32 3198-1749;2350
SESI;Barbacena;SENAI CFP OLAVO MACHADO - SESI Oscar Magalhaes Ferreira Unidade II;Praça Dom Bosco, 88A - Carmo - Barbacena MG;32 3332-4496;2400
SENAI;Belo Horizonte;Américo Renê Giannetti;Av. Antônio Carlos 561, Belo Horizonte - MG;31 3472-3126;2450
SENAI;Belo Horizonte;CTTI;R. Rio De Janeiro, 471 - 13° Andar - Centro CEP 30160-440 Belo Horizonte;31 3472-3129;2500
SESI;Belo Horizonte; MARIZA ARAÚJO;Lindolfo Caetano, 10- Calafate - Belo Horizonte - Minas Gerais;31 3472-3130;2550
SESI;Belo Horizonte;Catem;R. Albert Scharlet 05, Madre Gertrudes, BH - MG;31 3472-3131;2600
SESI;Belo Horizonte;General Onésimo Becker De Araújo;Rua Cipriano De Carvalho, 255, Barreiro - Belo Horizonte;31 3472-3124;2650
SESI;Belo Horizonte;Museu De Artes E Ofícios;Praça Rui Barbosa, 600 - Centro - Belo Horizonte MG;31 2116-0419;2700
SESI;Belo Horizonte;Newton Antônio Da Silva Pereira;Rua Airuoca, 539 - BHte - MG - CEP: 31910-130;31 3472-3125;2750
SESI;Belo Horizonte;São João Batista;Rua Moacyr Froes, 83 - São João Batista. Belo Horizonte;31 3427-2429;2800
SESI;Belo Horizonte;Teatro SESIMINAS;R. Álvares Maciel, 59 - Santa Efigênia, BH/MG - CEP - 30150-250;31 2116-0418;2850
SESI;Belo Horizonte;Unidade De Saúde E Segurança E Trabalho;Endereço:  Av. Afonso Pena, 1500 - 15° Andar - Centro, Belo Horizonte - MG;31 3361-1652;2900
SENAI;Belo Horizonte;Paulo De Tarso;Via Expressa, 3220 - Coração Eucarístico, Belo Horizonte - MG, 30720-410;31 3419-0900 ;2950
SESI;Belo Horizonte;Hamleto Magnavacca;Av Senador Levindo Coelho Nº2680;31 3385-6222;3000
SESI;Belo Horizonte;NOVA ESCOLA - CORAÇÃO EUCARISTICO;Itutinga, 340, Minas Brasil, Belo Horizonte;31 31916287;8500
SESI;LEOPODINA;LEOPODINA;Clube Jair de Oliveira;;9000
SESI;Betim;Maria Madalena Nogueira;RUA KAREN LESSA RODRIGUES, 50 - ARQUIPÉLAGO VERDE, BETIM/MG | CEP: 32656-840;31 3191-6294;8600
SESI;Betim;Clube do trabalhador Francisco Netto Motta;R. Bela Vista, 220 - Chácaras, Betim - MG, 32670-364;31 3472-3134;3150
SENAI;Betim;CETEM Maria Madalena Nogueira;Av Amazonas N° 55, Centro - Betim - MG;31 3472-3133;3200
SENAI;BETIM;antigo ISVOR;Av. Anastácio Franco do Amaral, 81 - Jardim Petropolis, Betim - MG, 32655-034;31 3593-1413;9200
SENAI;Cataguases;José Ignacio Peixoto;Rua Gama Cerqueira, 281 - Haidée, Cataguases - MG;32 3429-1050;3250
SESI;Cataguases;Rodrigo Lana;R. Ofélia Resende, 101 - Menezes, Cataguases - MG, 36773-082;32 3429-1051;3300
SENAI;Cláudio;CFP Risoleta Tolentino Neves;Rod MG 260 - Km 33, Nº 05, Anel Rodoviário - Cláudio/MG;37 3362-0016;3350
SENAI;Conceição do Mato Dentro;CFP José aparecido de oliveira;R. São Francisco, 501 - Bandeirinhas, Conceição Do Mato Dentro - MG, 35860-000; 31 3868-1876;3400
SESI;Conceição do Mato Dentro;verificar;verificar;313868-1763;3050
SENAI;Contagem; CFP Alvimar Carneiro De Rezende;Av. Sócrates Mariani Bitencourt, 711 - Cinco, Contagem - MG, 32010-010;31 3472-3141;3500
SENAI;Contagem; CFP Euvaldo Lodi;Rua Doutor José Americo Cançado Bahia Nº 75;31 3472-3139;3550
SENAI;Contagem;Cedetem;Av. Sindicalista Wanderlei Teixeira Fernandes, 265 - Polo Moveleiro, Contagem - MG, 32113-498;31 3472-3137;3600
SENAI;Contagem;Centro 4.0;R. Dr. José Américo Cansado Bahia, 123 - Cidade Industrial, Contagem - MG, 32210-130;31 3472-3143;3650
SESI;Contagem;Alvimar Carneiro De Rezende;Av. Sócrates Mariani Bitencourt, 750 - Cinco, Contagem - MG, 32010-010;31 3472-3142;3700
SESI;Contagem;Benjamin Guimarães;R. Um, 303 - Santa Maria Contagem - MG;31 3472-3138;3750
SESI;Contagem;Centro De Educação Infantil  Leonor Franco;R. Rio Paranaguá, 129 - Novo Riacho, Contagem - MG, 32280-300;31 3472-3135;3800
SESI;Contagem;Restaurante Do Trabalhador Henriqueta Maria Pietro;Av. Cardeal Eugênio Pacelli, 2211.;31 3472-3136;3850
SESI;Curvelo;Arthur Brito Bezerra Mello;Rua Guimarães Rosa, 185 - Bela Vista 35790-000 Curvelo;38 3721-3434;3900
SENAI;Divinópolis;CFP Anielo Greco;Rua, Tv. Eng. Benjamim De Oliveira, 144 - A - Esplanada, Divinópolis;37 3112-0002;4000
SESI;Divinópolis;Cat Coronel Jovelino Rabelo;Rua Pratápolis, 02 - Bom Pastor. Divinópolis / MG;37 3222-0646;4050
SESI;Divinópolis;SST;Rua, Tv. Eng. Benjamim De Oliveira, 144 - Esplanada, Divinópolis;37  3690-4400;8650
SENAI;Extrema;CFP Janez Hlebanja;Av. Alcebíades Gilli, Nº 11; 35 3100-1350;4100
SESI;Extrema;SESI Escola Extrema;Avenida Paulo Migliorini, 303 - Morro Grande - Extrema - MG;35 3435-5864;4150
SENAI;Formiga;CT Luiz Rodrigues Da Costa;Trua João Pedrosa, 215 - Quinzinho Formiga -MG;37 3321-3218;4200
SENAI;Governador Valadares;Ui Luiz Chaves;Rua Leda Maria Mota Godinho, 120 - JK II - MG - CEP 35045-570;33 3272-4615;4300
SESI;Governador Valadares;Abílio Rodrigues Patto;Treze De Maio, 1120 - São Paulo, Gov. Valadares - MG, 35030-210;33 3272-6590;4350
SESI;Governador Valadares;Segurança e Saúde no Trabalho em Governador Valadares;Rua Treze de Maio, 1120 - Bairro São Paulo;33 3272-6623;8700
SESI;Ipatinga;Unidade De Segurança E Saúde No Trabalho;Rua Guarujá, 74 - Vila Ipanema - Ipatinga MG;31 3823-3038;4400
SENAI;Ipatinga;Rinaldo Campos Soares;Av. Pedro Linhares Gomes, 5431 - Horto, Ipatinga - MG;31 3822-9604;4500
SESI;Ipatinga;Escola Santa Rita De Cássia;Rua Wenceslau Brás, N 65 - Imbaúbas, Ipatinga - MG;31 3823-3029;4550
SESI;Ipatinga;Rinaldo Campos Soares; Av. Pedro Linhares Gomes, 5431 - Horto, Ipatinga - MG, 35160-900;31 3824-8132;8750
SENAI;Itabira;CFP Pedro Martins Guerra;Rua Nossa Senhora Da Piedade, S/N,Bairro: Campestre;31 3834-5678;4600
SENAI;Itabirito;CFP LAÉRCIO GARCIA NOGUEIRA;Rua João Pinheiro, 895, Santa Efigênia - Itabirito - MG;31 3561-4058;4650
SESI;Itajubá;Vitor Vieira Dos Santos;Av. Dos Ferroviários, 725 - Morro Chic, Itajubá - MG, 37505-034;35 3622-2809;4750
SENAI;Itajubá; Aureliano Chaves;Rua Doutor Luiz Rennó, 715 - Avenida, Itajubá - MG, 37504-050;35 3623-1788;4700
SENAI;Itaúna; NUMES Núcleo de Reforma de Máquinas e Equipamentos SENAI/MG;R. Lília Antunes, 99 - Nogueira Machado, Itaúna - MG, 35680-270;37 32041145;4800
SENAI;Itaúna;Cetef Marcelino Corradi;R. Lília Antunes, 99 - Nogueira Machado, Itaúna - MG, 35680-270;37 3249-2400;4850
SESI;Itaúna;Unidade De Segurança E Saúde No Trabalho ;Rua Godofredo Goncalves 316, Centro Itaúna-MG CEP 35680047;37 3201-0552;4900
SESI;Itaúna;Escola Dario Gonçalves De Souza;Avenida São João, 4147, Centro, Itaúna - MG - CEP 35680-065;37 3249-0300;4950
SESI;João Monlevade;Dr. Schlacher;R. Alvoni De Castro, 0 - José De Alencar, João Monlevade - MG;31 3851-2868;5150
SENAI;João Monlevade;Nansen Araújo ;Rua Vinte E Três, 140, Areia Preta, João Monlevade - MG;31 3851-5171;5100
SENAI;Juiz de Fora;Cidt Luiz Adelar Scheuer;Rodovia Br-040, Km 773, S/N - Barreira Do Triunfo, MG, 36035-000;32 3692-8240;5250
SENAI;Juiz de Fora;José Fagundes Netto;Av. Barão Do Rio Branco, 1219 - Centro, Juiz De Fora - MG;32 3692-8239;5300
SESI;Juiz de Fora;Centro Esportivo Do Trabalhador José Weiss;Av. Brasil, 3357 - Centro, Juiz De Fora - MG, 36060-010;32 3239-2266;5350
SESI;Juiz de Fora;Clube Campestre Nansen Araújo;Av. Eugênio Do Nascimento, 201 - Juiz De Fora, MG, 36038-330;32 3239-2255;5400
SESI;Juiz de Fora;Cidt Luiz Adelar Scheuer Restaurante;Br 040 Km 773, Juiz De Fora;32 3692-8238;5450
SESI;Juiz de Fora;Unidade De Saúde E Segurança No Trabalho;R. Marechal Floriano Peixoto, 550, Centro - Juiz De Fora;32 3692-8236;5500
SESI;Juiz de Fora;NOVA ESCOLA;Rua Sampaio, 300 - GRANBERY;(32) 3239-2213;8850
SENAI;Lagoa Santa;CIT ITR; Avenida Belmiro João Salomão, 35 - Bairro Latiçam Gomides, Lagoa Santa - MG, 33400-000;31 3191-6292;2050
SENAI;Mariana; CFP Jose Luciano Duarte Penido;Rodovia Do Contorno, S/N - Colina CEP 35420-000 - Mariana - MG;31 3557-2120;5550
SENAI;Montes Claros;CFP Luiz De Paula;Av. Dulce Sarmento, 601 - São José - Montes Claros - MG;38 3441-0037;5650
SESI;Montes Claros;Escola;Rua Paris, 240 - Ibituruna;38 3441-0039;5750
SESI;Montes Claros;Unidade De Segurança E Saúde No Trabalho;Av. Armênio Veloso, 46 - Centro - Montes Claros - MG;38 3441-0038;5800
SESI;Montes Claros; Clube Do Trabalhador Valdemar Versiani Dos Anjos;Rua Ivete Vargas, nº 450 - Vila Regina;38 3441-0035;5700
SENAI;Muriaé;Cezar Augusto Bianchi Botaro;Rua Sinval Florêncio Da Silva - Centro, Muriaé - MG;32 3696-4850;5850
SENAI;Nova Lima; CFP Afonso Greco ;Praça Expedicionário Assunção, 168 - MG - CEP 34000-309;31 3541-3209;5900
SENAI;Ouro Branco;CFP;Rua Macapá 177, Luzia Augusta - Ouro Branco MG; 31 3749-7251;6000
SESI;Ouro Branco;Unidade De Segurança E Saúde No Trabalho;R. Cristais, 254 - Metalúrgicos, Ouro Branco - MG, 36420-000;31 3749-7250;6025
SESI;Ouro Preto; Centro Cultural E Turístico;Praça Tiradentes 04, Ouro Preto;31 3551-5220;8400
SESI;Paracatu;NOVA ESCOLA;verificar;1111111111;8950
SENAI;Paracatu; UI EPITÁCIO CARDOSO NAVES;Rua Afrânio Salustiano Pereira, 201, Paracatu, Minas Gerais;38 3671-9035;6150
SESI;PATOS DE MINAS;NOVA ESCOLA;verificar;1111111111;9050
SESI;Pedro Leopoldo;Pedro Leopoldo UI GERSON DIAS;Av. Coronel Juventino Dias, 856 - Centro - Pedro Leopoldo - MG;31 3660-0200;6300
SENAI;Pirapetinga;Dirceu De Oliveira Martins;Rua Antônio Ribeiro Da Costa Jr - Centro, Pirapetinga - MG;32 3465-1852;6350
SENAI;Pirapora; Ui Sebastião Augusto De Lima;Rua Cristiano Machado, 765 39270-000 - Pirapora MG;38 3743-9619;6400
SESI;POÇOS DE CALDAS;NOVA ESCOLA;Av. João Pinheiro, 1046 - Centro, Poços de Caldas - MG, 37701-386;35 3114-5395;9100
SENAI;Poços de Caldas;João Moreia Salles;Rua Pedro Barbosa 600 - Monte Verde - Poços De Caldas;35 3729-2600;6450
SENAI;Ponte Nova;CFP São Vicente De Paulo ;Av. Dr. Cristiano De Freitas Castro, 930 - Triângulo, Ponte Nova MG;31 3817-1912;8225
SESI;Ponte Nova;Cat Gastão Ferreira Dos Santos;Av. Dr. Cristiano De Freitas Castro, 930 - Triângulo, Ponte Nova MG; 31 3817-3326;9150
SESI;Pouso Alegre;Cat Irmão Gino Maria Rossi;Praça José Correa Campos, 46 - São Geraldo Pouso Alegre;35 3112-1023;6550
SENAI;Pouso Alegre;Orlando Chiarini;Av. Ver. Antônio Da Costa Rios, 322 - São Geraldo, Pouso Alegre - MG, 37550-000;35 3423-7330;6600
SENAI;Santa Luzia;UI João Carlos Giovannini;Rua Benedito Freire Da Paz, 197, Boa Esperança, Santa Luzia;31 3641-4518;6650
SENAI;Santa Rita do Sapucaí;Srs Estefan Bogdan Saleg;Rua Empresarial Prefeito Paulo Frederico De Toledo,160 Arco Íris;35 3471-5671;6700
SENAI;Santo Antônio do Monte;CT Pirotecnia - Oscar José Do Nascimento;Rua Padre Paulo, 525, Bairro Mãe Chiquinha - Santo Antônio Do Monte - MG CEP 35560-000;37 3281-3315;6750
SENAI;São Gonçalo do Rio Abaixo; CFP José Fernando Coura;R. Januária, 646 - Guanabara;31 3833-5753;6850
SESI;São Gonçalo do Sapucaí;Ui José Bento Nogueira Junqueira;Av Jose Benedito De Paiva - São Gonçalo Do Sapucaí, MG, 37490-000;32 3241-1183;6900
SESI;são João Del Rei;Escola Dom Bosco;R. Engenheiro Gustavo Campos, 15 - Matosinhos;32 3371-5410;6950
SENAI;são João Del Rei;Silvio Assunção Teixeira;Praça Bom Jesus De Matosinhos, 1 - São João Del Rei;32 3371-6303;7000
SENAI;São João Nepomuceno;UI ROBSON BRAGA DE ANDRADE;R. Roberto Schincariol, 81 - Distrito Industrial, São João Nepomuceno - MG;32 3261-7011;7050
SENAI;São Sebastião do Paraíso;Monsenhor  Jerônimo Mancin;R. Ten. José Joaquim, 1512 - Vila Helena, São Sebastião Do Paraíso - MG;35 3558-1365;7100
SENAI;Sete Lagoas;Fundação Zerrenner;Av. Cornélio Viana, 1115, Nossa Senhora do Carmo;31 3776-9930;7150
SESI;Sete Lagoas;Otoni Alves Costa;R. Joaquim Madaleno, 56 - Chácara Do Paiva, Sete Lagoas;31 3509-0402;7200
SENAI;Timóteo;CFP Luciano José De Araújo;Av. Judite Maria Do Carmo, 12 - Olaria, Timóteo - MG, 35180-184;31 3848-1198;7250
SENAI;Três Marias;CFP Ademar Marra;Av. Campos Gerais, Nº 69 - Parque Diadorim;38 3754-8650;7300
SESI;Três Pontas;Professor Josino De Brito Campos;Rua Regina Célia Vicentini, 297 Bairro Alcides Mesquita ;35 3265-4210;7350
SENAI;Turmalina;CFP;Avenida Eucalipto, Número 1000, Nova Turmalina- Turmalina-MG;38 3527-1978;7400
SENAI;Ubá;José Alencar Gomes Da Silva Ubá;Av. Jesus Brandão, 452 - San Raphael, Ubá - MG, 36500-000;32 3541-2752;7450
SESI;Ubá;José Alencar Gomes Da Silva;Avenida Jesus Brandão, 360 - San Raphael, Ubá - Minas Gerais - CEP 36507-190;32 3531-1036;7500
SESI;Varginha;Clube Hylio Foresti;Av. Dr. Mario Frota, 195 - Santa Maria - Varginha - MG, 37044-270;1111111111;8050
SESI;Varginha;Aloysio Ribeiro De Almeida Unidade II;Av. Dr. Mario Frota, 195 - Santa Maria - Varginha - MG, 37044-270;35 3113-0017;8100
SENAI;Varginha;Ui Aloysio Ribeiro De Almeida Unidade I;Av. Benjamin Constant, Nº 389 - Centro - Varginha MG;35 3113-0016;8150
SENAI;Várzea da Palma;CFP Joaquim De Paula Ferreira;Rua Avany Leite Greco, 631 - Paulo Vi 39.260-000 Várzea Da Palma MG;38 3731-1037;8200
SESI;Vespasiano;UI LUIZ CÉSAR ALBERTINI;R. Manoel Bertoldo Fagundes, 480 - Vespasiano, 33200-662;31 3629-9350;8300
SENAI;Visconde do Rio Branco;Silvio Benatti;Av. São João Batista, 165 - Centro, Visconde Do Rio Branco -MG; 32 3551-6905;8350
SENAI;PASSOS;SENAI Passos UI Clezia de Melo Freire.;Rua Mogiana s/nº - Canjeranus, Passos - M;35 2115-0053;9025
SESI;ALFENAS;ESCOLA;verificar;35 2135-0068;9125
SESI SENAI;ARAÇUAÍ;ESCOLA;verificar;33 3731-9499;9225
SESI;ARCOS;ESCOLA;verificar;37 2031-0052;9250`;

let sqlContent = "BEGIN;\n\n";

const lines = rawCsv.split('\n');
for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    if (!line.trim()) continue;

    // Fix that weird quoting in one of the lines
    const processedLine = line.replace(/"Av\. Benjamin Constant; Nº 389 - Centro - Varginha MG"/g, 'Av. Benjamin Constant, Nº 389 - Centro - Varginha MG');

    const parts = processedLine.split(';');

    // Tratamos as 6 divisões exigidas: Entidade; Cidade; Unidade; Endereço; Telefone; Ramal
    if (parts.length >= 6) {
        let ent = parts[0].trim().toUpperCase();

        // Tratamento da entidade SESI SENAI => SESI
        if (ent === 'SESI SENAI' || ent === 'SESI  SENAI') {
            ent = 'SESI';
        }

        const cid = parts[1].trim();
        const uni = parts[2].trim();
        const end = parts[3].trim();
        const num = parts[4].trim();
        const fx = parts[5].trim();

        let rx_full = fx;
        if (fx && !fx.includes("-") && !isNaN(parseInt(fx))) {
            const base = parseInt(fx);
            rx_full = `${base} - ${base + 49}`;
        }

        const formatString = (str) => {
            return str.replace(/"/g, "").replace(/'/g, "''");
        };

        const nome_completo = formatString(uni); // Usando unicamente a coluna da unidade

        const cidade_limpo = formatString(cid);
        const end_limpo = formatString(end);
        const entidade_limpa = formatString(ent);

        // Remover apenas formatação não-numérica, tolerando vazios
        let num_limpo = num ? num.replace(/[^0-9]/g, "") : "";

        if (num_limpo === "1111111111" || num_limpo === "11111111111") {
            num_limpo = "";
        }

        let formattedNum = "";
        if (num_limpo) {
            // Se o número tiver menos de 10 numerais reais, ESTICA até 10 completando com zero.
            if (num_limpo.length < 10) {
                while (num_limpo.length < 10) num_limpo = num_limpo + '0';
            }
            num_limpo = num_limpo.substring(0, 10);

            // Mascara de inserção aceita pelo Supabase/Modal: (XX) XXXX-XXXX
            formattedNum = `(${num_limpo.substring(0, 2)}) ${num_limpo.substring(2, 6)}-${num_limpo.substring(6, 10)}`;
        }

        sqlContent += `
DO $$
DECLARE
    v_unidade_id uuid;
BEGIN
    INSERT INTO public.unidades (nome, entidade, cidade, endereco, "faixaRamais")
    VALUES ('${nome_completo}', '${entidade_limpa}', '${cidade_limpo}', '${end_limpo}', '${rx_full}')
    RETURNING id INTO v_unidade_id;
`;
        // Só inserimos a linha se ela de fato continha telefones úteis no CSV (+ de 1111111) ou não era vazio (;;9000).
        if (formattedNum) {
            sqlContent += `
    INSERT INTO public.linhas (numero, operadora, \"unidadeId\", status, "tipoPlano")
    VALUES ('${formattedNum}', 'Método', v_unidade_id, 'Ativa');
`;
        }
        sqlContent += "END $$;\n";
    }
}

sqlContent += "\nCOMMIT;\n";

// Substitua "fs" pela biblioteca de banco do NodeJS desejada ou exporte o SQL textualmente:
fs.writeFileSync('import_unidades_csv.sql', sqlContent, 'utf8');
console.log('Script Mestre (121) gerado!');
