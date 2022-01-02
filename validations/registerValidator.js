const {body} = require('express-validator');

const registerValidator = [
    body('usertype').notEmpty().withMessage('Debes seleccionar si eres individuo o empresa'),
    body('name').isLength({min: 3}).withMessage('Debes escribir tu nombre completo'),
    body('surname').isLength({min: 2}).withMessage('Debes escribir tu apellido completo'),
    body('email').isEmail().withMessage('Debes ingresar un email válido')
];

module.exports = registerValidator;