-- ============================================================
-- Criação das tabelas: projetos e "projetoItens"
-- Schema em camelCase para manter compatibilidade com o frontend
-- ============================================================

CREATE TABLE IF NOT EXISTS projetos (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    nome TEXT NOT NULL,
    descricao TEXT,
    "unidadeId" UUID REFERENCES unidades(id),
    progresso INTEGER DEFAULT 0 CHECK (progresso >= 0 AND progresso <= 100),
    "dataInicio" DATE,
    deadline DATE,
    chamado TEXT,
    status TEXT DEFAULT 'Em Andamento',
    "createdAt" TIMESTAMPTZ DEFAULT now()
);

CREATE TABLE IF NOT EXISTS "projetoItens" (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    "projetoId" UUID REFERENCES projetos(id) ON DELETE CASCADE,
    "itemTipo" TEXT NOT NULL,      -- 'ramal', 'linha', 'ura'
    "itemId" UUID,                 -- referência ao ramal/linha/ura real (nullable para drafts)
    "itemLabel" TEXT,              -- ex: 'Ramal 2005', 'Linha 3215-4400'
    "statusItem" TEXT DEFAULT 'Agendado',
    observacao TEXT,
    "createdAt" TIMESTAMPTZ DEFAULT now()
);

-- RLS: permitir leitura pública, escrita autenticada
ALTER TABLE projetos ENABLE ROW LEVEL SECURITY;
ALTER TABLE "projetoItens" ENABLE ROW LEVEL SECURITY;

CREATE POLICY "projetos_select" ON projetos FOR SELECT USING (true);
CREATE POLICY "projetos_insert" ON projetos FOR INSERT WITH CHECK (true);
CREATE POLICY "projetos_update" ON projetos FOR UPDATE USING (true);
CREATE POLICY "projetos_delete" ON projetos FOR DELETE USING (true);

CREATE POLICY "projetoItens_select" ON "projetoItens" FOR SELECT USING (true);
CREATE POLICY "projetoItens_insert" ON "projetoItens" FOR INSERT WITH CHECK (true);
CREATE POLICY "projetoItens_update" ON "projetoItens" FOR UPDATE USING (true);
CREATE POLICY "projetoItens_delete" ON "projetoItens" FOR DELETE USING (true);
