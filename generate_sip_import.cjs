const fs = require('fs');

const csv1_raw = `Funcionário;Nome do ramal;MICROSIP;Senha;Ramal;setor;Grupos de Captura;Redirecionamento de ligação em caso de ocupado/não atende;Número principal;nome da URA;Mensagem inicial;Opções URA;texto da opção;DESTINO: Grupo de Busca/ Ramal
Carol;COBRANCA;3192411800;R3m@t0754;1800;AIM - FINANCEIRO - COBRANCA;GC-COBRANCA;Recepção > 2001;31 3241 7173;URA_financeiro;Olá, você ligou no Suporte Administrativo Financeiro do Sistema FIEMG. Digite o ramal ou aguarde para ouvir as opções.;Opçao 01;Para falar com o Suporte administrativo e financeiro. Digite 1;URA secundaria - Opção 1
Thiago;COBRANCA;3192411801;R3m@t0529;1801;AIM - FINANCEIRO - COBRANCA;GC-COBRANCA;Administrativo > 2000;31 3241 7173;URA_financeiro;;Opçao 02;Para falar com o setor de Cobrança. Digite 2;GC-COBRANCA
William;COBRANCA;3192411802;R3m@t0770;1802;AIM - FINANCEIRO - COBRANCA;GC-COBRANCA;Esportes > 2001;31 3241 7173;URA_financeiro;;Opçao 03;Para faturamento com recebíveis. Digite 3;GC-RECEBIVEIS
Thais - Ferias;COBRANCA;3192411803;R3m@t0230;1803;AIM - FINANCEIRO - COBRANCA;GC-COBRANCA;;31 3241 7173;URA_financeiro;;Opçao 04;Ou aguarde na linha para ser atentido.;GC-SUPORTE
Vitoria;COBRANCA;3192411804;R3m@t0414;1804;AIM - FINANCEIRO - COBRANCA;GC-COBRANCA;;31 3241 7173;URA_financeiro;;;;
Telma;COBRANCA;3192411805;R3m@t0744;1805;AIM - FINANCEIRO - COBRANCA;GC-COBRANCA;;31 3241 7173;URA_financeiro;;;;
Jacqueline;COBRANCA;3192411806;R3m@t0201;1806;AIM - FINANCEIRO - COBRANCA;GC-COBRANCA;;31 3241 7173;URA_financeiro;;;;
Claudiana;COBRANCA;3192411807;R3m@t0173;1807;AIM - FINANCEIRO - COBRANCA;GC-COBRANCA;;31 3241 7173;URA_financeiro;;;;
Sandra e Flavio;RECEBIVEIS;3192411808;R3m@t0632;1808;AIM - FINANCEIRO - RECEBIVEIS;GC-RECEBIVEIS;;31 3241 7173;URA_financeiro;;;;
Deise e Olga;RECEBIVEIS;3192411809;R3m@t0261;1809;AIM - FINANCEIRO - RECEBIVEIS;GC-RECEBIVEIS;;31 3241 7173;URA_financeiro;;;;
Poliana;SUPORTE;;;1810;AIM - FINANCEIRO - SUPORTE;GC-SUPORTE;;31 3241 7173;URA_financeiro;;;;
Barbara;SUPORTE;;;1811;AIM - FINANCEIRO - SUPORTE;GC-SUPORTE;;31 3241 7173;URA_financeiro;;;;
Leonardo Clayton;SUPORTE;;;1812;AIM - FINANCEIRO - SUPORTE;GC-SUPORTE;;31 3241 7173;URA_financeiro;;;;
Leonardo Tomas;SUPORTE;;;1813;AIM - FINANCEIRO - SUPORTE;GC-SUPORTE;;31 3241 7173;URA_financeiro;;;;
Patricia;SUPORTE;;;1814;AIM - FINANCEIRO - SUPORTE;GC-SUPORTE;;31 3241 7173;URA_financeiro;;;;
Thais;TESOURARIA;;;1815;AIM - FINANCEIRO - TESOURARIA;GC-TESOURARIA;;31 3241 7173;URA_financeiro;;;;
Geisa;TESOURARIA;;;1816;AIM - FINANCEIRO - TESOURARIA;GC-TESOURARIA;;31 3241 7173;URA_financeiro;;;;
Jonatha;TESOURARIA;;;1817;AIM - FINANCEIRO - TESOURARIA;GC-TESOURARIA;;31 3241 7173;URA_financeiro;;;;
hugo;TESOURARIA;;;1818;AIM - FINANCEIRO - TESOURARIA;GC-TESOURARIA;;31 3241 7173;URA_financeiro;;;;
Vanessa;PRESTACAO DE CONTAS;;;1819;AIM- FINANCEIRO - PRESTACAO DE CONTAS;GC-PRESTACAO DE CONTAS;;3132806001;;;;;
Cintia;PRESTACAO DE CONTAS;;;1820;AIM- FINANCEIRO - PRESTACAO DE CONTAS;GC-PRESTACAO DE CONTAS;;3132806001;;;;;
Marcos;PRESTACAO DE CONTAS;;;1821;AIM- FINANCEIRO - PRESTACAO DE CONTAS;GC-PRESTACAO DE CONTAS;;3132806002;;;;;
Leticia;PRESTACAO DE CONTAS;;;1822;AIM- FINANCEIRO - PRESTACAO DE CONTAS;GC-PRESTACAO DE CONTAS;;3132806002;;;;;
Ayrane;PRESTACAO DE CONTAS;;;1823;AIM- FINANCEIRO - PRESTACAO DE CONTAS;GC-PRESTACAO DE CONTAS;;3132806003;;;;;
Mackissuel ;PRESTACAO DE CONTAS;;;1824;AIM- FINANCEIRO - PRESTACAO DE CONTAS;GC-PRESTACAO DE CONTAS;;3132806003;;;;;
Ronaldo - ferias;PRESTACAO DE CONTAS;;;1825;AIM- FINANCEIRO - PRESTACAO DE CONTAS;GC-PRESTACAO DE CONTAS;;3132806004;;;;;
fRANCIELLE;PRESTACAO DE CONTAS;;;1826;AIM- FINANCEIRO - PRESTACAO DE CONTAS;GC-PRESTACAO DE CONTAS;;3132806004;;;;;
;ARRECADACAO;;;1827;AIM - FINANCEIRO - ARRECADACAO;;;31 3241 7180;;;;;
;ARRECADACAO;;;1828;AIM - FINANCEIRO - ARRECADACAO;;;31 3241 7183;;;;;
;FATURAMENTO;;;1829;AIM - FINANCEIRO - FATURAMENTO;;;3132806005;;;;;
;FATURAMENTO;;;1830;AIM - FINANCEIRO - FATURAMENTO;;;3132806005;;;;;
Heloisa e Mara;SUPRIMENTOS;;R3m@t0573;1831;AIM - SUPRIMENTOS;;;3132806006;;;;;
Andreá e Danielle;SUPRIMENTOS;;R3m@t0715;1832;AIM - SUPRIMENTOS;;;3132806006;;;;;
Bruno e  Ana Cristina A;SUPRIMENTOS;;R3m@t0533;1833;AIM - SUPRIMENTOS;;;3132806006;;;;;
Ademir e Ilídio;SUPRIMENTOS;;R3m@t0391;1834;AIM - SUPRIMENTOS;;;3132806006;;;;;
Renata e Izabela Gonçalves A;SUPRIMENTOS;;R3m@t0127;1835;AIM - SUPRIMENTOS;;;3132806006;;;;;
Priscilla e Marilene A;SUPRIMENTOS;;R3m@t0979;1836;AIM - SUPRIMENTOS;;;3132806006;;;;;
Liliane e Isabella Sales A;SUPRIMENTOS;;R3m@t0206;1837;AIM - SUPRIMENTOS;;;3132806006;;;;;
Renato e Regina Kelly;SUPRIMENTOS;;R3m@t0510;1838;AIM - SUPRIMENTOS;;;3132806006;;;;;
Alexandre e Isabela Lamarca;SUPRIMENTOS;;R3m@t0583;1839;AIM - SUPRIMENTOS;;;3132806006;;;;;
Ana Paula e Débora A;SUPRIMENTOS;;R3m@t0635;1840;AIM - SUPRIMENTOS;;;3132806006;;;;;
Thatiane e Lindsleine;SUPRIMENTOS;;R3m@t0702;1841;AIM - SUPRIMENTOS;;;3132806006;;;;;
Anderson e Vinicius;SUPRIMENTOS;;R3m@t0771;1842;AIM - SUPRIMENTOS;;;3132806006;;;;;
Matheus Cobra;SUPRIMENTOS;;R3m@t0830;1843;AIM - SUPRIMENTOS;;;3132806006;;;;;
Ana Paula, Jaqueline e Daniela Rodrigues;SUPRIMENTOS;;R3m@t0668;1844;AIM - SUPRIMENTOS;;;3132806006;;;;;
Maria Luiza, Patricia e Lilian;SUPRIMENTOS;;R3m@t0609;1845;AIM - SUPRIMENTOS;;;3132806006;;;;;
Jennifer, Jéssica;SUPRIMENTOS;;R3m@t0155;1846;AIM - SUPRIMENTOS;;;3132806006;;;;;
Lucas, Yuri e Daniel;SUPRIMENTOS;;R3m@t0670;1847;AIM - SUPRIMENTOS;;;3132806006;;;;;
André Alves da Creuz;SUPRIMENTOS;;R3m@t0466;1848;AIM - SUPRIMENTOS;;;3132806006;;;;;
Gestão de Fornecedores (a definir as pessoas);SUPRIMENTOS;;R3m@t0490;1849;AIM - SUPRIMENTOS;;;3132806006;;;;;
Gestão de Fornecedores (a definir as pessoas);SUPRIMENTOS;;R3m@t0443;1850;AIM - SUPRIMENTOS;;;3132806006;;;;;
;;;;;;;;3132806006;;;;;
;GESTAO DE CONTRATOS;;;1851;AIM - GESTAO DE CONTRATOS;;;3132806006;;;;;
;GESTAO DE CONTRATOS;;;1852;AIM - GESTAO DE CONTRATOS;;;3132806006;;;;;
;CONTROLADORIA;;;1853;AIM - CONTROLADORIA;;;3132806000;;;;;
;FISCAL;;;1854;AIM - CONTROLADORIA;;;3132806000;;;;;
;FISCAL;;;1855;AIM - CONTROLADORIA;;;3132806000;;;;;
;FISCAL;;;1856;AIM - CONTROLADORIA;;;3132806000;;;;;
;FISCAL;;;1857;AIM - CONTROLADORIA;;;3132806000;;;;;
;FISCAL;;;1858;AIM - CONTROLADORIA;;;3132806000;;;;;
;FISCAL;;;1859;AIM - CONTROLADORIA;;;3132806000;;;;;
;FISCAL;;;1860;AIM - CONTROLADORIA;;;3132806000;;;;;
;CONTABILIDADE;;;1861;AIM - CONTROLADORIA;;;3132806000;;;;;
;CONTABILIDADE;;;1862;AIM - CONTROLADORIA;;;3132806000;;;;;
;CONTABILIDADE;;;1863;AIM - CONTROLADORIA;;;3132806000;;;;;
;CONTABILIDADE;;;1864;AIM - CONTROLADORIA;;;3132806000;;;;;
;CONTABILIDADE;;;1865;AIM - CONTROLADORIA;;;3132806000;;;;;
;CONTABILIDADE;;;1866;AIM - CONTROLADORIA;;;3132806000;;;;;
;CONTABILIDADE;;;1867;AIM - CONTROLADORIA;;;3132806000;;;;;
;ORÇAMENTO;;;1868;AIM - CONTROLADORIA;;;3132806000;;;;;
;ORÇAMENTO;;;1869;AIM - CONTROLADORIA;;;3132806000;;;;;
;ORÇAMENTO;;;1870;AIM - CONTROLADORIA;;;3132806000;;;;;
;ORÇAMENTO;;;1871;AIM - CONTROLADORIA;;;3132806000;;;;;
;ORÇAMENTO;;;1872;AIM - CONTROLADORIA;;;3132806000;;;;;
;PATRIMÔNIO;;;1873;AIM - CONTROLADORIA;;;3132806000;;;;;
;PATRIMÔNIO;;;1874;AIM - CONTROLADORIA;;;3132806000;;;;;
;PATRIMÔNIO;;;1875;AIM - CONTROLADORIA;;;3132806000;;;;;
;PATRIMÔNIO;;;1876;AIM - CONTROLADORIA;;;3132806000;;;;;
;PATRIMÔNIO;;;1877;AIM - CONTROLADORIA;;;3132806000;;;;;
;ENGENHARIA;;;1878;AIM - ENGENHARIA;;;31 3263 4753;;;;;
;RECEPCAO ;;;1879;AIM - RECEPCAO;;;31 3241 7185;;;;;
André, Matheus;SERVICEDESK - RBA;;;1880;AIM - GTI;;;3132806007;;;;;
TURMA TODA;SERVICEDESK-AYMORES;;;1881;AIM - GTI;;;3132806007;;;;;
;GTI;;;1882;AIM - GTI;;;3132806007;;;;;
;GTI;;;1883;AIM - GTI;;;3132806008;;;;;
;GTI;3192411884;R3m@t0839;1884;AIM - GTI;;;3132806008;;;;;
;GTI;3192411865;R3m@t0302;1885;AIM - GTI;;;3132806008;;;;;`;

