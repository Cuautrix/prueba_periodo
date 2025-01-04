'use strict'
var mongoose = require ('mongoose');
var Schema = mongoose.Schema;

var UserSchema= Schema({
    Name:{type: String,required:true},
    LastName:{type: String, required:true},
    email:{ type: String, required: true},
    password:{ type: String, required: true}, 
    rol:{ type: String, required: true},
});

module.exports = mongoose.model('User',UserSchema);