-- =====================================================================
-- INVENTÁRIO PABX COMPLETO (FILTRADO POR PEN) - PARTE 12
-- =====================================================================

INSERT INTO public.recursos_pabx (bloco, porta, pen, tecnologia_padrao) VALUES
('1', '27', '1-1-67-2', 'Analogico'), ('2', '27', '1-2-43-2', 'Analogico'), ('4', '27', '1-2-97-2', 'Analogico'), ('5', '27', '1-3-85-2', 'Analogico'), ('J', '27', '1-17-25-2', 'Analogico'), ('L', '27', '1-18-3-2', 'Analogico'), ('N', '27', '1-17-115-2', 'Digital'), ('O', '27', '1-17-103-2', 'Analogico'), ('P', '27', '1-17-91-2', 'Analogico'), ('Q', '27', '1-17-67-2', 'Analogico'), ('R', '27', '1-17-55-2', 'Analogico'), ('S', '27', '1-17-43-2', 'Analogico'), ('T', '27', '1-17-31-2', 'Analogico'), ('U', '27', '1-18-9-2', 'Analogico'), ('V', '27', '1-18-5-2', 'Digital'),
('1', '28', '1-1-67-3', 'Analogico'), ('2', '28', '1-2-43-3', 'Analogico'), ('4', '28', '1-2-97-3', 'Analogico'), ('5', '28', '1-3-85-3', 'Analogico'), ('J', '28', '1-17-25-3', 'Analogico'), ('L', '28', '1-18-3-3', 'Analogico'), ('N', '28', '1-17-115-3', 'Digital'), ('O', '28', '1-17-103-3', 'Analogico'), ('P', '28', '1-17-91-3', 'Analogico'), ('Q', '28', '1-17-67-3', 'Analogico'), ('R', '28', '1-17-55-3', 'Analogico'), ('S', '28', '1-17-43-3', 'Analogico'), ('T', '28', '1-17-31-3', 'Analogico'), ('U', '28', '1-18-9-3', 'Analogico'), ('V', '28', '1-18-5-3', 'Digital')
ON CONFLICT (pen) DO NOTHING;
