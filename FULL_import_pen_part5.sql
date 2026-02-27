-- =====================================================================
-- INVENTÁRIO PABX COMPLETO (FILTRADO POR PEN) - PARTE 5
-- =====================================================================

INSERT INTO public.recursos_pabx (bloco, porta, pen, tecnologia_padrao) VALUES
('1', '13', '1-1-61-12', 'Digital'), ('2', '13', '1-2-37-12', 'Analogico'), ('4', '13', '1-2-91-12', 'Analogico'), ('5', '13', '1-3-79-12', 'Analogico'), ('J', '13', '1-17-79-12', 'Digital'), ('L', '13', '1-18-2-12', 'Analogico'), ('M', '13', '1-17-121-12', 'Analogico'), ('N', '13', '1-17-109-12', 'Analogico'), ('O', '13', '1-17-97-12', 'Analogico'), ('P', '13', '1-17-85-12', 'Analogico'), ('Q', '13', '1-17-61-12', 'Analogico'), ('R', '13', '1-17-49-12', 'Analogico'), ('S', '13', '1-17-37-12', 'Analogico'), ('T', '13', '1-18-10-12', 'Analogico'), ('U', '13', '1-18-8-12', 'Analogico'), ('V', '13', '1-18-4-12', 'Digital'),
('1', '14', '1-1-61-13', 'Digital'), ('2', '14', '1-2-37-13', 'Analogico'), ('4', '14', '1-2-91-13', 'Analogico'), ('5', '14', '1-3-79-13', 'Analogico'), ('J', '14', '1-17-79-13', 'Digital'), ('L', '14', '1-18-2-13', 'Analogico'), ('M', '14', '1-17-121-13', 'Analogico'), ('N', '14', '1-17-109-13', 'Analogico'), ('O', '14', '1-17-97-13', 'Analogico'), ('P', '14', '1-17-85-13', 'Analogico'), ('Q', '14', '1-17-61-13', 'Analogico'), ('R', '14', '1-17-49-13', 'Analogico'), ('S', '14', '1-17-37-13', 'Analogico'), ('T', '14', '1-18-10-13', 'Analogico'), ('U', '14', '1-18-8-13', 'Analogico'), ('V', '14', '1-18-4-13', 'Digital')
ON CONFLICT (pen) DO NOTHING;
