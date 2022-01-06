const { body } = require('express-validator');

const registerValidator = [
    body('name').notEmpty().withMessage('Debes escribir tu nombre'),
    body('surname').notEmpty().withMessage('Debes escribir tu apellido'),
    body('email')
        .notEmpty().withMessage('Debes completar tu mail').bail()
        .isEmail().withMessage('Debes ingresar un email válido'),
    body('username').notEmpty().withMessage('Completar tu nombre de usuario'),
    body('password').isLength({ min: 8 }).withMessage('Ingresar una contraseña válida')
];

module.exports = registerValidator;