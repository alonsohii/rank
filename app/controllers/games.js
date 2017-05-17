var mongoose = require('mongoose'),
    express   = require('express'),
    User   = require('../models/user'), // get our mongoose model
    db = require('../connection'),
    app         = express(),
    User   = require('../models/user'), // get our mongoose model
    Helper   = require('../helpers/general'); // get helper
    crypto = require('crypto'),
    jwt    = require('jsonwebtoken'), // used to create, sign, and verify tokens
    config = require('../../config');// get our config file
    const nodemailer = require('nodemailer');
    var generator = require('generate-password');
    var crypto = require('crypto');
    app.set('superSecret', config.secret); // secret variable

exports.AddMatch = function(req,res){
  var post = req.body;

  var usuario = {

    idlocal: post.retador, 
    idvisitante: post.combobox, 
    torneoid: 0,
    estatus:0
  };




    Helper.Query(function(data){
      
       if(data!='nodata'){


        db.query('CALL USP_InsertMatch(?,?,?,?)',[post.retador, post.combobox, 0,null],function(err,rows){
            if(!err){
//console.log(rows[0][0]);
                    if(rows[0][0].r == 'SI'){

                        Helper.mail({
                            from: '"GamerVita 👻" <alonsosendmail@gmail.com>', // sender address
                            to: rows[0][0].correo , // list of receivers
                            subject: 'Te reto a un duelo! '+post.visitante + ' en GamerVita lo aceptas?', // Subject line
                            text: 'El usuario '+post.retadorStr+' te a retado aceptas su reto?', // plain text body
                            html: 'El usuario '+post.retadorStr+' te a retado aceptas su reto?' // html body
                        });


                       Helper.mail({
                            from: '"GamerVita 👻" <alonsosendmail@gmail.com>', // sender address
                            to: 'alonsioh@gmail.com', // list of receivers
                            subject: 'Has retado al usuario! '+post.visitante + '', // Subject line
                            text: post.retadorStr+',Has retado espera a que tu contrincante acepte el duelo.', // plain text body
                            html: post.retadorStr+',Has retado espera a que tu contrincante acepte el duelo.' // html body
                        });
                    

                        res.json({ success: true , sobrepasa:0, conteo:rows[0] }); 

                    }else{

                        res.json({ success: true , sobrepasa:1 ,conteo:rows[0] }); 
                    }
    

            }else {
             res.status(400);  res.send(err);  throw err;
            }
        });


       }else{
           res.json({ success: false });     res.status(400);
       }

  },"SELECT idbp_personas as id ,ed.correo as mail ,  FROM bp_personas ed  WHERE ed.idbp_personas= '"+usuario.idvisitante+"'",db);


}

exports.Partidos = function(req,res){

  var datos = req.query;


        db.query('CALL USP_GetMatch(?,?)',[req.decoded.id, 2],function(err,rows){
            if(!err){
                 var obj  = new Object();
                 res.setHeader('Content-Type', 'application/json');
                  obj.curPage = 1;
              //   obj.rowCount = 10;
                 obj.data = rows[0];
                 obj.totalRecords = rows[0].length;
                 res.json(obj);

            }else {
             res.status(400);  res.send(err);  throw err;
            }
        });


}

/*
        db.query('CALL USP_InsertMatch(?,?,?,?)',[post.retador, post.combobox, 0,null],function(err,rows){
            if(!err){

            }else {
             res.status(400);  res.send(err);  throw err;
            }
        });
        */