'use strict'
var mongoose = require ('mongoose');
var Schema = mongoose.Schema;

var ProductSchema= Schema({
    name:{type: String, required:true},
    description:{type: String, required:true},
    price:{type: Number,required:true},
    Available:{type: Boolean, required:true},
    id_Category:{type:Schema.ObjectId,ref:'Category',required:true},
    Image: { type:String,required:true},


});

module.exports = mongoose.model('Product',ProductSchema);