const express = require('express');
const usersRouter = express.Router();

const usersController = require('../controllers/usersController');
const registerValidator = require('../validations/registerValidator');


    //USERS ROUTES

usersRouter.get('/register', usersController.registrationForm);
usersRouter.post('/register', usersController.createUser);

usersRouter.get('/login', usersController.login);
usersRouter.post('/login', usersController.loginConfirmation);

usersRouter.get('/userEdit/:idUser', usersController.edit);
usersRouter.put('/userEdit/:idUser', usersController.editConfirm);
usersRouter.delete('/delete', usersController.deleteConfirm);

module.exports = usersRouter;