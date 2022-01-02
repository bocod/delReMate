const express = require('express');
const { body } = require('express-validator');
const usersRouter = express.Router();
const multer = require('multer');
const path = require('path');

const usersController = require('../controllers/usersController');
const loginValidator = require('../validations/loginValidator');
const registerValidator = require('../validations/registerValidator');

    //Multer config

const multerDiskStorage = multer.diskStorage({
    destination: (req, file, cb) => {
        const folder = path.join(__dirname, '../public/img/usersImages');
        cb(null, folder);
    },
    filename: (req, file, cb) => {
        const imageName = `userIMG${Date.now()}${path.extname(file.originalname)}`;
        cb(null, imageName);
    }
});

const upload = multer({ storage: multerDiskStorage});

    //USERS ROUTES

usersRouter.get('/register', usersController.registrationForm);
usersRouter.post('/register', registerValidator, upload.single('profilePic'), usersController.createUser);

usersRouter.get('/login', usersController.login);
usersRouter.post('/login', loginValidator, usersController.loginConfirmation);

usersRouter.get('/userEdit/:idUser', usersController.edit);
usersRouter.put('/userEdit/:idUser', usersController.editConfirm);
usersRouter.delete('/delete', usersController.deleteConfirm);

module.exports = usersRouter;