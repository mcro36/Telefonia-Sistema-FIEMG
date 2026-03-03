-- =====================================================================
-- INVENTÁRIO PABX COMPLETO (FILTRADO POR PEN) - PARTE 7
-- =====================================================================

INSERT INTO public.recursos_pabx (bloco, porta, pen, tecnologia_padrao) VALUES
('1', '17', '1-1-61-16', 'Digital'), ('2', '17', '1-2-37-16', 'Analogico'), ('4', '17', '1-2-91-16', 'Analogico'), ('5', '17', '1-3-79-16', 'Analogico'), ('J', '17', '1-17-79-16', 'Digital'), ('L', '17', '1-18-2-16', 'Analogico'), ('M', '17', '1-17-121-16', 'Analogico'), ('N', '17', '1-17-109-16', 'Analogico'), ('O', '17', '1-17-97-16', 'Analogico'), ('P', '17', '1-17-85-16', 'Analogico'), ('Q', '17', '1-17-61-16', 'Analogico'), ('R', '17', '1-17-49-16', 'Analogico'), ('S', '17', '1-17-37-16', 'Analogico'), ('T', '17', '1-18-10-16', 'Analogico'), ('U', '17', '1-18-8-16', 'Analogico'), ('V', '17', '1-18-4-16', 'Digital'),
('1', '18', '1-1-61-17', 'Digital'), ('2', '18', '1-2-37-17', 'Analogico'), ('4', '18', '1-2-91-17', 'Analogico'), ('5', '18', '1-3-79-17', 'Analogico'), ('J', '18', '1-17-79-17', 'Digital'), ('L', '18', '1-18-2-17', 'Analogico'), ('M', '18', '1-17-121-17', 'Analogico'), ('N', '18', '1-17-109-17', 'Analogico'), ('O', '18', '1-17-97-17', 'Analogico'), ('P', '18', '1-17-85-17', 'Analogico'), ('Q', '18', '1-17-61-17', 'Analogico'), ('R', '18', '1-17-49-17', 'Analogico'), ('S', '18', '1-17-37-17', 'Analogico'), ('T', '18', '1-18-10-17', 'Analogico'), ('U', '18', '1-18-8-17', 'Analogico'), ('V', '18', '1-18-4-17', 'Digital')
ON CONFLICT (pen) DO NOTHING;
