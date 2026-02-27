-- =====================================================================
-- INVENTÁRIO PABX COMPLETO (FILTRADO POR PEN) - PARTE 8
-- =====================================================================

INSERT INTO public.recursos_pabx (bloco, porta, pen, tecnologia_padrao) VALUES
('1', '19', '1-1-61-18', 'Digital'), ('2', '19', '1-2-37-18', 'Analogico'), ('4', '19', '1-2-91-18', 'Analogico'), ('5', '19', '1-3-79-18', 'Analogico'), ('J', '19', '1-17-79-18', 'Digital'), ('L', '19', '1-18-2-18', 'Analogico'), ('M', '19', '1-17-121-18', 'Analogico'), ('N', '19', '1-17-109-18', 'Analogico'), ('O', '19', '1-17-97-18', 'Analogico'), ('P', '19', '1-17-85-18', 'Analogico'), ('Q', '19', '1-17-61-18', 'Analogico'), ('R', '19', '1-17-49-18', 'Analogico'), ('S', '19', '1-17-37-18', 'Analogico'), ('T', '19', '1-18-10-18', 'Analogico'), ('U', '19', '1-18-8-18', 'Analogico'), ('V', '19', '1-18-4-18', 'Digital'),
('1', '20', '1-1-61-19', 'Digital'), ('2', '20', '1-2-37-19', 'Analogico'), ('4', '20', '1-2-91-19', 'Analogico'), ('5', '20', '1-3-79-19', 'Analogico'), ('J', '20', '1-17-79-19', 'Digital'), ('L', '20', '1-18-2-19', 'Analogico'), ('M', '20', '1-17-121-19', 'Analogico'), ('N', '20', '1-17-109-19', 'Analogico'), ('O', '20', '1-17-97-19', 'Analogico'), ('P', '20', '1-17-85-19', 'Analogico'), ('Q', '20', '1-17-61-19', 'Analogico'), ('R', '20', '1-17-49-19', 'Analogico'), ('S', '20', '1-17-37-19', 'Analogico'), ('T', '20', '1-18-10-19', 'Analogico'), ('U', '20', '1-18-8-19', 'Analogico'), ('V', '20', '1-18-4-19', 'Digital')
ON CONFLICT (pen) DO NOTHING;
