const fs = require('fs');
const path = require('path');

const usersDataPath = path.join(__dirname, '../database/usersData.json');
const usersDataText = fs.readFileSync(usersDataPath, 'utf-8');
const usersList = JSON.parse(usersDataText);


const rememberCookieMiddleware = (req, res, next) => {
    
    
    
    //Checking if we already have cookies running but no user session open
    if ((req.cookies.remember != undefined) && (req.session === undefined)) {    

        //et userLoggingIn;
        
        //We search the username, that is storaged in the cookie, in the array of users and initialize session again

        const findUser = user => user.username == req.cookies.remember;

        let userFound = usersList.findIndex(findUser);

        req.session.userLoggedIn = usersList[userFound];

        return next();
    
    } else {

        return next();

    }
    
};

module.exports = rememberCookieMiddleware;