
-- =========================================
-- Tabela URAs (Unidade de Resposta Audível)
-- =========================================
CREATE TABLE uras (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    nome TEXT NOT NULL,
    unidade_id UUID REFERENCES unidades(id) ON DELETE SET NULL,
    linha_id UUID REFERENCES linhas(id) ON DELETE SET NULL,
    mensagem_principal TEXT,
    opcoes JSONB DEFAULT '[]'::jsonb,
    status TEXT DEFAULT 'Ativa',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Habilitar RLS
ALTER TABLE uras ENABLE ROW LEVEL SECURITY;

-- Políticas RLS genéricas para autenticação anônima (ambiente de teste/demo)
CREATE POLICY "Permitir leitura anonima nas uras" ON uras FOR SELECT USING (true);
CREATE POLICY "Permitir insercao anonima nas uras" ON uras FOR INSERT WITH CHECK (true);
CREATE POLICY "Permitir atualizacao anonima nas uras" ON uras FOR UPDATE USING (true);
CREATE POLICY "Permitir exclusao anonima nas uras" ON uras FOR DELETE USING (true);

