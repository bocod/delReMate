// Verify if user is NOT loggued in can continue, else you are already logged! (you can't log twice)

function guestMiddleware (req, res, next) {

    if (req.session.userLoggedIn == undefined ) {

        next();

    } else {

        res.render('errors/error404');

    }
};

module.exports = guestMiddleware;