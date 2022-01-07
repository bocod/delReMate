// Verify if user is NOT loggued in

function guestMiddleware (req, res, next) {

    if (req.session.userLoggedIn == undefined ) {

        next();

    } else {

        res.render('errors/error404');

    }
};

module.exports = guestMiddleware;