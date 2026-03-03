-- =====================================================================
-- INVENTÁRIO PABX COMPLETO (FILTRADO POR PEN) - PARTE 10
-- =====================================================================

INSERT INTO public.recursos_pabx (bloco, porta, pen, tecnologia_padrao) VALUES
('1', '23', '1-1-61-22', 'Digital'), ('2', '23', '1-2-37-22', 'Analogico'), ('4', '23', '1-2-91-22', 'Analogico'), ('5', '23', '1-3-79-22', 'Analogico'), ('J', '23', '1-17-79-22', 'Digital'), ('L', '23', '1-18-2-22', 'Analogico'), ('M', '23', '1-17-121-22', 'Analogico'), ('N', '23', '1-17-109-22', 'Analogico'), ('O', '23', '1-17-97-22', 'Analogico'), ('P', '23', '1-17-85-22', 'Analogico'), ('Q', '23', '1-17-61-22', 'Analogico'), ('R', '23', '1-17-49-22', 'Analogico'), ('S', '23', '1-17-37-22', 'Analogico'), ('T', '23', '1-18-10-22', 'Analogico'), ('U', '23', '1-18-8-22', 'Analogico'), ('V', '23', '1-18-4-22', 'Digital'),
('1', '24', '1-1-61-23', 'Digital'), ('2', '24', '1-2-37-23', 'Analogico'), ('4', '24', '1-2-91-23', 'Analogico'), ('5', '24', '1-3-79-23', 'Analogico'), ('J', '24', '1-17-79-23', 'Digital'), ('L', '24', '1-18-2-23', 'Analogico'), ('M', '24', '1-17-121-23', 'Analogico'), ('N', '24', '1-17-109-23', 'Analogico'), ('O', '24', '1-17-97-23', 'Analogico'), ('P', '24', '1-17-85-23', 'Analogico'), ('Q', '24', '1-17-61-23', 'Analogico'), ('R', '24', '1-17-49-23', 'Analogico'), ('S', '24', '1-17-37-23', 'Analogico'), ('T', '24', '1-18-10-23', 'Analogico'), ('U', '24', '1-18-8-23', 'Analogico'), ('V', '24', '1-18-4-23', 'Digital')
ON CONFLICT (pen) DO NOTHING;
