CREATE VIEW V_RETOSBITGAME AS
SELECT 
bg.idbitgames,
bg.fecha registro,
 loc.username ulocal ,
 bg.golocal,
 vis.username uvisitante, 
 bg.golvisitane,
case  bg.estatus 
	when  0  THEN 'En espera' 
    when  1  THEN 'Activo(Aceptado)' 
    when  2  THEN 'Finalizado' 
    when  3  THEN 'Rechazado'
    when  4  THEN 'Cancelado' 
    else CASE When datediff(bg.fecha, now()) > 5 THEN 'Vencido' END
end estatus, 
-- ADDDATE(bg.fecha, INTERVAL 5 DAY) Dif , 
datediff(bg.fecha, now() ) *-1  as Diferencia ,
tor.nombre  Torneo,
klan.nombre Klan,
loc.username Retador,
CASE WHEN bg.idinserta = 0 THEN NULL
	 WHEN bg.idinserta = loc.idbp_personas THEN loc.username
     WHEN bg.idinserta = vis.idbp_personas THEN vis.username
END Inserto,
bg.idinserta,
bg.idlocal,
bg.idvisitante
FROM bitgames bg
INNER JOIN bp_personas loc on loc.idbp_personas = bg.idlocal 
INNER JOIN bp_personas vis on vis.idbp_personas = bg.idvisitante 
LEFT JOIN torneos tor on tor.idtorneos = bg.torneoid
LEFT JOIN gmklan klan on klan.idklan = bg.idklan ;

-- SELECT *  FROM bitgames;

-- select datediff('2010-04-15', '2010-04-12');
