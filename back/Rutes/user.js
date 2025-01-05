//rutas para admin
const{Router}=require('express');
const express= require('express');
const router=Router();
var auth= require('../middlewares/authenticate.js')
var multiparty = require('connect-multiparty');
var path = multiparty({uploadDir:'./uploads/products'});


const UserController=require('../Controllers/user_controller.js');
const app = express();


router.post('/login_user',UserController.login_user);
router.get('/get_productid/:id',auth.auth,UserController.get_productid);
router.get('/get_products',  UserController.get_products);
router.post('/insert_product',[auth.auth,path],UserController.insert_product);
router.put('/edit_product/:id',[auth.auth,path],UserController.edit_product);
router.delete('/delete_product/:id',auth.auth,UserController.delete_product);
router.get('/get_product_image/:img',UserController.get_product_image);
router.get('/get_productcategory/:id',UserController.get_productcategory);

module.exports=router;