var mongoose = require('mongoose'),
    User   = require('../models/user'), // get our mongoose model
    db = require('../connection'),
    User   = require('../models/user'), // get our mongoose model
    Helper   = require('../helpers/general'); // get helper
    crypto = require('crypto');
    const nodemailer = require('nodemailer');

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

       if(data=='nodata'){
          
          db.query('INSERT INTO bp_personas SET ?', usuario, function(err,ress){

            if(!err){

              Helper.Query(function(rows){

                  if(rows==null){
                    res.status(400);  res.send(err);  throw err;
                  }else{
                    console.log('Last insert ID:', ress.insertId);   
                    res.json({ success: true });     

                    let transporter = nodemailer.createTransport({
                        service: 'gmail',
                        auth: {
                            user: 'alonsosendmail@gmail.com',
                            pass: 'marioalonso77'
                        }
                    });

                    // setup email data with unicode symbols
                    let mailOptions = {
                        from: '"Alonso 👻" <alonsosendmail@gmail.com>', // sender address
                        to: 'alonsioh@gmail.com', // list of receivers
                        subject: 'Hola '+usuario.username, // Subject line
                        text: 'Saludos '+usuario.username+'!', // plain text body
                        html: '<b>  '+'Saludos '+usuario.nombre+'!'+ '</b>' // html body
                    };

                    // send mail with defined transport object
                  /*  transporter.sendMail(mailOptions, (error, info) => {
                        if (error) {
                            return console.log(error);
                        }
                        console.log('Message %s sent: %s', info.messageId, info.response);
                    });*/

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

exports.RandomPassword = function(req,res){


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

