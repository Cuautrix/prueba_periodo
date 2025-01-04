'use strict'
var mongoose = require ('mongoose');
var Schema = mongoose.Schema;

var OrderDetailSchema= Schema({
    Total:{type: Number,required:true},
    id_Order:{type:Schema.ObjectId,ref:'Order',required:true},
    id_User:{type:Schema.ObjectId,ref:'User',required:true},
    Date: { type: Date }


});

module.exports = mongoose.model('OrderDetail',OrderDetailSchema);