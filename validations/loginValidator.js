const { body } = require('express-validator');

const loginValidator = [
    body('username').notEmpty().withMessage(' '),
    body('password').isLength({ min: 4 }).withMessage('¡Credenciales inválidas!')
];

module.exports = loginValidator;