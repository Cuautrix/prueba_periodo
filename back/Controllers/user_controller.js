
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


exports.get_productid = async (req, res) => {
    if (req.user) {
      const id = req.params['id'];
  
      try {
        // Encuentra el producto por ID y popula la categoría asociada
        const reg = await Product.findById(id).populate('id_Category'); // Cambié a minúsculas en 'category' si es correcto.
        console.log(reg)
        if (reg) {
          return res.status(200).send({ data: reg });
        } else {
          return res.status(404).send({ message: 'Producto no encontrado' });
        }
      } catch (error) {
        console.error('Error al obtener el producto:', error);
        return res.status(500).send({ message: 'Error del servidor' });
      }
    } else {
      return res.status(403).send({ message: 'Sin acceso' });
    }
  };
  

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
               if (req.files && req.files.image) {
                                  let img_route = req.files.image.path;
                                  let img_name = path.basename(img_route); // Obtiene el nombre del archivo
                                  data.Image = img_name;
                                  console.log('Nombre de la imagen:', data.Image);
                              } else {
                                  res.status(400).send({ message: 'La imagen es requerida' });
                                  return;
                              }
              
                
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
    if(req.user){
           if(req.user.role='Administrador'){
             let id= req.params['id'];
             let data = req.body;
          
             if(req.files){
               //si hay imagen
               let img_route = req.files.image.path;
               let img_name = path.basename(img_route); // Obtiene el nombre del archivo
               data.Image = img_name;
               console.log('Nombre de la imagen:', data.Image);
               let reg = await Product.findByIdAndUpdate({_id:id},{
                   name : data.name ,
                   description : data.description ,
                   price:data.price,
                   id_Category:data.category,
                   Image: img_name
               })
   
               fs.stat('./uploads/products/'+reg.Image,function(err){
                   if(!err){
                       fs.unlink('./uploads/products/'+reg.Image,(err=>{
                           if(err)throw err;
                       }));
                   }
               })
   
               res.status(200).send({data:reg});
   
             }else{
               // no hay imagen
               //console.log('no hay imagen')
               let reg = await Product.findByIdAndUpdate({_id:id},{
                   name : data.name ,
                   description : data.description ,
                   price:data.price,
                   id_Category:data.category,
                   
               })
               res.status(200).send({data:reg});
   
             }     
   
            
   
   
           }else{
               res.status(500).send({message: 'Sin acceso'})
           }
       }else{
           res.status(500).send({message: 'Sin acceso'})
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


exports.get_product_image= async (req, res)=>{
    var img = req.params['img'];

    fs.stat('./uploads/products/'+img,function(err){
        if(!err){
            let ruta_img='./uploads/products/'+img;
            res.status(200).sendFile(path.resolve(ruta_img));
        }else{
            let ruta_img='./uploads/default.jpg';
            res.status(200).sendFile(path.resolve(ruta_img));
        }
    })
}

exports.get_productcategory = async (req, res) => {
   
      const id = req.params['id'];
  
      try {
        // Encuentra el producto por ID y popula la categoría asociada
        const reg = await Product.find({id_Category:id}).populate('id_Category'); // Cambié a minúsculas en 'category' si es correcto.
        console.log(reg)
        if (reg) {
          return res.status(200).send({ data: reg });
        } else {
          return res.status(404).send({ message: 'Producto no encontrado' });
        }
      } catch (error) {
        console.error('Error al obtener el producto:', error);
        return res.status(500).send({ message: 'Error del servidor' });
      }
  
  };
  