'use strict'

var jwt = require('jwt-simple');
var moment = require ('moment');
var secret = 'administrador';

exports.createToken = function(user){
    var payload ={
        sub: user._id,
        nombres: user.nombres,
        apellidos: user.apellidos,
        email: user.email,
        role:user.rol,
        alias:user.alias,
        iat: moment().unix(),
        exp: moment().add(7,'days').unix() //duarcion del token
    }
    return jwt.encode(payload,secret);
}