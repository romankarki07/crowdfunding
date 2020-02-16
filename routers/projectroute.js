var mongoose = require('mongoose');
var async = require('async');
var fs = require('fs');
var express = require('express');
var bodyParser = require('body-parser');
var app = express();
var multer = require('multer');
var models = require('./models/models');
var project = models.projectModel;
//var expressValidator = require('express-validator');
//var expressSession = require('express-session');

//page to create new project
exports.createProject = function(req, res){
    res.render('home',{
        pid:'addProject'
    })
};

 //function for post routes
 exports.postProject = function(req, res, next){
    req.check('title').isTitle();
    req.check('name').isName();
    req.check('description').isDescription();
    req.check('type').isType();
    var errors = req.validationErrors();
    if(errors){
        req.session.errors = errors;
        req.session.success = false;
    } else{
        req.session.success = true; 
        var request = req.body;
        var Project = new Project({
          _id: mongoose.Types.ProjectId(),
            title: request.title,
            name: request.name,
            description: request.description,
            type: request.type  
        });
        project.save(function(err, rep){
            console.log('New Project Created');
              console.log(rep);
              
        });
    }
    res.redirect('/allprojects');

}
//post project
exports.postProject = (req, res)=>{
    console.log(req.body);
    
}