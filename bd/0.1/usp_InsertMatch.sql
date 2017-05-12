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
    SELECT correo INTO email FROM rank.bp_personas per WHERE per.idbp_personas = idvisitantev;
    SELECT count(1) INTO conteo FROM rank.bitgames b WHERE  DATE_FORMAT( b.fecha,'%m-%d-%Y') = DATE_FORMAT(NOW(),'%m-%d-%Y') and (b.idlocal = idretador or b.idvisitante = idretador ) and (b.idlocal = idvisitantev OR b.idvisitante = idvisitantev);
  IF ( conteo ) < 6 THEN 
  INSERT INTO
  `bitgames` (`idbitgames`, `idlocal`, `idvisitante`, `golocal`, `golvisitane`, `torneoid`, `estatus`, `fecha`, `idinserta`, `ip`) 
        VALUES (NULL, idretador, idvisitantev, 0, 0, idtorneo, 0, CURRENT_TIMESTAMP, idretador, ip);
         SELECT email AS correo ,  'SI' AS r , ((conteo) -5  )*-1 AS COUNT;
  ELSE
        SELECT 'NO' AS r;
  END IF;
END //
DELIMITER ;