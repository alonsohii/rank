var mongoose = require('mongoose'),
    User   = require('../models/user'), // get our mongoose model
    db = require('../connection'),
    User   = require('../models/user'), // get our mongoose model
    Helper   = require('../helpers/general'); // get helper
    crypto = require('crypto');
    const nodemailer = require('nodemailer');
    var generator = require('generate-password');
    var crypto = require('crypto');

exports.InsertarUsuario = function(req,res){

  var data = req.body;



const secret = 'webos con frijoles@327';
const hash = crypto.createHmac('sha256', secret)
                   .update(data.pw)
                   .digest('hex');



  var usuario = {

   
   
    username: data.firstName, 
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
    ip:null,
    fb:data.facebook
  };

  Helper.Query(function(data){
console.log(usuario.username);
     if(data=='nodata'){

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

                       /*   Helper.mail({
                              from: '"Alonso 👻" <alonsosendmail@gmail.com>', // sender address
                              to: 'alonsioh@gmail.com', // list of receivers
                              subject: 'Hola '+usuario.username, // Subject line
                              text: 'Saludos '+usuario.username+'!', // plain text body
                              html: '<b>  '+'Saludos '+usuario.nombre+'!'+ '</b>' // html body
                          });*/

                        }

                    },"SELECT idbp_personas FROM bp_personas ed  WHERE ed.correo= '"+usuario.correo+"' and ed.nombre = '"+usuario.nombre+"'",db);

                  }else {
                   res.status(400);  res.send(err);  throw err;
                  }
                });

             }else{
                 res.json({ success: false, correo:1 });     
             }

        },"SELECT idbp_personas FROM bp_personas ed  WHERE ed.correo= '"+usuario.correo+"'",db);


     }else{
        res.json({ success: false , usuario:1 });     
     }

  },"SELECT idbp_personas FROM bp_personas ed  WHERE ed.username= '"+usuario.username+"'",db);


}

exports.RandomPassword = function(req,res){

  var usuario = req.body;

    Helper.Query(function(data){
      
       if(data!='nodata'){

        var pass = generator.generate({
            length: 10,
            numbers: true
        });

       const secret = 'webos con frijoles@327';
       const hash = crypto.createHmac('sha256', secret)
               .update(pass)
               .digest('hex');

          var sql = 'UPDATE bp_personas SET pw = ? WHERE correo = ?';
          console.log(usuario.email);
          db.query(sql,[hash, usuario.email], function(err,ress){
         
            if(!err){
                    console.log('Se genera password:', ress.insertId);   


                    Helper.mail({
                        from: '"Alonso 👻" <alonsosendmail@gmail.com>', // sender address
                        to: 'alonsioh@gmail.com', // list of receivers
                        subject: 'Hola '+usuario.email, // Subject line
                        text: 'Su nuevo password es  '+pass+'', // plain text body
                        html: '<b>  '+'Su nuevo password es  '+pass+''+ '</b>' // html body
                    });

                    console.log('pasa');
                    res.json({ success: true });     

            }else {
             res.status(400);  res.send(err);  throw err;
            }
          });

       }else{
           res.json({ success: false });     res.status(400);
       }

  },"SELECT idbp_personas FROM bp_personas ed  WHERE ed.correo= '"+usuario.email+"'",db);

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

