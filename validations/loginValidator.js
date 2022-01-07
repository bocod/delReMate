const {body} = require('express-validator');

const loginValidator = [
    body('username').notEmpty().withMessage('Completar tu nombre de usuario'),
    body('password').isLength({ min: 8 }).withMessage('Credenciales inválidas')
];

module.exports = loginValidator;