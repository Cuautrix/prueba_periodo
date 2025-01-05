const Category = require('../Models/Category'); // Asegúrate de tener el modelo correcto
const fs = require('fs');
const path = require('path');
const Product = require('../Models/Product');

// Obtener una categoría por su ID
exports.get_category_by_id = async (req, res) => {
    if (req.user) {
        try {
            let id = req.params.id;
            let category = await Category.findById(id);

            if (!category) {
                return res.status(404).send({ message: 'Categoría no encontrada' });
            }

            res.status(200).send({ data: category });
        } catch (error) {
            console.error(error);
            res.status(500).send({ message: 'Error en el servidor', error });
        }
    } else {
        res.status(403).send({ message: 'Sin acceso' });
    }
};

// Obtener todas las categorías
exports.get_categories = async (req, res) => {
    try {
        let categories = await Category.find({});
        res.status(200).send({ data: categories });
    } catch (error) {
        console.error(error);
        res.status(500).send({ message: 'Error en el servidor', error });
    }
};

// Insertar una nueva categoría
exports.insert_category = async (req, res) => {
    if (req.user) {
        if (req.user.role === 'Administrador') {
            try {
                let data = req.body;

                // Verificar si el archivo se envió
                if (req.files && req.files.image) {
                    let img_route = req.files.image.path;
                    let img_name = path.basename(img_route); // Obtiene el nombre del archivo
                    data.Image = img_name;
                    console.log('Nombre de la imagen:', data.Image);
                } else {
                    res.status(400).send({ message: 'La imagen es requerida' });
                    return;
                }

                // Crear un slug a partir del nombre
                if (data.name) {
                    data.slug = data.name.toLowerCase().replace(/ /g, '-').replace(/[^\w-]+/g, '');
                }

                // Crear la nueva categoría
                let newCategory = await Category.create(data);

                res.status(201).send({ message: 'Categoría creada exitosamente', category: newCategory });
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

// Editar una categoría
exports.edit_category = async (req, res)=>{
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
            let reg = await Category.findByIdAndUpdate({_id:id},{
                name : data.name ,
                description : data.description ,
                Image: img_name
            })

            fs.stat('./uploads/category/'+reg.Image,function(err){
                if(!err){
                    fs.unlink('./uploads/category/'+reg.Image,(err=>{
                        if(err)throw err;
                    }));
                }
            })

            res.status(200).send({data:reg});

          }else{
            // no hay imagen
            //console.log('no hay imagen')
            let reg = await Category.findByIdAndUpdate({_id:id},{
                name : data.name ,
                description : data.description ,
            })
            res.status(200).send({data:reg});

          }     

         


        }else{
            res.status(500).send({message: 'Sin acceso'})
        }
    }else{
        res.status(500).send({message: 'Sin acceso'})
    }
}

// Eliminar una categoría
exports.delete_category = async (req, res) => {
    if (req.user) {
        if (req.user.role === 'Administrador') {
            try {
                let categoryId = req.params.id;

                let category = await Category.findById(categoryId);

                if (!category) {
                    return res.status(404).send({ message: 'Categoría no encontrada' });
                }

                // Ruta completa de la imagen a eliminar
                if (category.image) {
                    let imagePath = path.resolve('./uploads/categories' + category.image);
                    if (fs.existsSync(imagePath)) {
                        fs.unlinkSync(imagePath);
                    }
                }

                await Category.findByIdAndDelete(categoryId);

                res.status(200).send({ message: 'Categoría eliminada correctamente' });
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


exports.get_category_image= async (req, res)=>{
    var img = req.params['img'];

    fs.stat('./uploads/categories/'+img,function(err){
        if(!err){
            let ruta_img='./uploads/categories/'+img;
            res.status(200).sendFile(path.resolve(ruta_img));
        }else{
            let ruta_img='./uploads/default.jpg';
            res.status(200).sendFile(path.resolve(ruta_img));
        }
    })
}