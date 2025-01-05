//rutas para admin
const{Router}=require('express');
const express= require('express');
const router=Router();
var auth= require('../middlewares/authenticate.js')
var multiparty = require('connect-multiparty');
var path = multiparty({uploadDir:'./uploads/categories'});


const CategoryController=require('../Controllers/category_controller.js');
const app = express();


router.get('/get_category_by_id/:id',auth.auth,CategoryController.get_category_by_id);
router.get('/get_categories',  CategoryController.get_categories);
router.post('/insert_category',[auth.auth,path],CategoryController.insert_category);
router.put('/edit_category/:id',[auth.auth,path],CategoryController.edit_category);
router.delete('/delete_category/:id',auth.auth,CategoryController.delete_category);
router.get('/get_category_image/:img',CategoryController.get_category_image);

module.exports=router;