CREATE DEFINER=`root`@`localhost` PROCEDURE `USP_InsertMatch`(IN idretador int, 
IN idvisitante int,
IN idtorneo int,
IN ip  char(100)  )
BEGIN

  IF ( SELECT count(1) FROM rank.bitgames b WHERE  DATE_FORMAT( b.fecha,'%m-%d-%Y') = DATE_FORMAT(NOW(),'%m-%d-%Y') ) < 6 THEN 
  INSERT INTO
  `bitgames` (`idbitgames`, `idlocal`, `idvisitante`, `golocal`, `golvisitane`, `torneoid`, `estatus`, `fecha`, `idinserta`, `ip`) 
        VALUES (NULL, idretador, idvisitante, 0, 0, idtorneo, 0, CURRENT_TIMESTAMP, idretador, ip);
         SELECT 'SI' AS RESULT;
  ELSE
        SELECT 'NO' AS RESULT;
  END IF;
END