const fs = require('fs');
const path = require('path');

const usersDataPath = path.join(__dirname, '../database/usersData.json');
const usersDataText = fs.readFileSync(usersDataPath, 'utf-8');
const usersList = JSON.parse(usersDataText);

function userLoggedMidleware(req, res, next){
    
    res.locals.isLogged = false;

    if (req.session.userLoggedIn !== undefined) {
        res.locals.isLogged = true;
    }
    // res.locals.isLogged = false;

    // let usernameInCookie = req.cookies.username;
    // let userFromCookie = usersList.find(aUser => aUser.username == usernameInCookie);

    // if (userFromCookie) {
    //     req.session.userLoggedIn = userFromCookie;
    // };

    // if (req.session.userLoggedIn) {
    //     res.locals.isLogged = true;
    //     res.locals.userLogged = req.session.userLoggedIn
    // };
    
    next();
}

module.exports = userLoggedMidleware;