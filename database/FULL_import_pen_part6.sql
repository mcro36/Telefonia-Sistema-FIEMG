-- =====================================================================
-- INVENTÁRIO PABX COMPLETO (FILTRADO POR PEN) - PARTE 6
-- =====================================================================

INSERT INTO public.recursos_pabx (bloco, porta, pen, tecnologia_padrao) VALUES
('1', '15', '1-1-61-14', 'Digital'), ('2', '15', '1-2-37-14', 'Analogico'), ('4', '15', '1-2-91-14', 'Analogico'), ('5', '15', '1-3-79-14', 'Analogico'), ('J', '15', '1-17-79-14', 'Digital'), ('L', '15', '1-18-2-14', 'Analogico'), ('M', '15', '1-17-121-14', 'Analogico'), ('N', '15', '1-17-109-14', 'Analogico'), ('O', '15', '1-17-97-14', 'Analogico'), ('P', '15', '1-17-85-14', 'Analogico'), ('Q', '15', '1-17-61-14', 'Analogico'), ('R', '15', '1-17-49-14', 'Analogico'), ('S', '15', '1-17-37-14', 'Analogico'), ('T', '15', '1-18-10-14', 'Analogico'), ('U', '15', '1-18-8-14', 'Analogico'), ('V', '15', '1-18-4-14', 'Digital'),
('1', '16', '1-1-61-15', 'Digital'), ('2', '16', '1-2-37-15', 'Analogico'), ('4', '16', '1-2-91-15', 'Analogico'), ('5', '16', '1-3-79-15', 'Analogico'), ('J', '16', '1-17-79-15', 'Digital'), ('L', '16', '1-18-2-15', 'Analogico'), ('M', '16', '1-17-121-15', 'Analogico'), ('N', '16', '1-17-109-15', 'Analogico'), ('O', '16', '1-17-97-15', 'Analogico'), ('P', '16', '1-17-85-15', 'Analogico'), ('Q', '16', '1-17-61-15', 'Analogico'), ('R', '16', '1-17-49-15', 'Analogico'), ('S', '16', '1-17-37-15', 'Analogico'), ('T', '16', '1-18-10-15', 'Analogico'), ('U', '16', '1-18-8-15', 'Analogico'), ('V', '16', '1-18-4-15', 'Digital')
ON CONFLICT (pen) DO NOTHING;
