const {body} = require('express-validator');

const registerValidator = [
    body('user-type').notEmpty().withMessage('Debes seleccionar si eres individuo o empresa'),
    body('name')
        .notEmpty().withMessage('Debes completar tu nombre')
        .isLength({min: 3}).withMessage('Debes escribir tu nombre completo'),
    body('surname')
        .notEmpty().withMessage('Debes completar tu apellido')
        .isLength({min: 2}).withMessage('Debes escribir tu apellido completo'),
    body('email').isEmail().withMessage('Debes ingresar un email válido')
];

module.exports = registerValidator;