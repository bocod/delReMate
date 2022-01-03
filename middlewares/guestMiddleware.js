// Verify if user is NOT loggued in

function guestMiddleware (req, res, next) {

    if (req.session.userLoggedIn == undefined ) {

        next();

    } else {

        res.send(`Ya se encuentra logueado el usuario ${req.session.userLoggedIn.username}`);

    }
};

module.exports = guestMiddleware;