const csv2_raw = `COBRANCA;1800;ramal.1800@fiemg.com.br;3192411800;1800;PREMIUM_PEMM;GRP_FIEMG_AIMORES;;ramal.1800@fiemg.com.br;R3m@t0754;
COBRANCA;1801;ramal.1801@fiemg.com.br;3192411801;1801;PREMIUM_PEMM;GRP_FIEMG_AIMORES;;ramal.1801@fiemg.com.br;R3m@t0529;
COBRANCA;1802;ramal.1802@fiemg.com.br;3192411802;1802;PREMIUM_PEMM;GRP_FIEMG_AIMORES;;ramal.1802@fiemg.com.br;R3m@t0770;
COBRANCA;1803;ramal.1803@fiemg.com.br;3192411803;1803;PREMIUM_PEMM;GRP_FIEMG_AIMORES;;ramal.1803@fiemg.com.br;R3m@t0230;
COBRANCA;1804;ramal.1804@fiemg.com.br;3192411804;1804;PREMIUM_PEMM;GRP_FIEMG_AIMORES;;ramal.1804@fiemg.com.br;R3m@t0414;
COBRANCA;1805;ramal.1805@fiemg.com.br;3192411805;1805;PREMIUM_PEMM;GRP_FIEMG_AIMORES;;ramal.1805@fiemg.com.br;R3m@t0744;
COBRANCA;1806;ramal.1806@fiemg.com.br;3192411806;1806;PREMIUM_PEMM;GRP_FIEMG_AIMORES;;ramal.1806@fiemg.com.br;R3m@t0201;
COBRANCA;1807;ramal.1807@fiemg.com.br;3192411807;1807;PREMIUM_PEMM;GRP_FIEMG_AIMORES;;ramal.1807@fiemg.com.br;R3m@t0173;
RECEBIVEIS;1808;ramal.1808@fiemg.com.br;3192411808;1808;PREMIUM_PEMM;GRP_FIEMG_AIMORES;;ramal.1808@fiemg.com.br;R3m@t0632;
RECEBIVEIS;1809;ramal.1809@fiemg.com.br;3192411809;1809;PREMIUM_PEMM;GRP_FIEMG_AIMORES;;ramal.1809@fiemg.com.br;R3m@t0261;
SUPORTE;1810;ramal.1810@fiemg.com.br;3192411810;1810;PREMIUM_PEMM;GRP_FIEMG_AIMORES;;ramal.1810@fiemg.com.br;R3m@t0292;
SUPORTE;1811;ramal.1811@fiemg.com.br;3192411811;1811;PREMIUM_PEMM;GRP_FIEMG_AIMORES;;ramal.1811@fiemg.com.br;R3m@t0341;
SUPORTE;1812;ramal.1812@fiemg.com.br;3192411812;1812;PREMIUM_PEMM;GRP_FIEMG_AIMORES;;ramal.1812@fiemg.com.br;R3m@t0135;
SUPORTE;1813;ramal.1813@fiemg.com.br;3192411813;1813;PREMIUM_PEMM;GRP_FIEMG_AIMORES;;ramal.1813@fiemg.com.br;R3m@t0872;
SUPORTE;1814;ramal.1814@fiemg.com.br;3192411814;1814;PREMIUM_PEMM;GRP_FIEMG_AIMORES;;ramal.1814@fiemg.com.br;R3m@t0171;
TESOURARIA;1815;ramal.1815@fiemg.com.br;3192411815;1815;PREMIUM_PEMM;GRP_FIEMG_AIMORES;;ramal.1815@fiemg.com.br;R3m@t0935;
TESOURARIA;1816;ramal.1816@fiemg.com.br;3192411816;1816;PREMIUM_PEMM;GRP_FIEMG_AIMORES;;ramal.1816@fiemg.com.br;R3m@t0801;
TESOURARIA;1817;ramal.1817@fiemg.com.br;3192411817;1817;PREMIUM_PEMM;GRP_FIEMG_AIMORES;;ramal.1817@fiemg.com.br;R3m@t0798;
TESOURARIA;1818;ramal.1818@fiemg.com.br;3192411818;1818;PREMIUM_PEMM;GRP_FIEMG_AIMORES;;ramal.1818@fiemg.com.br;R3m@t0207;
PRESTACAO DE CONTAS;1819;ramal.1819@fiemg.com.br;3192411819;1819;PREMIUM_PEMM;GRP_FIEMG_AIMORES;;ramal.1819@fiemg.com.br;R3m@t0691;
PRESTACAO DE CONTAS;1820;ramal.1820@fiemg.com.br;3192411820;1820;PREMIUM_PEMM;GRP_FIEMG_AIMORES;;ramal.1820@fiemg.com.br;R3m@t0289;
PRESTACAO DE CONTAS;1821;ramal.1821@fiemg.com.br;3192411821;1821;PREMIUM_PEMM;GRP_FIEMG_AIMORES;;ramal.1821@fiemg.com.br;R3m@t0911;
PRESTACAO DE CONTAS;1822;ramal.1822@fiemg.com.br;3192411822;1822;PREMIUM_PEMM;GRP_FIEMG_AIMORES;;ramal.1822@fiemg.com.br;R3m@t0608;
PRESTACAO DE CONTAS;1823;ramal.1823@fiemg.com.br;3192411823;1823;PREMIUM_PEMM;GRP_FIEMG_AIMORES;;ramal.1823@fiemg.com.br;R3m@t0696;
PRESTACAO DE CONTAS;1824;ramal.1824@fiemg.com.br;3192411824;1824;PREMIUM_PEMM;GRP_FIEMG_AIMORES;;ramal.1824@fiemg.com.br;R3m@t0154;
PRESTACAO DE CONTAS;1825;ramal.1825@fiemg.com.br;3192411825;1825;PREMIUM_PEMM;GRP_FIEMG_AIMORES;;ramal.1825@fiemg.com.br;R3m@t0645;
PRESTACAO DE CONTAS;1826;ramal.1826@fiemg.com.br;3192411826;1826;PREMIUM_PEMM;GRP_FIEMG_AIMORES;;ramal.1826@fiemg.com.br;R3m@t0763;
ARRECADACAO;1827;ramal.1827@fiemg.com.br;3192411827;1827;PREMIUM_PEMM;GRP_FIEMG_AIMORES;;ramal.1827@fiemg.com.br;R3m@t0651;
ARRECADACAO;1828;ramal.1828@fiemg.com.br;3192411828;1828;PREMIUM_PEMM;GRP_FIEMG_AIMORES;;ramal.1828@fiemg.com.br;R3m@t0619;
FATURAMENTO;1829;ramal.1829@fiemg.com.br;3192411829;1829;PREMIUM_PEMM;GRP_FIEMG_AIMORES;;ramal.1829@fiemg.com.br;R3m@t0740;
FATURAMENTO;1830;ramal.1830@fiemg.com.br;3192411830;1830;PREMIUM_PEMM;GRP_FIEMG_AIMORES;;ramal.1830@fiemg.com.br;R3m@t0898;
SUPRIMENTOS;1831;ramal.1831@fiemg.com.br;3192411831;1831;PREMIUM_PEMM;GRP_FIEMG_AIMORES;;ramal.1831@fiemg.com.br;R3m@t0573;
SUPRIMENTOS;1832;ramal.1832@fiemg.com.br;3192411832;1832;PREMIUM_PEMM;GRP_FIEMG_AIMORES;;ramal.1832@fiemg.com.br;R3m@t0715;
SUPRIMENTOS;1833;ramal.1833@fiemg.com.br;3192411833;1833;PREMIUM_PEMM;GRP_FIEMG_AIMORES;;ramal.1833@fiemg.com.br;R3m@t0533;
SUPRIMENTOS;1834;ramal.1834@fiemg.com.br;3192411834;1834;PREMIUM_PEMM;GRP_FIEMG_AIMORES;;ramal.1834@fiemg.com.br;R3m@t0391;
SUPRIMENTOS;1835;ramal.1835@fiemg.com.br;3192411835;1835;PREMIUM_PEMM;GRP_FIEMG_AIMORES;;ramal.1835@fiemg.com.br;R3m@t0127;
SUPRIMENTOS;1836;ramal.1836@fiemg.com.br;3192411836;1836;PREMIUM_PEMM;GRP_FIEMG_AIMORES;;ramal.1836@fiemg.com.br;R3m@t0979;
SUPRIMENTOS;1837;ramal.1837@fiemg.com.br;3192411837;1837;PREMIUM_PEMM;GRP_FIEMG_AIMORES;;ramal.1837@fiemg.com.br;R3m@t0206;
SUPRIMENTOS;1838;ramal.1838@fiemg.com.br;3192411838;1838;PREMIUM_PEMM;GRP_FIEMG_AIMORES;;ramal.1838@fiemg.com.br;R3m@t0510;
SUPRIMENTOS;1839;ramal.1839@fiemg.com.br;3192411839;1839;PREMIUM_PEMM;GRP_FIEMG_AIMORES;;ramal.1839@fiemg.com.br;R3m@t0583;
SUPRIMENTOS;1840;ramal.1840@fiemg.com.br;3192411840;1840;PREMIUM_PEMM;GRP_FIEMG_AIMORES;;ramal.1840@fiemg.com.br;R3m@t0635;
SUPRIMENTOS;1841;ramal.1841@fiemg.com.br;3192411841;1841;PREMIUM_PEMM;GRP_FIEMG_AIMORES;;ramal.1841@fiemg.com.br;R3m@t0702;
SUPRIMENTOS;1842;ramal.1842@fiemg.com.br;3192411842;1842;PREMIUM_PEMM;GRP_FIEMG_AIMORES;;ramal.1842@fiemg.com.br;R3m@t0771;
SUPRIMENTOS;1843;ramal.1843@fiemg.com.br;3192411843;1843;PREMIUM_PEMM;GRP_FIEMG_AIMORES;;ramal.1843@fiemg.com.br;R3m@t0830;
SUPRIMENTOS;1844;ramal.1844@fiemg.com.br;3192411844;1844;PREMIUM_PEMM;GRP_FIEMG_AIMORES;;ramal.1844@fiemg.com.br;R3m@t0668;
SUPRIMENTOS;1845;ramal.1845@fiemg.com.br;3192411845;1845;PREMIUM_PEMM;GRP_FIEMG_AIMORES;;ramal.1845@fiemg.com.br;R3m@t0609;
SUPRIMENTOS;1846;ramal.1846@fiemg.com.br;3192411846;1846;PREMIUM_PEMM;GRP_FIEMG_AIMORES;;ramal.1846@fiemg.com.br;R3m@t0155;
SUPRIMENTOS;1847;ramal.1847@fiemg.com.br;3192411847;1847;PREMIUM_PEMM;GRP_FIEMG_AIMORES;;ramal.1847@fiemg.com.br;R3m@t0670;
SUPRIMENTOS;1848;ramal.1848@fiemg.com.br;3192411848;1848;PREMIUM_PEMM;GRP_FIEMG_AIMORES;;ramal.1848@fiemg.com.br;R3m@t0466;
SUPRIMENTOS;1849;ramal.1849@fiemg.com.br;3192411849;1849;PREMIUM_PEMM;GRP_FIEMG_AIMORES;;ramal.1849@fiemg.com.br;R3m@t0490;
SUPRIMENTOS;1850;ramal.1850@fiemg.com.br;3192411850;1850;PREMIUM_PEMM;GRP_FIEMG_AIMORES;;ramal.1850@fiemg.com.br;R3m@t0443;
GESTAO DE CONTRATOS;1851;ramal.1851@fiemg.com.br;3192411851;1851;PREMIUM_PEMM;GRP_FIEMG_AIMORES;;ramal.1851@fiemg.com.br;R3m@t0532;
GESTAO DE CONTRATOS;1852;ramal.1852@fiemg.com.br;3192411852;1852;PREMIUM_PEMM;GRP_FIEMG_AIMORES;;ramal.1852@fiemg.com.br;R3m@t0821;
CONTROLADORIA;1853;ramal.1853@fiemg.com.br;3192411853;1853;PREMIUM_PEMM;GRP_FIEMG_AIMORES;;ramal.1853@fiemg.com.br;R3m@t0332;
FISCAL;1854;ramal.1854@fiemg.com.br;3192411854;1854;PREMIUM_PEMM;GRP_FIEMG_AIMORES;;ramal.1854@fiemg.com.br;R3m@t0936;
FISCAL;1855;ramal.1855@fiemg.com.br;3192411855;1855;PREMIUM_PEMM;GRP_FIEMG_AIMORES;;ramal.1855@fiemg.com.br;R3m@t0778;
FISCAL;1856;ramal.1856@fiemg.com.br;3192411856;1856;PREMIUM_PEMM;GRP_FIEMG_AIMORES;;ramal.1856@fiemg.com.br;R3m@t0719;
FISCAL;1857;ramal.1857@fiemg.com.br;3192411857;1857;PREMIUM_PEMM;GRP_FIEMG_AIMORES;;ramal.1857@fiemg.com.br;R3m@t0507;
FISCAL;1858;ramal.1858@fiemg.com.br;3192411858;1858;PREMIUM_PEMM;GRP_FIEMG_AIMORES;;ramal.1858@fiemg.com.br;R3m@t0240;
FISCAL;1859;ramal.1859@fiemg.com.br;3192411859;1859;PREMIUM_PEMM;GRP_FIEMG_AIMORES;;ramal.1859@fiemg.com.br;R3m@t0273;
FISCAL;1860;ramal.1860@fiemg.com.br;3192411860;1860;PREMIUM_PEMM;GRP_FIEMG_AIMORES;;ramal.1860@fiemg.com.br;R3m@t0768;
CONTABILIDADE;1861;ramal.1861@fiemg.com.br;3192411861;1861;PREMIUM_PEMM;GRP_FIEMG_AIMORES;;ramal.1861@fiemg.com.br;R3m@t0658;
CONTABILIDADE;1862;ramal.1862@fiemg.com.br;3192411862;1862;PREMIUM_PEMM;GRP_FIEMG_AIMORES;;ramal.1862@fiemg.com.br;R3m@t0783;
CONTABILIDADE;1863;ramal.1863@fiemg.com.br;3192411863;1863;PREMIUM_PEMM;GRP_FIEMG_AIMORES;;ramal.1863@fiemg.com.br;R3m@t0436;
CONTABILIDADE;1864;ramal.1864@fiemg.com.br;3192411864;1864;PREMIUM_PEMM;GRP_FIEMG_AIMORES;;ramal.1864@fiemg.com.br;R3m@t0732;
CONTABILIDADE;1865;ramal.1865@fiemg.com.br;3192411865;1865;PREMIUM_PEMM;GRP_FIEMG_AIMORES;;ramal.1865@fiemg.com.br;R3m@t0302;
CONTABILIDADE;1866;ramal.1866@fiemg.com.br;3192411866;1866;PREMIUM_PEMM;GRP_FIEMG_AIMORES;;ramal.1866@fiemg.com.br;R3m@t0267;
CONTABILIDADE;1867;ramal.1867@fiemg.com.br;3192411867;1867;PREMIUM_PEMM;GRP_FIEMG_AIMORES;;ramal.1867@fiemg.com.br;R3m@t0195;
ORCAMENTO;1868;ramal.1868@fiemg.com.br;3192411868;1868;PREMIUM_PEMM;GRP_FIEMG_AIMORES;;ramal.1868@fiemg.com.br;R3m@t0997;
ORCAMENTO;1869;ramal.1869@fiemg.com.br;3192411869;1869;PREMIUM_PEMM;GRP_FIEMG_AIMORES;;ramal.1869@fiemg.com.br;R3m@t0585;
ORCAMENTO;1870;ramal.1870@fiemg.com.br;3192411870;1870;PREMIUM_PEMM;GRP_FIEMG_AIMORES;;ramal.1870@fiemg.com.br;R3m@t0336;
ORCAMENTO;1871;ramal.1871@fiemg.com.br;3192411871;1871;PREMIUM_PEMM;GRP_FIEMG_AIMORES;;ramal.1871@fiemg.com.br;R3m@t0381;
ORCAMENTO;1872;ramal.1872@fiemg.com.br;3192411872;1872;PREMIUM_PEMM;GRP_FIEMG_AIMORES;;ramal.1872@fiemg.com.br;R3m@t0101;
PATRIMONIO;1873;ramal.1873@fiemg.com.br;3192411873;1873;PREMIUM_PEMM;GRP_FIEMG_AIMORES;;ramal.1873@fiemg.com.br;R3m@t0656;
PATRIMONIO;1874;ramal.1874@fiemg.com.br;3192411874;1874;PREMIUM_PEMM;GRP_FIEMG_AIMORES;;ramal.1874@fiemg.com.br;R3m@t0632;
PATRIMONIO;1875;ramal.1875@fiemg.com.br;3192411875;1875;PREMIUM_PEMM;GRP_FIEMG_AIMORES;;ramal.1875@fiemg.com.br;R3m@t0220;
PATRIMONIO;1876;ramal.1876@fiemg.com.br;3192411876;1876;PREMIUM_PEMM;GRP_FIEMG_AIMORES;;ramal.1876@fiemg.com.br;R3m@t0704;
PATRIMONIO;1877;ramal.1877@fiemg.com.br;3192411877;1877;PREMIUM_PEMM;GRP_FIEMG_AIMORES;;ramal.1877@fiemg.com.br;R3m@t0412;
ENGENHARIA;1878;ramal.1878@fiemg.com.br;3192411878;1878;PREMIUM_PEMM;GRP_FIEMG_AIMORES;;ramal.1878@fiemg.com.br;R3m@t0706;
RECEPCAO ;1879;ramal.1879@fiemg.com.br;3192411879;1879;PREMIUM_PEMM;GRP_FIEMG_AIMORES;;ramal.1879@fiemg.com.br;R3m@t0401;
SERVICEDESK;1880;ramal.1880@fiemg.com.br;3192411880;1880;PREMIUM_PEMM;GRP_FIEMG_AIMORES;;ramal.1880@fiemg.com.br;R3m@t0913;
SERVICEDESK;1881;ramal.1881@fiemg.com.br;3192411881;1881;PREMIUM_PEMM;GRP_FIEMG_AIMORES;;ramal.1881@fiemg.com.br;R3m@t0718;
GTI;1882;ramal.1882@fiemg.com.br;3192411882;1882;PREMIUM_PEMM;GRP_FIEMG_AIMORES;;ramal.1882@fiemg.com.br;R3m@t0622;
GTI;1883;ramal.1883@fiemg.com.br;3192411883;1883;PREMIUM_PEMM;GRP_FIEMG_AIMORES;;ramal.1883@fiemg.com.br;R3m@t0962;
GTI;1884;ramal.1884@fiemg.com.br;3192411884;1884;PREMIUM_PEMM;GRP_FIEMG_AIMORES;;ramal.1884@fiemg.com.br;R3m@t0839;
GTI;1885;ramal.1885@fiemg.com.br;3192411885;1885;PREMIUM_PEMM;GRP_FIEMG_AIMORES;;ramal.1885@fiemg.com.br;R3m@t0152;`;

