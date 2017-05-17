drop procedure USP_GetMatch;
DELIMITER //
CREATE PROCEDURE USP_GetMatch
(IN idjugador int, 
IN accion int )
BEGIN
  DECLARE email VARCHAR(100);
  DECLARE conteo VARCHAR(100);
case  

when accion = 1 then 
SELECT * FROM rank.v_retosbitgame;

when accion = 2 then
SELECT idbitgames , DATE_FORMAT(registro,'%b %d %Y %h:%i %p') as registro , ulocal , golocal, uvisitante, golvisitane , estatus , Diferencia , Torneo , Klan , Retador , Inserto , idinserta , idlocal , idvisitante FROM rank.v_retosbitgame where v_retosbitgame.idlocal = idjugador or v_retosbitgame.idvisitante = idjugador;

when accion = 3 then
SELECT * FROM rank.v_retosbitgame where (v_retosbitgame.idlocal = 5 or v_retosbitgame.idvisitante = 5 )and Diferencia <6;

-- else set conteo =3;

end case; 
END //
DELIMITER ;
