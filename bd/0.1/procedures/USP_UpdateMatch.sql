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
  DECLARE existe int;
  DECLARE puntosLocal int;
  DECLARE puntosVisitante int;
case  

when accion = 8 then-- insertar match
SELECT bitgames.idlocal , bitgames.idvisitante INTO jugador , jugadorvisitante FROM bitgames WHERE idbitgames = reto;
IF jugador = idjugador OR jugadorvisitante = idjugador THEN
UPDATE `bitgames` SET  bitgames.estatus = 2 ,  bitgames.golocal = glocal , bitgames.golvisitane = gvisitante WHERE idbitgames = reto;

SELECT 1  INTO  existe  FROM bitgames WHERE bitgames.idbitgames = 1 and bitgames.estatus = 2;
	IF existe >0 THEN
		SELECT puntos  INTO puntosLocal FROM bp_personas  where bp_personas.idbp_personas = jugador;
	    SELECT puntos  INTO puntosVisitante FROM bp_personas  where idbp_personas = jugadorvisitante;
        IF glocal = gvisitante THEN
			UPDATE bp_personas SET puntos = puntosLocal+1 WHERE idbp_personas = jugador;
            UPDATE bp_personas SET puntos = puntosLocal+1 WHERE idbp_personas = jugadorvisitante;
            ELSE 
            IF glocal > gvisitante THEN
				UPDATE bp_personas SET puntos = puntosLocal+3 WHERE idbp_personas = jugador;
                ELSE 
			       UPDATE bp_personas SET puntos = puntosLocal+3 WHERE idbp_personas = jugadorvisitante;
            END IF;
        END IF;
	END IF;
ELSE 
SELECT 0 AS puedeCancelar , jugador , jugadorvisitante , idjugador;
END IF;
end case; 
END //
DELIMITER ;

-- UPDATE `bitgames` SET `estatus` = '4' WHERE `bitgames`.`idbitgames` = 2;