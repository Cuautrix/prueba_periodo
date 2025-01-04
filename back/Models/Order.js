'use strict'
var mongoose = require ('mongoose');
var Schema = mongoose.Schema;

var OrderSchema= Schema({
    Products: [{
         _id: { type: mongoose.Schema.Types.ObjectId, ref: 'Product', required: true },
         numero: { type: Number, required: true },
       }],
    Total:{type: Number,required:true},
    id_User:{type:Schema.ObjectId,ref:'User',required:true},
   

});

module.exports = mongoose.model('Order',OrderSchema);