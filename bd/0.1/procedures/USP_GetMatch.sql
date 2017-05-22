 drop procedure USP_GetMatch;
DELIMITER //
CREATE PROCEDURE USP_GetMatch
(IN idjugador int, 
IN accion int,
IN reto int )
BEGIN
  DECLARE email VARCHAR(100);
  DECLARE conteo VARCHAR(100);
  DECLARE jugador int;
case  

when accion = 1 then 
SELECT * FROM rank.v_retosbitgame;

when accion = 2 then
SELECT idbitgames  as id, DATE_FORMAT(registro,'%b %d %Y %h:%i %p') as registro , ulocal , golocal, uvisitante, golvisitane , estatus , Diferencia , Torneo , Klan , Retador , Inserto , idinserta , idlocal , idvisitante FROM rank.v_retosbitgame where (v_retosbitgame.idlocal = idjugador or v_retosbitgame.idvisitante = idjugador )
 and  v_retosbitgame.estatus ='Activo(Aceptado)'  ;

when accion = 3 then
SELECT * FROM rank.v_retosbitgame where (v_retosbitgame.idlocal = 5 or v_retosbitgame.idvisitante = 5 )and Diferencia <6;
when accion = 4 then
SELECT bitgames.idlocal INTO jugador FROM bitgames WHERE idbitgames = reto;
IF jugador = idjugador THEN
UPDATE `bitgames` SET `estatus` = '4' WHERE idbitgames = reto;
ELSE 
SELECT 0 AS puedeCancelar;
END IF;
when accion = 5 THEN
SELECT idbitgames as id , DATE_FORMAT(registro,'%b %d %Y %h:%i %p') as registro , ulocal , golocal, uvisitante, golvisitane , estatus , Diferencia , Torneo , Klan , Retador , Inserto , idinserta , idlocal , idvisitante FROM rank.v_retosbitgame where   v_retosbitgame.idinserta = idjugador;

when accion = 6 then-- partid
SELECT bitgames.idvisitante INTO jugador FROM bitgames WHERE idbitgames = reto;
IF jugador = idjugador THEN
UPDATE `bitgames` SET `estatus` = '1' WHERE idbitgames = reto;
ELSE 
SELECT 0 AS puedeCancelar;
END IF;

when accion = 7 THEN -- Partidos recibidos
SELECT idbitgames as id , DATE_FORMAT(registro,'%b %d %Y %h:%i %p') as registro , ulocal , golocal, uvisitante, golvisitane , estatus , Diferencia , Torneo , Klan , Retador , Inserto , idinserta , idlocal , idvisitante FROM rank.v_retosbitgame where   v_retosbitgame.idvisitante = idjugador and  v_retosbitgame.estatus = 'En espera';

end case; 
END //
DELIMITER ;

-- UPDATE `bitgames` SET `estatus` = '4' WHERE `bitgames`.`idbitgames` = 2;