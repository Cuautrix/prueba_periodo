'use strict'

var express = require('express');
var app = express();
var bodyparser = require('body-parser');
var mongoose = require('mongoose');
var port = process.env.PORT || 4201;

var server =require('http').createServer(app);
var io = require ('socket.io')(server,{
  cors: {origin : '*'}
});


io.on('connection',function(socket){
  socket.on('delete-carrito',function(data){
    io.emit('new-carrito',data);
    console.log(data);
  });
})


var user_route = require('./Rutes/user');
var category_route = require('./Rutes/category');


// Método para realizar operaciones de tiempo real con socket.io
function socketOperations(socket) {
  // Método para eliminar el producto del carrito
  socket.on('eliminar-carrito', function (data) {
    io.emit('nuevo-carrito', data);
    console.log(data);
  });

  // Método para agregar producto al carrito
  socket.on('agregar-carrito-add', function (data) {
    io.emit('nuevo-carrito-add', data);
    console.log(data);
  });

  // Métodos para el carrito del admin (Agrega más según necesites)
  socket.on('eliminar-carrito-admin', function (data) {
    io.emit('nuevo-carrito-admin', data);
    console.log(data);
  });

  socket.on('agregar-carrito-add-admin', function (data) {
    io.emit('nuevo-carrito-add-admin', data);
    console.log(data);
  });


   // Métodos para el carrito del admin (Agrega más según necesites)
   socket.on('datos-cliente', function (data) {
    io.emit('nuevo-datos-cliente', data);
    console.log(data);
  });
  // Puedes agregar más eventos y métodos de socket.io aquí según necesites
}

// Conexión de socket.io
io.on('connection', function (socket) {
  console.log('Un cliente se ha conectado.');
  socketOperations(socket); // Llamamos al método para las operaciones de tiempo real
});

mongoose.connect('mongodb://127.0.0.1:27017/prueba')
  .then(() => {
    server.listen(port, function() {
      console.log('Servidor corriendo en el puerto '+ port);
    });
  })
  .catch(err => {
    console.log(err);
  });

  app.use(bodyparser.urlencoded({extended:true}));
  app.use(bodyparser.json({limit: '50mb',extended:true}));

  app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*'); // Permitir todas las fuentes (para desarrollo)
    res.header(
        'Access-Control-Allow-Headers',
        'Authorization, X-API-KEY, Origin, X-Requested-With, Content-Type, Access-Control-Allow-Request-Method'
    );
    res.header('Access-Control-Allow-Methods', 'GET, PUT, POST, DELETE, OPTIONS');
    res.header('Allow', 'GET, PUT, POST, DELETE, OPTIONS');

    // Maneja las solicitudes preflight
    if (req.method === 'OPTIONS') {
        return res.sendStatus(200);
    }

    next();
});

 app.use('/api',user_route);
 app.use('/api',category_route);
 

module.exports = app;