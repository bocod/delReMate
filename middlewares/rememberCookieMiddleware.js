const fs = require('fs');
const path = require('path');

const usersDataPath = path.join(__dirname, '../database/usersData.json');
const usersDataText = fs.readFileSync(usersDataPath, 'utf-8');
const usersList = JSON.parse(usersDataText);


const rememberCookieMiddleware = (req, res, next) => {
    
    next();
    
    //Checking if we already have cookies running but no user session open
    if (req.cookies.remember != undefined && req.session == undefined) {    

        let userLoggingIn;
        //We search the id storaged in the cookie in the array of users and initialize session again
        for ( let i=0; i < usersList.length; i++ ) {
            if (usersList[i].id == req.cookies.remember) {
                userLoggingIn = usersList[i];
                break;
            };
        };

        req.session.userLoggedIn = userLoggingIn;
    }
    
};

module.exports = rememberCookieMiddleware;