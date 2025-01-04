//rutas para admin
const{Router}=require('express');
const express= require('express');
const router=Router();
var auth= require('../middlewares/authenticate.js')
var multiparty = require('connect-multiparty');
var path = multiparty({uploadDir:'./uploads/firma'});


const CategoryController=require('../Controllers/category_controller.js');
const app = express();


router.get('/get_category_by_id/:id',CategoryController.get_category_by_id);
router.get('/get_categories',  CategoryController.get_categories);
router.post('/insert_category',CategoryController.insert_category);
router.put('/edit_category/:id',auth.auth,CategoryController.edit_category);
router.delete('/delete_category',auth.auth,CategoryController.delete_category);
module.exports=router;