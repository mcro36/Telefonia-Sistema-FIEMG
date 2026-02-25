# Telefonia Sistema FIEMG

Sistema de gestão de telefonia enterprise para o Sistema FIEMG (SESI, SENAI, IEL, CIEMG).

## 🚀 Tecnologias

- **Frontend:** React 19, JavaScript (JSX), Vite
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

O esquema do banco de dados está disponível no arquivo `supabase-schema.sql` na raiz do projeto. Ele contém a criação das tabelas `unidades`, `linhas` e `ramais` com colunas em português e políticas de RLS configuradas.

## 🚀 Publicação

Este projeto está configurado para deploy automático no GitHub Pages:
- Build: `npm run build`
- Deploy: `npm run deploy`

---
Desenvolvido para o Sistema FIEMG.
