var express = require('express');
var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var db = mongoose.connect('mongodb://localhost:27017/library',{
    useNewUrlParser: true,
    useUnifiedTopology: true,
});
db.then(function(){
    console.log('database Connect');
});
var signUpSchema = Schema({
    _id: Schema.Types.ObjectId,
    firstName: String,
    lastName: String,
    email:{
        type: String,
        unique: true,
        lowercase: true,
        required: true
    },
    usertype: String, //types are 'ent_' and 'inv_'
    password:{ type:String, select:false, required: true}
});
exports.signUpModel = mongoose.model('signupUser', signUpSchema);

var projectSchema =Schema ({
    title : {
        type: String, required:true
    },
    name:{
        type:String, required:true
    },
    user: {
        type: String,
        ref: 'signupUser'
    },
    file: String,
    description:{
        type:String, required:true
    },
    type:{
        type:String, required:true
    },
    created: {
        type: Date,
        default: Date.now()
    }
});
exports.project = mongoose.model('project', projectSchema);

var investments = Schema ({
    projectid: {
        type: String,
        ref: 'project'
    },
    userid: {
        type: String,
        ref: 'signupUser'
    },
    amount: Number,
    query: String
});
exports.investments = mongoose.model('invest', investments);





