const express = require('express');
const router = express.Router();
const mainController = require('../controllers/mainController');
const registerValidator = require('../validations/registerValidator');

router.get('/', mainController.home);

router.get('/register', mainController.registrationForm);
router.post('/register', mainController.createUser);

router.get('/login', mainController.login);
router.post('/login', mainController.loginConfirmation);

router.get('/productCart', mainController.productCart);

router.get('/:categorySelected', mainController.productList);

router.get('/:categorySelected/:id?', mainController.productDetail);

module.exports = router;