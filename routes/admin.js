const path = require('path');

const express = require('express');

const router = express.Router();



const productsController=require("../Controller/products")
// /admin/add-product => GET
router.get('/add-product', productsController.getAllProduts );

// /admin/add-product => POST
router.post('/add-product', productsController.postAllProducts);

module.exports=router
