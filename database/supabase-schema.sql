-- Script de Criação do Schema para o Sistema de Telefonia FIEMG

-- Ativar a extensão UUID para geração de IDs automáticos
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-------------------------------------------------------------------
-- 1. TABELA DE UNIDADES
-------------------------------------------------------------------
CREATE TABLE public.unidades (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  nome TEXT NOT NULL,
  entidade TEXT NOT NULL,
  cidade TEXT NOT NULL,
  endereco TEXT,
  "faixaRamais" TEXT,
  "ramaisAtivos" INTEGER DEFAULT 0,
  "linhasAtivas" INTEGER DEFAULT 0,
  "unidadeIntegrada" BOOLEAN DEFAULT false,
  "unidadePaiId" UUID REFERENCES public.unidades(id),
  uo TEXT,
  "centroCusto" TEXT,
  contrato TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Ativar RLS
ALTER TABLE public.unidades ENABLE ROW LEVEL SECURITY;

-- Politicas da tabela Unidades (Permissões totais para o nosso app Frontend)
CREATE POLICY "Permitir Leitura Pública de Unidades" ON public.unidades FOR SELECT USING (true);
CREATE POLICY "Permitir Inserção de Unidades" ON public.unidades FOR INSERT WITH CHECK (true);
CREATE POLICY "Permitir Atualização de Unidades" ON public.unidades FOR UPDATE USING (true);
CREATE POLICY "Permitir Exclusão de Unidades" ON public.unidades FOR DELETE USING (true);

-------------------------------------------------------------------
-- 2. TABELA DE LINHAS
-------------------------------------------------------------------
CREATE TABLE public.linhas (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  numero TEXT NOT NULL,
  operadora TEXT NOT NULL,
  status TEXT NOT NULL,
  "unidadeId" UUID REFERENCES public.unidades(id) ON DELETE CASCADE,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Ativar RLS
ALTER TABLE public.linhas ENABLE ROW LEVEL SECURITY;

-- Politicas da tabela Linhas
CREATE POLICY "Permitir Leitura Pública de Linhas" ON public.linhas FOR SELECT USING (true);
CREATE POLICY "Permitir Inserção de Linhas" ON public.linhas FOR INSERT WITH CHECK (true);
CREATE POLICY "Permitir Atualização de Linhas" ON public.linhas FOR UPDATE USING (true);
CREATE POLICY "Permitir Exclusão de Linhas" ON public.linhas FOR DELETE USING (true);

-------------------------------------------------------------------
-- 3. TABELA DE RAMAIS
-------------------------------------------------------------------
CREATE TABLE public.ramais (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  numero TEXT NOT NULL,
  tipo TEXT NOT NULL,
  status TEXT NOT NULL,
  setor TEXT,
  "unidadeId" UUID REFERENCES public.unidades(id) ON DELETE CASCADE,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Ativar RLS
ALTER TABLE public.ramais ENABLE ROW LEVEL SECURITY;

-- Politicas da tabela Ramais
CREATE POLICY "Permitir Leitura Pública de Ramais" ON public.ramais FOR SELECT USING (true);
CREATE POLICY "Permitir Inserção de Ramais" ON public.ramais FOR INSERT WITH CHECK (true);
CREATE POLICY "Permitir Atualização de Ramais" ON public.ramais FOR UPDATE USING (true);
CREATE POLICY "Permitir Exclusão de Ramais" ON public.ramais FOR DELETE USING (true);

-------------------------------------------------------------------
-- INSERÇÃO DE DADOS DE TESTE INICIAIS (Opcional)
-------------------------------------------------------------------
INSERT INTO public.unidades (id, nome, entidade, cidade, endereco, "faixaRamais", "ramaisAtivos", "linhasAtivas", "unidadeIntegrada")
VALUES 
  ('11111111-1111-1111-1111-111111111111', 'Vila Leopoldina', 'SESI', 'São Paulo', 'Rua X', '2000 - 2500', 450, 12, false),
  ('22222222-2222-2222-2222-222222222222', 'Maracanã', 'SENAI', 'Rio de Janeiro', 'Av Y', '3000 - 3500', 320, 8, false),
  ('33333333-3333-3333-3333-333333333333', 'Horto', 'SENAI', 'Belo Horizonte', 'Rua H', '5000 - 5500', 400, 10, false);
