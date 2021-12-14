const express = require('express');
const router = express.Router();
const mainController = require('../controllers/mainController');
const registerValidator = require('../validations/registerValidator');

router.get('/', mainController.home);

router.get('/login', mainController.login);
router.post('/login', mainController.login);

router.get('/productCart', mainController.productCart);

router.get('/:categorySelected', mainController.productList);

router.get('/:categorySelected/:id?', mainController.productDetail);

router.get('/register', mainController.register);
router.post('/register', registerValidator, mainController.register);

module.exports = router;