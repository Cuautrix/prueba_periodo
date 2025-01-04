const Category = require('../Models/Category'); // Asegúrate de tener el modelo correcto
const fs = require('fs');
const path = require('path');

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

                // Manejar la imagen si se sube
                if (req.files && req.files.image) {
                    let img_route = req.files.image.path;
                    let nombre = img_route.split('/');
                    let img_name = nombre[2];
                    data.image = img_name;
                }

                // Crear un slug a partir del nombre
                data.slug = data.name.toLowerCase().replace(/ /g, '-').replace(/[^\w-]+/g, '');

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
exports.edit_category = async (req, res) => {
    if (req.user) {
        if (req.user.role === 'Administrador') {
            try {
                let categoryId = req.params.id;
                let data = req.body;

                // Si se envía una nueva imagen
                if (req.files && req.files.image) {
                    let img_route = req.files.image.path;
                    let nombre = img_route.split('/');
                    let img_name = nombre[2];
                    data.image = img_name;
                }

                // Actualizar el slug si se cambia el nombre
                if (data.name) {
                    data.slug = data.name.toLowerCase().replace(/ /g, '-').replace(/[^\w-]+/g, '');
                }

                let updatedCategory = await Category.findByIdAndUpdate(categoryId, data, {
                    new: true,
                    runValidators: true,
                });

                if (!updatedCategory) {
                    return res.status(404).send({ message: 'Categoría no encontrada' });
                }

                res.status(200).send({ message: 'Categoría actualizada correctamente', category: updatedCategory });
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
                    let imagePath = path.resolve('./uploads/' + category.image);
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
