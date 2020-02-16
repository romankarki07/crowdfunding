var mongoose = require('mongoose');
var async = require('async');
var fs = require('fs');
var express = require('express');
var bodyParser = require('body-parser');
var app = express();
var multer = require('multer');
var models = require('./models/models');
var signUp = models.signUpModel;
var expressValidator = require('express-validator');
var expressSession = require('express-session');
//for images upload using multer
// var routes = require('./routers/routes');
//   connect to db mongo
//   mongoose.Promise = global.Promise;
//   mongoose.connect('mongodb://localhost:27017/library').then(function(){
//   	console.log('database Connect');
//   });
  //get routers functions
   //home page
  exports.homePage = function(req, res){
     res.render('home', {
         pid:'home',
         session: req.session.user,
         isLoggedIn: req.session.isLoggedIn
     });
  };
//   exports.createproject = (req, res)=> {
//     res.render('home', {
//         pid:'create-project',
//         session: req.session.user,
//         isLoggedIn: req.session.isloggedIn
//     });
//   }
  exports.checkLogin = function(req, res, next){
    if(!req.body.userEmail){
        res.render('home',{
            pid: 'login',
            error: 'cannot leave empty email.',
            session: req.session.user,
            isLoggedIn: req.session.isLoggedIn
        });
    }
    else if(!req.body.userPassword){
        res.render('home',{
            pid: 'login',
            error: 'Please enter your password.',
            session: req.session.user,
            isLoggedIn: req.session.isLoggedIn
        });
    }
    
        next();
  }
 
  exports.nextCheck = function(req, res, next){
    models.signUpModel.findOne({email: req.body.userEmail, password: req.body.userPassword} , function(err, userData){
        if(!userData){
            req.session.user = null
            req.session.isLoggedIn = false
            res.render('home',{
                pid: 'login',
                error: 'Invalid email address or password.',
                success: false,
                session: req.session.user,
                isLoggedIn: req.session.isLoggedIn
            });
        } 
        else{
            console.log('loggedin user');
            req.session.user = userData
            req.session.isLoggedIn = true
            res.redirect('/')
        }
    });
}
  //for signup page
  exports.signupPage = function(req, res){
    if(!req.session.isLoggedIn){
         res.render('home',{
        pid:'signup',
        success: req.session.success,
        errors:req.session.errors,
        session: req.session.user,
        isLoggedIn: req.session.isLoggedIn
    });
}else{
    res.redirect('/')
}
  };

  //page to create new project
  exports.createProject = function(req, res){
     if(req.session.isLoggedIn){
        res.render('home',{
            pid:'create-project',
            session: req.session.user,
            isLoggedIn: req.session.isLoggedIn
        })
     }else{
        res.redirect('/')
     }
  };
  //for login page
  exports.loginPage = function(req, res, next){
     if(!req.session.isLoggedIn){
        res.render('home',{
            pid:'login',
            error:null,
            session: req.session.user,
            isLoggedIn: req.session.isLoggedIn
       });
     }else{
         res.redirect('/')
     }
  };
  //for single post display
  exports.singleDetails = function(req, res){
      models.project.findById(req.params.id, function(err, response){
        res.render('home',{
            pid:'details',
            data: response,
            session: req.session.user,
            isLoggedIn: req.session.isLoggedIn
        });
      })
  }
  //function for post routes
  exports.postSignup = function(req, res, next){
      req.check('firstName','Min-1, max-10 character').isLength({min:3});
      req.check('lastName','Min-1, max-10 character').isLength({min:3});
      req.check('email', 'Entered email address is invalid.').isEmail();
      req.check('password', 'Invalid Password').isLength({min:5}).equals(req.body.confirmPassword);
      var errors = req.validationErrors();
      if(errors){
          req.session.errors = errors;
          req.session.success = false;
      } else{
          req.session.success = true; 
          var request = req.body;
          var userSignup = new signUp({
            _id: mongoose.Types.ObjectId(),
             firstName: request.firstName,
             lastName: request.lastName,
             email: request.email,
             password: request.password,
             usertype: request.usertype   
          });
          userSignup.save(function(err, rep){
              console.log('New user Created');
                console.log(rep);
                
          });
      }
      res.redirect('/signup');
  }
  //post project
  exports.postProject = function(req, res){
      console.log(req.files);
      
req.files.forEach(function(file) {
    var filename = (new Date).valueOf() + '-' + file.originalname.replace(/\s/g, '');
    fs.rename(file.path, './public/uploads/' + filename, function(err) {
        if (err) {
            res.send('File data error. Try again');
            console.log(err);
        } else {
            var datas = models.project({
                title : req.body.title,
                name:req.body.name,
                file: filename,
                description: req.body.description,
                type: req.body.type,
                created: Date.now()
            });
            datas.save(function(err, response){
                console.log(err);
                
                if(err) res.send('Error')
                else res.send("Project Created Successfully.")
            })
        }
    })
});
 
  }
  exports.getProject = function(req, res){
      models.project.find(function(err, response){
          res.json(response)
      })
  }


