const {body} = require('express-validator');

const loginValidator = [
    body('username').notEmpty().withMessage('Completar tu nombre de usuario'),
    body('password').isLength({ min: 8 }).withMessage('Ingresar una contraseña válida')
];

module.exports = loginValidator;