
'use strict'
var User = require ('../Models/User');
var bcrypt = require('bcrypt-nodejs');
var jwt = require ('../helpers/jwt');
var Product = require('../Models/Product');

const fs = require('fs');
const path = require('path');

exports.login_user = async (req, res) => {
    try {
        // Almacenar el correo y contraseña
        var data = req.body;
        // Buscar correo
        var User_array = [];
        User_array = await User.find({ email: data.email });
    
        if (User_array.length == 0) {
            res.status(200).send({ message: 'No se encontro el usuario', data: undefined });
        } else {
            // LOGIN
            let user = User_array[0];
            bcrypt.compare(data.password, user.password, async function (error, check) {
                if (check) {
                        res.status(200).send({
                            data: user,
                            token: jwt.createToken(user)
                        });
                        
                } else {
                    res.status(200).send({ message: 'La contraseña no coincide', data: undefined });
                }
            });
        }
    } catch (error) {
        console.error('Error general:', error);
        res.status(500).send({ message: 'Error en el servidor', data: undefined });
    }
}

exports.insert_user = async (req, res) => {
    try {
        let data = req.body;
        // Crear el usuario en la base de datos
        let newUser = await User.create(data);
        res.status(200).send({
            message: 'Usuario creado exitosamente',
            user: newUser,
        });
    } catch (error) {
        console.error(error); 
        res.status(500).send({
            message: 'Error en el servidor al crear el usuario',
            error: error.message, // Detalle del error para depuración
        });
    }
};


exports.get_productid = async(req,res)=>{
   if(req.user){
         var id = req.params['id'];
         try{
             var reg = await Product.findById({_id:id});
              res.status(200).send({data:reg});
         }catch{
             res.status(200).send({data:undefined});
         }
     }else{
         res.status(500).send({message: 'Sin acceso'})
     }
}

exports.get_products = async(req,res)=>{
try {
    const reg = await Product.find({});
    res.status(200).send({ data: reg });
  } catch (error) {
    console.error(error);
    res.status(500).send({ message: 'Error en el servidor' });
  }
}

exports.insert_product = async(req,res)=>{
    if(req.user)
        {
            if(req.user.role=== 'Administrador' )
            {
              let data = req.body;
                var img_route = req.files.image.path;
                var nombre= img_route.split('/');
               // var nombre= img_ruta.split('\\');
    
                var img_name = nombre[2];
                //insertar en la bd
                data.slug = data.titulo.toLowerCase().replace(/ /g, '-').replace(/[^\w-]+/g, '');
                data.image = img_name;
                
                let newproduct = await Product.create(data);
                res.status(200).send({
                    message: 'Usuario creado exitosamente',
                    product: newproduct,
                });
            }
            else{
                res.status(500).send({message: 'Sin acceso'})
            }
        }else{
            res.status(500).send({message: 'Sin acceso'})
        }
}

exports.edit_product = async (req, res) => {
    if (req.user) {
        if (req.user.role === 'Administrador') {
            try {
                let productId = req.params.id; // Asegúrate de pasar el ID del producto en los parámetros de la URL
                let data = req.body;

                // Si se envía una nueva imagen
                if (req.files && req.files.image) {
                    var img_route = req.files.image.path;
                    var nombre = img_route.split('/');
                    // var nombre= img_ruta.split('\\'); // para sistemas Windows
                    var img_name = nombre[2];
                    data.image = img_name;
                }

                // Actualizar el slug solo si se cambia el título
                if (data.titulo) {
                    data.slug = data.titulo.toLowerCase().replace(/ /g, '-').replace(/[^\w-]+/g, '');
                }

                // Actualizar el producto en la base de datos
                let updatedProduct = await Product.findByIdAndUpdate(productId, data, {
                    new: true, // Devuelve el documento actualizado
                    runValidators: true, // Ejecuta las validaciones del modelo
                });

                if (!updatedProduct) {
                    return res.status(404).send({ message: 'Producto no encontrado' });
                }

                res.status(200).send({ message: 'Producto actualizado correctamente', product: updatedProduct });
            } catch (error) {
                console.error(error);
                res.status(500).send({ message: 'Error en el servidor', error });
            }
        } else {
            res.status(403).send({ message: 'Sin acceso' });
        }
    } else {
        res.status(403).send({ message: 'Sin acceso' });
    }
};

exports.delete_product = async (req, res) => {
    if (req.user) {
        if (req.user.role === 'Administrador') {
            try {
                let productId = req.params.id; // Obtener el ID del producto de los parámetros

                // Buscar el producto por su ID
                let product = await Product.findById(productId);

                if (!product) {
                    return res.status(404).send({ message: 'Producto no encontrado' });
                }

                // Ruta completa de la imagen a eliminar
                let imagePath = path.resolve('./uploads/' + product.image);

                // Eliminar el archivo de la imagen si existe
                if (fs.existsSync(imagePath)) {
                    fs.unlinkSync(imagePath); // Eliminar el archivo
                }

                // Eliminar el producto de la base de datos
                await Product.findByIdAndDelete(productId);

                res.status(200).send({ message: 'Producto eliminado correctamente' });
            } catch (error) {
                console.error(error);
                res.status(500).send({ message: 'Error en el servidor', error });
            }
        } else {
            res.status(403).send({ message: 'Sin acceso' });
        }
    } else {
        res.status(403).send({ message: 'Sin acceso' });
    }
};
