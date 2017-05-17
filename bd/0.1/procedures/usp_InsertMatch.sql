drop procedure USP_InsertMatch;

DELIMITER //
CREATE PROCEDURE USP_InsertMatch
(IN idretador int, 
IN idvisitantev int,
IN idtorneo int,
IN ip  char(100)  )
BEGIN
  DECLARE email VARCHAR(100);
  DECLARE conteo VARCHAR(100);
  DECLARE mismo int;
    SELECT correo INTO email FROM rank.bp_personas per WHERE per.idbp_personas = idvisitantev;
    SELECT  idretador = idvisitantev as resultado INTO mismo;
    SELECT count(1) INTO conteo FROM rank.bitgames b WHERE  DATE_FORMAT( b.fecha,'%m-%d-%Y') = DATE_FORMAT(NOW(),'%m-%d-%Y') and (b.idlocal = idretador or b.idvisitante = idretador ) and (b.idlocal = idvisitantev OR b.idvisitante = idvisitantev);
  IF ( conteo ) < 5 AND mismo = 0 THEN 
  INSERT INTO
  `bitgames` (`idbitgames`, `idlocal`, `idvisitante`, `golocal`, `golvisitane`, `torneoid`, `estatus`, `fecha`, `idinserta`, `ip`) 
        VALUES (NULL, idretador, idvisitantev, 0, 0, idtorneo, 0, CURRENT_TIMESTAMP, idretador, ip);
         SELECT email AS correo ,  'SI' AS r , ((conteo) -4  )*-1 AS COUNTEOS;
  ELSE
        SELECT 'NO' AS r , ((conteo) -6  )*-4 AS COUNTEOS;
  END IF;
END //
DELIMITER ;

-- TRUNCATE bitgames

  -- SELECT count(1)  FROM rank.bitgames b WHERE  DATE_FORMAT( b.fecha,'%m-%d-%Y') = DATE_FORMAT(NOW(),'%m-%d-%Y') and (b.idlocal = 4 or b.idvisitante = 4 ) and (b.idlocal = 5 OR b.idvisitante = 5)