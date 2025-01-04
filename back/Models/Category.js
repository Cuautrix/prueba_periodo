'use strict'
var mongoose = require ('mongoose');
var Schema = mongoose.Schema;

var CategorySchema= Schema({
    name:{type: String, required:true},
    description:{type: String, required:true},
    Image: { type:String,required:true},

});

module.exports = mongoose.model('Category',CategorySchema);