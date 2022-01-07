const { body } = require('express-validator');

const registerValidator = [
    // body('name').notEmpty().withMessage('Debes escribir tu nombre'),
    // body('surname').notEmpty().withMessage('Debes escribir tu apellido'),
    // body('email')
    //     .notEmpty().withMessage('Debes completar tu mail').bail()
    //     .isEmail().withMessage('Debes ingresar un email válido'),
    // body('username').notEmpty().withMessage('Completar tu nombre de usuario'),
    // body('password').isLength({ min: 8 }).withMessage('Ingresar una contraseña válida'),
    // body('profilePic').custom((value, { req }) => {
	// 	let file = req.file;
	// 	let acceptedExtensions = ['.jpg', '.png', '.gif'];

	// 	if (!file) {
	// 		throw new Error('Tienes que subir una imagen');
	// 	} else {
	// 		let fileExtension = path.extname(file.originalname);
	// 		if (!acceptedExtensions.includes(fileExtension)) {
	// 			throw new Error(`Las extensiones de archivo permitidas son ${acceptedExtensions.join(', ')}`);
	// 		}
	// 	}

	// 	return true;
	// }),
    // body('country').notEmpty().withMessage('Tienes que elegir un país')
];

module.exports = registerValidator;