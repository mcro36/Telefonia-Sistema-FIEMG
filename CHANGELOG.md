# Changelog de Atualizações (Fevereiro/Março 2026)

Este documento registra todas as alterações, melhorias de performance, refatorações de código e atualizações de banco de dados realizadas na última série de desenvolvimentos.

## 🚀 Novas Funcionalidades
- **Gestão de Portas Físicas:**
  - Criada a nova tela `BlocoPortasView` para gestão de portas/blocos do Voice Panel.
  - Sincronização dinâmica de nomes de unidades via `unidade_id` (se alterar o nome da unidade, atualiza nas portas automaticamente).
  - Listagem com coluna de **Tecnologia** (Analógica/Digital) de cada porta.
  - Status em tempo real calculando portas "Ocupadas" vs "Disponíveis".
- **Integração Inteligente no PABX:**
  - O Modal de Cadastro de Ramais PABX (`RamalModalPABX`) agora lê os dados consolidados do inventário das Portas Físicas.
  - Criada a função global utilitária `formatResourceLabel` para padronizar as nomenclaturas de portas (`Sede_Bloco_Porta_Tecnologia`).
- **Faixa de DDR:**
  - Modulo de Linhas agora permite criar lotes em massa pelo modelo "Faixa DDR", gerando as linhas automaticamente de X a Y com a formatação correta de DDD.
- **Herança de Faixas nas Unidades:**
  - Desenvolvida e implementada trigger SQL (`fix_inheritance_trigger.sql`) que atualiza a faixa de ramais de TODAS as unidades filhas quando o nó Pai é alterado no gerenciamento de unidades.

## 💅 UX / UI e Dashboards
- **Dashboard Aprimorado:** As métricas de "Ramais Ativos" foram divididas. Agora mostra "Ramais PABX Ativos" e "Ramais SIP Ativos" separados com cards estilizados e grid ajustado (4 colunas).
- **Inclusão de Novos Status:** Ramais analógicos/digitais que ainda não ganharam porta alocada agora aparecem na tela de Ramais com a label `Disponível` em azul para facilitar controle.
- **Busca por Unidade:** A barra de pesquisa principal em `RamaisView.jsx` agora encontra resultados varrendo não apenas PABX e MAC, mas cruzando informações com o nome em texto daquela Unidade.

## ⚙️ Refatorações no Banco de Dados (PostgreSQL / Supabase)
- **Normalização Snake Case:** Quase todas as tabelas (unidades, ramais, linhas, uras, projetos, projeto_itens) que possuíam colunas em `camelCase` antigo foram forçosamente submetidas a uma migração limpa para `snake_case` (ex: `unidadeId` > `unidade_id`). 
- **Refatoração no PABX:** Substituída as colunas de texto estático `predio` e `unidade` de `recursos_pabx` por uma Foreign Key oficial `unidade_id` via subqueries do Supabase.

## 🧹 Limpeza e Correções (Performance)
- **Extreme Cleanup para Memory Leaks da IDE:** Purgados mais de 25 arquivos pesadíssimos e legados de carga inicial (`FULL_import_*.sql`, geradores `.cjs` soltos e importações antigas).
- **Reorganização de Codebase:** Todos os scripts de SQL válidos e triggers ativos foram guardados corretamente na nova pasta `scripts/` visando diminuir em absoluto a carga cognitiva do 'language server'. O projeto inteiro passou limpo num tracker `unimported` (nenhum componente JS abandonado).
- **Fix de Persistência:** Corrigido o hook global do app (`useSupabaseTable.js`) que lidava equivocadamente com promises assíncronas no save/update de listas em Lote, arrumando de vez bugs de salvamento no Cadastro de Unidades.
- **Queries React:** Adaptados globalmente todos os Modais (`UnidadeModal`, `ProjetoView`, `LinhasView`) para os novos nomes de colunas usando JOIN nativo `tabela:tabela_fk(dado)`.
