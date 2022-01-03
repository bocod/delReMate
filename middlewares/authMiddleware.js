// Verify if user is logged in

function authMiddleware (req, res, next) {

    if (req.session.userLoggedIn != undefined ) {

        next();
    
    } else {

        res.send(`Contenido exclusivo para usuarios registrados`);
        
    }
};

module.exports = authMiddleware;