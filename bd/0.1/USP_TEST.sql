DELIMITER //
CREATE PROCEDURE USP_TEST
(IN idretador int, 
IN idvisitante int,
IN idtorneo int,
IN ip  char(100)  )
BEGIN

  IF ( SELECT count(1) FROM rank.bitgames b WHERE  DATE_FORMAT( b.fecha,'%m-%d-%Y') = DATE_FORMAT(NOW(),'%m-%d-%Y') ) < 6 THEN 
  INSERT INTO
  `bitgames` (`idbitgames`, `idlocal`, `idvisitante`, `golocal`, `golvisitane`, `torneoid`, `estatus`, `fecha`, `idinserta`, `ip`) 
        VALUES (NULL, idretador, idvisitante, 0, 0, idtorneo, 0, CURRENT_TIMESTAMP, idretador, ip);
  ELSE
     SELECT 'MAX';
  END IF;
END //
DELIMITER ;