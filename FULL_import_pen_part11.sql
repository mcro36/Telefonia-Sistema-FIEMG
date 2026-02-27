-- =====================================================================
-- INVENTÁRIO PABX COMPLETO (FILTRADO POR PEN) - PARTE 11
-- =====================================================================

INSERT INTO public.recursos_pabx (bloco, porta, pen, tecnologia_padrao) VALUES
('1', '25', '1-1-67-0', 'Analogico'), ('2', '25', '1-2-43-0', 'Analogico'), ('4', '25', '1-2-97-0', 'Analogico'), ('5', '25', '1-3-85-0', 'Analogico'), ('J', '25', '1-17-25-0', 'Analogico'), ('L', '25', '1-18-3-0', 'Analogico'), ('N', '25', '1-17-115-0', 'Digital'), ('O', '25', '1-17-103-0', 'Analogico'), ('P', '25', '1-17-91-0', 'Analogico'), ('Q', '25', '1-17-67-0', 'Analogico'), ('R', '25', '1-17-55-0', 'Analogico'), ('S', '25', '1-17-43-0', 'Analogico'), ('T', '25', '1-17-31-0', 'Analogico'), ('U', '25', '1-18-9-0', 'Analogico'), ('V', '25', '1-18-5-0', 'Digital'),
('1', '26', '1-1-67-1', 'Analogico'), ('2', '26', '1-2-43-1', 'Analogico'), ('4', '26', '1-2-97-1', 'Analogico'), ('5', '26', '1-3-85-1', 'Analogico'), ('J', '26', '1-17-25-1', 'Analogico'), ('L', '26', '1-18-3-1', 'Analogico'), ('N', '26', '1-17-115-1', 'Digital'), ('O', '26', '1-17-103-1', 'Analogico'), ('P', '26', '1-17-91-1', 'Analogico'), ('Q', '26', '1-17-67-1', 'Analogico'), ('R', '26', '1-17-55-1', 'Analogico'), ('S', '26', '1-17-43-1', 'Analogico'), ('T', '26', '1-17-31-1', 'Analogico'), ('U', '26', '1-18-9-1', 'Analogico'), ('V', '26', '1-18-5-1', 'Digital')
ON CONFLICT (pen) DO NOTHING;