const formatString = str => str ? str.replace(/'/g, "''").trim() : '';

// Parse CSV 2 para um map Ramal -> Credenciais
const credsMap = {};
const lines2 = csv2_raw.split('\n');
lines2.forEach(line => {
    const cols = line.split(';');
    if (cols.length >= 10 && cols[1]) {
        const ramal = cols[1].trim();
        const numMicrosip = cols[3] ? cols[3].trim() : '';
        const senha = cols[9] ? cols[9].trim() : '';
        credsMap[ramal] = { microsipUser: numMicrosip, microsipPass: senha };
    }
});

let sqlContent = "BEGIN;\n";
sqlContent += "DO $$ \nDECLARE\n";
sqlContent += "    v_unidade_id uuid;\n";
sqlContent += "    v_linha_id uuid;\n";
sqlContent += "    v_ura_id uuid;\n";
sqlContent += "BEGIN\n";

sqlContent += "    -- 1. Buscando a Unidade 'Sede Aimorés'\n";
sqlContent += "    SELECT id INTO v_unidade_id FROM public.unidades WHERE nome ILIKE '%Sede Aimorés%' LIMIT 1;\n";
sqlContent += "    IF v_unidade_id IS NULL THEN\n";
sqlContent += "        RAISE EXCEPTION 'Unidade Sede Aimorés não encontrada!';\n";
sqlContent += "    END IF;\n\n";

// Map das linhas e de URAs
const linhasCriadas = new Set();
const urasInfo = {};

const lines1 = csv1_raw.split('\n').slice(1);
const ramaisParaInserir = [];

lines1.forEach(line => {
    if (!line.trim()) return;
    const cols = line.split(';');

    let funcionario = formatString(cols[0]);
    let nomeRamal = formatString(cols[1]);
    let ramal = formatString(cols[4]);
    let setor = formatString(cols[5]);
    let gruposCaptura = formatString(cols[6]);
    let redirecionamento = formatString(cols[7]);
    let numeroPrincipal = formatString(cols[8]);
    let nomeUra = formatString(cols[9]);
    let msgInicial = formatString(cols[10]);
    let txtOpcao = formatString(cols[12]);
    let destinoOpcao = formatString(cols[13]);

    if (!nomeRamal || !ramal) return;

    if (setor.startsWith('AIM - ')) {
        setor = setor.substring(6).trim();
    } else if (setor.startsWith('AIM- ')) {
        setor = setor.substring(5).trim();
    }

    let mUser = "";
    let mPass = "";
    if (credsMap[ramal]) {
        mUser = credsMap[ramal].microsipUser;
        mPass = credsMap[ramal].microsipPass;
    }

    let salto1 = '', salto2 = '', salto3 = '';
    let redirEnabled = false;
    if (redirecionamento) {
        redirEnabled = true;
        const pts = redirecionamento.split('>').map(p => p.trim());
        if (pts.length > 0) salto1 = pts[0];
        if (pts.length > 1) salto2 = pts[1];
        if (pts.length > 2) salto3 = pts[2];
    }

    if (nomeUra) {
        if (!urasInfo[nomeUra]) {
            urasInfo[nomeUra] = {
                numeroDDR: numeroPrincipal,
                msg: msgInicial || '',
                opcoes: []
            };
        } else {
            if (msgInicial && !urasInfo[nomeUra].msg) {
                urasInfo[nomeUra].msg = msgInicial;
            }
        }

        if (txtOpcao || destinoOpcao) {
            const proximoKey = String(urasInfo[nomeUra].opcoes.length + 1);
            urasInfo[nomeUra].opcoes.push({
                key: proximoKey,
                label: txtOpcao,
                destination: destinoOpcao,
                type: "grp"
            });
        }
    }

    ramaisParaInserir.push({
        nome: nomeRamal,
        numero: ramal,
        microsipUser: mUser,
        microsipPass: mPass,
        setor: setor,
        observacao: funcionario,
        grupoCaptura: gruposCaptura,
        gcEnabled: gruposCaptura ? "true" : "false",
        redirEnabled: redirEnabled ? "true" : "false",
        salto1, salto2, salto3,
        ddr_numero: numeroPrincipal,
        ura_nome: nomeUra
    });
});

const numerosPrincipaisUnicos = new Set();
ramaisParaInserir.forEach(r => {
    if (r.ddr_numero && r.ddr_numero.length > 5) numerosPrincipaisUnicos.add(r.ddr_numero);
});

numerosPrincipaisUnicos.forEach(nc => {
    let f = nc.replace(/[^0-9]/g, "");
    if (f.length < 10) return;
    f = f.substring(0, 10);
    const m = "(" + f.substring(0, 2) + ") " + f.substring(2, 6) + "-" + f.substring(6, 10);

    sqlContent += "    -- Garantindo Linha Principal " + m + "\n";
    sqlContent += "    SELECT id INTO v_linha_id FROM public.linhas WHERE numero = '" + m + "' LIMIT 1;\n";
    sqlContent += "    IF v_linha_id IS NULL THEN\n";
    sqlContent += '        INSERT INTO public.linhas (numero, operadora, "unidadeId", status)\n';
    sqlContent += "        VALUES ('" + m + "', 'Método', v_unidade_id, 'Ativa')\n";
    sqlContent += "        RETURNING id INTO v_linha_id;\n";
    sqlContent += "    END IF;\n\n";
});

Object.keys(urasInfo).forEach(uNome => {
    const rawDdr = urasInfo[uNome].numeroDDR || '';
    let fDdr = rawDdr.replace(/[^0-9]/g, "");
    let insertLinhaStr = "v_linha_id := NULL;";

    if (fDdr.length >= 10) {
        fDdr = fDdr.substring(0, 10);
        const m = "(" + fDdr.substring(0, 2) + ") " + fDdr.substring(2, 6) + "-" + fDdr.substring(6, 10);
        insertLinhaStr = "SELECT id INTO v_linha_id FROM public.linhas WHERE numero = '" + m + "' LIMIT 1;";
    }

    const jsonStr = JSON.stringify(urasInfo[uNome].opcoes).replace(/'/g, "''");

    sqlContent += "    -- Inserindo URA Consolidade: " + uNome + "\n";
    sqlContent += "    " + insertLinhaStr + "\n";
    sqlContent += '    INSERT INTO public.uras (nome, "linhaId", "unidadeId", "mensagemPrincipal", opcoes, status)\n';
    sqlContent += "    VALUES ('" + uNome + "', v_linha_id, v_unidade_id, '" + urasInfo[uNome].msg + "', '" + jsonStr + "'::jsonb, 'Ativa')\n";
    sqlContent += "    RETURNING id INTO v_ura_id;\n\n";
});

ramaisParaInserir.forEach(r => {
    let fetchLinhaStr = 'v_linha_id := NULL;';
    if (r.ddr_numero && r.ddr_numero.length >= 10) {
        let f = r.ddr_numero.replace(/[^0-9]/g, "").substring(0, 10);
        let m = "(" + f.substring(0, 2) + ") " + f.substring(2, 6) + "-" + f.substring(6, 10);
        fetchLinhaStr = "SELECT id INTO v_linha_id FROM public.linhas WHERE numero = '" + m + "' LIMIT 1;";
    }

    sqlContent += "    -- Inserindo Ramal SIP: " + r.numero + " (" + r.nome + ")\n";
    sqlContent += "    " + fetchLinhaStr + "\n";
    sqlContent += "    INSERT INTO public.ramais (\n";
    sqlContent += '        numero, tipo, status, setor, "unidadeId", nome, ddr, \n';
    sqlContent += '        observacao, "redirecionamentoEnabled", salto1, salto2, salto3, \n';
    sqlContent += '        "grupoCapturaEnabled", "grupoCaptura", "microsipUser", "microsipPass"\n';
    sqlContent += "    ) VALUES (\n";
    sqlContent += "        '" + r.numero + "', 'SIP', 'Ativo', '" + r.setor + "', v_unidade_id, '" + r.nome + "', v_linha_id, \n";
    sqlContent += "        '" + r.observacao + "', " + r.redirEnabled + ", '" + r.salto1 + "', '" + r.salto2 + "', '" + r.salto3 + "', \n";
    sqlContent += "        " + r.gcEnabled + ", '" + r.grupoCaptura + "', '" + r.microsipUser + "', '" + r.microsipPass + "'\n";
    sqlContent += "    );\n\n";
});

sqlContent += "END $$;\nCOMMIT;\n";

fs.writeFileSync('import_ramais_sip_aimores.sql', sqlContent, 'utf8');
console.log('Script finalizado. Arquivo import_ramais_sip_aimores.sql esta na raiz. ' + ramaisParaInserir.length + ' ramais gerados.');
