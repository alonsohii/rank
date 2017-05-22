drop procedure USP_UpdateMatch;
DELIMITER //
CREATE PROCEDURE USP_UpdateMatch
(IN idjugador int, 
IN accion int,
IN reto int,
glocal int ,
gvisitante int )
BEGIN
  DECLARE email VARCHAR(100);
  DECLARE conteo VARCHAR(100);
  DECLARE jugador int;
  DECLARE jugadorvisitante int;
case  

when accion = 8 then-- insertar match
SELECT bitgames.idvisitante , bitgames.idlocal INTO jugador , jugadorvisitante FROM bitgames WHERE idbitgames = reto;
IF jugador = idjugador OR jugadorvisitante = idjugador THEN
UPDATE `bitgames` SET  bitgames.golocal = glocal , bitgames.golvisitane = gvisitante WHERE idbitgames = reto;
ELSE 
SELECT 0 AS puedeCancelar , jugador , jugadorvisitante , idjugador;
END IF;
end case; 
END //
DELIMITER ;

-- UPDATE `bitgames` SET `estatus` = '4' WHERE `bitgames`.`idbitgames` = 2;