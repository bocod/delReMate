const express = require('express');
const productRouter = express.Router();

const productController = require('../controllers/productController');

//PRODUCTS ROUTES

productRouter.get('/productCart', productController.productCart);

productRouter.get('/:categorySelected', productController.productList);

productRouter.get('/:categorySelected/:id?', productController.productDetail);


module.exports = productRouter;