const express = require('express');
const productRouter = express.Router();

const productController = require('../controllers/productController');
const authMiddleware = require('../middlewares/authMiddleware');

//PRODUCTS ROUTES

productRouter.get('/productCart', authMiddleware, productController.productCart);

productRouter.get('/:categorySelected', productController.productList);

productRouter.get('/:categorySelected/:id?', productController.productDetail);


module.exports = productRouter;