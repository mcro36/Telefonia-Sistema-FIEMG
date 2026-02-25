# Antigravity Telecom - FIEMG

Sistema de gestão de telefonia enterprise para o Sistema FIEMG (SESI, SENAI, IEL).

## 🚀 Tecnologias

- **Frontend:** React 19, TypeScript, Vite
- **Estilização:** Tailwind CSS, Lucide React, Motion
- **Gráficos:** Recharts
- **Backend:** Supabase (PostgreSQL)

## ⚙️ Configuração

1. Clone o repositório
2. Instale as dependências: `npm install`
3. Configure as variáveis de ambiente no arquivo `.env`:
   - `VITE_SUPABASE_URL`
   - `VITE_SUPABASE_ANON_KEY`
4. Inicie o servidor de desenvolvimento: `npm run dev`

## 📊 Estrutura do Banco de Dados (Supabase)

Crie as seguintes tabelas no seu projeto Supabase:

### `units`
- `id` (uuid, primary key)
- `entity` (text) - SESI, SENAI, FIEMG, IEL
- `city` (text)
- `name` (text)
- `extension_range` (text)
- `active_extensions` (int)
- `active_lines` (int)

### `extensions`
- `id` (uuid, primary key)
- `number` (text)
- `unit_id` (uuid, foreign key)
- `type` (text) - SIP, Analógico, Digital
- `status` (text) - Ativo, Inativo

## 📝 Prompt Ideal para Evolução

> "Atue como um desenvolvedor Full Stack Sênior. Evolua a aplicação 'Antigravity Telecom' em React/Vite.
> 
> **Objetivo:** Implementar a integração real com o Supabase nas views de Dashboard e Unidades.
> 
> **Tarefas:**
> 1. Substitua os mocks em `DashboardView.tsx` e `UnitsView.tsx` por chamadas reais usando o cliente em `src/lib/supabase.ts`.
> 2. Implemente o formulário de 'Nova Unidade' em um Modal, salvando os dados na tabela `units`.
> 3. Adicione feedback visual de carregamento (Skeletons) e tratamento de erros.
> 4. Garanta que o design escuro e as animações com Motion sejam mantidos.
> 5. Utilize as variáveis de ambiente `VITE_SUPABASE_URL` e `VITE_SUPABASE_ANON_KEY`."

---
Desenvolvido para o Sistema FIEMG.
