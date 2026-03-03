-- =====================================================================
-- INVENTÁRIO PABX COMPLETO (FILTRADO POR PEN) - PARTE 13 (FINAL)
-- =====================================================================

INSERT INTO public.recursos_pabx (bloco, porta, pen, tecnologia_padrao) VALUES
('J', '30', '1-17-25-5', 'Analogico'), ('L', '30', '1-18-3-5', 'Analogico'), ('N', '30', '1-17-115-5', 'Digital'), ('O', '30', '1-17-103-5', 'Analogico'), ('P', '30', '1-17-91-5', 'Analogico'), ('Q', '30', '1-17-67-5', 'Analogico'), ('R', '30', '1-17-55-5', 'Analogico'), ('S', '30', '1-17-43-5', 'Analogico'), ('T', '30', '1-17-31-5', 'Analogico'), ('U', '30', '1-18-9-5', 'Analogico'), ('V', '30', '1-18-5-5', 'Digital')
ON CONFLICT (pen) DO NOTHING;
