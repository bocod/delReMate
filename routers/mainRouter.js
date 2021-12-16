const express = require('express');
const router = express.Router();
const mainController = require('../controllers/mainController');
const productController = require('../controllers/productController');


router.get('/', mainController.home);

router.get('/tyc', (req, res) => res.render('tyc'));
router.get('/pp', (req, res) => res.render('pp'));

module.exports = router;