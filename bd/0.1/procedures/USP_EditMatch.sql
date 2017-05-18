drop procedure USP_EditMatch;
DELIMITER //
CREATE PROCEDURE USP_EditMatch
(IN idjugador int, 
IN accion int,
IN reto int ,
IN gloc int,
IN gvis int)
BEGIN
  DECLARE email VARCHAR(100);
  DECLARE conteo VARCHAR(100);
  DECLARE jugador int;
case  
when accion = 4 then
SELECT bitgames.idlocal INTO jugador FROM bitgames WHERE idbitgames = reto;
IF jugador = idjugador THEN
UPDATE `bitgames` SET golocal = gloc ,  golvisitane = gvis , `estatus` = '5' WHERE `bitgames`.`idbitgames` = reto;
ELSE 
SELECT 0 AS puedeCancelar;
END IF;
end case; 
END //
DELIMITER ;

-- UPDATE `bitgames` SET `estatus` = '4' WHERE `bitgames`.`idbitgames` = 2;