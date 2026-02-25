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

## 🔐 Autenticação

Para habilitar o acesso seguro:
1. No painel do **Supabase**, vá em **Authentication > Providers** e ative o provider de **Email**.
2. Desative a opção "Confirm Email" (opcional, para facilitar o teste inicial).
3. Vá em **Authentication > Users** e crie um usuário com e-mail e senha.
4. Use essas credenciais na tela de login da aplicação.

## 🚀 Publicação

Este projeto está configurado para deploy automático no GitHub Pages:
- Build: `npm run build`
- Deploy: `npm run deploy`

---
Desenvolvido para o Sistema FIEMG.
