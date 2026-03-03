-- =====================================================================
-- INVENTÁRIO PABX COMPLETO (FILTRADO POR PEN) - PARTE 9
-- =====================================================================

INSERT INTO public.recursos_pabx (bloco, porta, pen, tecnologia_padrao) VALUES
('1', '21', '1-1-61-20', 'Digital'), ('2', '21', '1-2-37-20', 'Analogico'), ('4', '21', '1-2-91-20', 'Analogico'), ('5', '21', '1-3-79-20', 'Analogico'), ('J', '21', '1-17-79-20', 'Digital'), ('L', '21', '1-18-2-20', 'Analogico'), ('M', '21', '1-17-121-20', 'Analogico'), ('N', '21', '1-17-109-20', 'Analogico'), ('O', '21', '1-17-97-20', 'Analogico'), ('P', '21', '1-17-85-20', 'Analogico'), ('Q', '21', '1-17-61-20', 'Analogico'), ('R', '21', '1-17-49-20', 'Analogico'), ('S', '21', '1-17-37-20', 'Analogico'), ('T', '21', '1-18-10-20', 'Analogico'), ('U', '21', '1-18-8-20', 'Analogico'), ('V', '21', '1-18-4-20', 'Digital'),
('1', '22', '1-1-61-21', 'Digital'), ('2', '22', '1-2-37-21', 'Analogico'), ('4', '22', '1-2-91-21', 'Analogico'), ('5', '22', '1-3-79-21', 'Analogico'), ('L', '22', '1-18-2-21', 'Analogico'), ('M', '22', '1-17-121-21', 'Analogico'), ('N', '22', '1-17-109-21', 'Analogico'), ('O', '22', '1-17-97-21', 'Analogico'), ('P', '22', '1-17-85-21', 'Analogico'), ('Q', '22', '1-17-61-21', 'Analogico'), ('R', '22', '1-17-49-21', 'Analogico'), ('S', '22', '1-17-37-21', 'Analogico'), ('T', '22', '1-18-10-21', 'Analogico'), ('U', '22', '1-18-8-21', 'Analogico'), ('V', '22', '1-18-4-21', 'Digital')
ON CONFLICT (pen) DO NOTHING;
