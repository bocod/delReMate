const express = require('express');
const { body } = require('express-validator');
const usersRouter = express.Router();
const multer = require('multer');
const path = require('path');

const guestMiddleware = require('../middlewares/guestMiddleware');
const authMiddleware = require('../middlewares/authMiddleware');

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

usersRouter.get('/register', guestMiddleware, usersController.registrationForm);
usersRouter.post('/register', registerValidator, upload.single('profilePic'), usersController.createUser);

usersRouter.get('/login', guestMiddleware, usersController.login);
usersRouter.post('/login', loginValidator, usersController.loginConfirmation);

usersRouter.get('/profile/:idUser?', authMiddleware, usersController.profile);

usersRouter.get('/userEdit/:idUser', authMiddleware, usersController.edit);
usersRouter.put('/userEdit/:idUser',  upload.single('profilePic'),usersController.editConfirm);
usersRouter.delete('/delete/:idUser', usersController.deleteConfirm);

usersRouter.get('/signout', authMiddleware, usersController.signout);

usersRouter.get('/check', (req, res) => {
    if (req.session.userLoggedIn != undefined) {
        res.send(`User loggedin : ${req.session.userLoggedIn.name}`);
    } else {
        res.send(`User loggedin : Invitado`);
    }
});

module.exports = usersRouter;