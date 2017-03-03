var User= require('../models/user');
var jwt= require('jsonwebtoken');
var secret= 'secret';
var multer  = require('multer');
 var upload= multer({dest:'./public/upload'});

 

var Busboy = require('busboy');


var Project= require('../models/project');



module.exports= function(router){
  
  

	// http://localhost:9080/api/users
    //USER REG
	router.post('/users', function(req, res) {
        var user = new User(); 
        user.username = req.body.username; 
        user.password = req.body.password; 

        if (req.body.username == null || req.body.username == '' || req.body.password == null || req.body.password == '') {
            res.json({ success: false, message: 'Ensure username and password were provided' });
        } else {
            
            user.save(function(err) {
                if (err) {
                    res.json({ success: false, message: 'Username already exists!' }); // Cannot save if username or email exist in the database
                } else {
                    res.json({ success: true, message: 'user created!' }); 
                }
            });
        }
    });
    //Entering Project 
   
    //USER LOGIN
    // http://localhost:9080/api/authenticate
      router.post('/authenticate', function(req, res) {
        console.log(req.body);
      User.findOne({ username: req.body.username }).select('username password').exec(function(err, user) {
          if (err) throw err;

          if (!user) {
              res.json({ success: false, message: 'Could not authenticate' });
          } 
          else if (user) {
              if (req.body.password) {
                  var validPassword = user.comparePassword(req.body.password);}
                   else {
                  res.json({ success: false, message: 'No password provided' });
              }
                  if (!validPassword) {
                      res.json({ success: false, message: 'Could not validate Password' });
                  } else {
                    var token= jwt.sign({ username: user.username}, secret, {expiresIn: '24h'} );
                      res.json({ success: true, message: 'User Authenticate', token: token });
                  }
              }
          
      });
  });﻿
      router.use(function(req,res,next){
        var token= req.body.token || req.body.query || req.headers['x-access-token'];
        if(token){
            jwt.verify(token,secret,function(err,decoded){
                if(err){
                    res.json({success: false, message: 'token invalid'});

                }
                else{
                    req.decoded=decoded;
                    next();
                }
            });
        }
        else
        {
            res.json({success:false, message:'no token'});
        }
      });

      router.post('/me', function(req, res) {
        res.send(req.decoded);});


       function isAuthenticated(req, res, next) {
 

  var token= req.body.token || req.body.query || req.headers['x-access-token'];
      var decoded = jwt.decode(token);

  User.findOne({username: decoded.username}).select('username').exec(function(err, user) {
    if (!user) {

      return res.status(400).send({ message: 'User no longer exists.' });
    }
    console.log(user.username)

    req.user = user;
    next();
  })
}

       router.post('/projects', function(req, res) {
        var project = new Project(); 
        project.title = req.body.title; 
        project.URL = req.body.URL 
        var token= req.body.token || req.body.query || req.headers['x-access-token'];
      var decoded = jwt.decode(token);
    project.username= decoded.username;
     console.log(decoded.username);
        
      
        if (req.body.title == null || req.body.title == '' || req.body.URL == null || req.body.URL == '') {
            // console.log(req.body.title);
            // console.log(req.body.URL);
            res.send('no title or url')
            res.json({ success: false, message: 'Ensure a title and a url were provided' });
        } else {
            
            project.save(function(err) {
                if (err) {
                    res.json({ success: false, message: 'Please choose a unique title' }); // Cannot save if username or email exist in the database
                } else {
                    res.json({ success: true, message: 'File Created!' }); 
                }
            });
        }
    });

       
 router.get('/viewprojects',isAuthenticated, function(req, res,next) {
  var user =  req.params.username;
  Project.find({username:user}).select('title URL').exec(function(err,projects){
    if(projects){
      res.send({projects: projects})
    }
  })


});

router.post('/upload', upload.single('file'), function(req,res){
    console.log('Upload Successful ');
});

    
    
    return router; // Return router object to server
}