var mongoose = require('mongoose'),
    User   = require('../models/user'), // get our mongoose model
    db = require('../connection'),
    User   = require('../models/user'), // get our mongoose model
    Helper   = require('../helpers/general'); // get helper
    crypto = require('crypto');

exports.InsertarUsuario = function(req,res){
//var hash = crypto.createHash('sha1');

//connection.query("INSERT INTO `bp_personas` (`idbp_personas`, `username`, `nombre`, `apellido`, `segundoapellido`, `correo`, `pw`, `fkidcatPaises`, `idcatEstado`, `idcatPersonaEstado`, `fecharegistro`, `sexo`, `subcorreo`, `idciudad`, `Ciudad`) VALUES (NULL, NULL, 'Mario', 'Hernandez', 'Iniguez', 'alonsohi@hotmail.com', 'mario123', ' 1', '1', '0', '2017-02-14 00:00:00', '1', 'demo@hotmail.com', NULL, 'mexicali');", function(err, rows, fields) {
  var data = req.body;

// https://ciphertrick.com/2016/01/18/salt-hash-passwords-using-nodejs-crypto/

const secret = 'webos con frijoles@327';
const hash = crypto.createHmac('sha256', secret)
                   .update(data.pw)
                   .digest('hex');



  var usuario = {

   
    username: null,
    nombre: data.firstName, 
    apellido: data.lastName, 
    segundoapellido: null,
    correo:data.email, 
    pw:  hash, 
    fkidcatPaises: data.ComboPaises,
    idcatEstado:1, 
    idcatPersonaEstado:0,
    //fecharegistro:null, 
    sexo:null, 
    subcorreo:null, 
    idciudad:null, 
    Ciudad:null,
    ip:null
  };


  Helper.Query(function(data){

       if(data=='nodata'){
          
          db.query('INSERT INTO bp_personas SET ?', usuario, function(err,ress){

            if(!err){

              Helper.Query(function(rows){

                  if(rows==null){
                    res.status(400);  res.send(err);  throw err;
                  }else{
                    console.log('Last insert ID:', ress.insertId);   
                    res.json({ success: true });     
                  }

              },"SELECT idbp_personas FROM bp_personas ed  WHERE ed.correo= '"+usuario.correo+"' and ed.nombre = '"+usuario.nombre+"'",db);

            }else {
             res.status(400);  res.send(err);  throw err;
            }
          });

       }else{
           res.json({ success: false });     
       }

  },"SELECT idbp_personas FROM bp_personas ed  WHERE ed.correo= '"+usuario.correo+"'",db);


}



exports.UsuarioMongoDb = function(req,res){

  var nick = new User({ 
    name: 'chilo', 
    password: '1234',
    admin: true 
  });
  nick.save(function(err) {
    if (err) res.status(400); res.send(err);  throw err;

    console.log('User saved successfully');
    res.json({ success: true });
  });


}

